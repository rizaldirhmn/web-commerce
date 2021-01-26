import * as actionTypes from '../../actions/actionTypes';
import { updateObject } from '../../../shared/utility'

const initialState = {
  error: {},
  loadingUploadImage: false,
  urlImage: null,
}

const uploadCategoryImageStart = (state, action) => {
  return updateObject(state, {
    loadingUploadImage: true,
  })
}

const uploadCategoryImageSuccess = (state, action) => {
  const newArray = {
      url: action.url,
  }
  return updateObject(state, {
    urlImage: newArray,
    loadingUploadImage: false
  })
}

const uploadCategoryImageFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loadingUploadImage: false
  })
}

const uploadCategoryImageEditStart = (state, action) => {
  return updateObject(state, {
    loadingUploadImage: true,
  })
}

const uploadCategoryImageEditSuccess = (state, action) => {
  const newArray = {
    url: action.url,
  }
  return updateObject(state, {
    urlImage: newArray,
    loadingUploadImage: false
  })
}

const uploadCategoryImageEditFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loadingUploadImage: false
  })
}

const deleteImageCategory = (state) => {
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
    case actionTypes.UPLOAD_CATEGORY_IMAGE_START: return uploadCategoryImageStart(state, action)
    case actionTypes.UPLOAD_CATEGORY_IMAGE_SUCCESS: return uploadCategoryImageSuccess(state, action)
    case actionTypes.UPLOAD_CATEGORY_IMAGE_FAIL: return uploadCategoryImageFail(state, action)
    case actionTypes.UPLOAD_CATEGORY_IMAGE_EDIT_START: return uploadCategoryImageEditStart(state, action)
    case actionTypes.UPLOAD_CATEGORY_IMAGE_EDIT_SUCCESS: return uploadCategoryImageEditSuccess(state, action)
    case actionTypes.UPLOAD_CATEGORY_IMAGE_EDIT_FAIL: return uploadCategoryImageEditFail(state, action)
    case actionTypes.DELETE_IMAGE_CATEGORY: return deleteImageCategory(state)
    case actionTypes.ON_CLEAR_UPLOAD_CATEGORY_IMAGE: return onClearImage(state)

    default: return state
  }
}

export default reducer
