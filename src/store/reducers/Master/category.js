import * as actions from '../../actions/actionTypes'

const initialState = {
    categoryList: null,
    categoryListPagination: null,
    categoryData: null,
    detailCategory: null,
    subCategoryList: null,
    loadingDetailCategory: false,
    loadingSubCategory: true,
    loadingAddCategory: false,
    loadingCategory: true,
    error: {}
}

export default function (state = initialState, action) {
    const { type, payload } = action
    switch (type) {
        case actions.GET_CATEGORY:
            return {
                ...state,
                categoryList: payload,
                loadingCategory: false
            }
        case actions.GET_CATEGORY_PAGINATION:
            return {
                ...state,
                categoryListPagination: payload,
                loadingCategory: false
            }
        case actions.ADD_CATEGORY_START:
            return {
                ...state,
                loadingAddCategory: true
            }
        case actions.ADD_CATEGORY_SUCCESS:
            return {
                ...state,
                categoryData: payload,
                loadingAddCategory: false
            }
        case actions.ADD_CATEGORY_FAIL:
            return {
                ...state,
                error: payload,
                loadingAddCategory: false
            }
        case actions.GET_DETAIL_CATEGORY_START:
            return {
                ...state,
                loadingDetailCategory: true
            }
        case actions.GET_DETAIL_CATEGORY_SUCCESS:
            return {
                ...state,
                detailCategory: payload,
                loadingDetailCategory: false
            }
        case actions.GET_DETAIL_CATEGORY_FAIL:
            return {
                ...state,
                error: payload,
                loadingDetailCategory: false
            }
        case actions.GET_SUB_CATEGORY:
            return {
                ...state,
                subCategoryList: payload,
                loadingSubCategory: false
            }
        case actions.UPDATE_CATEGORY_START:
            return {
                ...state,
                loadingAddCategory: true
            }
        case actions.UPDATE_CATEGORY_SUCCESS:
            return {
                ...state,
                categoryData: payload,
                loadingAddCategory: false
            }
        case actions.UPDATE_CATEGORY_FAIL:
            return {
                ...state,
                error: payload,
                loadingAddCategory: false
            }
        case actions.DELETE_CATEGORY_START:
            return {
                ...state,
                loadingAddCategory: true
            }
        case actions.DELETE_CATEGORY_SUCCESS:
            return {
                ...state,
                categoryData: payload,
                loadingAddCategory: false
            }
        case actions.DELETE_CATEGORY_FAIL:
            return {
                ...state,
                error: payload,
                loadingAddCategory: false
            }
        default:
            return state
    }
}