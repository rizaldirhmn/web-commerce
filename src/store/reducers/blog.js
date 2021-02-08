import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility'

const initialState = {
  error: {},
  blogList: null,
  blogData: null,
  blogDetail: null,
  loadingBlogData: false,
  loadingBlogList: false,
  loadingBlogDetail: false,
}

const fetchBlogListStart = (state, action) => {
  return updateObject(state, {
    loadingBlogList: true,
  })
}

const fetchBlogListSuccess = (state, action) => {
  return updateObject(state, {
    blogList: action.blogList,
    loadingBlogList: false
  })
}

const fetchBlogListFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loadingBlogList: false
  })
}

// Add Blog
const addBlogListStart = (state, action) => {
  return updateObject(state, {
    loadingBlogData: true,
  })
}

const addBlogListSuccess = (state, action) => {
  return updateObject(state, {
    blogdata: action.blogdata,
    loadingBlogData: false
  })
}

const addBlogListFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loadingBlogData: false
  })
}

// Delete Blog
const deleteBlogListStart = (state, action) => {
  return updateObject(state, {
    loadingBlogData: true,
  })
}

const deleteBlogListSuccess = (state, action) => {
  return updateObject(state, {
    blogdata: action.blogdata,
    loadingBlogData: false
  })
}

const deleteBlogListFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loadingBlogData: false
  })
}

// Detail Blog
const fetchDetailBlogStart = (state, action) => {
    return updateObject(state, {
      loadingBlogDetail: true,
    })
  }
  
  const fetchDetailBlogSuccess = (state, action) => {
    return updateObject(state, {
      blogDetail: action.blogDetail,
      loadingBlogDetail: false
    })
  }
  
  const fetchDetailBlogFail = (state, action) => {
    return updateObject(state, {
      error: action.error,
      loadingBlogDetail: false
    })
  }

// Update Blog
const editBlogListStart = (state, action) => {
  return updateObject(state, {
    loadingBlogData: true,
  })
}

const editBlogListSuccess = (state, action) => {
  return updateObject(state, {
    blogdata: action.blogdata,
    loadingBlogData: false
  })
}

const editBlogListFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loadingBlogData: false
  })
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_BLOG_LIST_START: return fetchBlogListStart(state, action)
    case actionTypes.GET_BLOG_LIST_SUCCESS: return fetchBlogListSuccess(state, action)
    case actionTypes.GET_BLOG_LIST_FAIL: return fetchBlogListFail(state, action)

    case actionTypes.GET_DETAIL_BLOG_LIST_START: return fetchDetailBlogStart(state, action)
    case actionTypes.GET_DETAIL_BLOG_LIST_SUCCESS: return fetchDetailBlogSuccess(state, action)
    case actionTypes.GET_DETAIL_BLOG_LIST_FAIL: return fetchDetailBlogFail(state, action)

    case actionTypes.ADD_BLOG_LIST_START: return addBlogListStart(state, action)
    case actionTypes.ADD_BLOG_LIST_SUCCESS: return addBlogListSuccess(state, action)
    case actionTypes.ADD_BLOG_LIST_FAIL: return addBlogListFail(state, action)

    case actionTypes.UPDATE_BLOG_LIST_START: return editBlogListStart(state, action)
    case actionTypes.UPDATE_BLOG_LIST_SUCCESS: return editBlogListSuccess(state, action)
    case actionTypes.UPDATE_BLOG_LIST_FAIL: return editBlogListFail(state, action)

    case actionTypes.DELETE_BLOG_LIST_START: return deleteBlogListStart(state, action)
    case actionTypes.DELETE_BLOG_LIST_SUCCESS: return deleteBlogListSuccess(state, action)
    case actionTypes.DELETE_BLOG_LIST_FAIL: return deleteBlogListFail(state, action)

    default: return state
  }
}

export default reducer
