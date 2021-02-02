import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility'

const initialState = {
    error: {},
    totalUser: null,
    totalTransaction: null,
    grafikIncome: null,
    productBestseller: null,
    resellerActive: null,
    loadingResellerActive: false,
    loadingGrafikIncome: false,
    loadingTotalTransaction: false,
    loadingTotalUser: false,
    loadingProductBestseller: false
}

// Fetching dahsboard total user
const fetchDashboardTotalUser = (state) => {
    return updateObject(state, {
      loadingTotalUser: true,
    })
}
  
const fetchDashboardTotalUserSuccess = (state, action) => {
    return updateObject(state, {
        totalUser: action.totalUser.count,
        loadingTotalUser: false
    })
}
  
const fetchDashboardTotalUserFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loadingTotalUser: false
    })
}

// Fetching dashboard total transaction
const fetchDashboardTotalTransaction = (state) => {
    return updateObject(state, {
      loadingTotalTransaction: true,
    })
}
  
const fetchDashboardTotalTransactionSuccess = (state, action) => {
    return updateObject(state, {
        totalTransaction: action.totalTransaction,
        loadingTotalTransaction: false
    })
}
  
const fetchDashboardTotalTransactionFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loadingTotalTransaction: false
    })
}

// Fetching dashboard Grafik Income
const fetchDashboardGrafikIncome = (state) => {
    return updateObject(state, {
      loadingGrafikIncome: true,
    })
}
  
const fetchDashboardGrafikIncomeSuccess = (state, action) => {
    return updateObject(state, {
        grafikIncome: action.grafikIncome,
        loadingGrafikIncome: false
    })
}
  
const fetchDashboardGrafikIncomeFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loadingGrafikIncome: false
    })
}

// Fetching dashboard Product Bestseller
const fetchDashboardProductBestseller = (state) => {
    return updateObject(state, {
      loadingProductBestseller: true,
    })
}
  
const fetchDashboardProductBestsellerSuccess = (state, action) => {
    return updateObject(state, {
        productBestseller: action.productBestseller,
        loadingProductBestseller: false
    })
}
  
const fetchDashboardProductBestsellerFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loadingProductBestseller: false
    })
}

// Fetching dashboard Reseller Active
const fetchDashboardResellerActive = (state) => {
    return updateObject(state, {
      loadingResellerActive: true,
    })
}
  
const fetchDashboardResellerActiveSuccess = (state, action) => {
    return updateObject(state, {
        resellerActive: action.resellerActive,
        loadingResellerActive: false
    })
}
  
const fetchDashboardResellerActiveFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loadingResellerActive: false
    })
}

  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case actionTypes.GET_DASHBOARD_TOTAL_USER_START: return fetchDashboardTotalUser(state, action)
      case actionTypes.GET_DASHBOARD_TOTAL_USER_SUCCESS: return fetchDashboardTotalUserSuccess(state, action)
      case actionTypes.GET_DASHBOARD_TOTAL_USER_FAIL: return fetchDashboardTotalUserFail(state, action)
      case actionTypes.GET_DASHBOARD_TOTAL_TRANSACTION_START: return fetchDashboardTotalTransaction(state, action)
      case actionTypes.GET_DASHBOARD_TOTAL_TRANSACTION_SUCCESS: return fetchDashboardTotalTransactionSuccess(state, action)
      case actionTypes.GET_DASHBOARD_TOTAL_TRANSACTION_FAIL: return fetchDashboardTotalTransactionFail(state, action)
      case actionTypes.GET_DASHBOARD_GRAFIK_INCOME_START: return fetchDashboardGrafikIncome(state, action)
      case actionTypes.GET_DASHBOARD_GRAFIK_INCOME_SUCCESS: return fetchDashboardGrafikIncomeSuccess(state, action)
      case actionTypes.GET_DASHBOARD_GRAFIK_INCOME_FAIL: return fetchDashboardGrafikIncomeFail(state, action)
      case actionTypes.GET_DASHBOARD_PRODUCT_BESTSELLER_START: return fetchDashboardProductBestseller(state, action)
      case actionTypes.GET_DASHBOARD_PRODUCT_BESTSELLER_SUCCESS: return fetchDashboardProductBestsellerSuccess(state, action)
      case actionTypes.GET_DASHBOARD_PRODUCT_BESTSELLER_FAIL: return fetchDashboardProductBestsellerFail(state, action)

      case actionTypes.GET_DASHBOARD_RESELLER_ACTIVE_START: return fetchDashboardResellerActive(state, action)
      case actionTypes.GET_DASHBOARD_RESELLER_ACTIVE_SUCCESS: return fetchDashboardResellerActiveSuccess(state, action)
      case actionTypes.GET_DASHBOARD_RESELLER_ACTIVE_FAIL: return fetchDashboardResellerActiveFail(state, action)
      default: return state
    }
  }
  
  export default reducer