import { combineReducers } from 'redux'
import alert from './alert'
import auth from './auth'
import profile from '../../reducers/profile'
import dashboard from '../../reducers/dashboard'
import team from './team'
import warehouse from './Master/warehouse'
import category from './Master/category'
import province from './province'
import product from './Product/product'

export default combineReducers({
    alert,
    auth,
    profile,
    dashboard,
    team,
    warehouse,
    province,
    category,
    product
})