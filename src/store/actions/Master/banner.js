import * as actions from '../actionTypes'
import axios from 'axios'
import { setAlert } from '../alert'

export const fetchBannerListStart = () => {
    return {
      type: actions.GET_BANNER_LIST_START,
    }
}
  
export const fetchBannerListSuccess = (data) => {
    return {
      type: actions.GET_BANNER_LIST_SUCCESS,
      bannerList: data
    }
}
  
export const fetchBannerListFail = (error) => {
    return {
      type: actions.GET_BANNER_LIST_FAIL,
      error: error
    }
}

export const fetchBannerList = (kata_kunci, page) =>  async dispatch => {
    dispatch(fetchBannerListStart());

      const endpoint = `${process.env.REACT_APP_BASE_URL}api/admin/banner/paginate?kata_kunci=${kata_kunci}&page=${page}`

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
            dispatch(fetchBannerListSuccess(res.data))

        } catch (error) {
            dispatch(fetchBannerListFail(error))
            dispatch(setAlert(error, 'error'))
            // dispatch({
            //     payload: { msg: error.response.statusText, status: error.response.status },
            //     type: STAGE_ERROR
            // })
        }
}

// Add Banner

export const addBannerStart = () => {
    return {
      type: actions.ADD_BANNER_LIST_START,
    }
}
  
export const addBannerSuccess = (data) => {
    return {
      type: actions.ADD_BANNER_LIST_SUCCESS,
      bannerData: data
    }
}
  
export const addBannerFail = (error) => {
    return {
      type: actions.ADD_BANNER_LIST_FAIL,
      error: error
    }
}

export const addBanner = (formData, image, history) =>  async dispatch => {
    dispatch(addBannerStart());

    const myData = {
        name: formData.name,
        description: formData.description,
        type: formData.type,
        collection: formData.collection,
        image: image.split(',')[1]
    }

      const endpoint = `${process.env.REACT_APP_BASE_URL}api/admin/banner`

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
            dispatch(addBannerSuccess(res.data))
            dispatch(setAlert('New banner added', 'success'))
            history.push('/banner')

        } catch (error) {
            dispatch(addBannerFail(error))
            dispatch(setAlert(error, 'error'))
            // dispatch({
            //     payload: { msg: error.response.statusText, status: error.response.status },
            //     type: STAGE_ERROR
            // })
        }
}

// Get Detail

export const fetchDetailBannerStart = () => {
    return {
      type: actions.GET_DETAIL_BANNER_LIST_START,
    }
}
  
export const fetchDetailBannerSuccess = (data) => {
    return {
      type: actions.GET_DETAIL_BANNER_LIST_SUCCESS,
      bannerDetail: data
    }
}
  
export const fetchDetailBannerFail = (error) => {
    return {
      type: actions.GET_DETAIL_BANNER_LIST_FAIL,
      error: error
    }
}

export const fetchDetailBanner = (id, setFormState, setImage) =>  async dispatch => {
    dispatch(fetchDetailBannerStart());
    const endpoint = `${process.env.REACT_APP_BASE_URL}api/admin/banner/${id}`

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
        dispatch(fetchDetailBannerSuccess(res.data))
        setFormState({
            values: {
                name: res.data.banner.name,
                description: res.data.banner.description,
                collection: res.data.banner.collection_banner.id,
                type: res.data.banner.type
            }
        })
        setImage(res.data.banner.image)

    } catch (error) {
        dispatch(fetchDetailBannerFail(error))
        dispatch(setAlert(error, 'error'))
        // dispatch({
        //     payload: { msg: error.response.statusText, status: error.response.status },
        //     type: STAGE_ERROR
        // })
    }
}

// Edit Banner

export const editBannerStart = () => {
    return {
      type: actions.UPDATE_BANNER_LIST_START,
    }
}
  
export const editBannerSuccess = (data) => {
    return {
      type: actions.UPDATE_BANNER_LIST_SUCCESS,
      bannerData: data
    }
}
  
export const editBannerFail = (error) => {
    return {
      type: actions.UPDATE_BANNER_LIST_FAIL,
      error: error
    }
}

export const editBanner = (id, formData, image, history) =>  async dispatch => {
    dispatch(editBannerStart());

    const myData = {
        name: formData.name,
        description: formData.description,
        type: formData.type,
        collection: formData.collection,
        image: image.split(',')[1]
    }

      const endpoint = `${process.env.REACT_APP_BASE_URL}api/admin/banner/${id}`

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
            dispatch(editBannerSuccess(res.data))
            dispatch(setAlert('Banner has edited', 'success'))
            history.push('/banner')

        } catch (error) {
            dispatch(editBannerFail(error))
            dispatch(setAlert(error, 'error'))
            // dispatch({
            //     payload: { msg: error.response.statusText, status: error.response.status },
            //     type: STAGE_ERROR
            // })
        }
}

// Delete Banner

export const deleteBannerStart = () => {
    return {
      type: actions.DELETE_BANNER_LIST_START,
    }
}
  
export const deleteBannerSuccess = (data) => {
    return {
      type: actions.DELETE_BANNER_LIST_SUCCESS,
      bannerData: data
    }
}
  
export const deleteBannerFail = (error) => {
    return {
      type: actions.DELETE_BANNER_LIST_FAIL,
      error: error
    }
}

export const deleteBanner = (id) =>  async dispatch => {
    dispatch(deleteBannerStart());

      const endpoint = `${process.env.REACT_APP_BASE_URL}api/admin/banner/${id}`

        try {
            const res = await axios({
                url: endpoint,
                method: "DELETE",
                headers: { 
                'Content-Type': 'application/json', 
                'Accept' : 'application/json', 
                'Authorization' : `Bearer ${sessionStorage.getItem('access_token')}`
                }
            });
            dispatch(deleteBannerSuccess(res.data))
            dispatch(setAlert('Banner has deleted', 'success'))
            dispatch(fetchBannerList('', 1))

        } catch (error) {
            dispatch(deleteBannerFail(error))
            dispatch(setAlert(error, 'error'))
            // dispatch({
            //     payload: { msg: error.response.statusText, status: error.response.status },
            //     type: STAGE_ERROR
            // })
        }
}