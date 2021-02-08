import * as actionTypes from '../../actions/actionTypes';
import { updateObject } from '../../../shared/utility'

const initialState = {
  error: {},
  loadingProductList: false,
  loadingDeleteProduct: false,
  productList: [],
  productData: null,
  loadingAddProduct: false,
}

// Upload Awal
const uploadProductCollectionListStart = (state, action) => {
  return updateObject(state, {
    loadingProductList: true,
  })
}

const uploadProductCollectionListSuccess = (state, action) => {
  const newArray = [...state.productList, {
      id_product: action.id_product,
      name: action.name,
      image: {
        url: action.image
      }
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

// End

// Upload Edit

const uploadProductCollectionListEditStart = (state, action) => {
  return updateObject(state, {
    loadingProductList: true,
  })
}

const uploadProductCollectionListEditSuccess = (state, action) => {
  const newArray = action.data
  return updateObject(state, {
    productList: newArray,
    loadingProductList: false
  })
}

const uploadProductCollectionListEditFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loadingProductList: false
  })
}
// END

const deleteProductCollectionList = (state, action) => {
    const updatedArray = state.productList.filter((a, index) => +index !== +action.index)
    return updateObject(state, {
      loadingProductList: false,
      productList: updatedArray
    })
}

const deleteProductCollectionEditStart = (state) => {
  return updateObject(state, {
    loadingDeleteProduct: true,
  })
}

const deleteProductCollectionEditSuccess = (state, action) => {
    const updatedArray = state.productList.filter((a) => +a.id_product_new !== +action.id_product_new)
    return updateObject(state, {
      loadingDeleteProduct: false,
      productList: updatedArray
    })
}

const deleteProductCollectionEditFail = (state, action) => {
  return updateObject(state, {
    loadingDeleteProduct: false,
    error: action.error
  })
}

const onClearProductList = (state) => {
  return updateObject(state, {
    productList: [],
  })
}

// Update Product Collection
const addProductCollectionEditStart = (state, action) => {
  return updateObject(state, {
    loadingAddProduct: true,
  })
}

const addProductCollectionEdit = (state, action) => {
  return updateObject(state, {
    productData: action.productData,
    loadingAddProduct: false
  })
}

const addProductCollectionEditFail = (state, action) => {
    return updateObject(state, {
      error: action.error,
      loadingAddProduct: false
    })
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
      case actionTypes.UPLOAD_PRODUCT_COLLECTION_LIST_START: return uploadProductCollectionListStart(state, action)
      case actionTypes.UPLOAD_PRODUCT_COLLECTION_LIST_SUCCESS: return uploadProductCollectionListSuccess(state, action)
      case actionTypes.UPLOAD_PRODUCT_COLLECTION_LIST_FAIL: return uploadProductCollectionListFail(state, action)
      case actionTypes.UPLOAD_PRODUCT_COLLECTION_LIST_EDIT_START: return uploadProductCollectionListEditStart(state, action)
      case actionTypes.UPLOAD_PRODUCT_COLLECTION_LIST_EDIT_SUCCESS: return uploadProductCollectionListEditSuccess(state, action)
      case actionTypes.UPLOAD_PRODUCT_COLLECTION_LIST_EDIT_FAIL: return uploadProductCollectionListEditFail(state, action)
      case actionTypes.DELETE_PRODUCT_COLLECTION_LIST: return deleteProductCollectionList(state, action)
      case actionTypes.DELETE_EDIT_PRODUCT_COLLECTION_LIST_START: return deleteProductCollectionEditStart(state, action)
      case actionTypes.DELETE_EDIT_PRODUCT_COLLECTION_LIST_SUCCESS: return deleteProductCollectionEditSuccess(state, action)
      case actionTypes.DELETE_EDIT_PRODUCT_COLLECTION_LIST_FAIL: return deleteProductCollectionEditFail(state, action)
      case actionTypes.ON_CLEAR_UPLOAD_PRODUCT_COLLECTION_LIST: return onClearProductList(state)
      case actionTypes.UPDATE_PRODUCT_COLLECTION_START: return addProductCollectionEditStart(state)
      case actionTypes.UPDATE_PRODUCT_COLLECTION_SUCCESS: return addProductCollectionEdit(state, action)
      case actionTypes.UPDATE_PRODUCT_COLLECTION_FAIL: return addProductCollectionEditFail(state, action)
  
      default: return state
    }
}

export default reducer