//Action Types
export enum MARKET_ACTIONS {
    SET_QUANTITY,
    SET_PRICE,
    SET_TOTAL
}

export const setQuantityAction = (amount: number) => ({
    type: MARKET_ACTIONS.SET_QUANTITY,
    amount
})
export const setPriceAction = (amount: number) => ({
    type: MARKET_ACTIONS.SET_PRICE,
    amount
})
export const setTotalAction = (amount: number) => ({
    type: MARKET_ACTIONS.SET_TOTAL,
    amount
})

export type MarketActionReturnType =
    ReturnType<typeof setQuantityAction> |
    ReturnType<typeof setPriceAction> |
    ReturnType<typeof setTotalAction>

export type MarketAction =
    {
        setQuantityAction: typeof setQuantityAction
        setPriceAction: typeof setPriceAction
        setTotalAction: typeof setTotalAction
    }