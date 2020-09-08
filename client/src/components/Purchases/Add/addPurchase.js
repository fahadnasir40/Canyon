import React, { Component } from "react";
import Header from "../../Header/header";
import Sidebar from "../../Sidebar/sidebar";
import Footer from "../../Footer/footer";
import { savePurchase, clearPurchase } from '../../../actions';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { getActiveSuppliers, getActiveProducts,saveTransaction } from '../../../actions';
import PurchaseDetail from './purchaseDetails';
import Moment from 'react-moment';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class AddPurchase extends Component {


    state = {
        description: 'Purchase Order',
        suppliersList: '',
        productsList: '',
        currentSupplier: '',
        purchaseDate: new Date(),
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
        this.props.dispatch(getActiveSuppliers())
        this.props.dispatch(getActiveProducts())
    }

    componentWillUnmount() {
        this.props.dispatch(clearPurchase());
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.suppliersList !== prevState.suppliersList) {
            return {
                suppliersList: nextProps.suppliersList
            }
        }
        if (nextProps.productsList !== prevState.productsList) {
            return {
                productsList: nextProps.productsList
            }
        }

        if (nextProps.purchase) {
            if (nextProps.purchase.post) {
                if (nextProps.purchase.post === true) {
                    console.log("Redirect",prevState.redirect,nextProps);
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
        if (this.state.suppliersList && event.target.value != -1) {
            this.setState({
                currentSupplier: this.state.suppliersList[event.target.value],
                address: this.state.suppliersList[event.target.value].address[0]
            });
        }
    }

    handleInputDescription = (event) => {
        this.setState({ description: event.target.value })
    }

    handleInputAddress = (event) => {
        this.setState({ address: this.state.currentSupplier.address[event.target.value] })
    }


    handleInputSupplier = (event) => {
        this.setState({ supplier: event.target.value })
    }

    handleInputDate = date => {
        this.setState({
            purchaseDate: date
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
        if (!this.state.currentSupplier) {
            this.setState({
                error: 'Supplier and address must be selected.'
            })
        }
        else {
            if (this.products.length > 0) {

                let purchase = {
                    supplierId: this.state.currentSupplier._id,
                    supplierName: this.state.currentSupplier.name,
                    supplierAddress: this.state.address,
                    description: this.state.description,
                    purchaseDate: this.state.purchaseDate,
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
                purchase = { ...purchase, productDetails };

                if (this.state.request === false) {
                    this.props.dispatch(savePurchase(purchase));
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
            transaction_source: 'Supplier',
            transaction_type: 'Purchase',
            transaction_action: 'Purchase',
            transaction_value: this.state.currentSupplier.name,
            transaction_value_id: this.state.currentSupplier._id,
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
                            <h4 className="ff-base fw-medium">Add Purchase</h4>
                        </div>
                        <form className="form-validate">
                            <div className="row g-4">
                                <div className="col-lg-6 order-md-last">
                                    <div className="d-flex justify-content-end" >
                                        <span>Purchase Date   <DatePicker
                                            selected={this.state.purchaseDate}
                                            onChange={this.handleInputDate}
                                            dateFormat={'dd-MMM-yyyy'}
                                            className="form-control"
                                        /></span>
                                    </div>
                                </div>
                                <div className="col-lg-4 ">
                                    <div className="form-control-wrap">
                                        <div className="form-group">
                                            <label className="form-label" htmlFor="description">Purchase Description</label>
                                            <div className="form-control-wrap">
                                                <input type="text" value={this.state.description} onChange={this.handleInputDescription} maxLength={1000} className="form-control" id="description" placeholder="Enter purchase description (Optional)" />
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
                                                    <option value={-1}> Select Supplier</option>
                                                    {
                                                        this.state.suppliersList ?
                                                            this.state.suppliersList.map((item, key) => {
                                                                return <option key={key} value={key} className="ccap" >{item.name} ({item.brand})</option>;
                                                            })
                                                            : null
                                                    }
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {
                                    this.state.currentSupplier ?
                                        <div className="col-lg-4">
                                            <div className="form-group">
                                                <label className="form-label" htmlFor="address">Address</label>
                                                <div className="form-control-wrap ">
                                                    <div className="form-control-select">
                                                        <select required onChange={this.handleInputAddress} className="form-control ccap" id="address" data-search="on">
                                                            {
                                                                this.state.suppliersList ?
                                                                    this.state.currentSupplier.address.map((item, key) => {
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
                                <div className="accordion-item">
                                    <a href="#" className="accordion-head" data-toggle="collapse" data-target="#accordion-item-2-1">
                                        <h6 className="title">Purchase Details</h6>
                                        <span className="accordion-icon"></span>
                                    </a>
                                    <div className="accordion-body collapse show" id="accordion-item-2-1" data-parent="#accordion-2">
                                        <div className="accordion-inner">
                                            {
                                                this.state.productsList ?
                                                    <PurchaseDetail
                                                        productsList={this.state.productsList}
                                                        valid={this.state.valid}
                                                        setValid={this.setValid}
                                                        loading={this.state.loading}
                                                        getProductsList={this.getProductsList} />
                                                    : null
                                            }
                                        </div>
                                    </div>
                                </div>
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
            return <Redirect to="/purchases" />
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
        suppliersList: state.supplier.supplierList,
        productsList: state.product.productList,
        purchase: state.purchase.purchase
    }
}

export default connect(mapStateToProps)(AddPurchase)