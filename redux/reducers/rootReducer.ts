import marketReducer from './marketReducer'
import {combineReducers} from 'redux'

const rootReducer = combineReducers({
    market: marketReducer
})

export default rootReducer
