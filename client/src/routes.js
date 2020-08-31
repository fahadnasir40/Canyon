import React from 'react';
import { Switch, Route} from 'react-router-dom';

import Login from './components/Login/login';
import Dashboard from './components/Dashboard/dashboard'
import ErrorPage404 from './components/Errors/error404'
import ErrorPage504 from './components/Errors/error504'
import Users from './components/Users/users'
import Products from './components/Products/products'
import AddUser from './components/Users/Auth/add'
import Profile from './components/Profile/profile'
import Auth from './hoc/auth';
import Customers from './components/Customers/customers';
import Suppliers from './components/Suppliers/suppliers';
import Purchases from './components/Purchases/Add/addPurchase';
// import Purchases from './components/Purchases/purchases';
import AddPurchases from './components/Purchases/Wizards/WizardFormFirstPage';
import Transactions from './components/Transactions/Transactions';
// import AddTransaction from './components/Transactions/Add/addTransaction';
import Sales from './components/Sales/sales';
import AddSupplier from './components/Suppliers/AddSupplier/add';
import AddProduct from './components/Products/Add/addProduct';
import EditSupplier from './components/Suppliers/AddSupplier/edit';
import SupplierDetails from './components/Suppliers/SupplierInfo/supplierInfo';
import AddCustomer from './components/Customers/AddCustomer/add';
import EditCustomer from './components/Customers/AddCustomer/edit';
import CustomerDetails from './components/Customers/CustomerInfo/customerInfo';


const routes = () => {

    return (
        <Switch>
            <Route path="/dashboard" exact component ={Auth(Dashboard,true)}/>
            <Route path="/" exact  component = {Auth(Login,false)}/>
                <Route path="/users" exact component ={Auth(Users,true)}/>
                <Route path="/add" exact component ={Auth(AddUser,true)}/>
                <Route path="/products" exact component ={Auth(Products,true)}/>
                <Route path="/addProduct" exact component ={Auth(AddProduct,true)}/>
                <Route path="/customers" exact component ={Auth(Customers,true)}/>
                <Route path="/customerInfo" exact component ={Auth(CustomerDetails,true)}/>                
                <Route path="/addCustomer" exact component ={Auth(AddCustomer,true)}/>                
                <Route path="/editCustomer" exact component ={Auth(EditCustomer,true)}/>
                <Route path="/suppliers/" exact component ={Auth(Suppliers,true)}/>
                <Route path="/supplierInfo" exact component ={Auth(SupplierDetails,true)}/>
                <Route path="/addSupplier" exact component ={Auth(AddSupplier,true)}/>
                <Route path="/editSupplier" exact component ={Auth(EditSupplier,true)}/>
                <Route path="/purchases" exact component ={Auth(Purchases,true)}/>
                <Route path="/addpurchases" exact component ={Auth(AddPurchases,true)}/>
                <Route path="/Transactions" exact component ={Auth(Transactions,true)}/>
                <Route path="/sales" exact component ={Auth(Sales,true)}/>
                <Route path="/profile" exact component ={Auth(Profile,true)}/>
                <Route path="/error" exact component={ErrorPage504}/> 
                <Route component={ErrorPage404}/>  
       </Switch>
    )
}

export default routes;
