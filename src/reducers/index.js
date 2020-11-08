import { combineReducers } from 'redux'
import alert from './alerts'
import login from './login'
import dashboard from './dashboard'
import profile from './profile'

export default combineReducers({
    alert,
    login,
    dashboard,
    profile
})