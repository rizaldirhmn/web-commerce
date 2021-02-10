import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility'

const initialState = {
  error: {},
  loadingUserList: false,
  loadingUserRoleList: false,
  loadingAddUser: false,
  loadingDetailUser: false,
  loadingEditUser: false,
  editUser: null,
  detailUser: null,
  addUser: null,
  userRoleList: null,
  userList: null,
}

// Fetching User list
const fetchUserListStart = (state, action) => {
  return updateObject(state, {
    loadingUserList: true,
  })
}

const fetchUserListSuccess = (state, action) => {
  return updateObject(state, {
    userList: action.userList,
    loadingUserList: false
  })
}

const fetchUserListFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loadingUserList: false
  })
}

// Fetching User Role list
const fetchUserRoleListStart = (state, action) => {
  return updateObject(state, {
    loadingUserRoleList: true,
  })
}

const fetchUserRoleListSuccess = (state, action) => {
  return updateObject(state, {
    userRoleList: action.userRoleList,
    loadingUserRoleList: false
  })
}

const fetchUserRoleListFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loadingUserRoleList: false
  })
}

// Adding User Role list
const addUserStart = (state, action) => {
    return updateObject(state, {
      loadingAddUser: true,
    })
}
  
const addUserSuccess = (state, action) => {
    return updateObject(state, {
      addUser: action.addUser,
      loadingAddUser: false
    })
}
  
const addUserFail = (state, action) => {
    return updateObject(state, {
      error: action.error,
      loadingAddUser: false
    })
}

// Fetching User Role Detail
const fetchUserDetailStart = (state, action) => {
  return updateObject(state, {
    loadingDetailUser: true,
  })
}

const fetchUserDetailSuccess = (state, action) => {
  return updateObject(state, {
    detailUser: action.detailUser,
    loadingDetailUser: false
  })
}

const fetchUserDetailFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loadingDetailUser: false
  })
}

// Editing User Role list
const editUserStart = (state, action) => {
  return updateObject(state, {
    loadingEditUser: true,
  })
}

const editUserSuccess = (state, action) => {
  return updateObject(state, {
    editUser: action.editUser,
    loadingEditUser: false
  })
}

const editUserFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loadingEditUser: false
  })
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_USER_LIST_START: return fetchUserListStart(state, action)
    case actionTypes.GET_USER_LIST_SUCCESS: return fetchUserListSuccess(state, action)
    case actionTypes.GET_USER_LIST_FAIL: return fetchUserListFail(state, action)

    case actionTypes.GET_DETAIL_USER_START: return fetchUserDetailStart(state, action)
    case actionTypes.GET_DETAIL_USER_SUCCESS: return fetchUserDetailSuccess(state, action)
    case actionTypes.GET_DETAIL_USER_FAIL: return fetchUserDetailFail(state, action)

    case actionTypes.ADD_USER_START: return addUserStart(state, action)
    case actionTypes.ADD_USER_SUCCESS: return addUserSuccess(state, action)
    case actionTypes.ADD_USER_FAIL: return addUserFail(state, action)

    case actionTypes.EDIT_USER_START: return editUserStart(state, action)
    case actionTypes.EDIT_USER_SUCCESS: return editUserSuccess(state, action)
    case actionTypes.EDIT_USER_FAIL: return editUserFail(state, action)

    case actionTypes.GET_USER_ROLE_LIST_START: return fetchUserRoleListStart(state, action)
    case actionTypes.GET_USER_ROLE_LIST_SUCCESS: return fetchUserRoleListSuccess(state, action)
    case actionTypes.GET_USER_ROLE_LIST_FAIL: return fetchUserRoleListFail(state, action)

    default: return state
  }
}

export default reducer
