import * as actions from '../actionTypes'
import axios from 'axios'
import { setAlert } from '../alert'

export const getCategory = (page) => async dispatch => {
  const endpoint = `${process.env.REACT_APP_BASE_URL}api/admin/category`
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
        dispatch({
            type: actions.GET_CATEGORY,
            payload: res.data
        })

    } catch (error) {
        dispatch(setAlert("Something went wrong", "error"))
        console.log(error)
        dispatch({
            type: actions.GET_CATEGORY,
            payload: error
        })
        // dispatch({
        //     payload: { msg: error.response.statusText, status: error.response.status },
        //     type: STAGE_ERROR
        // })
    }
    
}

export const getCategoryPaginate = (page) => async dispatch => {
    const endpoint = `${process.env.REACT_APP_BASE_URL}api/admin/category/paginate`
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
          dispatch({
              type: actions.GET_CATEGORY_PAGINATION,
              payload: res.data
          })
  
      } catch (error) {
          dispatch(setAlert("Something went wrong", "error"))
          console.log(error)
          dispatch({
              type: actions.GET_CATEGORY_PAGINATION,
              payload: error
          })
          // dispatch({
          //     payload: { msg: error.response.statusText, status: error.response.status },
          //     type: STAGE_ERROR
          // })
      }
      
}

export const getDetailCategory = (id, setFormState) => async dispatch => {
    dispatch({
        type: actions.GET_DETAIL_CATEGORY_START,
    })
    const endpoint = `${process.env.REACT_APP_BASE_URL}api/admin/category/${id}`
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
        dispatch({
            type: actions.GET_DETAIL_CATEGORY_SUCCESS,
            payload: res.data.category
        })
        const detailData = res.data.category
        setFormState({
            values: {
                name: detailData.name,
            }
        })
        dispatch({
            type: actions.UPLOAD_CATEGORY_IMAGE_EDIT_SUCCESS,
            url: detailData.image_url
        })

    } catch (error) {
        dispatch(setAlert("Something went wrong", "error"))
        console.log(error)
        dispatch({
            type: actions.GET_DETAIL_CATEGORY_FAIL,
            payload: error
        })
        // dispatch({
        //     payload: { msg: error.response.statusText, status: error.response.status },
        //     type: STAGE_ERROR
        // })
    }
    
}

export const getSubCategory = (id) => async dispatch => {
    const endpoint = `${process.env.REACT_APP_BASE_URL}api/admin/sub_category`
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
          dispatch({
              type: actions.GET_SUB_CATEGORY,
              payload: res.data
          })
  
      } catch (error) {
          dispatch(setAlert("Something went wrong", "error"))
          console.log(error)
          dispatch({
              type: actions.GET_SUB_CATEGORY,
              payload: error
          })
          // dispatch({
          //     payload: { msg: error.response.statusText, status: error.response.status },
          //     type: STAGE_ERROR
          // })
      }
      
  }

export const addCategory = (formData, imageUrl, history) => async dispatch => {
    dispatch({
        type: actions.ADD_CATEGORY_START
    })
    // console.log(image)
    const endpoint = `${process.env.REACT_APP_BASE_URL}api/admin/category`
    const myData = {
        name: formData.name,
        image: imageUrl
    }

      try {
          const res = await axios({
              url: endpoint,
              method: "POST",
              data: myData,
              loading: true,
              headers: { 
                'Content-Type': 'application/json', 
                'Accept' : 'application/json', 
                'Authorization' : `Bearer ${sessionStorage.getItem('access_token')}`
              }
          });
          dispatch({
              type: actions.ADD_CATEGORY_SUCCESS,
              payload: res.data
          })
          history.push('/category')
  
      } catch (error) {
          dispatch(setAlert("Something went wrong", "error"))
          console.log(error)
          dispatch({
              type: actions.ADD_CATEGORY_FAIL,
              payload: error
          })
          // dispatch({
          //     payload: { msg: error.response.statusText, status: error.response.status },
          //     type: STAGE_ERROR
          // })
      }
      
}

