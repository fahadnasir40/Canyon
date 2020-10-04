export default function (state = {}, action) {
    switch (action.type) {
        case 'GET_SALES':
            return { ...state, saleList: action.payload }
        case 'GET_SALE':
            return { ...state, sale: action.payload }
        case 'ADD_SALE':
            return { ...state, sale: action.payload }
        case 'UPDATE_SALE_PAID':
            return {
                ...state,
                post: action.payload.success
            }
        case 'CLEAR_SALE':
            return { ...state, sale: action.payload, post: action.payload }
        default:
            return state;
    }
}