import React, { Component } from "react";
import Header from "../../Header/header";
import Sidebar from "../../Sidebar/sidebar";
import Footer from "../../Footer/footer";
// import { saveProduct, clearProduct } from '../../../actions';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { getSuppliers, getProducts } from '../../../actions';
import PurchaseDetail from '../Wizards/WizardFormSecondPage';
import Moment from 'react-moment';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class AddPurchase extends Component {

    state = {
        // name:'',
        pnum: '001',
        // sku: '',
        description: 'Purchase Order',
        // uom: 'Pcs',
        address: 'Lahore',
        // brand: 'canyon',
        suppliersList: '',
        productsList: '',
        currentSupplier: '',
        startDate: new Date()
        // seal: '',
        // wrapper: '',
        // others: '',
        // security: '',
        // flatRate: '',
        // redirect: false,
        // error: ''
    }


    componentDidMount() {
        this.props.dispatch(getSuppliers())
        this.props.dispatch(getProducts())
    }


    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.suppliersList !== prevState.suppliersList) {
            console.log("Supplier Props", nextProps.suppliersList);
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

    handleInputDropdown = (event) => {
        if (this.state.suppliersList && event.target.value != -1) {
            this.setState({ currentSupplier: this.state.suppliersList[event.target.value] })
        }
    }
    // static getDerivedStateFromProps(nextProps, prevState) {

    //     if (nextProps.addProduct) {
    //         if (nextProps.addProduct.post === true) {
    //             return {
    //                 redirect: true
    //             }
    //         }
    //         else if (nextProps.addProduct.post === false) {
    //             return {
    //                 error: 'Error adding the product.'
    //             }
    //         }
    //     }

    //     return null;
    // }

    // componentWillUnmount() {
    //     this.props.dispatch(clearProduct());
    // }


    // handleInputName = (event) => {
    //     this.setState({ name: event.target.value })
    // }


    // handleInputSku = (event) => {
    //     this.setState({ sku: event.target.value })
    // }
    handleInputDescription = (event) => {
        this.setState({ description: event.target.value })
    }

    // handleInputUom = (event) => {
    //     this.setState({ uom: event.target.value })
    // }

    handleInputAddress = (event) => {
        this.setState({ address: event.target.value })
    }

    // handleInputSeal = (event) => {
    //     let value = Number(event.target.value);
    //     if (value >= 0)
    //         this.setState({ seal: event.target.value })
    // }

    // handleInputWrapper = (event) => {
    //     let value = Number(event.target.value);
    //     if (value >= 0)
    //         this.setState({ wrapper: event.target.value })
    // }

    // handleInputSecurity = (event) => {
    //     let value = Number(event.target.value);
    //     if (value >= 0)
    //         this.setState({ security: event.target.value })
    // }

    // handleInputFlatRate = (event) => {
    //     let value = Number(event.target.value);
    //     if (value >= 0)
    //         this.setState({ flatRate: event.target.value })
    // }

    // handleInputOthers = (event) => {
    //     let value = Number(event.target.value);
    //     if (value >= 0)
    //         this.setState({ others: event.target.value })
    // }

    handleInputSupplier = (event) => {
        this.setState({ supplier: event.target.value })
    }

    handleInputDate = date => {
        this.setState({
            startDate: date
        });
    };
    // handleInputBrand = (event) => {
    //     this.setState({ brand: event.target.value })
    // }

    // submitForm = (event) => {

    //     const form = event.currentTarget;

    //     event.preventDefault();

    //     this.props.dispatch(saveProduct({
    //       name: this.state.name,
    //       brand: this.state.brand,
    //       sku: this.state.sku,
    //       uom: this.state.uom,
    //       price:{
    //           cost_seal: this.state.seal,
    //           cost_wrapper: this.state.wrapper,
    //           cost_others: this.state.others,
    //           cost_flatRate: this.state.flatRate,
    //           cost_security: this.state.security
    //       },
    //       addedBy: this.props.user.login.id
    //     }))
    // }

    // calculateTotal = (total) => {

    //     total = Number(this.state.wrapper) + Number(this.state.seal) + Number(this.state.others);
    //     if (!total)
    //         return 0;
    //     return total;
    // }
    getCurrentDate = () => {
        const date = new Date();
        return (<Moment format="MMM DD, YYYY">{date}</Moment>)
    }



    renderBody = () => {
        return (
            <div className="container mt-5">
                <div className="card">
                    <div className="card-inner">
                        <div className="card-head mt-1">
                            <h4 className="ff-base fw-medium">Add Purchase</h4>
                        </div>
                        <form className="form-validate">
                            <div className="row g-4">
                                <div className="col-lg-4">
                                    <div className="form-group">
                                        <label className="form-label" htmlFor="full-name-1">
                                            Purchase #
                                            </label>
                                        <div className="form-control-wrap">
                                            <span>001</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div class="d-flex justify-content-end" ><span>Date: <DatePicker
                                        selected={this.state.startDate}
                                        onChange={this.handleInputDate}
                                    /></span></div>
                                </div>
                            </div>

                            <div className="row g-4">
                                <div class="col-lg-4">
                                    <div class="form-group">
                                        <label class="form-label" for="supplier">Supplier</label>
                                        <div class="form-control-wrap ">
                                            <div class="form-control-select">
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
                                        <div class="col-lg-4">
                                            <div class="form-group">
                                                <label class="form-label" for="supplier">Address</label>
                                                <div class="form-control-wrap ">
                                                    <div class="form-control-select">
                                                        <select required onChange={this.handleInputAddressDropdown} className="form-control ccap" id="supplier" data-search="on">
                                                            {
                                                                this.state.suppliersList ?
                                                                    this.state.currentSupplier.address.map((item, key) => {
                                                                        return <option key={key} value={key} className="ccap" >{item.name}</option>;
                                                                    })
                                                                    : null
                                                            }
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        : null
                                }
                            </div>


                            <div id="accordion-2" class="accordion accordion-s3 mt-4">
                                <div class="accordion-item">
                                    <a href="#" class="accordion-head" data-toggle="collapse" data-target="#accordion-item-2-1">
                                        <h6 class="title">Purchase Details</h6>
                                        <span class="accordion-icon"></span>
                                    </a>


                                    <div class="accordion-body collapse show" id="accordion-item-2-1" data-parent="#accordion-2">
                                        <div class="accordion-inner">
                                            {
                                                this.state.productsList ?
                                                    <PurchaseDetail productsList={this.state.productsList} />
                                                    : null
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row g-4">

                                <div className="col-12 mt-4 ml-2">
                                    <div className="form-group">
                                        <button onClick={this.submitForm} className="btn btn-lg btn-primary" disabled>
                                            <em class="icon ni ni-plus-c"></em> <span>  Save</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            {/* <div id="accordion-3" class="accordion accordion-s3 mt-4">
                                <div class="accordion-item">
                                    <a href="#" class="accordion-head" data-toggle="collapse" data-target="#accordion-item-2-1">
                                        <h6 class="title">Payment Details</h6>
                                        <span class="accordion-icon"></span>
                                    </a>
                                    <div class="accordion-body collapse show" id="accordion-item-2-1" data-parent="#accordion-2">
                                        <div class="accordion-inner">
                                            {
                                                this.state.productsList ?
                                                    <PurchaseDetail productsList={this.state.productsList} />
                                                    : null
                                            } 
                                        </div>
                                    </div>
                                </div>
                            </div> */}

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
