import React, { Component } from "react";
import Header from "../../Header/header";
import Sidebar from "../../Sidebar/sidebar";
import Footer from "../../Footer/footer";
import { saveProduct, clearProduct } from '../../../actions';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Moment from 'react-moment';

class AddTransaction extends Component {

    state = {
        name: '',
        sku: '',
        uom: 'Pcs',
        brand: 'canyon',
        startDate: new Date(),
        source: '',
        svalue: '',
        ttype: '',
        taction: '',
        qty: 1,
        rate: 1,
        comments: '',
        seal: '',
        redirect: false,
        error: ''
    }

    static getDerivedStateFromProps(nextProps, prevState) {

        if (nextProps.addProduct) {
            if (nextProps.addProduct.post === true) {
                return {
                    redirect: true
                }
            }
            else if (nextProps.addProduct.post === false) {
                return {
                    error: 'Error adding the product.'
                }
            }
        }

        return null;
    }

    componentWillUnmount() {
        this.props.dispatch(clearProduct());
    }

    handleInputTaction = (event) => {
        this.setState({ taction: event.target.value })
    }


    handleInputTtype = (event) => {
        this.setState({ ttype: event.target.value })
    }

    handleInputSource = (event) => {
        this.setState({ source: event.target.value })
    }

    handleInputSvalue = (event) => {
        this.setState({ svalue: event.target.value })
    }

    handleInputDate = date => {
        this.setState({
            startDate: date
        });
    };

    handleInputQty = event => {
        this.setState({ qty: event.target.value })
    };

    handleInputRate = event => {
        this.setState({ rate: event.target.value })
    };

    handleInputComments = event => {
        this.setState({ comments: event.target.value })
    };

    // handleInputBrand = (event) => {
    //     this.setState({ brand: event.target.value })
    // }

    submitForm = (event) => {

        // const form = event.currentTarget;

        event.preventDefault();

        this.props.dispatch(saveProduct({
            name: this.state.name,
            brand: this.state.brand,
            sku: this.state.sku,
            uom: this.state.uom,
            price: {
                cost_seal: this.state.seal
            },
            addedBy: this.props.user.login.id
        }))
    }

    calculateTotal = (total) => {

        total = Number(this.state.seal);
        if (!total)
            return 0;
        return total;
    }


    getCurrentDate = () => {
        const date = new Date();
        return (<Moment format="MMM DD, YYYY">{date}</Moment>)
    }

