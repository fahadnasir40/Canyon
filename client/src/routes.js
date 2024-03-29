import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Login from './components/Login/login';
import Dashboard from './components/Dashboard/dashboard'
import ErrorPage404 from './components/Errors/error404'
import ErrorPage504 from './components/Errors/error504'
import Users from './components/Users/users'
import UserDetails from './components/Users/userProfile/userProfile';
import AddUser from './components/Users/Auth/add'
import Profile from './components/Profile/profile'
import Auth from './hoc/auth';
import Suppliers from './components/Suppliers/suppliers';
import SupplierDetails from './components/Suppliers/SupplierInfo/supplierInfo';
import AddSupplier from './components/Suppliers/AddSupplier/add';
import EditSupplier from './components/Suppliers/AddSupplier/edit';
import AddPurchases from './components/Purchases/Add/addPurchase';
import Purchases from './components/Purchases/purchase';
import PurchaseInvoice from './components/Purchases/purchaseInvoice';
import Transactions from './components/Transactions/transactions';
import AddTransaction from './components/Transactions/Add/addTransaction';
import EditTransaction from './components/Transactions/Add/editTransaction';
import Policy from './components/PrivacyPolicy/p';
import Sales from './components/Sales/sales';
import AddSale from './components/Sales/Add/addSale';
import SaleInvoice from './components/Sales/saleInvoice';
import Products from './components/Products/products'
import AddProduct from './components/Products/Add/addProduct';
import EditProduct from './components/Products/Add/editProduct';
import Customers from './components/Customers/customers';
import CustomerDetails from './components/Customers/CustomerInfo/customerInfo';
import AddCustomer from './components/Customers/AddCustomer/add';
import EditCustomer from './components/Customers/AddCustomer/edit';
import purchaseReturn from './components/Purchases/Return/purchaseReturn';


const routes = () => {

    return (
        <Switch>
            <Route path="/" exact component={Auth(Login, false)} />
            <Route path="/dashboard" exact component={Auth(Dashboard, true, false)} />
            <Route path="/users" exact component={Auth(Users, true)} />
            <Route path="/userInfo" exact component={Auth(UserDetails, true)} />
            <Route path="/add" exact component={Auth(AddUser, true)} />
            <Route path="/products" exact component={Auth(Products, true)} />
            <Route path="/addProduct" exact component={Auth(AddProduct, true)} />
            <Route path="/editProduct" exact component={Auth(EditProduct, true)} />
            <Route path="/transactions" exact component={Auth(Transactions, true)} />
            <Route path="/addTransaction" exact component={Auth(AddTransaction, true)} />
            <Route path="/editTransaction" exact component={Auth(EditTransaction, true)} />
            <Route path="/customers" exact component={Auth(Customers, true, true)} />
            <Route path="/customerInfo" exact component={Auth(CustomerDetails, true, true)} />
            <Route path="/addCustomer" exact component={Auth(AddCustomer, true)} />
            <Route path="/editCustomer" exact component={Auth(EditCustomer, true)} />
            <Route path="/suppliers/" exact component={Auth(Suppliers, true)} />
            <Route path="/supplierInfo" exact component={Auth(SupplierDetails, true)} />
            <Route path="/addSupplier" exact component={Auth(AddSupplier, true)} />
            <Route path="/editSupplier" exact component={Auth(EditSupplier, true)} />
            <Route path="/purchases" exact component={Auth(Purchases, true)} />
            <Route path="/addpurchase" exact component={Auth(AddPurchases, true)} />
            <Route path="/purchaseReturn" exact component={Auth(purchaseReturn, true)} />
            <Route path="/purchase_invoice_id=:id" exact component={Auth(PurchaseInvoice, true)} />
            <Route path="/orders" exact component={Auth(Sales, true, true)} />
            <Route path="/addSale" exact component={Auth(AddSale, true, true)} />
            <Route path="/sale_invoice_id=:id" exact component={Auth(SaleInvoice, true, true)} />
            <Route path="/profile" exact component={Auth(Profile, true, true)} />
            <Route path="/privacy_and_policy" exact component={Policy} />
            <Route path="/error" exact component={ErrorPage504} />
            <Route component={ErrorPage404} />
        </Switch>
    )
}

export default routes;
