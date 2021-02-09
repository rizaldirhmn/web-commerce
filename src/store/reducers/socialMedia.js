import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility'

const initialState = {
  error: {},
  loadingSocialMediaList: false,
  loadingUploadImage: false,
  loadingAddSocialMedia: false,
  loadingDetailSocialMedia: false,
  detailSocialMedia: null,
  addSocialMedia: null,
  urlImage: null,
  socialMedia: null,
}

const fetchSocialMediaListStart = (state, action) => {
  return updateObject(state, {
    loadingSocialMediaList: true,
  })
}

const fetchSocialMediaListSuccess = (state, action) => {
  return updateObject(state, {
    socialMedia: action.socialMedia,
    loadingSocialMediaList: false
  })
}

const fetchSocialMediaListFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loadingSocialMediaList: false
  })
}

// Detail Social Media
const fetchSocialMediaDetailStart = (state, action) => {
    return updateObject(state, {
      loadingDetailSocialMedia: true,
    })
}
  
const fetchSocialMediaDetailSuccess = (state, action) => {
    return updateObject(state, {
      detailSocialMedia: action.detailSocialMedia,
      loadingDetailSocialMedia: false
    })
}
  
const fetchSocialMediaDetailFail = (state, action) => {
    return updateObject(state, {
      error: action.error,
      loadingDetailSocialMedia: false
    })
}

// Add Social Media
const addSocialMediaStart = (state, action) => {
  return updateObject(state, {
    loadingAddSocialMedia: true,
  })
}

const addSocialMediaSuccess = (state, action) => {
  return updateObject(state, {
    addSocialMedia: action.addSocialMedia,
    loadingAddSocialMedia: false
  })
}

const addSocialMediaFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loadingAddSocialMedia: false
  })
}

// Edit Social Media
const editSocialMediaStart = (state, action) => {
  return updateObject(state, {
    loadingAddSocialMedia: true,
  })
}

const editSocialMediaSuccess = (state, action) => {
  return updateObject(state, {
    addSocialMedia: action.addSocialMedia,
    loadingAddSocialMedia: false
  })
}

const editSocialMediaFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loadingAddSocialMedia: false
  })
}

// Upload Image Sosial media
const uploadSocialMediaImageStart = (state, action) => {
  return updateObject(state, {
    loadingUploadImage: true,
  })
}

const uploadSocialMediaImageSuccess = (state, action) => {
  const newArray = {
      url: action.url,
  }
  return updateObject(state, {
    urlImage: newArray,
    loadingUploadImage: false
  })
}

const uploadSocialMediaImageFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loadingUploadImage: false
  })
}

// Upload Image Edit Social media
const uploadSocialMediaImageEditStart = (state, action) => {
  return updateObject(state, {
    loadingUploadImage: true,
  })
}

const uploadSocialMediaImageEditSuccess = (state, action) => {
  const newArray = {
    url: action.url,
  }
  return updateObject(state, {
    urlImage: newArray,
    loadingUploadImage: false
  })
}

const uploadSocialMediaImageEditFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loadingUploadImage: false
  })
}

// Delete Image Social Media
const deleteImageSocialMedia = (state) => {
  const updatedArray = null
  return updateObject(state, {
    loadingUploadImage: false,
    urlImage: updatedArray
  })
}

const onClearImage = (state) => {
  return updateObject(state, {
    urlImage: null,
  })
}

// Delete Social media
const deleteSocialMediaStart = (state, action) => {
    return updateObject(state, {
      loadingAddSocialMedia: true,
    })
  }
  
  const deleteSocialMediaSuccess = (state, action) => {
    return updateObject(state, {
      addSocialMedia: action.addSocialMedia,
      loadingAddSocialMedia: false
    })
  }
  
  const deleteSocialMediaFail = (state, action) => {
    return updateObject(state, {
      error: action.error,
      loadingAddSocialMedia: false
    })
  }

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_SOCIAL_MEDIA_LIST_START: return fetchSocialMediaListStart(state, action)
    case actionTypes.GET_SOCIAL_MEDIA_LIST_SUCCESS: return fetchSocialMediaListSuccess(state, action)
    case actionTypes.GET_SOCIAL_MEDIA_LIST_FAIL: return fetchSocialMediaListFail(state, action)

    case actionTypes.GET_DETAIL_SOCIAL_MEDIA_START: return fetchSocialMediaDetailStart(state, action)
    case actionTypes.GET_DETAIL_SOCIAL_MEDIA_SUCCESS: return fetchSocialMediaDetailSuccess(state, action)
    case actionTypes.GET_DETAIL_SOCIAL_MEDIA_FAIL: return fetchSocialMediaDetailFail(state, action)

    case actionTypes.ADD_SOCIAL_MEDIA_START: return addSocialMediaStart(state, action)
    case actionTypes.ADD_SOCIAL_MEDIA_SUCCESS: return addSocialMediaSuccess(state, action)
    case actionTypes.ADD_SOCIAL_MEDIA_FAIL: return addSocialMediaFail(state, action)

    case actionTypes.EDIT_SOCIAL_MEDIA_START: return editSocialMediaStart(state, action)
    case actionTypes.EDIT_SOCIAL_MEDIA_SUCCESS: return editSocialMediaSuccess(state, action)
    case actionTypes.EDIT_SOCIAL_MEDIA_FAIL: return editSocialMediaFail(state, action)

    case actionTypes.UPLOAD_SOCIAL_MEDIA_IMAGE_START: return uploadSocialMediaImageStart(state, action)
    case actionTypes.UPLOAD_SOCIAL_MEDIA_IMAGE_SUCCESS: return uploadSocialMediaImageSuccess(state, action)
    case actionTypes.UPLOAD_SOCIAL_MEDIA_IMAGE_FAIL: return uploadSocialMediaImageFail(state, action)

    case actionTypes.UPLOAD_SOCIAL_MEDIA_IMAGE_EDIT_START: return uploadSocialMediaImageEditStart(state, action)
    case actionTypes.UPLOAD_SOCIAL_MEDIA_IMAGE_EDIT_SUCCESS: return uploadSocialMediaImageEditSuccess(state, action)
    case actionTypes.UPLOAD_SOCIAL_MEDIA_IMAGE_EDIT_FAIL: return uploadSocialMediaImageEditFail(state, action)

    case actionTypes.DELETE_SOCIAL_MEDIA_START: return deleteSocialMediaStart(state, action)
    case actionTypes.DELETE_SOCIAL_MEDIA_SUCCESS: return deleteSocialMediaSuccess(state, action)
    case actionTypes.DELETE_SOCIAL_MEDIA_FAIL: return deleteSocialMediaFail(state, action)

    case actionTypes.DELETE_IMAGE_SOCIAL_MEDIA: return deleteImageSocialMedia(state, action)
    case actionTypes.ON_CLEAR_UPLOAD_SOCIAL_MEDIA_IMAGE: return onClearImage(state, action)

    default: return state
  }
}

export default reducer
