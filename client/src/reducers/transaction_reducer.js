export default function(state={},action){
    switch(action.type){
        case 'USER_LOGIN':
            return {...state,login:action.payload}
        case 'ADD_TRANSACTION':
            return {...state,transaction:action.payload}
        default:
            return state;

    }
}