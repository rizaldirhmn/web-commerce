import { combineReducers } from 'redux'
import alert from './alerts'
import login from './login'
import customer from './customer'
import dashboard from './dashboard'
import purchaseOrder from './purchaseOrder'
import product from './product'
import cart from './cart'
import cartBuyback from './cartBuyback'
import payment from './payment'
import transaction from './transaction'
import transactionBuyback from './transactionBuyback'
import first_balance from './first_balance'
import stock_opname from './stock_opname'
import stockHistory from './stockHistory'

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
    first_balance,
    stock_opname,
    cartBuyback,
    transactionBuyback,
    stockHistory
})