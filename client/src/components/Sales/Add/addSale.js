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
        secpaidValidity: true,
        customerlimit: 0,
        totalAmount: 0,
        paidAmount: 0,
        secamount: 0,
        customerBottles: 0
    }

    products = [];

    addItemRow = () => {
        var itemsList = [...this.state.itemsList];

        itemsList.push({
            itemName: '',
            uom: 'N/A',
            customerlimit: 0,
            rate: 0,
            qtyrec: 0,
            qtydel: 0,
            excessBottles: 0,
            discount: 0,
            paymethod: 'Cash',
            secpaid: 0,
            total: 0,
            currentProduct: ''
        })
        this.setState({
            count: this.state.count + 1,
            itemsList
        })
    }

    clearAllItems = () => {
        this.setState({
            itemsList: []
        })
    }


    handleProductDropdown = (currentCustomer, event, key) => {
        console.log("Item List : ", this.state.itemsList)
        let items = this.state.itemsList;

        if (this.props.productsList) {
            if (event.target.value === -1 && this.state.currentProduct) {
                this.props.removeSelectedItem(this.props.index);
            }
            else {
                let items = this.state.itemsList;

                items[key].currentProduct = this.props.productsList[event.target.value];
                items[key].Quantitydel = 0
                items[key].Quantityrec = 0
                items[key].customerBottles = 0
                items[key].excessBottles = 0
                items[key].discount = 0
                if (items[key].currentProduct.sku === "CN19LL") { items[key].currentProduct.customerLimit = this.state.currentCustomer.customerLimit }
                this.setState({
                    itemsList: items
                })
            }
        }
    }

    getProductRate = (currentProduct) => {
        console.log(currentProduct)
        if (currentProduct) {
            if (this.state.currentCustomer.flatRate === true) {
                if (Number(currentProduct.price.cost_flatRate)) {
                    return currentProduct.price.cost_flatRate;
                }
                else
                    return currentProduct.price.total;
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

    handleInputLimit = (event) => {
        this.setState({ customerlimit: this.state.customerlimit })
    }

    handleInputQuantityrec = (currentProduct, currentCustomer, event, key) => {
        console.log("Current Product", currentProduct)
        console.log("Current Customer", currentCustomer)
        if (currentProduct) {
            if (currentProduct.sku !== "O19L") {
                if (event.target.value <= currentCustomer.customerBottles) {
                    let items = this.state.itemsList;
                    items[key].Quantityrec = event.target.value;
                    this.setState({ itemsList: items })
                }
            }
            else {
                let items = this.state.itemsList;
                items[key].Quantityrec = event.target.value;
                this.setState({ itemsList: items })
            }
        }
    }

    handleInputQuantitydel = (currentProduct, event, key) => {
        // console.log("Current Product", currentProduct.price.cost_security)
        if (currentProduct) {
            if (currentProduct.stock >= event.target.value) {
                let items = this.state.itemsList;
                let rate = 0;

                items[key].Quantitydel = event.target.value;

                if (currentProduct.sku === "CN19LL") {
                    items[key].excessBottles = Number(event.target.value) - Number(this.state.customerlimit);
                    items[key].secpaid = Number(event.target.value) - Number(this.state.customerlimit);
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
        let items = this.state.itemsList;
        let tamount = this.getProductRate(items[key].currentProduct) * Number(items[key].Quantitydel);
        items[key].discount = event.target.value;
        items[key].totalAmount = tamount - items[key].discount;
        this.setState({ itemsList: items })

        this.calculateTotal();

    }

    handleInputPaymentMethod = (event, key) => {
        let items = this.state.itemsList;
        items[key].paymethod = event.target.value;
        this.setState({ itemsList: items })
    }

    handleInputSecurityPaid = (currentProduct, event, key) => {
        console.log("Current item : ", currentProduct)
        let items = this.state.itemsList;
        if (event.target.value <= (Number(this.state.itemsList[key].Quantitydel) - Number(this.state.itemsList[key].customerlimit)) && event.target.value >= 0) {
            items[key].secpaid = event.target.value;
            items[key].secamount = Number(currentProduct.price.cost_security) * (Number(items[key].excessBottles) - Number(items[key].secpaid));
            this.setState({ itemsList: items })
        }
        // this.calculateSecTotal();
        this.calculateTotal();
    }

    handleInputPaidAmount = (event) => {
        if (event.target.value <= Number(this.state.totalAmount) + Number(this.state.secamount))
            this.setState({ paidAmount: event.target.value })
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

        console.log("Sec Amount: ", sectotal)

        this.setState({
            secamount: sectotal,
            discount: disctotal,
            totalAmount: Number(total),
            paidAmount: Number(total)// + Number(sectotal)
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
                    console.log("Redirect", prevState.redirect, nextProps);
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

    setValid = () => {
        this.setState({
            valid: !this.state.valid
        })
    }

    handleInputDropdown = (event) => {
        console.log("customer: ", event.target.value)
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
            // console.log("Product Length",this.products.length)
            // if (this.products.length > 0) {

            let sale = {
                customerId: this.state.currentCustomer._id,
                customerName: this.state.currentCustomer.name,
                customerAddress: this.state.address,
                description: this.state.description,
                saleDate: this.state.saleDate,
                addedBy: this.props.user.login.id,
                totalAmount: Number(this.totalAmount) + Number(this.state.secamount) - Number(this.state.discount),
                secAmount: this.state.secamount,
                paidAmount: this.paidAmount
            }

            if (sale.paidAmount < sale.totalAmount)
                sale.status = 'Pending';
            else
                sale.status = 'Complete';

            let productDetails = [];
            let customerwithBottles = 0;

            // console.log("inner :", this.products)
            this.products.forEach(item => {

                if (item.currentProduct.sku === "CN19LL") {
                    if (item.Quantitydel && item.Quantityrec) {
                        customerwithBottles = Number(item.Quantitydel) - Number(item.Quantityrec);
                    }
                }


                productDetails.push({
                    _id: item.currentProduct._id,
                    puom: item.currentProduct.uom,
                    pname: item.currentProduct.name,
                    // pprice: Number(item.price.total),
                    pprice: 0,
                    rqty: Number(item.Quantityrec),
                    dqty: Number(item.Quantitydel),
                    customerBottles: Number(customerwithBottles),
                    disc: Number(item.discount),
                    pmethod: item.paymethod,
                    secpaid: Number(item.secpaid),
                    ptotal: item.totalAmount

                });
            });

            sale = { ...sale, productDetails };

            console.log("Sale Details: ", sale)
            // if (this.state.request === false) {
            // console.log("save sale about to call", sale)
            this.props.dispatch(saveSale(sale));
            this.saveTransaction();
            //     this.setState({
            //         request: true
            //     })
            // }
            // }
            // else {
            this.setState({
                loading: true
            })
            // }
        }
    }


    saveTransaction = () => {
        this.props.dispatch(saveTransaction({
            transaction_date: new Date(),
            primary_quantity: 0,
            rate: this.totalAmount,
            transaction_source: 'Customer',
            transaction_type: 'Sale',
            transaction_action: 'Sale Added',
            transaction_value: this.state.currentCustomer.name,
            transaction_value_id: this.state.currentCustomer._id,
            comments: this.state.description,
            addedBy: this.props.user.login.id
        }))
    }

    renderBody = () => {
        let currentProduct = this.state.currentProduct;
        return (
            <div className="container mt-5">
                <div className="card ml-md-3">
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
                                                                        <th scope="row">
                                                                            <span className="text-primary">{key + 1}</span>
                                                                        </th>
                                                                        <div className="form-control-wrap">
                                                                            <div className="form-control-select">
                                                                                <select className="form-control" onChange={(event) => { this.handleProductDropdown(this.currentCustomer, event, key) }} data-search="on">
                                                                                    <option value={-1}>Select Item</option>
                                                                                    {
                                                                                        this.state.currentCustomer ?
                                                                                            this.props.productsList ?
                                                                                                this.props.productsList.map((item, key) => {
                                                                                                    return <option key={key} value={key} className="ccap" >{item.name}</option>;
                                                                                                })
                                                                                                : null
                                                                                            : null
                                                                                    }
                                                                                </select>
                                                                            </div>
                                                                        </div>
                                                                        <td>{item.currentProduct ? item.currentProduct.uom : 'N/A'}</td>
                                                                        <td>{item.currentProduct ? item.currentProduct.customerBottles : 0}</td>

                                                                        <span>{item.currentProduct.customerLimit}</span>
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
                                                            <th scope="col">Quantity Received.</th>
                                                            <th scope="col">Quantity Delivered.</th>
                                                            <th scope="col">Excess Bottles.</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            this.state.itemsList.map((item, key) => {
                                                                return (
                                                                    <tr>
                                                                        <th scope="row">
                                                                            <span className="text-primary">{key + 1}</span>
                                                                        </th>
                                                                        <td>
                                                                            <span>{item.currentProduct.name}</span>
                                                                        </td>
                                                                        <td>
                                                                            <span>{item.currentProduct.stock}</span>
                                                                        </td>
                                                                        <td><input type="number" min={1} maxLength={7} value={item.Quantityrec} onChange={(event) => { this.handleInputQuantityrec(item.currentProduct, this.state.currentCustomer, event, key) }} className="form-control" id="quantityrec" placeholder={0} /></td>
                                                                        <td><input type="number" min={1} maxLength={Number(item.Quantitydel) - Number(item.currentProduct.stock)} value={item.Quantitydel} onChange={(event) => { this.handleInputQuantitydel(item.currentProduct, event, key) }} className="form-control" id="quantitydel" placeholder={0} /></td>
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
                                                            <th scope="col">Payment Method</th>
                                                            <th scope="col">Sec. Paid</th>
                                                            <th scope="col">Total</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            this.state.itemsList.map((item, key) => {
                                                                return (
                                                                    <tr>
                                                                        <th scope="row">
                                                                            <span className="text-primary">{key + 1}</span>
                                                                        </th>
                                                                        <td><span>{item.currentProduct.name}</span></td>
                                                                        <td>{this.getProductRate(item.currentProduct)}</td>
                                                                        <td><input type="number" min={1} maxLength={7} value={item.discount} onChange={(event) => { this.handleInputDiscount(event, key) }} className="form-control" id="discount" placeholder="discount" /></td>
                                                                        <select className="form-control" data-search="on" onChange={(event) => { this.handleInputPaymentMethod(event, key) }}>
                                                                            <option value={"Cash"}>Cash</option>
                                                                            <option value={"Bottle Exchange with Buffering Charges"}>Bottle Exchange with buffering</option>
                                                                            <option value={"Bottle Exchange without Buffering Charges"}>Bottle Exchange without buffering</option>
                                                                        </select>
                                                                        <td><input type="number" min={0} max={Number(item.Quantitydel) - Number(item.customerlimit)} value={item.secpaid} onChange={(event) => { this.handleInputSecurityPaid(item.currentProduct, event, key) }} className="form-control" id="secpaid" placeholder="secpaid" disabled={this.disableSecCheck(item.currentProduct)} /></td>
                                                                        {/* <td><input type="number" min={1} maxLength={7} value={item.discount} onChange={(event) => { this.handleInputDiscount(event, key) }} className="form-control" id="totalamount" placeholder="totalamount" /></td> */}
                                                                        <span>{item.totalAmount}</span>
                                                                        {/* <td>{item.total}</td> */}
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
                                    <label className="col-md-4 offset-md-2 form-label">Amount to be paid</label>
                                    <span className="col-md-8 offset-md-2"> Rs. {this.state.totalAmount} </span>
                                </div>
                            </div>
                            <div className="row mt-5">
                                <div className="d-flex col-md-6 ml-md-auto">
                                    <label className="col-md-4 offset-md-2 form-label">Security</label>
                                    <span className="col-md-8 offset-md-2"> Rs. {this.state.secamount} </span>
                                </div>
                            </div>
                            <div className="mt-1 row ">
                                <div className="d-flex col-md-6 ml-md-auto">
                                    <div className="col-md-3 offset-md-2">
                                        <label className="form-label" htmlFor="paidAmount">Paid Amount</label>
                                    </div>
                                    <div className="col-md-5 offset-md-2">
                                        <div className="form-control-wrap">
                                            <div className="form-icon form-icon-left">
                                                <em className="icon ni ni-money"></em>
                                            </div>
                                            <input type="number" value={this.state.paidAmount} onChange={this.handleInputPaidAmount} className="form-control" id="paidAmount" placeholder="Paid Amount (Rs.)" required />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row g-4">
                                <div className="col-12 mt-4 ml-2">
                                    <div className="form-group">
                                        {/* <button type="button" onClick={this.submitForm} className="btn btn-lg btn-primary" disabled={!this.state.valid || this.state.loading}> */}
                                        <button type="button" onClick={this.submitForm} className="btn btn-lg btn-primary">
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