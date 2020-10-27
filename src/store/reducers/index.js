import { combineReducers } from 'redux'
import alert from './alert'
import auth from './auth'
import profile from '../../reducers/profile'
import dashboard from '../../reducers/dashboard'

export default combineReducers({
    alert,
    auth,
    profile,
    dashboard
})