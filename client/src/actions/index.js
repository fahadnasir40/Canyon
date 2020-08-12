import axios from 'axios';

export function getBooks(
    start = 0,
    limit = 10,
    order = 'asc',
    list = ''
){

    const request = axios.get(`api/books?skip=${start}&limit=${limit}&order=${order}`)
    .then(response => {
        if(list){
            return [...list,...response.data];
        }
        else{
            return response.data;
        }
    } );


    return {
        type: 'GET_BOOKS',
        payload: request
    }
}

export function getBookWithReviewer(id){
    const request = axios.get(`/api/getBook?id=${id}`)

    return (dispatch)=>{
        request.then(({data})=>{
            let book = data;
           
            axios.get(`/api/getReviewer?id=${book.ownerId}`)
            .then(({data})=>{
                let response = {
                    book,
                    reviewer:data
                }
               
                dispatch({
                    type:'GET_BOOK_W_REVIEWER',
                    payload:response
                })
            })
            .catch(err =>{
                console.log("Error getting reviewer data. "+err);
            })
        })
        .catch(err=>{
            console.log(err);
        })
    }
}

export function clearBookWithReviewer(){
    return {
        type: 'CLEAR_BOOK_W_REVIEWER',
        payload: {
            book: {},
            reviewer: {}
        }
    }
}



export function addBook(book){
    const request = axios.post('/api/book',book)
        .then(response => response.data);
    return {
        type:'ADD_BOOK',
        payload:request
    }
}

export function addDocument(document){
    const request = axios.post('/api/document',document)
        .then(response => response.data);
    return {
        type:'ADD_DOCUMENT',
        payload:request
    }
}

export function clearNewBook() {
    return {
        type:'CLEAR_NEWBOOK',
        payload:{}
    }
}


export function getDocument(id){ 
   
    const request = axios.get(`/api/getDocument?id=${id}`)
                    .then(response => response.data);

    return{
        type: 'GET_DOCUMENT',
        payload: request
    }
}

export function getSharedDocuments(){
    const request = axios.get(`/api/shared_documents`)
    .then(response => response.data);

    return{
        type: 'GET_SHARED_DOCUMENT',
        payload: request
    }
}

export function inviteUser(document){
    const request = axios.post('/api/invite', document)
        .then(response => response.data);
    return {
        type:'INVITE_USER',
        payload: request
    }
}

export function getUserDocuments(userId){
    const request = axios.get(`/api/user_documents?user=${userId}`)
                    .then(response => response.data)
                        
    return {
        type:'GET_USER_DOCUMENTS',
        payload:request
    }
}

export function getBook(id){    
    const request = axios.get(`/api/getBook?id=${id}`)
                    .then(response => response.data);

    return{
        type: 'GET_BOOK',
        payload: request
    }
}

export function updateDocument(data){
    const request = axios.post(`/api/document_update`,data)
                    .then(response => response.data);

    return{
        type: 'UPDATE_BOOK',
        payload: request
    }
}

export function updateBook(data){
    const request = axios.post(`/api/book_update`,data)
                    .then(response =>response.data);

    return{
        type: 'UPDATE_BOOK',
        payload: request
    }
}

export function deleteBook(id){
    const request = axios.delete(`/api/delete_book?id=${id}`)
    .then(response =>response.data);

    return{
        type: 'DELETE_BOOK',
        payload: request
    }
}

export function clearBook(){
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

export function loginUser({email,password}){
    
    const request = axios.post(`/api/login`,{email,password})
    .then(response => response.data);
    
    return{
        type: 'USER_LOGIN',
        payload: request
    }
}

export function auth(){
    const request = axios.get('/api/auth')
        .then(response => response.data);
    
    return {
        type: 'USER_AUTH',
        payload: request
    }
}

export function getUsers(){

    const request = axios.get('/api/users')
    .then(response => response.data);

    return {
       type: 'GET_USERS',
        payload: request
    }

}

export function userRegister(user){
    const request = axios.post(`/api/register`,user)

    
    return (dispatch) =>{
        console.log("Returning")
        request.then(({data})=>{
            let response = {
                success:data.success,
                user
            }
            dispatch({
                type:'USER_REGISTER',
                payload:response
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