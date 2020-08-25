import { combineReducers } from 'redux';
import user from './user_reducer';
import supplier from './supplier_reducer';

const rootReducer = combineReducers({
    user,
    supplier
});

export default rootReducer;