    renderBody = (total) => {
        return (
            <div className="container mt-5">
                <div className="card">
                    <div className="card-inner">
                        <div className="card-head mt-2">
                            <h4 className="ff-base fw-medium">New Transaction</h4>
                            {/* <div className="col-lg-4"> */}
                            {/* <div class="d-flex justify-content-end" > */}
                            <span>Date: <DatePicker
                                selected={this.state.startDate}
                                onChange={this.handleInputDate}
                            /></span>
                            {/* </div> */}
                            {/* </div> */}
                        </div>
                        <form className="form-validate">
                            <div className="row g-4">
                                <div className="col-lg-4">
                                    <div className="form-group">
                                        <label className="form-label" htmlFor="source">
                                            Source
                                         </label>
                                        <div className="form-control-wrap ">
                                            <div className="form-control-select">
                                                <select required onChange={this.handleInputSource} className="form-control" id="source">
                                                    <option value="employees">Employees</option>
                                                    <option value="supplier">Supplier</option>
                                                    <option value="supplier">Customer</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4">
                                    <div className="form-group">
                                        <label className="form-label" htmlFor="svalue">
                                            Value
                                         </label>
                                        <div className="form-control-wrap ">
                                            <div className="form-control-select">
                                                <select required onChange={this.handleInputSvalue} className="form-control" id="svalue">
                                                    <option value="canyon">Saad Khan</option>
                                                    <option value="csupplier">Canyon Supplier</option>
                                                    <option value="ccustomer">Canyon Customer</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="row g-2">
                                <div className="col-lg-4">
                                    <div className="form-group">
                                        <label className="form-label" htmlFor="ttype">
                                            Type
                                         </label>
                                        <div className="form-control-wrap ">
                                            <div className="form-control-select">
                                                <select required onChange={this.handleInputTtype} className="form-control" id="ttype">
                                                    <option value="Otherexpense">Other Expense</option>
                                                    <option value="sales">Sales</option>
                                                    <option value="purchase">Purchase</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-3">
                                    <div class="form-group">
                                        <label class="form-label" for="taction">Action</label>
                                        <div class="form-control-wrap ">
                                            <div class="form-control-select">
                                                <select required onChange={this.handleInputTaction} class="form-control" id="taction">
                                                    <option value="paysalary">Pay Salary</option>
                                                    <option value="fuelcost">Fuel Cost</option>
                                                    <option value="vehiclemaintenance">Vehicle Maintenance</option>
                                                    <option value="advancepaid">Advance Paid</option>
                                                    <option value="salesreturn">Sales Return</option>
                                                    <option value="purchasereturn">Purchase Return</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-1">
                                    <div class="form-group">
                                        <label class="form-label" for="qty">Quantity</label>
                                        <div class="form-control-wrap">
                                            <input type="number" min={0} value={this.state.qty} onChange={this.handleInputQty} class="form-control" id="qty" placeholder="Transaction Quantity" />
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-1">
                                    <div class="form-group">
                                        <label class="form-label" for="rate">Rate</label>
                                        <div class="form-control-wrap">
                                            <input type="number" min="0" value={this.state.rate} onChange={this.handleInputRate} class="form-control" id="rate" placeholder="Rate" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-3 mt-5  border-info    border-top border-bottom">
                                <div className="row">
                                    <div className="col-md-6">
                                        <strong className="ff-base  h6 ccap">Total</strong>
                                    </div>

                                    <div className="col-md-6 d-flex justify-content-end">
                                        <span className="fw-medium ccap ">Rs. {this.calculateTotal(total)}</span>
                                    </div>

                                </div>

                            </div>


                            {/* <div id="accordion-2" class="accordion accordion-s3 mt-4">
                                <div class="accordion-item">
                                    <a href="#" class="accordion-head" data-toggle="collapse" data-target="#accordion-item-2-1">
                                        <h6 class="title">Detail</h6>
                                        <span class="accordion-icon"></span>
                                    </a>
                                    <div class="accordion-body collapse show" id="accordion-item-2-1" data-parent="#accordion-2">
                                        <div class="accordion-inner">
                                            <div class="row g-3">



                                            </div>
                                        </div>
                                        <div class="row g-3 mt-2">
                                        </div>
                                    </div>
                                </div>
                            </div> */}
                            {/* <div class="row g-4 mt-5"> */}
                                <div class="col-md-8 mt-5">
                                    <div class="form-group">
                                        <label class="form-label" for="comments">Comments</label>
                                        <div class="form-control-wrap">
                                            {/* <input type="textarea" value={this.state.comments} onChange={this.handleInputComments} class="form-control" id="comments" placeholder="Comments" /> */}
                                            <textarea
                                                className="form-control"
                                                value={this.state.comments}
                                                onChange={this.handleInputComments}
                                                id="comments"
                                                placeholder="Comments"
                                                rows={5}
                                                cols={5}
                                            />
                                        </div>
                                    </div>
                                </div>
                            {/* </div> */}
                            <div className="row g-4">

                                <div className="col-12 mt-4 ml-2">
                                    <div className="form-group">
                                        <button onClick={this.submitForm} className="btn btn-lg btn-primary">
                                            <em class="icon ni ni-plus-c"></em> <span>  Save </span>
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
            this.props.history.push('/products')
        }

        let total = 0;

        return (
            <div className="nk-body bg-lighter npc-default has-sidebar ">
                <div className="nk-app-root">
                    <div className="nk-main"></div>
                    <Sidebar />
                    <div className="wrap container-fluid">
                        <Header user={this.props.user} />
                        <div className="custom-dashboard mt-5">
                            {this.renderBody(total)}
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
        addProduct: state.product.product
    }
}

export default connect(mapStateToProps)(AddTransaction)
