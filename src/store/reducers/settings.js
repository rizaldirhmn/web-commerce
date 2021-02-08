import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility'

const initialState = {
    error: {},
    textFollowUpList: null,
    textFollowUpDetail: null,
    textFollowUpData: null,
    variableFollowUpList: null,
    sendWhatsappFollowUp: null,
    textTranslateWA: null,
    loadingTextTranslateWA: false,
    loadingSendWhatsappFollowUp: false,
    loadingTextFollowUpData: false,
    loadingVariableFollowUpList: false,
    loadingTextFollowUpList: false,
    loadingTextFollowUpDetail: false
}

// Fetching List text
const fetchListTextStart = (state) => {
    return updateObject(state, {
      loadingTextFollowUpList: true,
    })
}
  
const fetchListTextSuccess = (state, action) => {
    return updateObject(state, {
        textFollowUpList: action.textFollowUpList,
        loadingTextFollowUpList: false
    })
}
  
const fetchListTextFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loadingTextFollowUpList: false
    })
}

// Fetching Translate List text
const fetchListTranslateTextStart = (state) => {
    return updateObject(state, {
      loadingTextTranslateWA: true,
    })
}
  
const fetchListTranslateTextSuccess = (state, action) => {
    return updateObject(state, {
        textTranslateWA: action.textTranslateWA,
        loadingTextTranslateWA: false
    })
}
  
const fetchListTranslateTextFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loadingTextTranslateWA: false
    })
}

// Fetching Detail text
const fetchDetailTextStart = (state) => {
    return updateObject(state, {
      loadingTextFollowUpDetail: true,
    })
}
  
const fetchDetailTextSuccess = (state, action) => {
    return updateObject(state, {
        textFollowUpDetail: action.textFollowUpDetail,
        loadingTextFollowUpDetail: false
    })
}
  
const fetchDetailTextFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loadingTextFollowUpDetail: false
    })
}

// Fetching List variable
const fetchListVariableStart = (state) => {
    return updateObject(state, {
      loadingVariableFollowUpList: true,
    })
}
  
const fetchListVariableSuccess = (state, action) => {
    return updateObject(state, {
        variableFollowUpList: action.variableFollowUpList,
        loadingVariableFollowUpList: false
    })
}
  
const fetchListVariableFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loadingVariableFollowUpList: false
    })
}

// Adding List Text
const fetchDataTextStart = (state) => {
    return updateObject(state, {
      loadingTextFollowUpData: true,
    })
}
  
const fetchDataTextSuccess = (state, action) => {
    return updateObject(state, {
        textFollowUpData: action.textFollowUpData,
        loadingTextFollowUpData: false
    })
}
  
const fetchDataTextFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loadingTextFollowUpData: false
    })
}

// Sending whatsapp follow up
const sendWAFollowUpStart = (state) => {
    return updateObject(state, {
      loadingSendWhatsappFollowUp: true,
    })
}
  
const sendWAFollowUpSuccess = (state, action) => {
    return updateObject(state, {
        sendWhatsappFollowUp: action.sendWhatsappFollowUp,
        loadingSendWhatsappFollowUp: false
    })
}
  
const sendWAFollowUpFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loadingSendWhatsappFollowUp: false
    })
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
      case actionTypes.GET_TEXT_FOLLOW_UP_WA_START: return fetchListTextStart(state, action)
      case actionTypes.GET_TEXT_FOLLOW_UP_WA_SUCCESS: return fetchListTextSuccess(state, action)
      case actionTypes.GET_TEXT_FOLLOW_UP_WA_FAIL: return fetchListTextFail(state, action)

      case actionTypes.GET_TEXT_TRANSLATE_WA_START: return fetchListTranslateTextStart(state, action)
      case actionTypes.GET_TEXT_TRANSLATE_WA_SUCCESS: return fetchListTranslateTextSuccess(state, action)
      case actionTypes.GET_TEXT_TRANSLATE_WA_FAIL: return fetchListTranslateTextFail(state, action)

      case actionTypes.GET_DETAIL_TEXT_FOLLOW_UP_WA_START: return fetchDetailTextStart(state, action)
      case actionTypes.GET_DETAIL_TEXT_FOLLOW_UP_WA_SUCCESS: return fetchDetailTextSuccess(state, action)
      case actionTypes.GET_DETAIL_TEXT_FOLLOW_UP_WA_FAIL: return fetchDetailTextFail(state, action)

      case actionTypes.ADD_TEXT_FOLLOW_UP_WA_START: return fetchDataTextStart(state, action)
      case actionTypes.ADD_TEXT_FOLLOW_UP_WA_SUCCESS: return fetchDataTextSuccess(state, action)
      case actionTypes.ADD_TEXT_FOLLOW_UP_WA_FAIL: return fetchDataTextFail(state, action)

      case actionTypes.UPDATE_TEXT_FOLLOW_UP_WA_START: return fetchDataTextStart(state, action)
      case actionTypes.UPDATE_TEXT_FOLLOW_UP_WA_SUCCESS: return fetchDataTextSuccess(state, action)
      case actionTypes.UPDATE_TEXT_FOLLOW_UP_WA_FAIL: return fetchDataTextFail(state, action)

      case actionTypes.DELETE_TEXT_FOLLOW_UP_WA_START: return fetchDataTextStart(state, action)
      case actionTypes.DELETE_TEXT_FOLLOW_UP_WA_SUCCESS: return fetchDataTextSuccess(state, action)
      case actionTypes.DELETE_TEXT_FOLLOW_UP_WA_FAIL: return fetchDataTextFail(state, action)

      case actionTypes.GET_VARIABLE_FOLLOW_UP_WA_START: return fetchListVariableStart(state, action)
      case actionTypes.GET_VARIABLE_FOLLOW_UP_WA_SUCCESS: return fetchListVariableSuccess(state, action)
      case actionTypes.GET_VARIABLE_FOLLOW_UP_WA_FAIL: return fetchListVariableFail(state, action)

      case actionTypes.SEND_WHATSAPP_FOLLOW_UP_START: return sendWAFollowUpStart(state, action)
      case actionTypes.SEND_WHATSAPP_FOLLOW_UP_SUCCESS: return sendWAFollowUpSuccess(state, action)
      case actionTypes.SEND_WHATSAPP_FOLLOW_UP_FAIL: return sendWAFollowUpFail(state, action)
      default: return state
    }
}

export default reducer