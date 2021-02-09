import * as actions from './actionTypes'
import axios from 'axios'
import { setAlert } from './alert'

export const fetchSocialMediaListStart = () => {
    return {
      type: actions.GET_SOCIAL_MEDIA_LIST_START,
    }
}
  
export const fetchSocialMediaListSuccess = (data) => {
    return {
      type: actions.GET_SOCIAL_MEDIA_LIST_SUCCESS,
      socialMedia: data
    }
}
  
export const fetchSocialMediaListFail = (error) => {
    return {
      type: actions.GET_SOCIAL_MEDIA_LIST_FAIL,
      error: error
    }
}

export const fetchSocialMediaList = () =>  async dispatch => {
    dispatch(fetchSocialMediaListStart());

      const endpoint = `${process.env.REACT_APP_BASE_URL}api/admin/social_media`

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
            dispatch(fetchSocialMediaListSuccess(res.data))

        } catch (error) {
            dispatch(fetchSocialMediaListFail(error))
            dispatch(setAlert(error, 'error'))
            // dispatch({
            //     payload: { msg: error.response.statusText, status: error.response.status },
            //     type: STAGE_ERROR
            // })
        }
}

// Detail Social Media
export const fetchSocialMediaDetailStart = () => {
	return {
		type: actions.GET_DETAIL_SOCIAL_MEDIA_START,
	}
}

export const fetchSocialMediaDetailSuccess = (data) => {
	return {
		type: actions.GET_DETAIL_SOCIAL_MEDIA_SUCCESS,
		detailSocialMedia: data
	}
}

export const fetchSocialMediaDetailFail = (error) => {
	return {
		type: actions.GET_DETAIL_SOCIAL_MEDIA_FAIL,
		error: error
	}
}

export const fetchSocialMediaDetail = (id, setFormState) =>  async dispatch => {
	dispatch(fetchSocialMediaDetailStart());

		const endpoint = `${process.env.REACT_APP_BASE_URL}api/admin/social_media/${id}`

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
					dispatch(fetchSocialMediaDetailSuccess(res.data))
					const detailData = res.data
					setFormState({
            values: {
								name: detailData.name,
								ref_url: detailData.ref_url
            }
					})
					dispatch(uploadSocialMediaImageEditSuccess(res.data.image_url))

			} catch (error) {
					dispatch(fetchSocialMediaDetailFail(error))
					dispatch(setAlert(error, 'error'))
					// dispatch({
					//     payload: { msg: error.response.statusText, status: error.response.status },
					//     type: STAGE_ERROR
					// })
			}
}

// Upload Image Social Media
export const uploadSocialMediaImageStart = () => {
    return {
      type: actions.UPLOAD_SOCIAL_MEDIA_IMAGE_START,
    }
}
  
export const uploadSocialMediaImageSuccess = (image) => {
    return {
      type: actions.UPLOAD_SOCIAL_MEDIA_IMAGE_SUCCESS,
      url: image
    }
}
  
export const uploadSocialMediaImageFail = (error) => {
    return {
      type: actions.UPLOAD_SOCIAL_MEDIA_IMAGE_FAIL,
      error: error
    }
}

export const uploadSocialMediaImage = (storeData) =>  async dispatch => {
    dispatch(uploadSocialMediaImageStart());
    const bodyFormData = {
        image : storeData
    }

      const endpoint = `${process.env.REACT_APP_BASE_URL}api/admin/social_media/upload`

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
            dispatch(uploadSocialMediaImageSuccess(res.data.url))
            dispatch(setAlert('Upload Image Succeed', 'success'))

        } catch (error) {
            dispatch(uploadSocialMediaImageFail(error))
            dispatch(setAlert(error, 'error'))
            // dispatch({
            //     payload: { msg: error.response.statusText, status: error.response.status },
            //     type: STAGE_ERROR
            // })
        }
}

// Upload Image Edit Social Media
export const uploadSocialMediaImageEditStart = () => {
	return {
		type: actions.UPLOAD_SOCIAL_MEDIA_IMAGE_EDIT_START,
	}
}

export const uploadSocialMediaImageEditSuccess = (image) => {
	return {
		type: actions.UPLOAD_SOCIAL_MEDIA_IMAGE_EDIT_SUCCESS,
		url: image
	}
}

export const uploadSocialMediaImageEditFail = (error) => {
	return {
		type: actions.UPLOAD_SOCIAL_MEDIA_IMAGE_EDIT_FAIL,
		error: error
	}
}

