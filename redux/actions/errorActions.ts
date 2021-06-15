//Action Type
export const ERROR_ACTION = Symbol('ERROR-ACTION')


export const setErrorAction = (error: string) => ({
    type: ERROR_ACTION,
    error
})

export type ErrorActionReturnType = ReturnType<typeof setErrorAction>

export type ErrorAction = { setErrorAction: typeof setErrorAction }