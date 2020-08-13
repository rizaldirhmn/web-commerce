import { 
    GET_CART, ADD_TO_CART 
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
        default:
            return state
    }
}