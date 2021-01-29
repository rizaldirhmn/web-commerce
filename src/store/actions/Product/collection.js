import * as actions from '../actionTypes'
import axios from 'axios'
import { setAlert } from '../alert'

// Fetching Collection List
  export const fetchCollectionStart = () => {
      return {
        type: actions.GET_PRODUCT_COLLECTION_START
      }
  }
    
  export const fetchCollectionSuccess = (payload) => {
      return {
        type: actions.GET_PRODUCT_COLLECTION,
        collectionList: payload
      }
  }
    
  export const fetchCollectionFail = (error) => {
      return {
        type: actions.GET_PRODUCT_COLLECTION_FAIL,
        error: error
      }
  }
    
  export const fetchCollection = (search, page) => async dispatch => {
      dispatch(fetchCollectionStart())
      const endpoint = `${process.env.REACT_APP_BASE_URL}api/admin/collection/paginate?kata_kunci=${search}&page=${page}`
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
          dispatch(fetchCollectionSuccess(res.data))

      } catch (error) {
          dispatch(setAlert("Something went wrong", "error"))
          console.log(error)
          dispatch(fetchCollectionFail(error))
          // dispatch({
          //     payload: { msg: error.response.statusText, status: error.response.status },
          //     type: STAGE_ERROR
          // })
      }
      
  }

// Adding Collection
  export const addCollectionStart = () => {
    return {
      type: actions.ADD_PRODUCT_COLLECTION_START
    }
  }

  export const addCollectionSuccess = (payload) => {
    return {
      type: actions.ADD_PRODUCT_COLLECTION_SUCCESS,
      collectionData: payload
    }
  }

  export const addCollectionFail = (error) => {
    return {
      type: actions.ADD_PRODUCT_COLLECTION_FAIL,
      error: error
    }
  }

  export const addCollection = (formData, imageUrl, productList, history) => async dispatch => {
    dispatch(addCollectionStart())
    const endpoint = `${process.env.REACT_APP_BASE_URL}api/admin/collection`
    const myData = {
      name: formData.name,
      image: imageUrl,
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
        dispatch(addCollectionSuccess(res.data))

        dispatch(setAlert("New Product Added", "success"))
        
        history.push('/product/collection')

    } catch (error) {
        dispatch(setAlert("Something went wrong", "error"))
        console.log(error)
        dispatch(addCollectionFail(error))
        // dispatch({
        //     payload: { msg: error.response.statusText, status: error.response.status },
        //     type: STAGE_ERROR
        // })
    }
    
  }

// Uploading Image Collection
  export const uploadProductCollectionImageStart = () => {
    return {
      type: actions.UPLOAD_PRODUCT_COLLECTION_IMAGE_START,
    }
  }

  export const uploadProductCollectionImageSuccess = (image) => {
    return {
      type: actions.UPLOAD_PRODUCT_COLLECTION_IMAGE_SUCCESS,
      url: image
    }
  }

  export const uploadProductCollectionImageFail = (error) => {
    return {
      type: actions.UPLOAD_PRODUCT_COLLECTION_IMAGE_FAIL,
      error: error
    }
  }
  
  export const uploadProductCollectionImage = (storeData, token) =>  async dispatch => {
      dispatch(uploadProductCollectionImageStart());
      const bodyFormData = {
          image : storeData
      }

        const endpoint = `${process.env.REACT_APP_BASE_URL}api/admin/collection/upload`

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
              dispatch(uploadProductCollectionImageSuccess(res.data.url))

          } catch (error) {
              dispatch(uploadProductCollectionImageFail(error))
              dispatch(setAlert(error, 'error'))
              // dispatch({
              //     payload: { msg: error.response.statusText, status: error.response.status },
              //     type: STAGE_ERROR
              // })
          }
  }

  export const onClearImageProductCollection = () => async dispatch => {
      dispatch({
          type: actions.ON_CLEAR_UPLOAD_IMAGE
      })
  }

  export const deleteImageCollection = (index) => {
      return {
        type: actions.DELETE_IMAGE_PRODUCT_COLLECTION,
        index: index
      };
  };