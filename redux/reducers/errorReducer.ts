import {ERROR_ACTION, ErrorActionReturnType} from '../actions/errorActions'

export type ErrorStateType = {
    error: string | null
}

export const InitialState: ErrorStateType = {
    error: null
}

const errorReducer = (state: ErrorStateType = {error: null}, action: ErrorActionReturnType) => {
    if (action.type === ERROR_ACTION) {
        return {...state, error: action.error}
    }
    return state
}

export default errorReducer