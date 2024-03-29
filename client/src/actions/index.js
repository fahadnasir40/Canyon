import axios from 'axios';

export function getSuppliers(
    start = 0,
    limit = 0,
    order = 'desc',
    list = ''
) {

    const request = axios.get(`api/getSuppliers?skip=${start}&limit=${limit}&order=${order}`)
        .then(response => {
            if (list) {
                return [...list, ...response.data];
            }
            else {
                return response.data;
            }
        })
        .catch(error => {

        });

    return {
        type: 'GET_SUPPLIERS',
        payload: request
    }
}

export function getSupplier(id) {

    const request = axios.get(`/api/getSupplier?id=${id}`)
        .then(response => {
            return response.data;
        })
        .catch(error => {

        });

    return {
        type: 'GET_SUPPLIER',
        payload: request
    }
}

export function getCustomer(id) {

    const request = axios.get(`/api/getCustomer?id=${id}`)
        .then(response => {
            return response.data;
        })
        .catch(error => {

        });

    return {
        type: 'GET_CUSTOMER',
        payload: request
    }
}

export function getDashboard() {

    const request = axios.get(`/api/getDashboard`)
        .then(response => {
            return response.data;
        })
        .catch(error => {

        });

    return {
        type: 'GET_DASHBOARD',
        payload: request
    }
}


export function getSupplierDetails(_id) {
    const request = axios.get(`/api/getSupplierDetails?id=${_id}`)
        .then(response => {
            return response.data;
        })
        .catch(error => {

        });

    return {
        type: 'GET_SUPPLIER_DETAILS',
        payload: request
    }
}


export function getSuppliersTransactions(
    start = 0,
    limit = 0,
    order = 'desc',
    list = ''
) {

    const request = axios.get(`api/getSuppliersTransactions?skip=${start}&limit=${limit}&order=${order}`)
        .then(response => {
            if (list) {
                return [...list, ...response.data];
            }
            else {
                return response.data;
            }
        })
        .catch(error => {

        });

    return {
        type: 'GET_SUPPLIERS_TRANSACTIONS',
        payload: request
    }
}

export function getCustomersTransactions(
    start = 0,
    limit = 0,
    order = 'desc',
    list = ''
) {

    const request = axios.get(`api/getCustomersTransactions?skip=${start}&limit=${limit}&order=${order}`)
        .then(response => {
            if (list) {
                return [...list, ...response.data];
            }
            else {
                return response.data;
            }
        })
        .catch(error => {

        });

    return {
        type: 'GET_CUSTOMERS_TRANSACTIONS',
        payload: request
    }
}

export function getEmployeesTransactions(
    start = 0,
    limit = 0,
    order = 'desc',
    list = ''
) {

    const request = axios.get(`api/getEmployeesTransactions?skip=${start}&limit=${limit}&order=${order}`)
        .then(response => {
            if (list) {
                return [...list, ...response.data];
            }
            else {
                return response.data;
            }
        })
        .catch(error => {

        });

    return {
        type: 'GET_USERS_TRANSACTIONS',
        payload: request
    }
}


export function getActiveSuppliers(
    start = 0,
    limit = 0,
    order = 'desc',
    list = ''
) {
    const request = axios.get(`api/getActiveSuppliers?skip=${start}&limit=${limit}&order=${order}`)
        .then(response => {
            if (list) {
                return [...list, ...response.data];
            }
            else {
                return response.data;
            }
        })
        .catch(error => {

        });

    return {
        type: 'GET_SUPPLIERS',
        payload: request
    }
}


export function getCustomers(
    start = 0,
    limit = 0,
    order = 'desc',
    list = ''
) {

    const request = axios.get(`api/getCustomers?skip=${start}&limit=${limit}&order=${order}`)
        .then(response => {
            if (list) {
                return [...list, ...response.data];
            }
            else {
                return response.data;
            }
        });


    return {
        type: 'GET_CUSTOMERS',
        payload: request
    }
}

export function getCustomerDetails(_id) {
    const request = axios.get(`/api/getCustomerDetails?id=${_id}`)
        .then(response => {
            return response.data;
        })
        .catch(error => {

        });

    return {
        type: 'GET_CUSTOMER_DETAILS',
        payload: request
    }
}

export function getTransactionDetails(_id) {
    const request = axios.get(`/api/getTransactionDetails?id=${_id}`)
        .then(response => {
            // console.log("transaction Details: ", response.data)
            return response.data;
        })
        .catch(error => {
            // console.log("Error transaction Details: ", error)
        });

    return {
        type: 'GET_TRANSACTION_DETAILS',
        payload: request
    }
}


export function getProducts(
    start = 0,
    limit = 0,
    order = 'desc',
    list = ''
) {

    const request = axios.get(`api/getProducts?skip=${start}&limit=${limit}&order=${order}`)
        .then(response => {
            if (list) {
                return [...list, ...response.data];
            }
            else {
                return response.data;
            }
        });
    return {
        type: 'GET_PRODUCTS',
        payload: request
    }
}

