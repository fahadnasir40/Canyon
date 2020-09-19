export default function (state = {}, action) {
    switch (action.type) {
        case 'GET_SALES':
            return { ...state, saleList: action.payload }
        case 'ADD_SALE':
            return { ...state, sale: action.payload }
        case 'CLEAR_SALE':
            return { ...state, sale: action.payload, post: action.payload}
        default:
            return state;
    }
}