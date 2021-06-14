import {MARKET_ACTIONS, MarketActionReturnType} from '../actions/marketActions'
import produce from 'immer'

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
 * @param lastAction
 */
const updateOrder = (order: MARKET_ACTIONS[], lastAction: MARKET_ACTIONS) => {
    if (order.length === 0) return [lastAction]

    if (order.length === 1) {
        if (order[0] === lastAction) return order
        return [...order, lastAction]
    }

    if (order.length === 2) {
        if (order[1] === lastAction) return order
        if (order[0] === lastAction) return order.reverse()
        return [...order, lastAction]
    }

    if (order[2] !== lastAction) {
        if (order[1] === lastAction) {
            const el = order[1]
            order[1] = order[2]
            order[2] = el
        } else {
            order.push(order.shift())
        }
    }
    return order
}

const marketReducer = produce((draft, action: MarketActionReturnType) => {
    // If
    if (action.type in MARKET_ACTIONS) {
        draft.order = updateOrder(draft.order, action.type)
        switch (action.type) {
            case MARKET_ACTIONS.SET_PRICE:
                draft.price = action.amount
                if (draft.order.length < 3) return
                if (draft.order[0] === MARKET_ACTIONS.SET_TOTAL) {
                    draft.total = draft.price * draft.quantity
                } else if (draft.order[0] === MARKET_ACTIONS.SET_QUANTITY) {
                    draft.quantity = draft.total / draft.price
                }
                break
            case MARKET_ACTIONS.SET_QUANTITY:
                draft.quantity = action.amount
                if (draft.order.length < 3) return
                if (draft.order[0] === MARKET_ACTIONS.SET_PRICE) {
                    draft.price = draft.total / draft.quantity
                } else if (draft.order[0] === MARKET_ACTIONS.SET_TOTAL) {
                    draft.total = draft.quantity * draft.price
                }
                break
            case MARKET_ACTIONS.SET_TOTAL:
                draft.total = action.amount
                if (draft.order.length < 3) return
                if (draft.order[0] === MARKET_ACTIONS.SET_PRICE) {
                    draft.price = draft.total / draft.quantity
                } else if (draft.order[0] === MARKET_ACTIONS.SET_QUANTITY) {
                    draft.quantity = draft.total / draft.price
                }
                break
        }
    }
}, InitialState)

export default marketReducer
