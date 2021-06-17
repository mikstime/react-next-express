import {STORING_ACTIONS, StoringActionReturnType} from '../actions/storingActions'

// Reducer with initial state
export type StoringStateType = {
    error: null | string,
    state: 'DEFAULT' | 'ERROR' | 'LOADING'
}

export const InitialState: StoringStateType = {
    error: null,
    state: 'DEFAULT'
}


/**
 * stores fields state on server-side
 * @param state
 * @param action
 */
const storingReducer = (state: StoringStateType = InitialState, action: StoringActionReturnType) => {
    switch (action.type) {
        case STORING_ACTIONS.FINISH_LOADING:
            return {error: null, state: 'DEFAULT'}
        case STORING_ACTIONS.SET_ERROR:
            return {error: action.error, state: 'ERROR'}
        case STORING_ACTIONS.START_LOADING:
            return {error: null, state: 'LOADING'}
    }
    return state
}

export default storingReducer