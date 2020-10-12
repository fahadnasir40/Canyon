export default function (state = {}, action) {
    switch (action.type) {
        case 'GET_PRODUCTS':
            return { ...state, productList: action.payload }
        case 'GET_STOCK_PRODUCTS':
            return { ...state, productList: action.payload }
        case 'UPDATE_PRODUCT':
            return {
                ...state,
                post: action.payload.success,
                product: action.payload.doc
            }
        case 'ADD_PRODUCT':
            return { ...state, product: action.payload }
        case 'CLEAR_PRODUCT':
            return {
                ...state, product: action.payload, post: action.payload
            }
        case 'CLEAR_PRODUCT_LIST':
            return { ...state, productList: action.payload }
        default:
            return state;
    }
}