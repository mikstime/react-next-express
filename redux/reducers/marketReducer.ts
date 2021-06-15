import {MARKET_ACTIONS, MarketActionReturnType} from '../actions/marketActions'

// Reducer with initial state
export type MarketStateType = {
    order: MARKET_ACTIONS[]
    price: number
    quantity: number
    total: number
}

export const InitialState: MarketStateType = {
    order: [], // order[0] defines field in which update is needed, order[2] is the last action
    price: 0,
    quantity: 0,
    total: 0
}

/**
 * Renews order in which fields were edited.
 * e.g.
 * was [0, 2, 1], edited 2 => [0, 1, 2]
 * was [0, 2, 1], edited 0 => [2, 1, 0]
 * was [], edited 1 => [1]
 * was [1,2], edited 1 => [2,1]
 * @param order
 * @param action
 */
const updateOrder = (order: MARKET_ACTIONS[], action: MARKET_ACTIONS) => {
    const index = order.indexOf(action)
    // works for any number of actions
    order.push(~index ? order.splice(index, 1)[0] : action)
}

const updatePrice = s => s.price = s.total / s.quantity
const updateQuantity = s => s.quantity = s.total / s.price
const updateTotal = s => s.total = s.price * s.quantity

const marketUpdateChains = {
    [MARKET_ACTIONS.SET_PRICE]: ['price', MARKET_ACTIONS.SET_TOTAL, updateTotal, updateQuantity],
    [MARKET_ACTIONS.SET_QUANTITY]: ['quantity', MARKET_ACTIONS.SET_PRICE, updatePrice, updateTotal],
    [MARKET_ACTIONS.SET_TOTAL]: ['total', MARKET_ACTIONS.SET_PRICE, updatePrice, updateQuantity]
}

const updateMarketFields = (chain: any, state: MarketStateType, action: MarketActionReturnType) => {
    state[chain[0]] = action.amount
    if (state.order.length < 3) return
    const index = state.order[0] === chain[1] ? 2 : 3 // update fields conditionally
    chain[index](state)
}
const marketReducer = (state: MarketStateType = InitialState, action: MarketActionReturnType) => {
    if (action.type in MARKET_ACTIONS) {
        const newState = {...state, order: [...state.order]}
        updateOrder(state.order, action.type)
        updateMarketFields(marketUpdateChains[action.type], newState, action)
        return newState
    }
    return state
}

export default marketReducer
