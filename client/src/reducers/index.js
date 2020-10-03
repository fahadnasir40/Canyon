import { combineReducers } from 'redux';
import user from './user_reducer';
import supplier from './supplier_reducer';
import customer from './customer_reducer';
import product from './product_reducer';
import transaction from './transaction_reducer';
import sale from './sale_reducer';
import dashboard from './dashboard_reducer';
import purchase from './purchase_reducer';

const rootReducer = combineReducers({
    user,
    supplier,
    customer,
    product,
    transaction,
    purchase,
    sale,
    dashboard
});

export default rootReducer;