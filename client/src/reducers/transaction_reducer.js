export default function (state = {}, action) {
    switch (action.type) {
        case 'USER_LOGIN':
            return { ...state, login: action.payload }
        case 'ADD_TRANSACTION':
            return { ...state, transaction: action.payload }
        case 'GET_TRANSACTIONS':
            return { ...state, transactionList: action.payload }
        case 'UPDATE_TRANSACTION':
            return { ...state, transactionList: action.payload }
        case 'DELETE_TRANSACTION':
            return {
                ...state,
                postDeleted: action.payload
            }
        case 'CLEAR_TRANSACTION':
            return { ...state, transaction: action.payload, post: action.payload }
        default:
            return state;

    }
}