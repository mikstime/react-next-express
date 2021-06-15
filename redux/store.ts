import {createStore} from 'redux'
import rootReducer from './reducers/rootReducer'
import {InitialState} from './reducers/marketReducer'

export const makeStore = (initialState = {market: InitialState}) => createStore(rootReducer, initialState)