//get active Products
export function getActiveProducts(
    start = 0,
    limit = 0,
    order = 'desc',
    list = ''
) {

    const request = axios.get(`api/getActiveProducts?skip=${start}&limit=${limit}&order=${order}`)
        .then(response => {
            if (list) {
                return [...list, ...response.data];
            }
            else {
                return response.data;
            }
        });
    return {
        type: 'GET_PRODUCTS',
        payload: request
    }
}

//get Stock Products
export function getStockProducts(
    start = 0,
    limit = 0,
    order = 'desc',
    list = ''
) {

    const request = axios.get(`api/getStockProducts?skip=${start}&limit=${limit}&order=${order}`)
        .then(response => {
            if (list) {
                return [...list, ...response.data];
            }
            else {
                return response.data;
            }
        });
    return {
        type: 'GET_STOCK_PRODUCTS',
        payload: request
    }
}


//getTransactions
export function getTransactions(
    start = 0,
    limit = 0,
    order = 'desc',
    list = ''
) {

    const request = axios.get(`api/getTransactions?skip=${start}&limit=${limit}&order=${order}`)
        .then(response => {
            if (list) {
                return [...list, ...response.data];
            }
            else {
                return response.data;
            }
        });


    return {
        type: 'GET_TRANSACTIONS',
        payload: request
    }
}

export function getPurchases(
    start = 0,
    limit = 0,
    order = 'desc',
    list = ''
) {
    const request = axios.get(`api/getPurchases?skip=${start}&limit=${limit}&order=${order}`)
        .then(response => {
            if (list) {
                return [...list, ...response.data];
            }
            else {
                return response.data;
            }
        });
    return {
        type: 'GET_PURCHASES',
        payload: request
    }
}

export function getSales(
    start = 0,
    limit = 0,
    order = 'desc',
    list = ''
) {
    const request = axios.get(`api/getSales?skip=${start}&limit=${limit}&order=${order}`)
        .then(response => {
            if (list) {
                return [...list, ...response.data];
            }
            else {
                return response.data;
            }
        });
    return {
        type: 'GET_SALES',
        payload: request
    }
}

export function getSaleProduct(id) {
    const request = axios.get(`/api/getSaleProduct?id=${id}`)
        .then(response => response.data);

    return {
        type: 'GET_SALE',
        payload: request
    }
}




export function saveSupplier(document) {
    const request = axios.post('/api/addSupplier', document)
        .then(response => response.data);
    return {
        type: 'ADD_SUPPLIER',
        payload: request
    }
}

export function savePurchase(purchase) {
    const request = axios.post('/api/addPurchase', purchase)
        .then(response => response.data);
    return {
        type: 'ADD_PURCHASE',
        payload: request
    }
}

export function saveSale(document) {
    const request = axios.post('/api/addSale', document)
        .then(response => response.data);
    return {
        type: 'ADD_SALE',
        payload: request
    }
}

export function updateSaleRefund(data) {
    const request = axios.post(`/api/sale_refund`, data)
        .then(response => response.data);

    return {
        type: 'UPDATE_SALE_REFUND',
        payload: request
    }
}

export function updatePurchase(data) {
    const request = axios.post(`/api/purchase_update`, data)
        .then(response => response.data);

    return {
        type: 'UPDATE_PURCHASE',
        payload: request
    }
}

export function updatePurchasePaid(data) {
    const request = axios.post(`/api/purchase_paid_update`, data)
        .then(response => response.data);

    return {
        type: 'UPDATE_PURCHASE_PAID',
        payload: request
    }
}
export function updateSalePaid(data) {
    const request = axios.post(`/api/sale_paid_update`, data)
        .then(response => response.data);

    return {
        type: 'UPDATE_SALE_PAID',
        payload: request
    }
}

export function saveCustomer(document) {
    const request = axios.post('/api/addCustomer', document)
        .then(response => response.data);
    return {
        type: 'ADD_CUSTOMER',
        payload: request
    }
}

export function saveProduct(document) {
    const request = axios.post('/api/addProduct', document)
        .then(response => response.data);
    return {
        type: 'ADD_PRODUCT',
        payload: request
    }
}

//save transaction
export function saveTransaction(document) {
    const request = axios.post('/api/addTransaction', document)
        .then(response => response.data);
    return {
        type: 'ADD_TRANSACTION',
        payload: request
    }
}

//delete transaction
export function deleteTransaction(id) {
    const request = axios.delete(`/api/delete_transaction?id=${id}`)
        .then(response => response.data);

    return {
        type: 'DELETE_TRANSACTION',
        payload: request
    }
}

export function clearNewTransaction() {
    return {
        type: 'CLEAR_TRANSACTION',
        payload: {}
    }
}


export function clearNewSupplier() {
    return {
        type: 'CLEAR_SUPPLIER',
        payload: {}
    }
}

export function clearNewProduct() {
    return {
        type: 'CLEAR_PRODUCT',
        payload: {}
    }
}
export function clearProfile() {
    return {
        type: 'CLEAR_PROFILE',
        payload: {}
    }
}

export function clearNewCustomer() {
    return {
        type: 'CLEAR_CUSTOMER',
        payload: {}
    }
}

