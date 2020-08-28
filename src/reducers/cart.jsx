import { 
    GET_CART, ADD_TO_CART, DELETE_CART_ITEM, DELETE_CART_ALL_ITEM 
} from '../actions/types'

const initialState = {
    cart: {},
    carts: null,
    loading: true,
    error: {},
    counting : 0
}

export default function (state = initialState, action) {
    const { type, payload } = action
    switch (type) {
        case GET_CART:
            return {
                ...state,
                carts: payload,
                loading: false,
            }
        case ADD_TO_CART:
            return {
                ...state,
                cart: payload,
                loading: false,
                counting : initialState.counting += 1
            }
        case DELETE_CART_ITEM:
            return {
                ...state,
                cart: payload,
                loading: false,
                counting : initialState.counting -= 1
            }
        case DELETE_CART_ALL_ITEM:
            return {
                ...state,
                cart: payload,
                loading: false,
                counting : initialState.counting = 0
            }
        default:
            return state
    }
}