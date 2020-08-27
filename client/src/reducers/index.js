import { combineReducers } from 'redux';
import user from './user_reducer';
import supplier from './supplier_reducer';
import customer from './customer_reducer';

const rootReducer = combineReducers({
    user,
    supplier,
    customer
});

export default rootReducer;