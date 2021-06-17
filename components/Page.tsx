import React from 'react'
import {connect} from 'react-redux'
import {MarketStateType} from '../redux/reducers/marketReducer'
import {
    setQuantityAction, setPriceAction, setTotalAction, MarketAction
} from '../redux/actions/marketActions'
import {bindActionCreators} from 'redux'
import {storeResults} from '../redux/actions/storingActions'
import {StoringStateType} from '../redux/reducers/storingReducer'

type AppProps =
    Omit<MarketStateType, 'order'>
    & MarketAction & StoringStateType
    & typeof storeResults


const Page: React.FC<AppProps> = (
    {
        total, quantity, price, setQuantityAction, setPriceAction,
        setTotalAction, error, storeResults, state
    }
) => {

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
            <input disabled={state === 'LOADING'}
                   type='button' value='save' onClick={storeResults}/>
        </form>
    )
}

const mapStateToProps = (
    state: { market: MarketStateType, storing: StoringStateType }
) => ({...state.market, ...state.storing})

const mapDispatchToProps = (dispatch) => bindActionCreators(
    {
        setQuantityAction,
        setPriceAction,
        setTotalAction,
        storeResults
    }, dispatch
)

export default connect(mapStateToProps, mapDispatchToProps)(Page)