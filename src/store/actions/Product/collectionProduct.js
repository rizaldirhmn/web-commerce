import * as actions from '../actionTypes'
import axios from 'axios'
import { setAlert } from '../alert'

export const uploadCollectionProductListStart = () => {
    return {
      type: actions.UPLOAD_PRODUCT_COLLECTION_LIST_START,
    }
}
  
export const uploadCollectionProductListSuccess = (payload) => {
    return {
      type: actions.UPLOAD_PRODUCT_COLLECTION_LIST_SUCCESS,
      id_product: payload.id_product,
      name: payload.name,
      image: payload.image
    }
}
  
// export const uploadCollectionProductListFail = (error) => {
//     return {
//       type: actions.UPLOAD_PRODUCT_COLLECTION_LIST_FAIL,
//       error: error
//     }
// }

export const deleteProductCollectionStart = () => {
    return {
      type: actions.DELETE_EDIT_PRODUCT_COLLECTION_LIST_START,
    };
};

export const deleteProductCollectionSuccess = (id_product) => {
    return {
      type: actions.DELETE_EDIT_PRODUCT_COLLECTION_LIST_SUCCESS,
      id_product_new: id_product
    };
};

export const deleteProductCollectionFail = (error) => {
    return {
      type: actions.DELETE_EDIT_PRODUCT_COLLECTION_LIST_FAIL,
      error: error
    };
};

export const deleteProductList = (index) => {
    return {
      type: actions.DELETE_PRODUCT_COLLECTION_LIST,
      index: index
    };
  };
  
export const uploadCollectionProductList = (formData) =>  async dispatch => {
    dispatch(uploadCollectionProductListStart());
    const bodyFormData = {
        id_product : formData.id,
        name: formData.name,
        image: formData.resource_product[0].url
    }

    dispatch(uploadCollectionProductListSuccess(bodyFormData))
    dispatch(setAlert('New Prodcut added', 'success'))

}

export const editDeleteProductCollection = (id_collection, id_product) =>  async dispatch => {
  dispatch(deleteProductCollectionStart());

    const endpoint = `${process.env.REACT_APP_BASE_URL}api/admin/collection/${id_collection}/${id_product}`

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
          dispatch(deleteProductCollectionSuccess(id_product))
          dispatch(setAlert(res.data.message, 'success'))

      } catch (error) {
          dispatch(deleteProductCollectionFail(error))
          dispatch(setAlert(error, 'error'))
          // dispatch({
          //     payload: { msg: error.response.statusText, status: error.response.status },
          //     type: STAGE_ERROR
          // })
      }
}

// Adding Product on Edit Collection
export const addProductCollectionEditStart = () => {
  return {
    type: actions.UPDATE_PRODUCT_COLLECTION_START
  }
}

export const addProductCollectionEditSuccess = (payload) => {
  return {
    type: actions.UPDATE_PRODUCT_COLLECTION_SUCCESS,
    productData: payload
  }
}

export const addProductCollectionEditFail = (error) => {
  return {
    type: actions.UPDATE_PRODUCT_COLLECTION_FAIL,
    error: error
  }
}

export const addProductCollectionEdit = (idCollection, productList, history) => async dispatch => {
  dispatch(addProductCollectionEditStart())
  const endpoint = `${process.env.REACT_APP_BASE_URL}api/admin/collection/${idCollection}/add_product_new`
  const myData = {
    product: productList
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
      dispatch(addProductCollectionEditSuccess(res.data))

      dispatch(setAlert("New Product Added", "success"))
      
      history.push(`/product/collection`)

  } catch (error) {
      dispatch(setAlert("Something went wrong", "error"))
      console.log(error)
      dispatch(addProductCollectionEditFail(error))
      // dispatch({
      //     payload: { msg: error.response.statusText, status: error.response.status },
      //     type: STAGE_ERROR
      // })
  }
  
}