import * as actionTypes from '../../actions/actionTypes';
import { updateObject } from '../../../shared/utility'

const initialState = {
  error: {},
  bannerList: null,
  bannerData: null,
  bannerDetail: null,
  loadingBannerDetail: false,
  loadingBannerData: false,
  loadingBannerList: false,
}

const fetchBannerListStart = (state, action) => {
  return updateObject(state, {
    loadingBannerList: true,
  })
}

const fetchBannerListSuccess = (state, action) => {
  return updateObject(state, {
    bannerList: action.bannerList,
    loadingBannerList: false
  })
}

const fetchBannerListFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loadingBannerList: false
  })
}

// Add Banner
const addBannerStart = (state, action) => {
    return updateObject(state, {
      loadingBannerData: true,
    })
}
  
  const addBannerSuccess = (state, action) => {
    return updateObject(state, {
      bannerData: action.bannerData,
      loadingBannerData: false
    })
}
  
  const addBannerFail = (state, action) => {
    return updateObject(state, {
      error: action.error,
      loadingBannerData: false
    })
}

// Detail Banner
const fetchDetailBannerStart = (state, action) => {
    return updateObject(state, {
      loadingBannerDetail: true,
    })
}
  
  const fetchDetailBannerSuccess = (state, action) => {
    return updateObject(state, {
      bannerDetail: action.bannerDetail,
      loadingBannerDetail: false
    })
}
  
  const fetchDetailBannerFail = (state, action) => {
    return updateObject(state, {
      error: action.error,
      loadingBannerDetail: false
    })
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_BANNER_LIST_START: return fetchBannerListStart(state, action)
    case actionTypes.GET_BANNER_LIST_SUCCESS: return fetchBannerListSuccess(state, action)
    case actionTypes.GET_BANNER_LIST_FAIL: return fetchBannerListFail(state, action)

    case actionTypes.GET_DETAIL_BANNER_LIST_START: return fetchDetailBannerStart(state, action)
    case actionTypes.GET_DETAIL_BANNER_LIST_SUCCESS: return fetchDetailBannerSuccess(state, action)
    case actionTypes.GET_DETAIL_BANNER_LIST_FAIL: return fetchDetailBannerFail(state, action)

    case actionTypes.ADD_BANNER_LIST_START: return addBannerStart(state, action)
    case actionTypes.ADD_BANNER_LIST_SUCCESS: return addBannerSuccess(state, action)
    case actionTypes.ADD_BANNER_LIST_FAIL: return addBannerFail(state, action)

    case actionTypes.UPDATE_BANNER_LIST_START: return addBannerStart(state, action)
    case actionTypes.UPDATE_BANNER_LIST_SUCCESS: return addBannerSuccess(state, action)
    case actionTypes.UPDATE_BANNER_LIST_FAIL: return addBannerFail(state, action)

    case actionTypes.DELETE_BANNER_LIST_START: return addBannerStart(state, action)
    case actionTypes.DELETE_BANNER_LIST_SUCCESS: return addBannerSuccess(state, action)
    case actionTypes.DELETE_BANNER_LIST_FAIL: return addBannerFail(state, action)

    default: return state
  }
}

export default reducer
