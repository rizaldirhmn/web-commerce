import * as actions from '../actionTypes'
import axios from 'axios'
import { setAlert } from '../alert'

export const getProduct = (page) => async dispatch => {
    dispatch({
        type: actions.GET_PRODUCT_START,
    })
    const endpoint = `${process.env.REACT_APP_BASE_URL}api/admin/product/paginate?page=${page}`
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
            type: actions.GET_PRODUCT,
            payload: res.data
        })

    } catch (error) {
        dispatch(setAlert("Something went wrong", "error"))
        console.log(error)
        dispatch({
            type: actions.GET_PRODUCT,
            payload: error
        })
        // dispatch({
        //     payload: { msg: error.response.statusText, status: error.response.status },
        //     type: STAGE_ERROR
        // })
    }
    
}

export const getDetailProduct = (id) => async dispatch => {
    dispatch({
        type: actions.GET_PRODUCT_DETAIL_START,
    })
    const endpoint = `${process.env.REACT_APP_BASE_URL}api/admin/product/${id}`
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
            type: actions.GET_PRODUCT_DETAIL,
            payload: res.data
        })

    } catch (error) {
        dispatch(setAlert("Something went wrong", "error"))
        console.log(error)
        dispatch({
            type: actions.GET_PRODUCT_DETAIL,
            payload: error
        })
        // dispatch({
        //     payload: { msg: error.response.statusText, status: error.response.status },
        //     type: STAGE_ERROR
        // })
    }
    
}

export const uploadProductImageStart = () => {
    return {
      type: actions.UPLOAD_PRODUCT_IMAGE_START,
    }
}
  
export const uploadProductImageSuccess = (image) => {
    return {
      type: actions.UPLOAD_PRODUCT_IMAGE_SUCCESS,
      image: image
    }
}
  
export const uploadProductImageFail = (error) => {
    return {
      type: actions.UPLOAD_PRODUCT_IMAGE_FAIL,
      error: error
    }
}

export const deleteImageProduct = (index) => {
    return {
      type: actions.DELETE_IMAGE_PRODUCT,
      index: index
    };
};
  
export const uploadProductImage = (storeData, token) =>  async dispatch => {
    dispatch(uploadProductImageStart());
    const bodyFormData = {
        image : storeData
    }
    console.log(bodyFormData)

      const endpoint = `${process.env.REACT_APP_BASE_URL}api/admin/product/upload`

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
            dispatch(uploadProductImageSuccess(res.data.url))

        } catch (error) {
            dispatch(uploadProductImageFail(error))
            dispatch(setAlert(error, 'error'))
            // dispatch({
            //     payload: { msg: error.response.statusText, status: error.response.status },
            //     type: STAGE_ERROR
            // })
        }
}

export const addProduct = (formData, variantGroup, imageUrl, combineVariant, history) => async dispatch => {
    dispatch({
        type: actions.ADD_PRODUCT_START
    })
    const endpoint = `${process.env.REACT_APP_BASE_URL}api/admin/product`
    const myData = {
        id_warehouse: formData.id_warehouse,
        id_category: formData.id_category,
        id_sub_category: formData.id_sub_category,
        title: formData.name,
        name: formData.name,
        description: formData.description,
        base_price: formData.base_price,
        stock: formData.stok,
        default_margin: formData.default_margin,
        group_variant: variantGroup,
        combination: combineVariant,
        resource: imageUrl
    }
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
        dispatch({
            type: actions.ADD_PRODUCT_SUCCESS,
            payload: res.data
        })
        dispatch(setAlert("New Product Added", "success"))

        history.push('/product')

    } catch (error) {
        dispatch(setAlert("Something went wrong", "error"))
        console.log(error)
        dispatch({
            type: actions.ADD_PRODUCT_FAIL,
            payload: error
        })
        // dispatch({
        //     payload: { msg: error.response.statusText, status: error.response.status },
        //     type: STAGE_ERROR
        // })
    }
      
}