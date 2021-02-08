import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility'

const initialState = {
  error: {},
  notificationProduct: null,
  notificationCollection: null,
  notificationInformation: null,
  loadingNotificationInformation: false,
  loadingNotificationCollection: false,
  loadingNotificationProduct: false
}

// Send Notif Product
const sendNotifProductStart = (state, action) => {
  return updateObject(state, {
    loadingNotificationProduct: true,
  })
}

const sendNotifProductSuccess = (state, action) => {
  return updateObject(state, {
    notificationProduct: action.notificationProduct,
    loadingNotificationProduct: false
  })
}

const sendNotifProductFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loadingNotificationProduct: false
  })
}

// Send Notif Product Collection
const sendNotifProductCollectionStart = (state, action) => {
  return updateObject(state, {
    loadingNotificationCollection: true,
  })
}

const sendNotifProductCollectionSuccess = (state, action) => {
  return updateObject(state, {
    notificationCollection: action.notificationCollection,
    loadingNotificationCollection: false
  })
}

const sendNotifProductCollectionFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loadingNotificationCollection: false
  })
}

// Send Notif Information
const sendNotificationInformationStart = (state, action) => {
  return updateObject(state, {
    loadingNotificationInformation: true,
  })
}

const sendNotificationInformationSuccess = (state, action) => {
  return updateObject(state, {
    notificationInformation: action.notificationInformation,
    loadingNotificationInformation: false
  })
}

const sendNotificationInformationFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loadingNotificationInformation: false
  })
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
      case actionTypes.SEND_NOTIFICATION_PRODUCT_START: return sendNotifProductStart(state, action)
      case actionTypes.SEND_NOTIFICATION_PRODUCT_SUCCESS: return sendNotifProductSuccess(state, action)
      case actionTypes.SEND_NOTIFICATION_PRODUCT_FAIL: return sendNotifProductFail(state, action)

      case actionTypes.SEND_NOTIFICATION_PRODUCT_COLLECTION_START: return sendNotifProductCollectionStart(state, action)
      case actionTypes.SEND_NOTIFICATION_PRODUCT_COLLECTION_SUCCESS: return sendNotifProductCollectionSuccess(state, action)
      case actionTypes.SEND_NOTIFICATION_PRODUCT_COLLECTION_FAIL: return sendNotifProductCollectionFail(state, action)

      case actionTypes.SEND_NOTIFICATION_INFORMATION_START: return sendNotificationInformationStart(state, action)
      case actionTypes.SEND_NOTIFICATION_INFORMATION_SUCCESS: return sendNotificationInformationSuccess(state, action)
      case actionTypes.SEND_NOTIFICATION_INFORMATION_FAIL: return sendNotificationInformationFail(state, action)
  
      default: return state
    }
  }
  
  export default reducer