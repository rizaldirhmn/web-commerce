import * as actions from '../../actions/actionTypes'

const initialState = {
    warehouseList: null,
    warehouseData: null,
    loadingWarehouseData: false,
    loadingWarehouse: true,
    error: {}
}

export default function (state = initialState, action) {
    const { type, payload } = action
    switch (type) {
        case actions.GET_WAREHOUSE:
            return {
                ...state,
                warehouseList: payload,
                loadingWarehouse: false
            }
        case actions.ADD_WAREHOUSE_START:
            return {
                ...state,
                loadingWarehouseData: true
            }
        case actions.ADD_WAREHOUSE_SUCCESS:
            return {
                ...state,
                warehouseData: payload,
                loadingWarehouseData: false
            }
        case actions.ADD_WAREHOUSE_FAIL:
            return {
                ...state,
                error: payload,
                loadingWarehouseData: false
            }
        default:
            return state
    }
}