export function clearProduct() {
    return {
        type: 'CLEAR_PRODUCT',
        payload: {}
    }
}

export function clearPurchase() {
    return {
        type: 'CLEAR_PURCHASE',
        payload: {}
    }
}

export function clearSale() {
    return {
        type: 'CLEAR_SALE',
        payload: {}
    }
}
export function clearSupplier() {
    return {
        type: 'CLEAR_SUPPLIER',
        payload: {}
    }
}

export function clearSupplierList() {
    return {
        type: 'CLEAR_SUPPLIER_LIST',
        payload: {}
    }
}

export function clearCustomer() {
    return {
        type: 'CLEAR_CUSTOMER',
        payload: {}
    }
}

export function clearTransaction() {
    return {
        type: 'CLEAR_TRANSACTION',
        payload: {}
    }
}

export function clearCustomerList() {
    return {
        type: 'CLEAR_CUSTOMER_LIST',
        payload: {}
    }
}

export function clearDashboard() {
    return {
        type: 'CLEAR_DASHBOARD',
        payload: {}
    }
}

export function clearUser() {
    return {
        type: 'CLEAR_USER',
        payload: {}
    }
}



export function getDashboardProducts(products) {
    const request = axios.post(`/api/getDashboardProducts`, products)
        .then(response => response.data);

    return {
        type: 'GET_DASHBOARD_PRODUCTS',
        payload: request
    }
}

export function getPurchaseProduct(id) {
    const request = axios.get(`/api/getPurchaseProduct?id=${id}`)
        .then(response => response.data);

    return {
        type: 'GET_PURCHASE',
        payload: request
    }
}

export function updateProduct(data) {
    const request = axios.post(`/api/product_update`, data)
        .then(response => response.data);

    return {
        type: 'UPDATE_PRODUCT',
        payload: request
    }
}

export function updateSupplier(data) {
    const request = axios.post(`/api/supplier_update`, data)
        .then(response => response.data);

    return {
        type: 'UPDATE_SUPPLIER',
        payload: request
    }
}

//get single transaction
export function updateTransaction(data) {
    const request = axios.post(`/api/transaction_update`, data)
        .then(response => response.data);
    // console.log("Data Updated Successfully", data)
    return {
        type: 'UPDATE_TRANSACTION',
        payload: request
    }
}

export function updateCustomer(data) {
    const request = axios.post(`/api/customer_update`, data)
        .then(response => response.data);

    return {
        type: 'UPDATE_CUSTOMER',
        payload: request
    }
}

export function deleteSupplier(id) {
    const request = axios.delete(`/api/delete_supplier?id=${id}`)
        .then(response => response.data);

    return {
        type: 'DELETE_SUPPLIER',
        payload: request
    }
}

export function deleteCustomer(id) {
    const request = axios.delete(`/api/delete_customer?id=${id}`)
        .then(response => response.data);

    return {
        type: 'DELETE_CUSTOMER',
        payload: request
    }
}

/* =========== USER ============== */

export function loginUser({ email, password }) {

    const request = axios.post(`/api/login`, { email, password })
        .then(response => response.data);

    return {
        type: 'USER_LOGIN',
        payload: request
    }
}

export function auth() {
    const request = axios.get('/api/auth')
        .then(response => response.data);

    return {
        type: 'USER_AUTH',
        payload: request
    }
}
export function getProfile() {
    const request = axios.get('/api/profile')
        .then(response => response.data);

    return {
        type: 'USER_PROFILE',
        payload: request
    }
}


export function getUsers(
    start = 0,
    limit = 0,
    order = 'desc',
    list = ''
) {

    const request = axios.get(`api/users?skip=${start}&limit=${limit}&order=${order}`)
        .then(response => {
            if (list) {
                return [...list, ...response.data];
            }
            else {
                return response.data;
            }
        })
        .catch(error => {

        });

    return {
        type: 'GET_USERS',
        payload: request
    }
}


export function userRegister(user) {
    const request = axios.post(`/api/register`, user)
    return (dispatch) => {
        request.then(({ data }) => {
            let response = {
                success: data.success,
                user
            }
            dispatch({
                type: 'USER_REGISTER',
                payload: response
            })
        })
    }
}

export function changePassword(data) {
    const request = axios.post(`/api/change_password`, data)
        .then(response => response.data);

    return {
        type: 'CHANGE_PASSWORD',
        payload: request
    }
}


export function updateUser(user) {
    const request = axios.post(`/api/user_profile_update`, user);

    return (dispatch) => {
        request.then(({ data }) => {
            let response = {
                success: data.success,
                user
            }
            dispatch({
                type: 'UPDATE_USER',
                payload: response
            })
        })
    }
}


export function changeUser(user) {
    const request = axios.post(`/api/userchange`, user);

    return {
        type: 'CHANGE_USER',
        payload: request
    }

}

export function changeUserPassword(user) {
    const request = axios.post(`/api/userchangepwd`, user);

    return {
        type: 'CHANGE_USER_PASSWORD',
        payload: request
    }
}