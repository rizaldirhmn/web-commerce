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
      url: action.url,
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

const uploadProductImageEditStart = (state, action) => {
  return updateObject(state, {
    loadingUploadImage: true,
  })
}

const uploadProductImageEditSuccess = (state, action) => {
  const newArray = action.url
  return updateObject(state, {
    urlImage: newArray,
    loadingUploadImage: false
  })
}

const uploadProductImageEditFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loadingUploadImage: false
  })
}

const deleteImageProductStart = (state) => {
  return updateObject(state, {
    loadingUploadImage: true,
  })
}

const deleteImageProductSuccess = (state, action) => {
    const updatedArray = state.urlImage.filter((a) => +a.id !== +action.idImage)
    console.log(action)
    return updateObject(state, {
      loadingUploadImage: false,
      urlImage: updatedArray
    })
}

const deleteImageProductFail = (state, action) => {
  return updateObject(state, {
    loadingUploadImage: false,
    error: action.error
  })
}

const deleteImageProduct = (state, action) => {
  const updatedArray = state.urlImage.filter((a, index) => +index !== +action.index)
  return updateObject(state, {
    loading: false,
    urlImage: updatedArray
  })
}

const onClearImage = (state) => {
  return updateObject(state, {
    urlImage: [],
  })
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.UPLOAD_PRODUCT_IMAGE_START: return uploadProductImageStart(state, action)
    case actionTypes.UPLOAD_PRODUCT_IMAGE_SUCCESS: return uploadProductImageSuccess(state, action)
    case actionTypes.UPLOAD_PRODUCT_IMAGE_FAIL: return uploadProductImageFail(state, action)
    case actionTypes.UPLOAD_PRODUCT_IMAGE_EDIT_START: return uploadProductImageEditStart(state, action)
    case actionTypes.UPLOAD_PRODUCT_IMAGE_EDIT_SUCCESS: return uploadProductImageEditSuccess(state, action)
    case actionTypes.UPLOAD_PRODUCT_IMAGE_EDIT_FAIL: return uploadProductImageEditFail(state, action)
    case actionTypes.DELETE_IMAGE_PRODUCT: return deleteImageProduct(state, action)
    case actionTypes.EDIT_DELETE_IMAGE_PRODUCT_START: return deleteImageProductStart(state)
    case actionTypes.EDIT_DELETE_IMAGE_PRODUCT_SUCCESS: return deleteImageProductSuccess(state, action)
    case actionTypes.EDIT_DELETE_IMAGE_PRODUCT_FAIL: return deleteImageProductFail(state, action)
    case actionTypes.ON_CLEAR_UPLOAD_IMAGE: return onClearImage(state)

    default: return state
  }
}

export default reducer
