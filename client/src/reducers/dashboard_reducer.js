export default function (state = {}, action) {
    switch (action.type) {
        case 'GET_DASHBOARD':
            return { ...state, data: action.payload }
        case 'GET_DASHBOARD_PRODUCTS':
            return { ...state, topProduct: action.payload }
        case 'ADD_SALE':
            return { ...state, sale: action.payload }
        case 'CLEAR_DASHBOARD':
            return { ...state, data: action.payload, topProducts: action.payload }
        default:
            return state;
    }
}