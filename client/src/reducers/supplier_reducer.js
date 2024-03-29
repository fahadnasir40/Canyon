export default function (state = {}, action) {
    switch (action.type) {
        case 'GET_SUPPLIERS':
            return { ...state, supplierList: action.payload }
        case 'GET_SUPPLIER':
            return { ...state, supplier: action.payload }
        case 'UPDATE_SUPPLIER':
            return {
                ...state,
                post: action.payload.success,
                supplier: action.payload.doc
            }
        case 'GET_SUPPLIER_DETAILS':
            return { ...state, purchaseDetails: action.payload}
        case 'GET_SUPPLIERS_TRANSACTIONS':
            return { ...state, supplierList: action.payload }
        case 'ADD_SUPPLIER':
            return { ...state, supplier: action.payload }

        case 'DELETE_SUPPLIER':
            return {
                ...state,
                postDeleted: action.payload
            }
        case 'CLEAR_SUPPLIER':
            return { ...state, supplier: action.payload, post: action.payload,
                purchaseDetails: action.payload }
        case 'CLEAR_SUPPLIER_LIST':
            return { ...state, supplierList: action.payload }

        case 'DOWNLOAD_DOCUMENT':
            return { ...state, downloadStatus: action.payload }
        case 'INVITE_USER':
            return { ...state, userInvited: action.payload }
        default:
            return state;
    }
}