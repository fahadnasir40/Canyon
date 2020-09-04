import React, { Component } from "react";
import Header from "../../Header/header";
import Sidebar from "../../Sidebar/sidebar";
import Footer from "../../Footer/footer";
// import { saveProduct, clearProduct } from '../../../actions';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { getSuppliers, getProducts } from '../../../actions';
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
        valid: false
        // redirect: false,
        // error: ''
    }
    products = [];
    paidAmount = 0;
    totalAmount = 0;


    componentDidMount() {
        this.props.dispatch(getSuppliers())
        this.props.dispatch(getProducts())
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

        return null;
    }

    setValid = () => {
        this.setState({
            valid: !this.state.valid
        })
    }

    handleInputDropdown = (event) => {
        if (this.state.suppliersList && event.target.value != -1) {
            this.setState({ currentSupplier: this.state.suppliersList[event.target.value] })
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
                console.log("This state", this.state);
                let purchase = {
                    supplierId: this.state.currentSupplier._id,
                    name: this.state.currentSupplier.name,
                    supplierBrand: this.state.currentSupplier.brand,
                    supplierAddress: this.state.address,
                    description: this.state.description,
                    purchaseDate: this.state.purchaseDate,
                    addedBy: this.props.user.login.id,
                    totalAmount: this.totalAmount,
                    paidAmount: this.paidAmount
                }
                console.log("Purchase", purchase);
                this.setState({
                    loading: false
                })
            }
            else {
                this.setState({
                    loading: true
                })
            }
        }

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
        productsList: state.product.productList
    }
}

export default connect(mapStateToProps)(AddPurchase)
