import { combineReducers } from 'redux'
import alert from './alert'
import auth from './auth'
import profile from '../../reducers/profile'
import team from './team'
import warehouse from './Master/warehouse'
import category from './Master/category'
import province from './province'
import product from './Product/product'
import productImage from './Product/productImage'
import categoryImage from './Master/categoryImage'
import paymentConfirmationReducer from './PaymentConfirmation/paymentConfirmationReducer'
import collection from './Product/collection'
import collectionImage from './Product/collectionImage'
import collectionProduct from './Product/collectionProduct'
import dashboard from './dashboard'
import settings from './settings'
import banner from './Master/banner'
import blog from './blog'
import notification from './notification'

export default combineReducers({
    alert,
    auth,
    profile,
    dashboard,
    team,
    warehouse,
    province,
    category,
    product,
    paymentConfirmationReducer,
    productImage,
    categoryImage,
    collection,
    collectionImage,
    collectionProduct,
    settings,
    banner,
    blog,
    notification
})