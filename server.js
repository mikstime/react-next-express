import express from 'express'
import bodyParser from 'body-parser'
import * as Yup from 'yup'
import next from 'next'
import fs from 'fs'
import path from 'path'
import cookieParser from 'cookie-parser'

const { writeFile, readFile } = fs.promises

const PORT = process.env.PORT || 3000

const app = next({ dev : process.env.NODE_ENV !== 'production' })
const nextHandler = app.getRequestHandler()

/**
 * Rust/Swift like errors handling
 * @param promise
 * @returns {Promise<*[]>}
 */
const handle = async (promise) => {
  try {
    return [ await promise, null ]
  } catch ( e ) {
    return [ null, e ]
  }
}

app.prepare()
  .then(() => {
    
    const marketSchema = Yup.object({
      quantity : Yup.number().positive().required(),
      price : Yup.number().positive().required(),
      total : Yup.number().positive().required(),
    })
    
    const server = express()
    
    // useful middlewares
    server.use(cookieParser())
    server.use(bodyParser.json())
    server.use(bodyParser.urlencoded({ extended : false }))
    
    server.post('/api/store', async (req, res) => {
      const { body : product } = req
      // throws an error if not valid
      const [ parsed, err ] = await handle(marketSchema.validate(product))
      if ( err ) {
        res.status(400).json({ error : err.errors.join(', ') })
        return
      }
      // Better to use uuid, but I'm lazy
      const fileId = Math.random() * 10 ** 17
      
      const p = path.join(__dirname, process.env.STORAGE, fileId + '.txt')
      const [ , err1 ] = await handle(writeFile(p, JSON.stringify(parsed)))
      // @TODO: Should check if collision occurred and try saving with different name
      if ( err1 ) {
        console.log(err1)
        res.status(500).json({ error : 'Error saving result' })
        return
      }
      // Store file name in cookie
      await res.status(201).cookie('fileId', fileId, {
        maxAge : 900000, httpOnly : true
      }).json(parsed)
    })
    
    server.get('/api/store', async (req, res) => {
      // file name is stored in cookie
      const { fileId } = req.cookies
      if ( !fileId ) {
        res.status(404).json({ error : 'Data not found' })
        return
      }
      const p = path.join(__dirname, process.env.STORAGE, fileId + '.txt')
      const [ data, err ] = await handle(readFile(p))
      if ( err ) {
        res.status(404).json({ error : 'Data not found' })
      } else {
        res.json(JSON.parse(data))
      }
    })
    
    server.get('*', (req, res) => {
      return nextHandler(req, res)
    })
    
    server.listen(PORT, (err) => {
      if ( err ) throw err
      console.log(`Server is running on http://localhost:${ PORT }`)
    })
  })
  .catch((ex) => {
    console.error(ex.stack)
    process.exit(1)
  })