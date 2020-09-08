export default function (state = {}, action) {
    switch (action.type) {
        case 'USER_LOGIN':
            return { ...state, login: action.payload }
        case 'USER_AUTH':
            return { ...state, login: action.payload }
        case 'GET_USER_DOCUMENTS':
            return { ...state, userDocuments: action.payload }
        case 'GET_USERS':
            return { ...state, userList: action.payload }
        case 'GET_USERS_TRANSACTIONS':
            return { ...state, userList: action.payload }
        case 'USER_PROFILE':
            return { ...state, data: action.payload }
        case 'UPDATE_USER':
            return { ...state, data: action.payload.user }
        case 'USER_REGISTER':
            return {
                ...state,
                success: action.payload.success,
                error: action.payload.error
            }
        case 'CHANGE_PASSWORD':
            return { ...state, changePassword: action.payload }
        case 'CLEAR_PROFILE':
            return {
                ...state,
                changePassword: action.payload.changePassword,
                profile: action.payload.data
            }
        default:
            return state;

    }
}