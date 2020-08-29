export default function (state = {}, action) {
    switch (action.type) {
        case 'GET_PRODUCTS':
            return { ...state, productList: action.payload }
        case 'GET_SHARED_DOCUMENT':
            return { ...state, sharedDocument: action.payload }
        case 'UPDATE_CUSTOMER':
            return {
                ...state,
                post: action.payload.success,
                customer: action.payload.doc
            }
        case 'ADD_PRODUCT':
            return { ...state, product: action.payload }

        case 'DELETE_CUSTOMER':
            return {
                ...state,
                postDeleted: action.payload
            }
        case 'CLEAR_PRODUCT':
            return { ...state, product: action.payload, post: action.payload}
        case 'CLEAR_CUSTOMER_LIST':
            return { ...state, customerList: action.payload}

        case 'DOWNLOAD_DOCUMENT':
            return { ...state, downloadStatus: action.payload }
        case 'INVITE_USER':
            return { ...state, userInvited: action.payload }
        default:
            return state;
    }
}