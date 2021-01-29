import * as actions from '../actionTypes'

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

// export const deleteImageProductStart = () => {
//     return {
//       type: actions.EDIT_DELETE_IMAGE_PRODUCT_START,
//     };
// };

// export const deleteImageProductSuccess = (idImage) => {
//     return {
//       type: actions.EDIT_DELETE_IMAGE_PRODUCT_SUCCESS,
//       idImage: idImage
//     };
// };

// export const deleteImageProductFail = (error) => {
//     return {
//       type: actions.EDIT_DELETE_IMAGE_PRODUCT_SUCCESS,
//       error: error
//     };
// };

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

}
