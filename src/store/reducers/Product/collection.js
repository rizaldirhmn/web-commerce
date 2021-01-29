import * as actionTypes from '../../actions/actionTypes';
import { updateObject } from '../../../shared/utility'

const initialState = {
  error: {},
  collectionList: null,
  collectionData: null,
  loadingAddCollection: false,
  loadingFetchCollection: false,
}

const fetchProductCollectionStart = (state, action) => {
  return updateObject(state, {
    loadingFetchCollection: true,
  })
}

const fetchProductCollection = (state, action) => {
  return updateObject(state, {
    collectionList: action.collectionList,
    loadingFetchCollection: false
  })
}

const fetchProductCollectionFail = (state, action) => {
    return updateObject(state, {
      error: action.error,
      loadingFetchCollection: false
    })
}

const addProductCollectionStart = (state, action) => {
  return updateObject(state, {
    loadingAddCollection: true,
  })
}

const addProductCollection = (state, action) => {
  return updateObject(state, {
    collectionData: action.collectionData,
    loadingAddCollection: false
  })
}

const addProductCollectionFail = (state, action) => {
    return updateObject(state, {
      error: action.error,
      loadingAddCollection: false
    })
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_PRODUCT_COLLECTION_START: return fetchProductCollectionStart(state, action)
    case actionTypes.GET_PRODUCT_COLLECTION: return fetchProductCollection(state, action)
    case actionTypes.GET_PRODUCT_COLLECTION_FAIL: return fetchProductCollectionFail(state, action)
    case actionTypes.ADD_PRODUCT_COLLECTION_START: return addProductCollectionStart(state, action)
    case actionTypes.ADD_PRODUCT_COLLECTION_SUCCESS: return addProductCollection(state, action)
    case actionTypes.ADD_PRODUCT_COLLECTION_FAIL: return addProductCollectionFail(state, action)
    default: return state
  }
}

export default reducer
