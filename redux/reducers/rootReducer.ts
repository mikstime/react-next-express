import marketReducer from './marketReducer'
import storingReducer from './storingReducer'
import {combineReducers} from 'redux'

const rootReducer = combineReducers({
    market: marketReducer,
    storing: storingReducer,
})

export default rootReducer
