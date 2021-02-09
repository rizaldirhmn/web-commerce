import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility'

const initialState = {
    error: {},
    totalUser: null,
    totalTransaction: null,
    grafikIncome: null,
    productBestseller: null,
    resellerActive: null,
    popularProduct: null,
    interestedProduct: null,
    grafikTransactionMonthly: null,
    loadingGrafikTransactionMonthly: false,
    loadingInterestedProduct: false,
    loadingPopularProduct: false,
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

// Fetching dashboard Popular Product
const fetchDashboardPopularProduct = (state) => {
    return updateObject(state, {
      loadingPopularProduct: true,
    })
}
  
const fetchDashboardPopularProductSuccess = (state, action) => {
    return updateObject(state, {
        popularProduct: action.popularProduct,
        loadingPopularProduct: false
    })
}
  
const fetchDashboardPopularProductFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loadingPopularProduct: false
    })
}

// Fetching dashboard Interested Product
const fetchDashboardInterestedProduct = (state) => {
    return updateObject(state, {
      loadingInterestedProduct: true,
    })
}
  
const fetchDashboardInterestedProductSuccess = (state, action) => {
    return updateObject(state, {
        interestedProduct: action.interestedProduct,
        loadingInterestedProduct: false
    })
}
  
const fetchDashboardInterestedProductFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loadingInterestedProduct: false
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

// Fetching dashboard Grafik Transaction
const fetchDashboardTransactionMonthly = (state) => {
    return updateObject(state, {
      loadingGrafikTransactionMonthly: true,
    })
}
  
const fetchDashboardTransactionMonthlySuccess = (state, action) => {
    return updateObject(state, {
        grafikTransactionMonthly: action.grafikTransactionMonthly,
        loadingGrafikTransactionMonthly: false
    })
}
  
const fetchDashboardTransactionMonthlyFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loadingGrafikTransactionMonthly: false
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

      case actionTypes.GET_DASHBOARD_GRAFIK_TRANSACTION_MONTHLY_START: return fetchDashboardTransactionMonthly(state, action)
      case actionTypes.GET_DASHBOARD_GRAFIK_TRANSACTION_MONTHLY_SUCCESS: return fetchDashboardTransactionMonthlySuccess(state, action)
      case actionTypes.GET_DASHBOARD_GRAFIK_TRANSACTION_MONTHLY_FAIL: return fetchDashboardTransactionMonthlyFail(state, action)

      case actionTypes.GET_DASHBOARD_PRODUCT_BESTSELLER_START: return fetchDashboardProductBestseller(state, action)
      case actionTypes.GET_DASHBOARD_PRODUCT_BESTSELLER_SUCCESS: return fetchDashboardProductBestsellerSuccess(state, action)
      case actionTypes.GET_DASHBOARD_PRODUCT_BESTSELLER_FAIL: return fetchDashboardProductBestsellerFail(state, action)

      case actionTypes.GET_DASHBOARD_POPULAR_PRODUCT_START: return fetchDashboardPopularProduct(state, action)
      case actionTypes.GET_DASHBOARD_POPULAR_PRODUCT_SUCCESS: return fetchDashboardPopularProductSuccess(state, action)
      case actionTypes.GET_DASHBOARD_POPULAR_PRODUCT_FAIL: return fetchDashboardPopularProductFail(state, action)

      case actionTypes.GET_DASHBOARD_INTERESTED_PRODUCT_START: return fetchDashboardInterestedProduct(state, action)
      case actionTypes.GET_DASHBOARD_INTERESTED_PRODUCT_SUCCESS: return fetchDashboardInterestedProductSuccess(state, action)
      case actionTypes.GET_DASHBOARD_INTERESTED_PRODUCT_FAIL: return fetchDashboardInterestedProductFail(state, action)

      case actionTypes.GET_DASHBOARD_RESELLER_ACTIVE_START: return fetchDashboardResellerActive(state, action)
      case actionTypes.GET_DASHBOARD_RESELLER_ACTIVE_SUCCESS: return fetchDashboardResellerActiveSuccess(state, action)
      case actionTypes.GET_DASHBOARD_RESELLER_ACTIVE_FAIL: return fetchDashboardResellerActiveFail(state, action)
      default: return state
    }
  }
  
  export default reducer