export const updateCategory = (id, formData, imageUrl, history) => async dispatch => {
    dispatch({
        type: actions.UPDATE_CATEGORY_START
    })
    // console.log(image)
    const endpoint = `${process.env.REACT_APP_BASE_URL}api/admin/category/${id}`
    const myData = {
        name: formData.name,
        image: imageUrl
    }

      try {
          const res = await axios({
              url: endpoint,
              method: "PATCH",
              data: myData,
              loading: true,
              headers: { 
                'Content-Type': 'application/json', 
                'Accept' : 'application/json', 
                'Authorization' : `Bearer ${sessionStorage.getItem('access_token')}`
              }
          });
          dispatch({
              type: actions.UPDATE_CATEGORY_SUCCESS,
              payload: res.data
          })
          dispatch(setAlert("Category Edited", "success"))
          history.push('/category')
  
      } catch (error) {
          dispatch(setAlert("Something went wrong", "error"))
          console.log(error)
          dispatch({
              type: actions.UPDATE_CATEGORY_FAIL,
              payload: error
          })
          // dispatch({
          //     payload: { msg: error.response.statusText, status: error.response.status },
          //     type: STAGE_ERROR
          // })
      }
      
}

export const deleteCategory = (id) => async dispatch => {
    dispatch({
        type: actions.DELETE_CATEGORY_START,
    })
    const endpoint = `${process.env.REACT_APP_BASE_URL}api/admin/category/${id}`
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
        dispatch({
            type: actions.DELETE_CATEGORY_SUCCESS,
            payload: res.data.message
        })
        dispatch(getCategoryPaginate())
        dispatch(setAlert("Category Deleted", "success"))

    } catch (error) {
        dispatch(setAlert("Something went wrong", "error"))
        console.log(error)
        dispatch({
            type: actions.DELETE_CATEGORY_FAIL,
            payload: error
        })
        // dispatch({
        //     payload: { msg: error.response.statusText, status: error.response.status },
        //     type: STAGE_ERROR
        // })
    }
    
}

export const uploadCategoryImageStart = () => {
    return {
      type: actions.UPLOAD_CATEGORY_IMAGE_START,
    }
}
  
export const uploadCategoryImageSuccess = (image) => {
    return {
      type: actions.UPLOAD_CATEGORY_IMAGE_SUCCESS,
      url: image
    }
}
  
export const uploadCategoryImageFail = (error) => {
    return {
      type: actions.UPLOAD_CATEGORY_IMAGE_FAIL,
      error: error
    }
}

export const uploadCategoryImage = (storeData) =>  async dispatch => {
    dispatch(uploadCategoryImageStart());
    const bodyFormData = {
        image : storeData
    }

      const endpoint = `${process.env.REACT_APP_BASE_URL}api/admin/category/upload`

        try {
            const res = await axios({
                url: endpoint,
                method: "POST",
                data: bodyFormData,
                headers: { 
                'Content-Type': 'application/json', 
                'Accept' : 'application/json', 
                'Authorization' : `Bearer ${sessionStorage.getItem('access_token')}`
                }
            });
            dispatch(uploadCategoryImageSuccess(res.data.url))

        } catch (error) {
            dispatch(uploadCategoryImageFail(error))
            dispatch(setAlert(error, 'error'))
            // dispatch({
            //     payload: { msg: error.response.statusText, status: error.response.status },
            //     type: STAGE_ERROR
            // })
        }
}

export const onClearImageCategory = () => async dispatch => {
    dispatch({
        type: actions.ON_CLEAR_UPLOAD_CATEGORY_IMAGE
    })
}

export const editDeleteImageCategoryStart = () => {
    return {
      type: actions.EDIT_DELETE_IMAGE_CATEGORY_START,
    };
};

export const editDeleteImageCategorySuccess = (idImage) => {
    return {
      type: actions.EDIT_DELETE_IMAGE_CATEGORY_SUCCESS,
      idImage: idImage
    };
};

export const editDeleteImageCategoryFail = (error) => {
    return {
      type: actions.EDIT_DELETE_IMAGE_CATEGORY_SUCCESS,
      error: error
    };
};

export const editDeleteImageProduct = (idImage) =>  async dispatch => {
    dispatch(editDeleteImageCategoryStart());

      const endpoint = `${process.env.REACT_APP_BASE_URL}api/admin/product/image/delete/${idImage}`

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
            dispatch(editDeleteImageCategorySuccess(idImage))
            dispatch(setAlert(res.data.message, 'success'))

        } catch (error) {
            dispatch(editDeleteImageCategoryFail(error))
            dispatch(setAlert(error, 'error'))
            // dispatch({
            //     payload: { msg: error.response.statusText, status: error.response.status },
            //     type: STAGE_ERROR
            // })
        }
}

export const deleteImageCategory = (index) => {
    return {
      type: actions.DELETE_IMAGE_CATEGORY,
      index: index
    };
};