import { combineReducers } from 'redux'
import alert from './alerts'
import login from './login'
import customer from './customer'
import dashboard from './dashboard'
import purchaseOrder from './purchaseOrder'

export default combineReducers({
    alert,
    login,
    customer,
    dashboard,
    purchaseOrder,
})