import React, {useCallback, useState} from 'react'
import {shallowEqual, useDispatch, useSelector} from 'react-redux'
import {MarketStateType} from '../redux/reducers/marketReducer'
import {
    setQuantityAction, setPriceAction, setTotalAction
} from '../redux/actions/marketActions'
import styled, {createGlobalStyle} from 'styled-components'

const GlobalStyle = createGlobalStyle`
  body {
    background: #DFDFDF;
    margin: 0;
    font-family: sans-serif;
  }
`
type AppProps = Omit<MarketStateType, 'order'>

const useForms = (): AppProps => {
    return useSelector(
        (state: { market: MarketStateType }) => {
            return {
                total: state.market.total,
                quantity: state.market.quantity,
                price: state.market.price
            }
        },
        shallowEqual
    )
}

const Root = styled.div`
  display: flex;
  flex-wrap: wrap;
  max-width: 100vw;
  min-height: 100vh;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-start;
  @media(max-width: 700px) {
    flex-direction: column;
  }
`

const Item = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column-reverse;
  margin: 0 10px;
  
  label {
    margin: -2em auto auto;
    height: 26px;
    box-sizing: border-box;
    font-size: 1.25em;
    background: white;
    padding: 5px;
    opacity: 0;
    transition: .1s;
    z-index: -1;
    border-radius: 5px;
  }
  &:not(:focus-within) {
    margin-bottom: 13px;
    transition: .1s;
  }
  
  &:focus-within label {
    z-index: 2;
    margin: -13px auto auto;
    opacity: 1;
    font-size: 1em;
  }
  
  input:focus::placeholder {
    color: transparent;
  }
  
  input {
    padding: 20px;
    font-size: 1.25em;
    text-align: center;
    border-radius: 10px;
    border: 1px solid #999;
  }
  
  // simplify on mobile
  @media(max-width: 700px) {
    align-self: stretch;
    label {
      display: none;
    }
    &:not(:focus-within) {
      margin-bottom: 0;
    }
  }
`
const ErrorMessage = styled.p`
  color: #FF5353;
  font-family: sans-serif;
`

const Button = styled.input`
  padding: 15px;
  cursor: pointer;
  width: 100%;
  background: #27BA66;
  border: none !important;
`
const Page: React.FC = () => {
    const dispatch = useDispatch()
    const {total, quantity, price} = useForms()
    const [error, setError] = useState<null | string>(null)

    const onClick = useCallback((e) => {
        e.preventDefault()

        const request = new XMLHttpRequest()
        request.open('POST', '/api/store', true)
        request.setRequestHeader('Content-Type', 'application/json')
        request.onreadystatechange = () => {
            if (request.readyState === 4) {
                if (request.status === 200 || request.status === 201) {
                    JSON.parse(request.response)
                    setError(null)
                } else {
                    const {error} = JSON.parse(request.response)
                    setError(error)
                }
            }

        }

        request.send(JSON.stringify({quantity, price, total}))

    }, [setError, total, quantity, price])

    return (
        <Root>
            <GlobalStyle/>
            <h1>
                Store your value
            </h1>
            {error && <ErrorMessage style={{textAlign: 'center'}}>
                {error}
            </ErrorMessage>}
            <form>
                <Container>
                    <Item>
                        <label>Price</label>
                        <input placeholder='Price' type='number' onChange={e => {
                            dispatch(setPriceAction(Number(e.target.value)))
                        }} value={price || ''}/>
                    </Item>
                    <Item><h2>x</h2></Item>
                    <Item>
                        <label>Quantity</label>
                        <input
                            placeholder='Quantity' type='number'
                            onChange={e => {
                                dispatch(setQuantityAction(Number(e.target.value)))
                            }}
                            value={quantity || ''}/>
                    </Item>
                    <Item><h2>=</h2></Item>
                    <Item>
                        <label>Total</label>
                        <input placeholder='Total' type='number'
                               onChange={e => {
                                   dispatch(setTotalAction(Number(e.target.value)))
                               }}
                               value={total || ''}/>
                    </Item>
                    <Item>
                        <Button type='button' value='save' onClick={onClick}/>
                    </Item>
                </Container>

            </form>
        </Root>
    )
}
export default Page