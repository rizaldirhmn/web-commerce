import { combineReducers } from 'redux'
import alert from './alerts'
import login from './login'
import customer from './customer'

export default combineReducers({
    alert,
    login,
    customer,
})