import React, {useCallback, useState} from 'react'
import {shallowEqual, useDispatch, useSelector} from 'react-redux'
import {MarketStateType} from '../redux/reducers/marketReducer'
import {
    setQuantityAction, setPriceAction, setTotalAction
} from '../redux/actions/marketActions'

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
        <form style={{
            flexDirection: 'column',
            display: 'flex',
            alignItems: 'center'
        }}>
            <h1>
                Store your value
            </h1>
            {error && <h3 style={{color: 'red'}}>
                {error}
            </h3>}
            <label>Price</label>
            <input placeholder='Price' type='number' onChange={e => {
                dispatch(setPriceAction(Number(e.target.value)))
            }} value={price || ''}/>
            <h2>x</h2>
            <label>Quantity</label>
            <input
                placeholder='Quantity' type='number'
                onChange={e => {
                    dispatch(setQuantityAction(Number(e.target.value)))
                }}
                value={quantity || ''}/>
            <h2>=</h2>
            <label>Total</label>
            <input placeholder='Total' type='number'
                   onChange={e => {
                       dispatch(setTotalAction(Number(e.target.value)))
                   }}
                   value={total || ''}/>
            <input type='button' value='save' onClick={onClick}/>
        </form>
    )
}
export default Page