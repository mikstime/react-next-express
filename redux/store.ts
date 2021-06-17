import {applyMiddleware, createStore} from 'redux'
import rootReducer from './reducers/rootReducer'
import {InitialState as MarketInitialState} from './reducers/marketReducer'
import {InitialState as StoringInitialState} from './reducers/storingReducer'
import thunk from 'redux-thunk'

export const InitialState = {
    market: MarketInitialState,
    storing: StoringInitialState
}

export const makeStore = (initialState = InitialState) =>
    createStore(rootReducer, initialState, applyMiddleware(thunk))