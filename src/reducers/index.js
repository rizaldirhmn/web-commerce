import { combineReducers } from 'redux'
import alert from './alerts'
import login from './login'

export default combineReducers({
    alert,
    login,
})