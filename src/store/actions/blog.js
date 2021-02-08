import * as actions from './actionTypes'
import axios from 'axios'
import { setAlert } from './alert'

// Fetching Blog
export const fetchBlogListStart = () => {
    return {
      type: actions.GET_BLOG_LIST_START,
    }
}
  
export const fetchBlogListSuccess = (data) => {
    return {
      type: actions.GET_BLOG_LIST_SUCCESS,
      blogList: data
    }
}
  
export const fetchBlogListFail = (error) => {
    return {
      type: actions.GET_BLOG_LIST_FAIL,
      error: error
    }
}

export const fetchBlogList = (kata_kunci, page) =>  async dispatch => {
    dispatch(fetchBlogListStart());

      const endpoint = `${process.env.REACT_APP_BASE_URL}api/admin/blog/paginate?kata_kunci=${kata_kunci}&page=${page}`

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
            dispatch(fetchBlogListSuccess(res.data))

        } catch (error) {
            dispatch(fetchBlogListFail(error))
            dispatch(setAlert(error, 'error'))
            // dispatch({
            //     payload: { msg: error.response.statusText, status: error.response.status },
            //     type: STAGE_ERROR
            // })
        }
}


// Fetching Blog
export const addBlogListStart = () => {
    return {
      type: actions.ADD_BLOG_LIST_START,
    }
}
  
export const addBlogListSuccess = (data) => {
    return {
      type: actions.ADD_BLOG_LIST_SUCCESS,
      blogData: data
    }
}
  
export const addBlogListFail = (error) => {
    return {
      type: actions.ADD_BLOG_LIST_FAIL,
      error: error
    }
}

export const addBlogList = (formData, image, history) =>  async dispatch => {
    dispatch(addBlogListStart());
    const myData = {
        title: formData.title,
        description: formData.description,
        image: image.split(',')[1]
    }

      const endpoint = `${process.env.REACT_APP_BASE_URL}api/admin/blog`

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
            dispatch(addBlogListSuccess(res.data))
            dispatch(setAlert('New Blog has added', 'success'))
            history.push('/blog')

        } catch (error) {
            dispatch(addBlogListFail(error))
            dispatch(setAlert(error, 'error'))
            // dispatch({
            //     payload: { msg: error.response.statusText, status: error.response.status },
            //     type: STAGE_ERROR
            // })
        }
}

// Delete Blog

export const deleteBlogListStart = () => {
    return {
      type: actions.DELETE_BLOG_LIST_START,
    }
}
  
export const deleteBlogListSuccess = (data) => {
    return {
      type: actions.DELETE_BLOG_LIST_SUCCESS,
      blogData: data
    }
}
  
export const deleteBlogListFail = (error) => {
    return {
      type: actions.DELETE_BLOG_LIST_FAIL,
      error: error
    }
}

export const deleteBlogList = (id) =>  async dispatch => {
    dispatch(deleteBlogListStart());

      const endpoint = `${process.env.REACT_APP_BASE_URL}api/admin/blog/${id}`

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
            dispatch(deleteBlogListSuccess(res.data))
            dispatch(setAlert('Blog has deleted', 'success'))
            dispatch(fetchBlogList('', 1))

        } catch (error) {
            dispatch(deleteBlogListFail(error))
            dispatch(setAlert(error, 'error'))
            // dispatch({
            //     payload: { msg: error.response.statusText, status: error.response.status },
            //     type: STAGE_ERROR
            // })
        }
}

// Fetching Detail Blog
export const fetchDetailBlogStart = () => {
    return {
      type: actions.GET_DETAIL_BLOG_LIST_START,
    }
}
  
export const fetchDetailBlogSuccess = (data) => {
    return {
      type: actions.GET_DETAIL_BLOG_LIST_SUCCESS,
      blogDetail: data
    }
}
  
export const fetchDetailBlogFail = (error) => {
    return {
      type: actions.GET_DETAIL_BLOG_LIST_FAIL,
      error: error
    }
}

export const fetchDetailBlog = (slug, setFormState, setImage) =>  async dispatch => {
    dispatch(fetchDetailBlogStart());

      const endpoint = `${process.env.REACT_APP_BASE_URL}api/admin/blog/${slug}`

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
            dispatch(fetchDetailBlogSuccess(res.data))
            setFormState({
                values: {
                    title : res.data.title,
                    description: res.data.description
                }
            })
            setImage(res.data.image)

        } catch (error) {
            dispatch(fetchDetailBlogFail(error))
            dispatch(setAlert(error, 'error'))
            // dispatch({
            //     payload: { msg: error.response.statusText, status: error.response.status },
            //     type: STAGE_ERROR
            // })
        }
}

// Update Blog
export const editBlogListStart = () => {
    return {
      type: actions.UPDATE_BLOG_LIST_START,
    }
}
  
export const editBlogListSuccess = (data) => {
    return {
      type: actions.UPDATE_BLOG_LIST_SUCCESS,
      blogData: data
    }
}
  
export const editBlogListFail = (error) => {
    return {
      type: actions.UPDATE_BLOG_LIST_FAIL,
      error: error
    }
}

export const editBlogList = (slug, formData, image, history) =>  async dispatch => {
    dispatch(editBlogListStart());
    const myData = {
        title: formData.title,
        description: formData.description,
        image: image.split(',')[1]
    }

      const endpoint = `${process.env.REACT_APP_BASE_URL}api/admin/blog/${slug}`

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
            dispatch(editBlogListSuccess(res.data))
            dispatch(setAlert('Blog has edited', 'success'))
            history.push('/blog')

        } catch (error) {
            dispatch(editBlogListFail(error))
            dispatch(setAlert(error, 'error'))
            // dispatch({
            //     payload: { msg: error.response.statusText, status: error.response.status },
            //     type: STAGE_ERROR
            // })
        }
}