import React, { Component } from "react";
import Header from "../../Header/header";
import Sidebar from "../../Sidebar/sidebar";
import Footer from "../../Footer/footer";
import { saveSale, clearSale } from '../../../actions';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { getActiveProducts, saveTransaction, getCustomers } from '../../../actions';
import Moment from 'react-moment';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class AddSale extends Component {


    state = {

        description: 'Sale Order',
        customersList: '',
        rate: 0,
        productsList: '',
        currentCustomer: '',
        currentProduct: '',
        saleDate: new Date(),
        itemsSelected: [],
        description: '',
        address: '',
        loading: false,
        valid: false,
        request: false,
        redirect: false,
        error: '',
        itemsList: [],
        Quantityrec: 0,
        Quantitydel: 0,
        excessBottles: 0,
        discount: 0,
        paymethod: 'Cash',
        secpaid: '',
        customerlimit: 0,
        totalAmount: 0,
        paidAmount: 0,
        secamount: 0,
        secLessAmount: 0,
        customerBottles: 0,
        secPaidAmount: 0
    }

    products = [];

    addItemRow = () => {
        var itemsList = [...this.state.itemsList];

        itemsList.push({
            uom: 'N/A',
            customerlimit: 0,
            rate: 0,
            qtyrec: 0,
            qtydel: 0,
            excessBottles: 0,
            discount: 0,
            Quantitydel: 0,
            Quantityrec: 0,
            totalAmount: 0,
            ptotal: 0,
            paymethod: 'Cash',
            secpaid: 0,
            total: 0,
            currentProduct: '',
            secLessAmount: 0,
            secRate: 0
        })
        this.setState({
            count: this.state.count + 1,
            itemsList
        })
    }

    clearAllItems = () => {
        this.setState({
            itemsList: [],
            Quantityrec: 0,
            Quantitydel: 0,
            excessBottles: 0,
            discount: 0,
            paymethod: 'Cash',
            secpaid: '',
            customerlimit: 0,
            totalAmount: 0,
            paidAmount: 0,
            secamount: 0,
            secLessAmount: 0,
            customerBottles: 0,
            secPaidAmount: 0

        })
    }

    removeSelectedItem = (index) => {
        let itemsArray = this.state.itemsList;

        itemsArray.splice(index, 1);
        this.setState({ itemsList: itemsArray });
    }

    handleProductDropdown = (event, key) => {
        let items = this.state.itemsList;

        if (this.props.productsList) {
            if (Number(event.target.value) === -1 && items[key].currentProduct) {
                items[key].currentProduct = ''
                this.setState({
                    itemsList: items
                })
            }
            else {
                items[key].currentProduct = this.props.productsList[event.target.value];
                if (items[key].currentProduct.sku === "CN19LL") {
                    items[key].currentProduct.customerLimit = this.state.currentCustomer.customerLimit
                    items[key].customerBottles = this.state.currentCustomer.customerBottles
                    items[key].Quantityrec = 0
                    items[key].secRate = items[key].currentProduct.price.cost_security
                }
                this.setState({
                    itemsList: items
                })
            }
            const rate = this.getProductRate(items[key].currentProduct)
            items[key].rate = rate

            this.setState({
                itemsList: items
            })
        }
    }

    getProductRate = (currentProduct) => {

        if (currentProduct) {
            let items = this.state.itemsList;
            if (this.state.currentCustomer.flatRate === true) {
                if (Number(currentProduct.price.cost_flatRate)) {
                    return currentProduct.price.cost_flatRate;
                }
                else {
                    return currentProduct.price.total;
                }
            }
            else if (this.state.currentCustomer.salePrice.find(x => x._id === currentProduct._id)) {
                return this.state.currentCustomer.salePrice.find(x => x._id === currentProduct._id).rate;
            }
            else {
                return currentProduct.price.total;
            }
        }
        else
            return 'N/A'

    }

    handleInputQuantityrec = (currentProduct, event, key) => {

        let items = this.state.itemsList;
        if (currentProduct) {
            if (currentProduct.sku !== "O19L") {
                if (Number(event.target.value) <= Number(this.state.currentCustomer.customerBottles) && Number(event.target.value) >= 0) {
                    items[key].Quantityrec = Number(event.target.value);
                    this.setState({ itemsList: items })
                }
            }
            else {
                if (currentProduct.sku === "O19L" && items[key].paymethod !== 'Cash') {
                    const item = items.find(x => x.currentProduct.sku === 'CN19LL');

                    const excessBottles = item.excessBottles;
                    const paidBottles = item.secpaid;

                    if (currentProduct.price.cost_security && event.target.value <= (excessBottles - paidBottles)) {

                        if (items[key].paymethod === 'Bottle Exchange with Buffering Charges') {
                            if ((this.state.secPaidAmount - (Number(currentProduct.price.cost_security) + 100) >= 0))
                                this.setState({ secamount: this.state.secPaidAmount - (((Number(currentProduct.price.cost_security) + 100) * (Number(event.target.value) + Number(item.secpaid)))) })
                            else
                                this.setState({ secamount: 0 })
                        }
                        else if (items[key].paymethod === 'Bottle Exchange without Buffering Charges') {
                            if ((this.state.secPaidAmount - (Number(currentProduct.price.cost_security) * event.target.value) >= 0))
                                this.setState({ secamount: (this.state.secPaidAmount - (Number(currentProduct.price.cost_security) * (Number(event.target.value) + Number(item.secpaid)))) })
                            else
                                this.setState({ secamount: 0 })
                        }
                    }

                    if (Number(event.target.value) <= (excessBottles - paidBottles)) {

                        items[key].Quantityrec = Number(event.target.value);
                        this.setState({ itemsList: items })
                    }
                }
                else {
                    items[key].Quantityrec = event.target.value;
                    this.setState({ itemsList: items })
                }
            }
        }
    }

    handleInputQuantitydel = (currentProduct, event, key) => {
        if (currentProduct) {
            if (currentProduct.stock >= event.target.value && Number(event.target.value) >= 0) {
                let items = this.state.itemsList;
                let rate = 0;
                let bottlesExcess = 0;
                let securityPaid = 0;
                items[key].Quantitydel = event.target.value;

                if (currentProduct.sku === "CN19LL") {
                    bottlesExcess = Number(event.target.value) - currentProduct.customerLimit;
                    securityPaid = bottlesExcess;
                    if (bottlesExcess > 0) {
                        items[key].excessBottles = bottlesExcess
                        items[key].secpaid = securityPaid

                        this.calculateSecurity(securityPaid, items, currentProduct, key);
                    }
                    else {
                        items[key].excessBottles = 0
                        items[key].secpaid = 0
                        this.calculateSecurity(0, items, currentProduct, key);
                    }
                }
                rate = Number(this.getProductRate(currentProduct)) * Number(items[key].Quantitydel)
                items[key].totalAmount = rate

                this.setState({ itemsList: items })
            }
        }
        this.calculateTotal();
    }

    disableSecCheck = (currentProduct) => {
        if (currentProduct.sku === "CN19LL") {
            return false
        }
        else
            return true;
    }

    handleInputDiscount = (event, key) => {
        if (Number(event.target.value) >= 0) {
            let items = this.state.itemsList;
            let tamount = this.getProductRate(items[key].currentProduct) * Number(items[key].Quantitydel);
            items[key].discount = event.target.value;
            items[key].totalAmount = tamount - items[key].discount;
            if (items[key].totalAmount >= 0) {
                this.setState({ itemsList: items, paidAmount: this.state.totalAmount })
                this.calculateTotal();
            }
        }
    }

    handleInputPaymentMethod = (event, key) => {
        let items = this.state.itemsList;
        items[key].paymethod = event.target.value;
        items[key].Quantitydel = 0;
        this.setState({ itemsList: items })
    }

    handleInputSecurityPaid = (currentProduct, event, key) => {
        let items = this.state.itemsList;
        this.calculateSecurity(event.target.value, items, currentProduct, key);

        this.calculateTotal();
    }

    calculateSecurity = (value, items, currentProduct, key) => {
        if (currentProduct.sku === "O19L" && items[key].paymethod !== 'Cash') {
            // if (item.paymethod !== 'Cash') {

            const item = items.find(x => x.currentProduct.sku === 'O19L');
            const paidBottles = item.Quantityrec;
            if (value <= (items[key].excessBottles - paidBottles) && value >= 0) {
                items[key].secpaid = Number(value) + Number(paidBottles);
                items[key].secamount = (Number(currentProduct.price.cost_security) * (Number(items[key].excessBottles) - Number(items[key].secpaid)));
                // console.log("Updating Sec Paid Amount", Number(currentProduct.price.cost_security) * (Number(event.target.value)))
                this.setState({ itemsList: items, secPaidAmount: Number(currentProduct.price.cost_security) * (Number(items[key].excessBottles)) })
            }
        }
        else {
            if (value <= (items[key].excessBottles) && value >= 0) {
                items[key].secpaid = value;
                items[key].secamount = Number(currentProduct.price.cost_security) * (Number(items[key].excessBottles) - Number(items[key].secpaid));
                // console.log("Updating Sec Paid Amount", Number(currentProduct.price.cost_security) * (Number(event.target.value)))
                this.setState({ itemsList: items, secPaidAmount: Number(currentProduct.price.cost_security) * (Number(items[key].excessBottles)) })
            }
        }
    }


    handleInputPaidAmount = (event) => {
        if (event.target.value <= Number(this.state.totalAmount) && event.target.value >= 0) { this.setState({ paidAmount: event.target.value }) }
    }


    calculateTotal = () => {
        let total = 0;
        let sectotal = 0;
        let disctotal = 0;

        //calculate total unpaid amount
        this.state.itemsList.forEach(element => {
            if (element.totalAmount) {
                total += element.totalAmount
            }
        });

        //calculate total unpaid security 
        this.state.itemsList.forEach(element => {
            if (element.secamount) {
                sectotal += element.secamount
            }
        });

        //calculate total discount
        this.state.itemsList.forEach(element => {
            if (element.discount) {
                disctotal += element.discount
            }
        });

        this.setState({
            secamount: sectotal,
            discount: disctotal,
            totalAmount: Number(total),
            paidAmount: Number(total)
        })
    }

    componentDidMount() {
        this.props.dispatch(getCustomers())
        this.props.dispatch(getActiveProducts())
    }

    componentWillUnmount() {
        this.props.dispatch(clearSale());
    }

    static getDerivedStateFromProps(nextProps, prevState) {

        if (nextProps.customersList !== prevState.customersList) {
            return {
                customersList: nextProps.customersList
            }
        }
        if (nextProps.productsList !== prevState.productsList) {
            return {
                productsList: nextProps.productsList
            }
        }

        if (nextProps.sale) {
            if (nextProps.sale.post) {
                if (nextProps.sale.post === true) {

                    return ({
                        redirect: true,
                        request: false,
                        loading: false
                    })
                }
            }
        }

        return null;
    }

    handleInputDropdown = (event) => {

        if (this.state.customersList && event.target.value != -1) {
            this.setState({
                currentCustomer: this.state.customersList[event.target.value],
                address: this.state.customersList[event.target.value].address[0]
            });
        }
        else if (event.target.value == -1) {
            this.clearAllItems();
            this.setState({ currentCustomer: '' })
        }
    }

    handleInputDescription = (event) => {
        this.setState({ description: event.target.value })
    }

    handleInputAddress = (event) => {
        this.setState({ address: this.state.currentCustomer.address[event.target.value] })
    }

    handleInputDate = date => {
        this.setState({
            saleDate: date
        });
    };

    getCurrentDate = () => {
        const date = new Date();
        return (<Moment format="MMM DD, YYYY">{date}</Moment>)
    }

    submitForm = () => {
        if (!this.state.currentCustomer) {
            this.setState({
                error: 'Customer and address must be selected.'
            })
        }
        else {
            this.products = this.state.itemsList;
            this.paidAmount = this.state.paidAmount;
            this.totalAmount = this.state.totalAmount;

            if (this.products.length > 0) {

                let sale = {
                    customerId: this.state.currentCustomer._id,
                    customerName: this.state.currentCustomer.name,
                    customerAddress: this.state.address,
                    description: this.state.description,
                    saleDate: this.state.saleDate,
                    addedBy: this.props.user.login.id,
                    totalAmount: Number(this.totalAmount),
                    secAmount: this.state.secamount,
                    paidAmount: this.paidAmount
                }

                if (sale.paidAmount < sale.totalAmount)
                    sale.status = 'Pending';
                else
                    sale.status = 'Complete';

                let productDetails = [];
                let bottlesWithCustomer = 0;
                let custExBottles = 0;

                this.products.forEach(item => {

                    if (item.currentProduct.sku === "CN19LL") {
                        // bottlesWithCustomer = (Number(this.state.currentCustomer.customerBottles) - (Number(item.Quantityrec) - Number(item.Quantitydel)))
                        bottlesWithCustomer = (Number(item.Quantitydel) - (Number(item.Quantityrec)))
                        custExBottles += Number(item.excessBottles)
                    }

                    productDetails.push({
                        _id: item.currentProduct._id,
                        puom: item.currentProduct.uom,
                        pname: item.currentProduct.name,
                        pprice: Number(item.rate),
                        rqty: Number(item.Quantityrec),
                        dqty: Number(item.Quantitydel),
                        disc: Number(item.discount),
                        pmethod: item.paymethod,
                        secpaid: Number(item.secpaid),
                        ptotal: item.totalAmount,
                        secRate: Number(item.secRate)

                    });
                });

                const totalPaidAmount = Number(this.state.paidAmount) + Number(this.state.secPaidAmount) - Number(this.state.secamount);

                sale = { ...sale, custExBottles, bottlesWithCustomer, productDetails, totalPaidAmount };
                if (this.state.request === false) {
                    this.props.dispatch(saveSale(sale));
                    this.setState({ request: true, loading: true })
                }
            }
        }
    }

    checkValid = () => {
        if (this.state.itemsList.length > 0 && this.state.currentCustomer) {

            if (this.state.itemsList.some(item => {
                if (!item.currentProduct) {
                    return true;
                }
                if (item.Quantitydel == 0 && item.Quantityrec == 0) {
                    return true;
                }
            })) return true;
            return false;
        }

        return true;
    }

    getPaymentMethod = (item, key) => {

        if (item.currentProduct.sku === 'O19L') {
            const item = this.state.itemsList.find(x => x.currentProduct.sku === 'CN19LL');
            if (item) {
                if (item.Quantitydel > 0 && item.excessBottles > 0) {
                    return (
                        <select className="form-control" data-search="on" onChange={(event) => { this.handleInputPaymentMethod(event, key) }}>
                            <option value={"Cash"}>Cash</option>
                            <option value={"Bottle Exchange with Buffering Charges"}>Bottle Exchange with buffering</option>
                            <option value={"Bottle Exchange without Buffering Charges"}>Bottle Exchange without buffering</option>
                        </select>

                    )
                }
            }
        }

        return (
            <select className="form-control" data-search="on" onChange={(event) => { this.handleInputPaymentMethod(event, key) }}>
                <option value={"Cash"}>Cash</option>
            </select>

        )

    }

    renderBody = () => {
        let currentProduct = this.state.currentProduct;
        return (
            <div className="container mt-5">
                <div className="card ml-md-5">
                    <div className="card-inner">
                        <div className="card-head mt-1">
                            <h4 className="ff-base fw-medium">Add Sale</h4>
                        </div>
                        <form className="form-validate">
                            <div className="row g-4">
                                <div className="col-lg-6 order-md-last">
                                    <div className="d-flex justify-content-end" >
                                        <span>Sale Date   <DatePicker
                                            selected={this.state.saleDate}
                                            onChange={this.handleInputDate}
                                            dateFormat={'dd-MMM-yyyy'}
                                            className="form-control"
                                        /></span>
                                    </div>
                                </div>
                                <div className="col-lg-4 ">
                                    <div className="form-control-wrap">
                                        <div className="form-group">
                                            <label className="form-label" htmlFor="description">Sale Description</label>
                                            <div className="form-control-wrap">
                                                <input type="text" value={this.state.description} onChange={this.handleInputDescription} maxLength={1000} className="form-control" id="description" placeholder="Enter sale description (Optional)" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row g-4">
                                <div className="col-lg-4">
                                    <div className="form-group">
                                        <label className="form-label" htmlFor="supplier">Customer</label>
                                        <div className="form-control-wrap ">
                                            <div className="form-control-select">
                                                <select required onChange={this.handleInputDropdown} className="form-control ccap" id="customer">
                                                    <option value={-1}> Select Customer</option>
                                                    {
                                                        this.state.customersList ?
                                                            this.state.customersList.map((item, key) => {
                                                                return <option key={key} value={key} className="ccap" >{item.name}</option>;
                                                            })
                                                            : null
                                                    }
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {
                                    this.state.currentCustomer ?
                                        <div className="col-lg-4">
                                            <div className="form-group">
                                                <label className="form-label" htmlFor="address">Address</label>
                                                <div className="form-control-wrap ">
                                                    <div className="form-control-select">
                                                        <select required onChange={this.handleInputAddress} className="form-control ccap" id="address" data-search="on">
                                                            {
                                                                this.state.customersList ?
                                                                    this.state.currentCustomer.address.map((item, key) => {
                                                                        return <option key={key} value={key} className="ccap" >{item.name}</option>;
                                                                    }) : null
                                                            }
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                        </div> : null
                                }
                            </div>
                            <div id="accordion-2" className="accordion accordion-s3 mt-4">
                                <div className="nk-block nk-block-lg">
                                    <div className="nk-block-head">
                                        <div className="nk-block-head-content">
                                            <ul className="nk-block-tools-opt">
                                                {
                                                    this.state.currentCustomer ?
                                                        <div onClick={this.addItemRow} className="btn btn-primary"><em className="icon ni ni-plus"></em><span>Add Item</span></div>
                                                        : null
                                                }
                                                {
                                                    this.state.itemsList.length > 0 ?
                                                        <div className="d-flex justify-content-end text-primary " ><span style={{ cursor: "pointer" }} onClick={this.clearAllItems}>Clear all items</span></div>
                                                        : null
                                                }
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <ul className="nav nav-tabs">
                                    <li className="nav-item">
                                        <a className="nav-link active" data-toggle="tab" href="#tabItem1">Products Detail</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" data-toggle="tab" href="#tabItem2">Transaction</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" data-toggle="tab" href="#tabItem3">Payment</a>
                                    </li>
                                </ul>
                                <div className="tab-content">
                                    <div className="tab-pane active" id="tabItem1">
                                        <div className="card card-preview ">
                                            <div className="table-responsive">
                                                <table className="table">
                                                    <thead className="border-top">
                                                        <tr>
                                                            <th scope="col">#</th>
                                                            <th scope="col">Item Name</th>
                                                            <th scope="col">UOM</th>
                                                            <th scope="col">Bottles With Customer</th>
                                                            <th scope="col">Customer Limit</th>
                                                            <th scope="col">Rate</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            this.state.itemsList.map((item, key) => {
                                                                return (
                                                                    <tr>
                                                                        <td scope="row">
                                                                            <span className="text-primary">{key + 1}</span>
                                                                        </td>
                                                                        <td>
                                                                            <div className="d-none d-md-block">
                                                                                <div className="form-control-wrap">
                                                                                    <div className="form-control-select">
                                                                                        <select className="form-control" onChange={(event) => { this.handleProductDropdown(event, key) }} data-search="on">
                                                                                            <option value={-1}>Select Item</option>
                                                                                            {
                                                                                                this.state.currentCustomer ?
                                                                                                    this.props.productsList ?
                                                                                                        this.props.productsList.map((item, key) => {
                                                                                                            return <option key={key} value={key} className="ccap" disabled={(item.stock === 0 && item.sku !== 'O19L' || this.state.itemsList.find(x => x.currentProduct ? x.currentProduct._id === item._id : null)) ? true : false}>{item.stock === 0 && item.sku !== 'O19L' ? item.name + ' (Out of stock)' : item.name}</option>;
                                                                                                        })
                                                                                                        : null
                                                                                                    : null
                                                                                            }
                                                                                        </select>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div className="d-sm-block d-md-none ">
                                                                                <div className="form-control-wrap">
                                                                                    <div >
                                                                                        <select onChange={(event) => { this.handleProductDropdown(event, key) }} data-search="on">
                                                                                            <option value={-1}>Select Item</option>
                                                                                            {
                                                                                                this.state.currentCustomer ?
                                                                                                    this.props.productsList ?
                                                                                                        this.props.productsList.map((item, key) => {
                                                                                                            return <option key={key} value={key} className="ccap" disabled={(item.stock === 0 && item.sku !== 'O19L' || this.state.itemsList.find(x => x.currentProduct ? x.currentProduct._id === item._id : null)) ? true : false}>{item.stock === 0 && item.sku !== 'O19L' ? item.name + ' (Out of stock)' : item.name}</option>;
                                                                                                        })
                                                                                                        : null
                                                                                                    : null
                                                                                            }
                                                                                        </select>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </td>

                                                                        <td>{item.currentProduct ? item.currentProduct.uom : 'N/A'}</td>
                                                                        <td>{this.state.currentCustomer ? item.currentProduct.sku == "CN19LL" ? this.state.currentCustomer.customerBottles : 'N/A' : 0}</td>
                                                                        <td>{item.currentProduct.customerLimit ? item.currentProduct.customerLimit : 'N/A'}</td>
                                                                        <td>{this.getProductRate(item.currentProduct)}</td>
                                                                    </tr>
                                                                )
                                                            })
                                                        }
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="tab-pane" id="tabItem2">
                                        <div className="card card-preview ">
                                            <div className="table-responsive">
                                                <table className="table">
                                                    <thead className="border-top">
                                                        <tr>
                                                            <th scope="col">#</th>
                                                            <th scope="col">Item Name</th>
                                                            <th scope="col">Current Stock</th>
                                                            <th scope="col">Qty. Rec</th>
                                                            <th scope="col">Qty. Del</th>
                                                            <th scope="col">Payment Method</th>
                                                            <th scope="col">Excess</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            this.state.itemsList.map((item, key) => {
                                                                return (
                                                                    <tr>
                                                                        <td scope="row">
                                                                            <span className="text-primary">{key + 1}</span>
                                                                        </td>
                                                                        <td>
                                                                            <span>{item.currentProduct.name ? item.currentProduct.name : 'N/A'}</span>
                                                                        </td>
                                                                        <td>
                                                                            <span>{item.currentProduct.stock ? item.currentProduct.stock : 'N/A'}</span>
                                                                        </td>
                                                                        <td>
                                                                            <input type="number" min={0} value={item.Quantityrec} onChange={(event) => { this.handleInputQuantityrec(item.currentProduct, event, key) }} className="form-control d-none d-md-block" id="quantityrec" placeholder={0} disabled={item.currentProduct.sku === 'CN19LL' || item.currentProduct.sku === 'O19L' ? false : true} />
                                                                            <input type="number" min={0} value={item.Quantityrec} onChange={(event) => { this.handleInputQuantityrec(item.currentProduct, event, key) }} className="d-sm-inline-flex d-md-none" id="quantityrec" placeholder={0} disabled={item.currentProduct.sku === 'CN19LL' || item.currentProduct.sku === 'O19L' ? false : true} />
                                                                        </td>
                                                                        <td>
                                                                            <input type="number" min={0} max={item.currentProduct.stock} value={item.Quantitydel} onChange={(event) => { this.handleInputQuantitydel(item.currentProduct, event, key) }} className="form-control d-none d-md-block" id="quantitydel" placeholder={0} disabled={item.paymethod == 'Cash' ? false : true} />
                                                                            <input type="number" min={0} max={item.currentProduct.stock} value={item.Quantitydel} onChange={(event) => { this.handleInputQuantitydel(item.currentProduct, event, key) }} className="d-sm-inline d-md-none" id="quantitydel" placeholder={0} disabled={item.paymethod == 'Cash' ? false : true} />
                                                                        </td>

                                                                        <td>
                                                                            {
                                                                                this.getPaymentMethod(item, key)
                                                                            }</td>
                                                                        <td>{item.excessBottles}</td>

                                                                    </tr>

                                                                )
                                                            })
                                                        }
                                                    </tbody>

                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="tab-pane" id="tabItem3">
                                        <div className="card card-preview ">
                                            <div className="table-responsive">
                                                <table className="table">
                                                    <thead className="border-top">
                                                        <tr>
                                                            <th scope="col">#</th>
                                                            <th scope="col">Item Name</th>
                                                            <th scope="col">Rate</th>
                                                            <th scope="col">Discount</th>
                                                            <th scope="col">Sec. Paid</th>
                                                            <th scope="col">Total</th>
                                                            {/* <th scope="col"></th> */}
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            this.state.itemsList.map((item, key) => {
                                                                return (
                                                                    <tr>
                                                                        <td scope="row">
                                                                            <span className="text-primary">{key + 1}</span>
                                                                        </td>
                                                                        <td><span>{item.currentProduct.name ? item.currentProduct.name : 'N/A'}</span></td>
                                                                        <td>{this.getProductRate(item.currentProduct)}</td>
                                                                        <td><input type="number" min={0} max={(this.getProductRate(item.currentProduct) * Number(item.Quantitydel))} maxLength={7} value={item.discount} onChange={(event) => { this.handleInputDiscount(event, key) }} className="form-control" id="discount" placeholder="discount" /></td>

                                                                        <td className="d-none d-md-block"><input type="number" min={0} max={Number(item.Quantitydel) - Number(item.bottles)} value={item.secpaid} onChange={(event) => { this.handleInputSecurityPaid(item.currentProduct, event, key) }} className="form-control" id="secpaid" placeholder="secpaid" disabled={this.disableSecCheck(item.currentProduct)} /></td>
                                                                        <td className="d-sm-block d-md-none"><input type="number" min={0} max={Number(item.Quantitydel) - Number(item.bottles)} value={item.secpaid} onChange={(event) => { this.handleInputSecurityPaid(item.currentProduct, event, key) }} id="secpaid" placeholder="secpaid" disabled={this.disableSecCheck(item.currentProduct)} /></td>
                                                                        <td>{item.totalAmount}</td>
                                                                        {/* <td><em class="icon ni ni-trash" onClick={this.currentProduct ? this.removeSelectedItem(key) : null}></em></td> */}
                                                                        {/* <td onClick={this.removeSelectedItem(key)} className="btn btn-primary"><em className="icon ni ni-plus"></em><span>Add Item</span></td> */}
                                                                    </tr>
                                                                )
                                                            })
                                                        }
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row mt-5">
                                <div className="d-flex col-md-6 ml-md-auto">
                                    <label className="col-md-4 offset-md-2 form-label">Items Total</label>
                                    <span className="col-md-8 offset-md-1"> Rs. {this.state.totalAmount} </span>
                                </div>
                            </div>
                            <div className="mt-1 row ">
                                <div className="d-flex col-md-6 ml-md-auto">
                                    <div className="col-md-3 offset-md-2">
                                        <label className="form-label" htmlFor="paidAmount">Items Paid</label>
                                    </div>
                                    <div className="col-md-5 offset-md-2">
                                        <div className="form-control-wrap">
                                            <div className="form-icon form-icon-left">
                                                <em className="icon ni ni-money"></em>
                                            </div>
                                            <input type="number" min={0} max={this.state.totalAmount} value={this.state.paidAmount} onChange={this.handleInputPaidAmount} className="form-control" id="paidAmount" placeholder="Paid Amount (Rs.)" required />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row  mt-3">
                                <div className="d-flex col-md-6 ml-md-auto">
                                    <label className="col-md-4 offset-md-2 form-label">Security Paid</label>
                                    <span className="col-md-4 offset-md-1"> Rs. {Number(this.state.secPaidAmount) - Number(this.state.secamount)} </span>
                                </div>
                            </div>
                            <div className="row">
                                <div className="d-flex col-md-6 ml-md-auto">
                                    <label className="col-md-4 offset-md-2 form-label">Security Due</label>
                                    <span className="col-md-4 offset-md-1"> Rs. {Number(this.state.secamount)} </span>
                                </div>
                            </div>

                            <div className="row mt-2">
                                <div className="d-flex col-md-6 ml-md-auto">
                                    <label className="col-md-4 offset-md-2 form-label">Total Paid Amount </label>
                                    <span className="col-md-8 offset-md-1"> Rs. {Number(this.state.paidAmount) + Number(this.state.secPaidAmount) - Number(this.state.secamount)} </span>
                                </div>
                            </div>
                            <div className="row mt-2">
                                <div className="d-flex col-md-6 ml-md-auto">
                                    <label className="col-md-4 offset-md-2 form-label">Sale Total </label>
                                    <span className="col-md-8 offset-md-1 fw-bold"> Rs. {Number(this.state.totalAmount) + (Number(this.state.secPaidAmount) - Number(this.state.secamount)) + Number(this.state.secamount)} </span>
                                </div>
                            </div>
                            <div className="row g-4">
                                <div className="col-12 mt-4 ml-2">
                                    <div className="form-group">
                                        <button type="button" onClick={this.submitForm} className="btn btn-lg btn-primary" disabled={this.checkValid()}>
                                            <em className="icon ni ni-plus-c"></em> <span> Save</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                        <div className="text-danger  mt-2">
                            {this.state.error ?
                                <span className="ff-bold"><strong>{this.state.error}</strong></span>
                                : null}
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    render() {
        if (this.state.redirect === true) {
            return <Redirect to="/orders" />
        }

        return (
            <div className="nk-body bg-lighter npc-default has-sidebar ">
                <div className="nk-app-root">
                    <div className="nk-main"></div>
                    <Sidebar {...this.props} />
                    <div className="wrap container-fluid">
                        <Header user={this.props.user} />
                        <div className="custom-dashboard mt-5">
                            {this.renderBody()}
                            <Footer />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        customersList: state.customer.customerList,
        productsList: state.product.productList,
        sale: state.sale.sale
    }
}

export default connect(mapStateToProps)(AddSale)