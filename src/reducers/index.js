import { combineReducers } from 'redux'
import alert from './alerts'
import login from './login'
import customer from './customer'
import dashboard from './dashboard'
import purchaseOrder from './purchaseOrder'
import product from './product'
import cart from './cart'
import payment from './payment'
import transaction from './transaction'
import first_balance from './first_balance'

export default combineReducers({
    alert,
    login,
    customer,
    dashboard,
    purchaseOrder,
    product,
    cart,
    payment,
    transaction,
    first_balance
})