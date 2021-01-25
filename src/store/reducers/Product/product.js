import * as actions from '../../actions/actionTypes'

const initialState = {
    productList: null,
    productData: null,
    detailProduct: null,
    loadingDetailProduct: false,
    loadingProductData: false,
    loadingProductList: false,
    error: {},
}

export default function (state = initialState, action) {
    const { type, payload } = action
    switch (type) {
        case actions.GET_PRODUCT_START:
            return {
                ...state,
                loadingProductList: true
            }
        case actions.GET_PRODUCT:
            return {
                ...state,
                productList: payload,
                loadingProductList: false
            }
        case actions.GET_PRODUCT_DETAIL_START:
            return {
                ...state,
                loadingDetailProduct: true
            }
        case actions.GET_PRODUCT_DETAIL:
            return {
                ...state,
                detailProduct: payload,
                loadingDetailProduct: false
            }
        case actions.ADD_PRODUCT_START:
            return {
                ...state,
                loadingProductData: true
            }
        case actions.ADD_PRODUCT_SUCCESS:
            return {
                ...state,
                productData: payload,
                loadingProductData: false
            }
        case actions.ADD_PRODUCT_FAIL:
            return {
                ...state,
                error: payload,
                loadingProductData: false
            }
        default:
            return state
    }
}