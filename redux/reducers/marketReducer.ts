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

/**
 * updates field value and related fields based on order.
 * [0] - fieldName
 * if lastCalledAction === [1] do [2] else do [3]
 * @param s
 * @param action
 */
const updateMarketFields = (
    s: MarketStateType, action: MarketActionReturnType
) => {
    switch (action.type) {
        case MARKET_ACTIONS.SET_PRICE: s.price = action.amount; break;
        case MARKET_ACTIONS.SET_QUANTITY: s.quantity = action.amount; break;
        case MARKET_ACTIONS.SET_TOTAL: s.total = action.amount; break;
    }
    if (s.order.length < 3) return
    switch (s.order[0]) {
        case MARKET_ACTIONS.SET_PRICE: s.price = s.total / s.quantity; break;
        case MARKET_ACTIONS.SET_QUANTITY: s.quantity = s.total / s.price; break;
        case MARKET_ACTIONS.SET_TOTAL: s.total = s.price * s.quantity; break;
    }
}

/**
 * updates price, quantity and total if one of these fields has changed
 * @param state
 * @param action
 */
const marketReducer = (state: MarketStateType = InitialState, action: MarketActionReturnType) => {
    if (action.type in MARKET_ACTIONS) {
        const newState = {...state, order: [...state.order]}
        updateOrder(newState.order, action.type)
        updateMarketFields(newState, action)
        return newState
    }
    return state
}

export default marketReducer