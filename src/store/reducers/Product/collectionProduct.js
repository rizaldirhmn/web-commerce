import * as actionTypes from '../../actions/actionTypes';
import { updateObject } from '../../../shared/utility'

const initialState = {
  error: {},
  loadingProductList: false,
  productList: [],
}

const uploadProductCollectionListStart = (state, action) => {
  return updateObject(state, {
    loadingProductList: true,
  })
}

const uploadProductCollectionListSuccess = (state, action) => {
  const newArray = [...state.productList, {
      id_product: action.id_product,
      name: action.name,
      image: action.image
  }]
  return updateObject(state, {
    productList: newArray,
    loadingProductList: false
  })
}

const uploadProductCollectionListFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loadingProductList: false
  })
}

const deleteProductCollectionList = (state, action) => {
    const updatedArray = state.productList.filter((a, index) => +index !== +action.index)
    return updateObject(state, {
      loadingProductList: false,
      productList: updatedArray
    })
  }

const reducer = (state = initialState, action) => {
    switch (action.type) {
      case actionTypes.UPLOAD_PRODUCT_COLLECTION_LIST_START: return uploadProductCollectionListStart(state, action)
      case actionTypes.UPLOAD_PRODUCT_COLLECTION_LIST_SUCCESS: return uploadProductCollectionListSuccess(state, action)
      case actionTypes.UPLOAD_PRODUCT_COLLECTION_LIST_FAIL: return uploadProductCollectionListFail(state, action)
      case actionTypes.DELETE_PRODUCT_COLLECTION_LIST: return deleteProductCollectionList(state, action)
  
      default: return state
    }
}

export default reducer