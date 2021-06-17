//Action Types
export enum STORING_ACTIONS {
    START_LOADING = 'START_LOADING',
    FINISH_LOADING = 'FINISH_LOADING',
    SET_ERROR = 'SET_ERROR'
}

export const startLoadingAction = () => ({
    type: STORING_ACTIONS.START_LOADING,
    error: null
})
export const finishLoadingAction = () => ({
    type: STORING_ACTIONS.FINISH_LOADING,
    error: null
})
export const setErrorAction = (error: string) => ({
    type: STORING_ACTIONS.SET_ERROR,
    error
})

export const storeResults = () => {

    return async (dispatch, getState) => {
        const {quantity, price, total} = getState().market

        dispatch(startLoadingAction)
        try {
            const res = await fetch('/api/store', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({quantity, price, total})
            })
            try {
                if (res.status === 200 || res.status === 201) {
                    dispatch(finishLoadingAction())
                } else {
                    const {error} = await res.json()
                    dispatch(setErrorAction(error))
                }
            } catch (e) {
                dispatch(setErrorAction('Error parsing response'))
            }
        } catch (e) {
            dispatch(setErrorAction('Could not store a result'))
        }
    }
}

export type StoringActionReturnType =
    ReturnType<typeof startLoadingAction> |
    ReturnType<typeof finishLoadingAction> |
    ReturnType<typeof setErrorAction>

export type StoringAction = {
    startLoadingAction: typeof startLoadingAction
    finishLoadingAction: typeof finishLoadingAction
    setErrorAction: typeof setErrorAction
}