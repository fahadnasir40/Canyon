export default function(state={},action){
    switch(action.type){
        case 'USER_LOGIN':
            return {...state,login:action.payload}
        case 'USER_AUTH':
            return {...state,login:action.payload}
        case 'GET_USER_DOCUMENTS':
            return {...state,userDocuments:action.payload}    
        case 'GET_USERS':
            return {...state,userList:action.payload}
        case 'USER_REGISTER':
            return {
                ...state,
                success:action.payload.success,
            }
        default:
            return state;

    }
}