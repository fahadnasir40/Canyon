import React, { Component } from "react";
import Header from "../../Header/header";
import Sidebar from "../../Sidebar/sidebar";
import Footer from "../../Footer/footer";
import { getEmployeesTransactions, getCustomersTransactions, getSuppliersTransactions, getActiveProducts, updateTransaction, clearNewTransaction } from '../../../actions';
import { connect } from 'react-redux';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Moment from 'react-moment';

class EditTransaction extends Component {

    state = {
        startDate: '',//new Date(),
        source: '',
        svalueid: '',
        svalue: '',
        ttype: 'Other Expense',
        taction: 'Pay Salary',
        qty: 0,
        rate: 0,
        gTotal: 0,
        total: 0,
        comments: '',
        fromitem: '',
        currentProductStock: 0,
        toitem: '',
        ritem: '',
        suppliersList: '',
        customerList: '',
        userList: '',
        productsList: '',
        redirect: false,
        error: ''
    }


    componentDidMount() {

        console.log("did mount", this.props.location.state)
        if (this.props.location.state) {
            if (this.props.location.state.transactionInfo) {
                let transaction = this.props.location.state.transactionInfo;
                // const salerate = customer.salePrice.length === 0 ? false : true;

                this.setState({
                    startDate: transaction.transaction_date,
                    source: transaction.transaction_source,
                    ttype: transaction.transaction_type,
                    taction: transaction.transaction_action,
                    svalue: transaction.transaction_value,
                    rate: transaction.rate,
                    qty: transaction.primary_quantity,
                    comments: transaction.comments,
                    fromitem: transaction.from_item,
                    toitem: transaction.to_item,
                    gTotal: Number(transaction.primary_quantity) * Number(transaction.rate),
                    products: '',//customer.salePrice,
                    // salerate: salerate
                })

                // if (salerate)
                //     this.props.dispatch(getActiveProducts());
            }
        }
        else {
            this.setState({
                redirect: true
            })
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {

        if (nextProps.editTransactions) {
            if (nextProps.editTransactions.post === true) {
                return {
                    redirect: true
                }
            }
            else if (nextProps.editTransactions.post === false) {
                return {
                    error: 'Error updating transaction'
                }
            }
        }
        return null;
    }


    componentWillUnmount() {
        this.props.dispatch(clearNewTransaction());
    }

    submitForm = (event) => {

        event.preventDefault();

        let transaction = this.props.location.state.transactionInfo;

        transaction.transaction_source = this.state.source;
        transaction.transaction_type = this.state.ttype;
        transaction.transaction_action = this.state.taction;
        transaction.transaction_value = this.state.svalue;
        transaction.comments = this.state.comments;
        transaction.from_item = this.state.fromitem;
        transaction.to_item = this.state.toitem;
        transaction.rate = this.state.rate;
        transaction.transaction_date = this.state.startDate;
        transaction.primary_quantity = this.state.qty;

        console.log("Transaction Details : ", transaction)
        this.props.dispatch(updateTransaction(transaction));

    }

    handleInputTaction = (event) => {
        this.setState({ taction: event.target.value })
        // this.props.dispatch(getStockProducts())
        this.props.dispatch(getActiveProducts())
    }


    handleInputTtype = (event) => {
        this.setState({ ttype: event.target.value })
    }

    handleInputSource = (event) => {

        this.setState({ source: event.target.value })

        if (event.target.value === "Supplier" && !this.props.suppliersList) {
            this.props.dispatch(getSuppliersTransactions())
        }
        else if (event.target.value === "Customer" && !this.props.customerList) {
            this.props.dispatch(getCustomersTransactions())
        }
        else if (event.target.value === "Employees" && !this.props.userList) {
            this.props.dispatch(getEmployeesTransactions())
        }
    }

    handleInputSvalue = (event) => {

        if (this.state.source === "Supplier" && this.props.suppliersList) {
            this.setState({
                svalueid: this.props.suppliersList[event.target.value]._id
                , svalue: this.props.suppliersList[event.target.value].name
            })
        }
        else if (this.state.source === "Customer" && this.props.customerList) {
            this.setState({
                svalueid: this.props.customerList[event.target.value]._id
                , svalue: this.props.customerList[event.target.value].name
            })
        }
        else if (this.state.source === "Employees" && this.props.userList) {
            this.setState({
                svalueid: this.props.userList[event.target.value]._id
                , svalue: this.props.userList[event.target.value].name
            })
        }
    }

    handleInputDate = date => {
        this.setState({
            startDate: date
        });
    };

    handleInputQty = event => {
        let result = 0;
        if (event.target.value > 0 && this.state.rate > 0) {
            if (this.state.taction === 'Inventory Transfer') {
                if (this.state.fromitem && this.state.toitem) {
                    if (Number(event.target.value) <= Number(this.state.currentProductStock)) {
                        result = this.calculateTotal(Number(this.state.rate), Number(event.target.value))
                        this.setState({ qty: event.target.value, gTotal: result })
                    }
                }

            }
            else if (this.state.taction !== 'Inventory Transfer') {
                result = this.calculateTotal(Number(this.state.rate), Number(event.target.value))
                this.setState({ qty: event.target.value, gTotal: result })
            }
        }
    };

    handleInputRate = event => {
        this.setState({ rate: event.target.value })

        let result = 0;
        if (this.state.qty) {
            if (event.target.value) {
                result = this.calculateTotal(Number(this.state.qty), Number(event.target.value))
            }
            this.setState({ gTotal: result });
        }

        return 0;

    };

    handleInputComments = event => {
        this.setState({ comments: event.target.value })
    };

    handleInputFitem = event => {
        this.setState({
            fromitem: this.props.productsList[event.target.value]._id,
            currentProductStock: this.props.productsList[event.target.value].stock
        })
    };

    handleInputTitem = event => {
        this.setState({
            toitem: this.props.productsList[event.target.value]._id
        })
    };

    handleInputRitem = event => {
        this.setState({
            ritem: this.props.productsList[event.target.value]._id
        })
    };


    calculateTotal = (qty, rate) => {

        return Number(qty) * Number(rate)
    }

    getCurrentDate = () => {
        var t = new Date();
        t = this.state.startDate
        var formatted = t.format("dd.mm.yyyy");
        return formatted
    }

    getTransactionType = () => {

        if (this.state.source) {
            if (this.state.source === "Employees") {
                return (
                    <select required onChange={this.handleInputTtype} className="form-control" id="ttype" required>
                        <option defaultValue={this.state.ttype}>Other Expense</option>
                        <option value="Other Expense">Other Expense</option>
                    </select>
                )
            }
            else if (this.state.source === "Supplier") {
                return (
                    <select required onChange={this.handleInputTtype} className="form-control" id="ttype" required>
                        <option defaultValue={this.state.ttype}>Other Expense</option>
                        <option value="Purchase">Purchase</option>
                    </select>
                )
            }
            else if (this.state.source === "Customer") {
                return (
                    <select required onChange={this.handleInputTtype} className="form-control" id="ttype" required>
                        <option defaultValue={this.state.ttype}>Other Expense</option>
                        <option value="Sales">Sales</option>
                    </select>
                )
            }
        }
    }

    getTransactionAction = () => {

        if (this.state.source) {
            if (this.state.source === "Employees") {
                return (
                    <select required onChange={this.handleInputTaction} className="form-control" id="taction" required>
                        <option defaultValue={this.state.taction} >{this.state.taction}</option>
                        <option value="Pay Salary" >Pay Salary</option>
                        <option value="Fuel Cost">Fuel Cost</option>
                        <option value="Vehicle Maintenance">Vehicle Maintenance</option>
                        <option value="Advance Paid">Advance Paid</option>
                    </select>
                )
            }
            else if (this.state.source === "Supplier") {
                return (
                    <select required onChange={this.handleInputTaction} className="form-control" id="taction" required>
                        <option value="Inventory Transfer">Transfer Inventory</option>
                        <option value="Misc. Expense">Misc. Expense</option>
                    </select>
                )
            }
            else if (this.state.source === "Customer") {
                return (
                    <select required onChange={this.handleInputTaction} className="form-control" id="taction" required>
                        <option value="Misc. Expense">Misc. Expense</option>
                    </select>
                )
            }
        }
    }

    checkValid = () => {
        if (this.state.source && this.state.svalue && this.state.ttype && this.state.taction) {
            if (this.state.taction === 'Inventory Transfer') {
                if (this.state.fromitem && this.state.toitem) {
                    if (this.state.qty == 0 || this.state.rate == 0) {
                        return true
                    }
                    else { return false }
                }
                else
                    return true
            }
            else if (this.state.qty == 0 || this.state.rate == 0) {
                return true
            }
            else { return false }
        }
        return true
    }

    renderBody = () => {
        return (
            <div className="container mt-5">
                <div className="card ml-md-3">
                    <div className="card-inner">
                        <div className="card-head mt-2">
                            <h4 className="ff-base fw-medium">Edit Transaction</h4>
                            <p> {this.state.startDate} </p>
                            {/* <span>Date: <DatePicker
                                selected={this.state.startDate}
                                onChange={this.handleInputDate}
                            /></span> */}
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
                                                    {/* <option value=""></option> */}
                                                    <option defaultValue={this.state.source}>{this.state.source}</option>
                                                    {/* <option value="Employees">Employees</option> */}
                                                    <option value="Supplier">Supplier</option>
                                                    <option value="Customer">Customer</option>
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
                                                <select required onChange={this.handleInputSvalue} className="form-control ccap" id="svalue">
                                                    {/* <option value={-1}> Select {this.state.source}</option> */}
                                                    <option defaultValue={this.state.svalue}>{this.state.svalue}</option>
                                                    {/* <option value={-1}> Select {this.state.svalue}</option> */}
                                                    {
                                                        this.state.source === "Supplier" ?
                                                            this.props.suppliersList ?
                                                                this.props.suppliersList.map((item, key) => {
                                                                    return <option key={key} value={key} className="ccap" >{item.name} ({item.brand})</option>;
                                                                })
                                                                : null
                                                            : this.state.source === "Customer" ?
                                                                this.props.customerList ?
                                                                    this.props.customerList.map((item, key) => {
                                                                        return <option key={key} value={key} className="ccap" >{item.name}</option>;
                                                                    }) : null
                                                                : this.state.source === "Employees" ?
                                                                    this.props.userList ?
                                                                        this.props.userList.map((item, key) => {
                                                                            return <option key={key} value={key} className="ccap" >{item.name}</option>;
                                                                        })
                                                                        : null
                                                                    : null
                                                    }
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="row g-2">
                                {this.state.source ?
                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <label className="form-label" htmlFor="ttype">
                                                Type
                                         </label>
                                            <div className="form-control-wrap ">
                                                <div className="form-control-select">
                                                    <div>{this.getTransactionType()}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div> : null}
                                {this.state.source ?
                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <label className="form-label" htmlFor="taction">Action</label>
                                            <div className="form-control-wrap ">
                                                <div className="form-control-select">
                                                    <div>{this.getTransactionAction()}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div> : null}
                            </div>
                            {
                                this.state.taction === "Inventory Transfer" ?
                                    <div className="row g-2">
                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label className="form-label" htmlFor="fromitem">From Product</label>
                                                <div className="form-control-wrap ">
                                                    <div className="form-control-select">
                                                        <select required onChange={this.handleInputFitem} className="form-control" id="fromitem" required>
                                                            <option value={-1}> From Item</option>
                                                            <option defaultValue={this.state.fromitem}> {this.state.fromitem}</option>
                                                            {
                                                                this.props.productsList ?
                                                                    this.props.productsList.map((item, key) => {
                                                                        return <option key={key} value={key} className="ccap" disabled={(item.stock === 0) ? true : false}>{item.stock === 0 ? item.name + ' (Out of stock)' : item.name}</option>;
                                                                    })
                                                                    : null
                                                            }
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label className="form-label" htmlFor="toitem">To Product</label>
                                                <div className="form-control-wrap ">
                                                    <div className="form-control-select">
                                                        <select required onChange={this.handleInputTitem} className="form-control" id="toitem" required>
                                                            <option value={-1}> To Item</option>
                                                            <option defaultValue={this.state.toitem}> {this.state.toitem}</option>
                                                            {
                                                                this.props.productsList ?
                                                                    this.props.productsList.map((item, key) => {
                                                                        return <option key={key} value={key} className="ccap" >{item.name} ({item.brand})</option>;
                                                                    })
                                                                    : null
                                                            }
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    : null
                            }
                            <div className="row">
                                {/* {this.state.taction === "Sales Return" || this.state.taction === "Purchase Return" ?
                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <label className="form-label" htmlFor="ritem">Return Product</label>
                                            <div className="form-control-wrap ">
                                                <div className="form-control-select">
                                                    <select required onChange={this.handleInputRitem} className="form-control" id="ritem" required>
                                                        <option value={-1}> Return Item</option>
                                                        {
                                                            this.props.productsList ?
                                                                this.props.productsList.map((item, key) => {
                                                                    return <option key={key} value={key} className="ccap" >{item.name} ({item.brand})</option>;
                                                                })
                                                                : null
                                                        }
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    : null
                                } */}
                                <div className="col-md-4 mt-2">
                                    <div className="form-group">
                                        <label className="form-label" htmlFor="qty">Quantity</label>
                                        <div className="form-control-wrap">
                                            <input type="number" min={0} max={this.state.taction === 'Inventory Transfer' && this.state.fromitem && this.state.toitem ? this.state.currentProductStock : 1000000} value={this.state.qty} onChange={this.handleInputQty} className="form-control" id="qty" placeholder="Transaction Quantity" />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4 mt-2">
                                    <div className="form-group">
                                        <label className="form-label" htmlFor="rate">Rate</label>
                                        <div className="form-control-wrap">
                                            <input type="number" min="0" value={this.state.rate} onChange={this.handleInputRate} className="form-control" id="rate" placeholder="Rate" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-3 mt-5  border-info border-top border-bottom">
                                <div className="row g-2">
                                    <div className="col-md-6">
                                        <strong className="ff-base  h6 ccap">Total</strong>
                                    </div>

                                    <div className="col-md-6 d-flex justify-content-end">
                                        <span className="fw-medium ccap ">Rs. {this.state.gTotal}</span>
                                    </div>

                                </div>

                            </div>
                            <div className="col-md-8 mt-5">
                                <div className="form-group">
                                    <label className="form-label" htmlFor="comments">Comments</label>
                                    <div className="form-control-wrap">
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
                                        <button onClick={this.submitForm} className="btn btn-lg btn-primary" disabled={this.checkValid()}>
                                            <em className="icon ni ni-plus-c"></em> <span>  Save Changes</span>
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
            this.props.history.push('/customers')
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
    console.log("state", state)
    return {
        // editCustomer: state.customer,
        productsList: state.product.productList,
        editTransactions: state.transaction.transactionList
    }
}

export default connect(mapStateToProps)(EditTransaction)
