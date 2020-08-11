import React from 'react';
import { Switch, Route} from 'react-router-dom';
import Login from './components/Login/login';
import Dashboard from './components/Dashboard/dashboard'
import ErrorPage from './components/Errors/error'
import Users from './components/Users/users'
import AddUser from './components/Users/Auth/add'
// import Document from './components/Document/document'
// import Auth from './hoc/auth';
// import BookView from './components/Books/index';
// import Login from './containers/Admin/login';
// import User from './components/Admin';
// import AddReview from "./containers/Admin/add";
// import UserPosts from './components/Admin/userPosts';
// import EditReview from './containers/Admin/edit';
// // import Register from './containers/Admin/register'
//  import Logout from './components/Logout/logout'
// import ResetPassword from './components/ResetPassword/ResetPassword';
// import ForgotPassword from './components/ForgotPassword/ForgotPassword'

const routes = () => {

    return (
    
            <Switch>
                <Route path="/" exact component = {Login}/>
                <Route path="/dashboard" exact component = {Dashboard}/>
                <Route path="/users" exact component = {Users}/>
                <Route path="/users/add" exact component = {AddUser}/>
                <Route component={ErrorPage}/>      
                {/* <Route path="/" exact component = {Auth(Home,null)} />
                <Route path="/documents"  component ={Auth(Dashboard,true)} />
                <Route path="/user/logout" exact component = {Auth(Logout,true)} />
                <Route path="/document/:id/:type?" exact component = {Auth(Document,true)}/> 
                <Route path="/reset" exact component = {ResetPassword} />  
                <Route path="/forgotPassword" exact component = {ForgotPassword} />            
                {/* <Route path="/login" exact component = {Auth(Login,false)} />
                <Route path="/user/logout" exact component = {Auth(Logout,true)} />
                <Route path="/user" exact component = {Auth(User,true)} />
                <Route path="/books/:id" exact component = {Auth(BookView,null)} />
                <Route path="/user/user-reviews" exact component = {Auth(UserPosts,true)} />
                <Route path="/user/add" exact component = {Auth(AddReview,true)} />
                <Route path="/user/register" exact component = {Auth(Register,true)} />
    <Route path="/user/edit-post/:id" exact component = {Auth(EditReview,true)} />  */ }
                
            </Switch>
       
    );
}

export default routes;
