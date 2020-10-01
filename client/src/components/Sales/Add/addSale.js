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
        discount: 0,
        paymethod: '',
        secpaid: '',
        customerlimit: 0
    }

    products = [];
    paidAmount = 0;
    totalAmount = 0;

    addItemRow = () => {
        var itemsList = [...this.state.itemsList];

        itemsList.push({
            itemName: '',
            uom: 'N/A',
            customerlimit: 0,
            rate: '0',
            qtyrec: '0',
            qtydel: '0',
            excessBottles: '0',
            discount: '0',
            paymethod: '',
            secpaid: '0',
            total: '0',
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


    handleProductDropdown = (event, key) => {

        if (this.props.productsList) {
            if (event.target.value === -1 && this.state.currentProduct) {
                this.setState({ currentProduct: '', currentQuantity: '' });
                this.props.removeSelectedItem(this.props.index);
            }
            else {

                let items = this.state.itemsList;
                items[key].currentProduct = this.props.productsList[event.target.value];
                this.setState({
                    itemsList: items,
                    currentQuantity: 1
                })
                if (this.state.currentProduct)
                    console.log(this.state.itemsList[event.target.value])
                // this.props.removeSelectedItem(this.props.index);
                // this.props.addSelectedItem(this.props.productsList[event.target.value]);
                // this.props.updateTotalAmount(this.props.index, 1, this.props.productsList[event.target.value].price.total);
            }
        }
    }

    getProductRate = (currentProduct) => {

        if (currentProduct) {
            if (this.state.currentCustomer.flatRate === true) {
                if (Number(currentProduct.price.cost_flatRate)) {
                    return currentProduct.price.cost_flatRate;
                }
                else
                    return currentProduct.price.total;
            }
            else if(this.state.currentCustomer.salePrice.find(x => x._id === currentProduct._id)){
                return this.state.currentCustomer.salePrice.find(x => x._id === currentProduct._id).rate;
            }
            else
            {
                return currentProduct.price.total;
            }
        }
        else
            return 'N/A'

    }

    handleInputLimit = (event) => {
        this.setState({ customerlimit: Number(event.target.value) })
    }

    handleInputQuantityrec = (event, key) => {
        let items = this.state.itemsList;
        items[key].Quantityrec = event.target.value;
        this.setState({ itemsList: items })

    }

    handleInputQuantitydel = (event, key) => {
        let items = this.state.itemsList;
        items[key].Quantitydel = event.target.value;
        items[key].secpaid = Number(event.target.value) - Number(this.state.customerlimit);
        this.setState({ itemsList: items })
    }

    handleInputDiscount = (event, key) => {
        let items = this.state.itemsList;
        items[key].discount = event.target.value;
        this.setState({ itemsList: items })

    }

    handleInputPaymentMethod = (event, key) => {
        let items = this.state.itemsList;
        items[key].paymethod = event.target.value;
        this.setState({ itemsList: items })
    }

    handleInputSecurityPaid = (event, key) => {
        let items = this.state.itemsList;
        if (event.target.value <= (Number(this.state.itemsList[key].Quantitydel) - Number(this.state.itemsList[key].customerlimit)) && event.target.value >= 0) {
            items[key].secpaid = event.target.value;
            this.setState({ itemsList: items })
        }
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
        if (this.state.customersList && event.target.value != -1) {
            this.setState({
                currentCustomer: this.state.customersList[event.target.value],
                address: this.state.customersList[event.target.value].address[0]
            });
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

    // getProductsList = (productsList, paidAmount, totalAmount) => {
    //     this.products = productsList;
    //     this.paidAmount = paidAmount;
    //     this.totalAmount = totalAmount;

    //     this.submitForm();
    // }

    submitForm = () => {
        if (!this.state.currentCustomer) {
            this.setState({
                error: 'Customer and address must be selected.'
            })
        }
        else {
            if (this.products.length > 0) {

                let sale = {
                    customerId: this.state.currentCustomer._id,
                    customerName: this.state.currentCustomer.name,
                    customerAddress: this.state.address,
                    description: this.state.description,
                    saleDate: this.state.saleDate,
                    addedBy: this.props.user.login.id,
                    totalAmount: this.totalAmount,
                    paidAmount: this.paidAmount
                }

                let productDetails = [];

                this.products.forEach(item => {
                    productDetails.push({
                        _id: item._id,
                        puom: item.uom,
                        pqty: item.qty,
                        pprice: Number(item.price.total),
                        ptotal: item.totalAmount,
                        pname: item.name
                    });
                });
                sale = { ...sale, productDetails };

                if (this.state.request === false) {
                    this.props.dispatch(saveSale(sale));
                    this.saveTransaction();
                    this.setState({
                        request: true
                    })
                }
            }
            else {
                this.setState({
                    loading: true
                })
            }
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
                                                    // this.state.itemsList.length < 20 && this.props.customer ?
                                                    // <div onClick={this.addItemRow} className="btn btn-primary"><em className="icon ni ni-plus"></em><span>Add Item</span></div>
                                                    <div onClick={this.addItemRow} className="btn btn-primary"><em className="icon ni ni-plus"></em><span>Add Item</span></div>
                                                    // : null
                                                }
                                                {
                                                    // this.state.itemsList.length > 0 ?
                                                    <div className="d-flex justify-content-end text-primary " ><span style={{ cursor: "pointer" }} onClick={this.clearAllItems}>Clear all items</span></div>
                                                    // : null
                                                }
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <ul class="nav nav-tabs">
                                    <li class="nav-item">
                                        <a class="nav-link active" data-toggle="tab" href="#tabItem1">Products Detail</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link" data-toggle="tab" href="#tabItem2">Transaction</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link" data-toggle="tab" href="#tabItem3">Payment</a>
                                    </li>
                                </ul>
                                <div class="tab-content">
                                    <div class="tab-pane active" id="tabItem1">
                                        <div className="card card-preview ">
                                            <div className="table-responsive">
                                                <table className="table">
                                                    <thead className="border-top">
                                                        <tr>
                                                            <th scope="col">#</th>
                                                            <th scope="col">Item Name</th>
                                                            <th scope="col">UOM</th>
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
                                                                                <select className="form-control" onChange={(event) => { this.handleProductDropdown(event, key) }} data-search="on">
                                                                                    <option value={-1}>Select Item</option>
                                                                                    {
                                                                                        this.props.productsList ?
                                                                                            this.props.productsList.map((item, key) => {
                                                                                                return <option key={key} value={key} className="ccap" >{item.name}</option>;
                                                                                            })
                                                                                            : null
                                                                                    }
                                                                                </select>
                                                                            </div>
                                                                        </div>
                                                                        <td>{item.currentProduct ? item.currentProduct.uom : 'N/A'}</td>
                                                                        <td><input type="number" value={this.state.customerLimit} onChange={this.handleInputLimit} className="form-control" id="limit" placeholder="0" disabled='true' /></td>
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
                                    <div class="tab-pane" id="tabItem2">
                                        <div className="card card-preview ">
                                            <div className="table-responsive">
                                                <table className="table">
                                                    <thead className="border-top">
                                                        <tr>
                                                            <th scope="col">#</th>
                                                            <th scope="col">Item Name</th>
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
                                                                        <td><input type="number" min={1} maxLength={7} value={item.Quantityrec} onChange={(event) => { this.handleInputQuantityrec(event, key) }} className="form-control" id="quantityrec" placeholder="Quantityrec" /></td>
                                                                        <td><input type="number" min={1} maxLength={7} value={item.Quantitydel} onChange={(event) => { this.handleInputQuantitydel(event, key) }} className="form-control" id="quantitydel" placeholder="Quantitydel" /></td>
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
                                    <div class="tab-pane" id="tabItem3">
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
                                                                            <option value={-1}>Cash</option>
                                                                            <option value={-1}>Bottle Exchange</option>
                                                                        </select>
                                                                        <td><input type="number" min={0} max={Number(item.Quantitydel) - Number(item.customerlimit)} value={item.secpaid} onChange={(event) => { this.handleInputSecurityPaid(event, key) }} className="form-control" id="secpaid" placeholder="secpaid" /></td>
                                                                        {/* <td><input type="number" min={1} maxLength={7} value={item.discount} onChange={(event) => { this.handleInputDiscount(event, key) }} className="form-control" id="totalamount" placeholder="totalamount" /></td> */}
                                                                        <span>updateTotalAmount()</span>
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
                            <div className="row g-4">
                                <div className="col-12 mt-4 ml-2">
                                    <div className="form-group">
                                        <button type="button" onClick={this.submitForm} className="btn btn-lg btn-primary" disabled={!this.state.valid || this.state.loading}>
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
            return <Redirect to="/sales" />
        }

        return (
            <div className="nk-body bg-lighter npc-default has-sidebar ">
                <div className="nk-app-root">
                    <div className="nk-main"></div>
                    <Sidebar />
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
        productsList: state.product.productList
        // sale: state.sale.sale
    }
}

export default connect(mapStateToProps)(AddSale)