export default function (state = {}, action) {
    switch (action.type) {
        case 'USER_LOGIN':
            return { ...state, login: action.payload }
        case 'USER_AUTH':
            return { ...state, login: action.payload }
        case 'CHANGE_USER':
            return { ...state, userUpdate: action.payload.data }
        case 'CHANGE_USER_PASSWORD':
            return { ...state, userUpdate: action.payload }
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
        case 'CLEAR_USER':
            return {
                ...state,
                success: action.payload.success,
                error: action.payload.error,
                userUpdate: action.payload.error,
            }
        default:
            return state;

    }
}