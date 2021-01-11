import * as actions from '../../actions/actionTypes'

const initialState = {
    categoryList: null,
    categoryData: null,
    subCategoryList: null,
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
        case actions.GET_SUB_CATEGORY:
            return {
                ...state,
                subCategoryList: payload,
                loadingSubCategory: false
            }
        default:
            return state
    }
}