import React, { Component } from "react";
import Header from "../../Header/header";
import Sidebar from "../../Sidebar/sidebar";
import Footer from "../../Footer/footer";
import { saveSale, clearSale } from '../../../actions';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { getActiveProducts, saveTransaction, getCustomers } from '../../../actions';
// import SaleDetail from './SaleDetails';
import Moment from 'react-moment';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Salestab from '../../Sales/itemsreturn'

class AddSale extends Component {


    state = {
        description: 'Sale Order',
        // suppliersList: '',
        customersList: '',
        productsList: '',
        currentCustomer: '',
        saleDate: new Date(),
        itemsSelected: [],
        description: '',
        address: '',
        loading: false,
        valid: false,
        request: false,
        redirect: false,
        error: ''
    }

    products = [];
    paidAmount = 0;
    totalAmount = 0;


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


    handleInputSupplier = (event) => {
        this.setState({ supplier: event.target.value })
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

    getProductsList = (productsList, paidAmount, totalAmount) => {
        this.products = productsList;
        this.paidAmount = paidAmount;
        this.totalAmount = totalAmount;

        this.submitForm();
    }

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
                                        <label className="form-label" htmlFor="supplier">Supplier</label>
                                        <div className="form-control-wrap ">
                                            <div className="form-control-select">
                                                <select required onChange={this.handleInputDropdown} className="form-control ccap" id="supplier">
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
                                        <p>content</p>
                                    </div>
                                    <div class="tab-pane" id="tabItem2">
                                        <p>content</p>
                                    </div>
                                    <div class="tab-pane" id="tabItem3">
                                        <p>contnet</p>
                                    </div>
                                </div>
                                {/* <Salestab/> */}
                                {/* <div className="accordion-item">
                                    <a href="#" className="accordion-head" data-toggle="collapse" data-target="#accordion-item-2-1">
                                        <h6 className="title">Sale Details</h6>
                                        <span className="accordion-icon"></span>
                                    </a>
                                    <div className="accordion-body collapse show" id="accordion-item-2-1" data-parent="#accordion-2">
                                        <div className="accordion-inner">
                                            {
                                                this.state.productsList ?
                                                    <SaleDetail
                                                        productsList={this.state.productsList}
                                                        valid={this.state.valid}
                                                        setValid={this.setValid}
                                                        loading={this.state.loading}
                                                        customer = {this.state.currentCustomer}
                                                        getProductsList={this.getProductsList} />
                                                    : null
                                            }
                                        </div>
                                    </div>
                                </div> */}
                            </div>
                            <div className="row g-4">
                                <div className="col-12 mt-4 ml-2">
                                    <div className="form-group">
                                        <button type="button" onClick={this.submitForm} className="btn btn-lg btn-primary" disabled={!this.state.valid || this.state.loading}>
                                            <em className="icon ni ni-plus-c"></em> <span>  Save</span>
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