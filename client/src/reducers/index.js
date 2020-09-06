import { combineReducers } from 'redux';
import user from './user_reducer';
import supplier from './supplier_reducer';
import customer from './customer_reducer';
import product from './product_reducer';
import purchase from './purchase_reducer';
const rootReducer = combineReducers({
    user,
    supplier,
    customer,
    product,
    purchase
});

export default rootReducer;