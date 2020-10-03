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
            console.log(error)
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
            console.log(error)
        });

    return {
        type: 'GET_SUPPLIER',
        payload: request
    }
}

export function getSupplierDetails(_id) {
    const request = axios.get(`/api/getSupplierDetails?id=${_id}`)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            console.log(error)
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
            console.log(error)
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
            console.log(error)
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
            console.log(error)
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
            console.log(error)
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
    order = 'asc',
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

export function getBookWithReviewer(id) {
    const request = axios.get(`/api/getBook?id=${id}`)

    return (dispatch) => {
        request.then(({ data }) => {
            let book = data;

            axios.get(`/api/getReviewer?id=${book.ownerId}`)
                .then(({ data }) => {
                    let response = {
                        book,
                        reviewer: data
                    }

                    dispatch({
                        type: 'GET_BOOK_W_REVIEWER',
                        payload: response
                    })
                })
                .catch(err => {
                    console.log("Error getting reviewer data. " + err);
                })
        })
            .catch(err => {
                console.log(err);
            })
    }
}

export function clearBookWithReviewer() {
    return {
        type: 'CLEAR_BOOK_W_REVIEWER',
        payload: {
            book: {},
            reviewer: {}
        }
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

export function clearCustomerList() {
    return {
        type: 'CLEAR_CUSTOMER_LIST',
        payload: {}
    }
}

export function clearNewBook() {
    return {
        type: 'CLEAR_NEWBOOK',
        payload: {}
    }
}



export function getSharedDocuments() {
    const request = axios.get(`/api/shared_documents`)
        .then(response => response.data);

    return {
        type: 'GET_SHARED_DOCUMENT',
        payload: request
    }
}

export function inviteUser(document) {
    const request = axios.post('/api/invite', document)
        .then(response => response.data);
    return {
        type: 'INVITE_USER',
        payload: request
    }
}

export function getUserDocuments(userId) {
    const request = axios.get(`/api/user_documents?user=${userId}`)
        .then(response => response.data)

    return {
        type: 'GET_USER_DOCUMENTS',
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

export function getBook(id) {
    const request = axios.get(`/api/getBook?id=${id}`)
        .then(response => response.data);

    return {
        type: 'GET_BOOK',
        payload: request
    }
}

export function updateDocument(data) {
    const request = axios.post(`/api/document_update`, data)
        .then(response => response.data);

    return {
        type: 'UPDATE_BOOK',
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

export function clearBook() {
    return {
        type: 'CLEAR_BOOK',
        payload: {
            book: null,
            updatBook: false,
            postDeleted: false
        }
    }
}

// export function downloadPdf(id,title){

//     const request = axios.get(`/api/pdf?id=${id}`,{responseType: 'blob'})
//     .then(response => {
//         const pdfBlob = new Blob([response.data], { type: 'application/pdf' }); 
//         saveAs(pdfBlob,title+".pdf");
//             return response.data}        
//         );

//     return{
//         type: 'DOWNLOAD_DOCUMENT',
//         payload: request
//     }
// }

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


export function getUsers() {

    const request = axios.get('/api/users')
        .then(response => response.data);

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
    // return (dispatch) =>{
    //     request.then(({data})=>{
    //         let response = {
    //             success:data.success,
    //             user
    //         }
    //         dispatch({
    //             type:'USER_PASSCHANGE',
    //             payload:response
    //         })
    //     })
    // }
}


export function updateUser(user) {
    const request = axios.post(`/api/user_update`, user);

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
// export function createAndDownloadPdf(){

//     const request = axios.post('/api/create-pdf', "<p>Hello</p><h1>World</h1>")
//       .then(() => axios.get('/api/fetch-pdf', { responseType: 'blob' }))
//       .then((res) => {
//         const pdfBlob = new Blob([res.data], { type: 'application/pdf' });

//         saveAs(pdfBlob, 'newPdf.pdf');
//       })
// }