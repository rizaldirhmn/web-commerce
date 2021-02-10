import * as actions from './actionTypes'
import axios from 'axios'
import { setAlert } from './alert'

export const fetchUserListStart = () => {
    return {
      type: actions.GET_USER_LIST_START,
    }
}
  
export const fetchUserListSuccess = (data) => {
    return {
      type: actions.GET_USER_LIST_SUCCESS,
      userList: data
    }
}
  
export const fetchUserListFail = (error) => {
    return {
      type: actions.GET_USER_LIST_FAIL,
      error: error
    }
}

export const fetchUserList = (page, keyword) =>  async dispatch => {
    dispatch(fetchUserListStart());

      const endpoint = `${process.env.REACT_APP_BASE_URL}api/admin/users/filter?keyword=${keyword}&page=${page}`

        try {
            const res = await axios({
                url: endpoint,
                method: "GET",
                headers: { 
                'Content-Type': 'application/json', 
                'Accept' : 'application/json', 
                'Authorization' : `Bearer ${sessionStorage.getItem('access_token')}`
                }
            });
            dispatch(fetchUserListSuccess(res.data))

        } catch (error) {
            dispatch(fetchUserListFail(error))
            dispatch(setAlert(error, 'error'))
            // dispatch({
            //     payload: { msg: error.response.statusText, status: error.response.status },
            //     type: STAGE_ERROR
            // })
        }
}

// Fetching User Role List
export const fetchUserRoleListStart = () => {
    return {
      type: actions.GET_USER_ROLE_LIST_START,
    }
}
  
export const fetchUserRoleListSuccess = (data) => {
    return {
      type: actions.GET_USER_ROLE_LIST_SUCCESS,
      userRoleList: data
    }
}
  
export const fetchUserRoleListFail = (error) => {
    return {
      type: actions.GET_USER_ROLE_LIST_FAIL,
      error: error
    }
}

export const fetchUserRoleList = () =>  async dispatch => {
    dispatch(fetchUserRoleListStart());
    console.log('sini')
      const endpoint = `${process.env.REACT_APP_BASE_URL}api/admin/users_role`

        try {
            const res = await axios({
                url: endpoint,
                method: "GET",
                headers: { 
                'Content-Type': 'application/json', 
                'Accept' : 'application/json', 
                'Authorization' : `Bearer ${sessionStorage.getItem('access_token')}`
                }
            });
            dispatch(fetchUserRoleListSuccess(res.data))

        } catch (error) {
            dispatch(fetchUserRoleListFail(error))
            dispatch(setAlert(error, 'error'))
            // dispatch({
            //     payload: { msg: error.response.statusText, status: error.response.status },
            //     type: STAGE_ERROR
            // })
        }
}

// Adding User
export const addUserStart = () => {
    return {
      type: actions.ADD_USER_START,
    }
}
  
export const addUserSuccess = (data) => {
    return {
      type: actions.ADD_USER_SUCCESS,
      addUSer: data
    }
}
  
export const addUserFail = (error) => {
    return {
      type: actions.ADD_USER_FAIL,
      error: error
    }
}

export const addUser = (formData, history) =>  async dispatch => {
    dispatch(addUserStart());

    const myData = {
        name: formData.name,
        number_handphone: formData.number_handphone,
        password: formData.password,
        id_user_role: formData.id_user_role
    }
      const endpoint = `${process.env.REACT_APP_BASE_URL}api/admin/users`

        try {
            const res = await axios({
                url: endpoint,
                method: "POST",
                data: myData,
                headers: { 
                'Content-Type': 'application/json', 
                'Accept' : 'application/json', 
                'Authorization' : `Bearer ${sessionStorage.getItem('access_token')}`
                }
            });
            dispatch(addUserSuccess(res.data))
            dispatch(setAlert('New User has added', 'success'))
            history.push('/users')

        } catch (error) {
            dispatch(addUserFail(error))
            dispatch(setAlert(error, 'error'))
            // dispatch({
            //     payload: { msg: error.response.statusText, status: error.response.status },
            //     type: STAGE_ERROR
            // })
        }
}

// Detail User
export const fetchDetailUserStart = () => {
  return {
    type: actions.GET_DETAIL_USER_START,
  }
}

export const fetchDetailUserSuccess = (data) => {
  return {
    type: actions.GET_DETAIL_USER_SUCCESS,
    detailUser: data
  }
}

export const fetchDetailUserFail = (error) => {
  return {
    type: actions.GET_DETAIL_USER_FAIL,
    error: error
  }
}

export const fetchDetailUser = (id, setFormState) =>  async dispatch => {
  dispatch(fetchDetailUserStart());

    const endpoint = `${process.env.REACT_APP_BASE_URL}api/admin/users/${id}`

      try {
          const res = await axios({
              url: endpoint,
              method: "GET",
              headers: { 
              'Content-Type': 'application/json', 
              'Accept' : 'application/json', 
              'Authorization' : `Bearer ${sessionStorage.getItem('access_token')}`
              }
          });
          dispatch(fetchDetailUserSuccess(res.data.user))
          const detail = res.data.user
          setFormState({
            values: {
              name: detail.name,
              number_handphone: detail.number_handphone,
              id_user_role: detail.user_role.id
            }
          })

      } catch (error) {
          dispatch(fetchDetailUserFail(error))
          dispatch(setAlert(error, 'error'))
          // dispatch({
          //     payload: { msg: error.response.statusText, status: error.response.status },
          //     type: STAGE_ERROR
          // })
      }
}

// Editing User
export const editUserStart = () => {
  return {
    type: actions.EDIT_USER_START,
  }
}

export const editUserSuccess = (data) => {
  return {
    type: actions.EDIT_USER_SUCCESS,
    editUser: data
  }
}

export const editUserFail = (error) => {
  return {
    type: actions.EDIT_USER_FAIL,
    error: error
  }
}

export const editUser = (id, formData, history) =>  async dispatch => {
  dispatch(editUserStart());

  const myData = {
      name: formData.name,
      number_handphone: formData.number_handphone,
      password: formData.password,
      id_user_role: formData.id_user_role
  }
    const endpoint = `${process.env.REACT_APP_BASE_URL}api/admin/users/${id}`

      try {
          const res = await axios({
              url: endpoint,
              method: "PATCH",
              data: myData,
              headers: { 
              'Content-Type': 'application/json', 
              'Accept' : 'application/json', 
              'Authorization' : `Bearer ${sessionStorage.getItem('access_token')}`
              }
          });
          dispatch(editUserSuccess(res.data))
          dispatch(setAlert(`User ${res.data.name} has been edited`, 'success'))
          history.push('/users')

      } catch (error) {
          dispatch(editUserFail(error))
          dispatch(setAlert(error, 'error'))
          // dispatch({
          //     payload: { msg: error.response.statusText, status: error.response.status },
          //     type: STAGE_ERROR
          // })
      }
}