export const uploadSocialMediaImageEdit = (storeData) =>  async dispatch => {
	dispatch(uploadSocialMediaImageEditStart());
	const bodyFormData = {
			image : storeData
	}

		const endpoint = `${process.env.REACT_APP_BASE_URL}api/admin/social_media/upload`

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
					dispatch(uploadSocialMediaImageEditSuccess(res.data.url))
					dispatch(setAlert('Upload Image Succeed', 'success'))

			} catch (error) {
					dispatch(uploadSocialMediaImageEditFail(error))
					dispatch(setAlert(error, 'error'))
					// dispatch({
					//     payload: { msg: error.response.statusText, status: error.response.status },
					//     type: STAGE_ERROR
					// })
			}
}

export const deleteImageSocialMedia = (index) => {
    return {
      type: actions.DELETE_IMAGE_SOCIAL_MEDIA,
      index: index
    };
};

export const onClearImageSocialMedia = () => async dispatch => {
    dispatch({
        type: actions.ON_CLEAR_UPLOAD_SOCIAL_MEDIA_IMAGE
    })
}

// Adding Social Media Link
export const addSocialMediaStart = () => {
	return {
		type: actions.ADD_SOCIAL_MEDIA_START
	}
}

export const addSocialMediaSuccess = (payload) => {
	return {
		type: actions.ADD_SOCIAL_MEDIA_SUCCESS,
		addSocialMedia: payload
	}
}

export const addSocialMediaFail = (error) => {
	return {
		type: actions.ADD_SOCIAL_MEDIA_FAIL,
		error: error
	}
}

export const addSocialMedia = (formData, imageUrl, history) => async dispatch => {
	dispatch(addSocialMediaStart())
	const endpoint = `${process.env.REACT_APP_BASE_URL}api/admin/social_media`
	const myData = {
		name: formData.name,
		ref_url: formData.ref_url,
		image_url: imageUrl,
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
			dispatch(addSocialMediaSuccess(res.data))

			dispatch(setAlert("New Link Social Media Added", "success"))
			
			history.push('/social-media')

	} catch (error) {
			dispatch(setAlert("Something went wrong", "error"))
			console.log(error)
			dispatch(addSocialMediaFail(error))
			// dispatch({
			//     payload: { msg: error.response.statusText, status: error.response.status },
			//     type: STAGE_ERROR
			// })
	}
	
}

// Edit Social Media Link
export const editSocialMediaStart = () => {
	return {
		type: actions.EDIT_SOCIAL_MEDIA_START
	}
}

export const editSocialMediaSuccess = (payload) => {
	return {
		type: actions.EDIT_SOCIAL_MEDIA_SUCCESS,
		addSocialMedia: payload
	}
}

export const editSocialMediaFail = (error) => {
	return {
		type: actions.EDIT_SOCIAL_MEDIA_FAIL,
		error: error
	}
}

export const editSocialMedia = (id, formData, imageUrl, history) => async dispatch => {
	dispatch(editSocialMediaStart())
	const endpoint = `${process.env.REACT_APP_BASE_URL}api/admin/social_media/${id}`
	const myData = {
		name: formData.name,
		ref_url: formData.ref_url,
		image_url: imageUrl,
	}

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
			dispatch(editSocialMediaSuccess(res.data))

			dispatch(setAlert("Link Social Media edited", "success"))
			
			history.push('/social-media')

	} catch (error) {
			dispatch(setAlert("Something went wrong", "error"))
			console.log(error)
			dispatch(editSocialMediaFail(error))
			// dispatch({
			//     payload: { msg: error.response.statusText, status: error.response.status },
			//     type: STAGE_ERROR
			// })
	}
	
}

// Deleting Social Media Link
export const deleteSocialMediaStart = () => {
	return {
		type: actions.DELETE_SOCIAL_MEDIA_START
	}
}

export const deleteSocialMediaSuccess = (payload) => {
	return {
		type: actions.DELETE_SOCIAL_MEDIA_SUCCESS,
		addSocialMedia: payload
	}
}

export const deleteSocialMediaFail = (error) => {
	return {
		type: actions.DELETE_SOCIAL_MEDIA_FAIL,
		error: error
	}
}

export const deleteSocialMedia = (id) => async dispatch => {
	dispatch(deleteSocialMediaStart())
	const endpoint = `${process.env.REACT_APP_BASE_URL}api/admin/social_media/${id}`

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
			dispatch(deleteSocialMediaSuccess(res.data))
			dispatch(fetchSocialMediaList())

			dispatch(setAlert("Social Media Link has deleted", "success"))

	} catch (error) {
			dispatch(setAlert("Something went wrong", "error"))
			console.log(error)
			dispatch(deleteSocialMediaFail(error))
			// dispatch({
			//     payload: { msg: error.response.statusText, status: error.response.status },
			//     type: STAGE_ERROR
			// })
	}
	
}