import { combineReducers } from 'redux'
import alert from './alerts'
import login from './login'
import dashboard from './dashboard'
import product from './product'
import cart from './cart'
import payment from './payment'
import transaction from './transaction'
import profile from './profile'

export default combineReducers({
    alert,
    login,
    dashboard,
    product,
    cart,
    payment,
    transaction,
    profile
})