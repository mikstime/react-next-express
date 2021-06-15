import marketReducer from './marketReducer'
import errorReducer from './errorReducer'
import {combineReducers} from 'redux'

const rootReducer = combineReducers({
    market: marketReducer,
    error: errorReducer,
})

export default rootReducer
