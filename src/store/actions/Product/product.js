import * as actions from '../actionTypes'
import axios from 'axios'
import { setAlert } from '../alert'

export const getProduct = () => async dispatch => {
  const endpoint = `${process.env.REACT_APP_BASE_URL}api/admin/product/paginate`
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

export const addProduct = (formData, variantGroup, history) => async dispatch => {
    dispatch({
        type: actions.ADD_PRODUCT_START
    })
    const endpoint = `${process.env.REACT_APP_BASE_URL}api/admin/product`
    const myData = {
        id_warehouse: formData.id_warehouse,
        id_category: formData.id_category,
        id_sub_category: formData.id_sub_category,
        title: formData.title,
        name: formData.name,
        description: formData.description,
        base_price: formData.base_price,
        stock: formData.stok,
        default_margin: formData.default_margin,
        group_variant: variantGroup,
        combination: [{
            variant_1: 'biru',
            variant_2: 'xl',
            variant_3: null,
            stock: 10,
            price: 10,
            weight: 10
        }],
        resource: [{
            url: 'ulala',
            type: 'image'
        }]
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