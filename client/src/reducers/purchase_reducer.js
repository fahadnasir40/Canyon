export default function (state = {}, action) {
    switch (action.type) {
        case 'GET_PURCHASES':
            return { ...state, purchaseList: action.payload }
        case 'GET_PURCHASE':
            return { ...state, purchase: action.payload }
        case 'ADD_PURCHASE':
            return { ...state, purchase: action.payload }
        case 'UPDATE_PURCHASE':
            return {
                ...state,
                post: action.payload.success
            }
        case 'UPDATE_PURCHASE_PAID':
            return {
                ...state,
                post: action.payload.success
            }
        case 'DELETE_PURCHASE':
            return {
                ...state,
                postDeleted: action.payload
            }

        case 'CLEAR_PURCHASE':
            return { ...state, purchase: action.payload, post: action.payload, purchaseId: action.payload }
        default:
            return state;
    }
}