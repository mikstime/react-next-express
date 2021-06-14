import React, {useCallback, useState} from 'react'
import {shallowEqual, useDispatch, useSelector} from 'react-redux'
import {
    setQuantityAction, setPriceAction, setTotalAction
} from '../redux/actions/marketActions'
import {MarketStateType} from '../redux/reducers/marketReducer'

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
                    const jsonData = JSON.parse(request.response)
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
        <>
            {error && <p style={{textAlign: 'center'}}>
                {error}
            </p>}
            <form>
                <div style={{display: 'flex', flexDirection: 'column'}}>
                    <label>Цена</label>
                    <input placeholder='Цена' type='number' onChange={e => {
                        dispatch(setPriceAction(Number(e.target.value)))
                    }} value={price || ''}/>
                    <label>Количество</label>
                    <input
                        placeholder='Количество' type='number'
                        onChange={e => {
                            dispatch(setQuantityAction(Number(e.target.value)))
                        }}
                        value={quantity || ''}/>
                    <label>Сумма</label>
                    <input placeholder='Сумма' type='number'
                           onChange={e => {
                               dispatch(setTotalAction(Number(e.target.value)))
                           }}
                           value={total || ''}/>
                    <input type="submit" value="Submit"
                           onClick={onClick}/>
                </div>
            </form>
        </>
    )
}
export default Page