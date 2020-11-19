import { combineReducers } from 'redux'
import alert from './alert'
import auth from './auth'
import profile from '../../reducers/profile'
import dashboard from '../../reducers/dashboard'
import team from './team'
import customer from './customer'
import task from './task'

export default combineReducers({
    alert,
    auth,
    profile,
    dashboard,
    team,
    customer,
    task
})