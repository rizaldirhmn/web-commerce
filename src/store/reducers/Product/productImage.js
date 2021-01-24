import * as actionTypes from '../../actions/actionTypes';
import { updateObject } from '../../../shared/utility'

const initialState = {
  error: {},
  loadingUploadImage: false,
  urlImage: [],
}

const uploadProductImageStart = (state, action) => {
  return updateObject(state, {
    loadingUploadImage: true,
  })
}

const uploadProductImageSuccess = (state, action) => {
  const newArray = [...state.urlImage, {
      url: action.image,
      type: 'image'
  }]
  return updateObject(state, {
    urlImage: newArray,
    loadingUploadImage: false
  })
}

const uploadProductImageFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loadingUploadImage: false
  })
}

const deleteImageProduct = (state, action) => {
    const updatedArray = state.urlImage.filter((a, index) => +index !== +action.index)
    return updateObject(state, {
      loadingUploadImage: false,
      urlImage: updatedArray
    })
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.UPLOAD_PRODUCT_IMAGE_START: return uploadProductImageStart(state, action)
    case actionTypes.UPLOAD_PRODUCT_IMAGE_SUCCESS: return uploadProductImageSuccess(state, action)
    case actionTypes.UPLOAD_PRODUCT_IMAGE_FAIL: return uploadProductImageFail(state, action)
    case actionTypes.DELETE_IMAGE_PRODUCT: return deleteImageProduct(state, action)

    default: return state
  }
}

export default reducer
