import React, {useCallback, useState} from 'react'
import {connect} from 'react-redux'
import {MarketStateType} from '../redux/reducers/marketReducer'
import {
    setQuantityAction, setPriceAction, setTotalAction, MarketAction
} from '../redux/actions/marketActions'
import {bindActionCreators} from 'redux'

type AppProps = Omit<MarketStateType, 'order'>


const Page: React.FC<AppProps & MarketAction> = (
    {total, quantity, price, setQuantityAction, setPriceAction, setTotalAction}
) => {
    const [error, setError] = useState<null | string>(null)

    const onClick = useCallback(async (e) => {
        e.preventDefault()
        const res = await fetch('/api/store', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({quantity, price, total})
        })
        if (res.status === 200 || res.status === 201) {
            setError(null)
        } else {
            try {
                setError((await res.json()).error)
            } catch (e) {
                setError('Error parsing response')
            }
        }
    }, [setError, total, quantity, price])

    return (
        <form>
            <h1>
                Store your value
            </h1>
            {error && <h3 style={{color: 'red'}}>
                {error}
            </h3>}
            <label>Price</label>
            <input placeholder='Price' type='number' onChange={e => {
                setPriceAction(Number(e.target.value))
            }} value={price || ''}/>
            <h2>x</h2>
            <label>Quantity</label>
            <input placeholder='Quantity' type='number' onChange={e => {
                setQuantityAction(Number(e.target.value))
            }}
                   value={quantity || ''}/>
            <h2>=</h2>
            <label>Total</label>
            <input placeholder='Total' type='number' onChange={e => {
                setTotalAction(Number(e.target.value))
            }}
                   value={total || ''}/>
            <input type='button' value='save' onClick={onClick}/>
        </form>
    )
}

const mapStateToProps = (state: { market: MarketStateType }) => ({...state.market})
const mapDispatchToProps = (dispatch) => bindActionCreators(
    {setQuantityAction, setPriceAction, setTotalAction}, dispatch
)

export default connect(mapStateToProps, mapDispatchToProps)(Page)