import { 
    GET_CART_BUYBACK, ADD_TO_CART_BUYBACK, DELETE_CART_ITEM_BUYBACK, DELETE_CART_ALL_ITEM_BUYBACK 
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
        case GET_CART_BUYBACK:
            return {
                ...state,
                carts: payload,
                loading: false,
            }
        case ADD_TO_CART_BUYBACK:
            return {
                ...state,
                cart: payload,
                loading: false,
                counting : initialState.counting += 1
            }
        case DELETE_CART_ITEM_BUYBACK:
            return {
                ...state,
                cart: payload,
                loading: false,
                counting : initialState.counting -= 1
            }
        case DELETE_CART_ALL_ITEM_BUYBACK:
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