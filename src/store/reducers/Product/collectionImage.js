import * as actionTypes from '../../actions/actionTypes';
import { updateObject } from '../../../shared/utility'

const initialState = {
  error: {},
  loadingUploadImage: false,
  urlImage: null,
}

const uploadProductCollectionImageStart = (state, action) => {
  return updateObject(state, {
    loadingUploadImage: true,
  })
}

const uploadProductCollectionImageSuccess = (state, action) => {
  const newArray = {
    url: action.url,
  }
  return updateObject(state, {
    urlImage: newArray,
    loadingUploadImage: false
  })
}

const uploadProductCollectionImageFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loadingUploadImage: false
  })
}

const editUploadProductCollectionStart = (state, action) => {
  return updateObject(state, {
    loadingUploadImage: true,
  })
}

const editUploadProductCollectionSuccess = (state, action) => {
  const newArray = {
    url: action.url,
  }
  return updateObject(state, {
    urlImage: newArray,
    loadingUploadImage: false
  })
}

const editUploadProductCollectionFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loadingUploadImage: false
  })
}

const deleteImageCollection = (state) => {
  const updatedArray = null
  return updateObject(state, {
    loading: false,
    urlImage: updatedArray
  })
}

const onClearImage = (state) => {
  return updateObject(state, {
    urlImage: null,
  })
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.UPLOAD_PRODUCT_COLLECTION_IMAGE_START: return uploadProductCollectionImageStart(state, action)
    case actionTypes.UPLOAD_PRODUCT_COLLECTION_IMAGE_SUCCESS: return uploadProductCollectionImageSuccess(state, action)
    case actionTypes.UPLOAD_PRODUCT_COLLECTION_IMAGE_FAIL: return uploadProductCollectionImageFail(state, action)
    case actionTypes.UPLOAD_PRODUCT_COLLECTION_IMAGE_EDIT_START: return editUploadProductCollectionStart(state, action)
    case actionTypes.UPLOAD_PRODUCT_COLLECTION_IMAGE_EDIT_SUCCESS: return editUploadProductCollectionSuccess(state, action)
    case actionTypes.UPLOAD_PRODUCT_COLLECTION_IMAGE_EDIT_FAIL: return editUploadProductCollectionFail(state, action)
    case actionTypes.ON_CLEAR_UPLOAD_IMAGE: return onClearImage(state)
    case actionTypes.DELETE_IMAGE_PRODUCT_COLLECTION: return deleteImageCollection(state)

    default: return state
  }
}

export default reducer
