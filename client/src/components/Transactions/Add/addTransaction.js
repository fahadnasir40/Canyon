import React, { Component } from "react";
import Header from "../../Header/header";
import Sidebar from "../../Sidebar/sidebar";
import Footer from "../../Footer/footer";
import { saveTransaction } from '../../../actions';
import { getActiveProducts, getCustomersTransactions, getEmployeesTransactions, getSuppliersTransactions } from '../../../actions';
import { connect } from 'react-redux';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Moment from 'react-moment';

class AddTransaction extends Component {

    state = {
        startDate: new Date(),
        source: '',
        svalueid: '',
        svalue: '',
        ttype: 'Other Expense',
        taction: 'Pay Salary',
        qty: 1,
        rate: 1,
        comments: '',
        fromitem: '',
        toitem: '',
        ritem: '',
        suppliersList: '',
        customerList: '',
        userList: '',
        productsList: '',
        redirect: false,
        error: ''
    }

    static getDerivedStateFromProps(nextProps, prevState) {

        if (nextProps.addTransaction) {
            if (nextProps.addTransaction.post === true) {
                return {
                    redirect: true
                }
            }
            else if (nextProps.addTransaction.post === false) {
                return {
                    error: 'Error adding the transaction.'
                }
            }
        }

        return null;
    }

    // componentWillUnmount() {
    //     this.props.dispatch(clearProduct());
    // }

    handleInputTaction = (event) => {
        this.setState({ taction: event.target.value })
        // if (event.target.value === "Transfer Inventory") {
        console.log("Hello List", this.state.productsList)
        this.props.dispatch(getActiveProducts())
        // }
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
            console.log("customer list calling", event.target.value)
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
        this.setState({ qty: event.target.value })
    };

    handleInputRate = event => {
        this.setState({ rate: event.target.value })
    };

    handleInputComments = event => {
        this.setState({ comments: event.target.value })
    };

    handleInputFitem = event => {
        this.setState({
            fromitem: this.props.productsList[event.target.value]._id
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

    submitForm = (event) => {

        // const form = event.currentTarget;

        event.preventDefault();

        this.props.dispatch(saveTransaction({
            transaction_date: this.state.startDate,
            primary_quantity: this.state.qty,
            rate: this.state.rate,
            transaction_source: this.state.source,
            transaction_type: this.state.ttype,
            transaction_action: this.state.taction,
            transaction_value: this.state.svalue,
            transaction_value_id: this.state.svalueid,
            comments: this.state.comments,
            from_item: this.state.fromitem,
            to_item: this.state.toitem,
            addedBy: this.props.user.login.id
        }))
    }

    // calculateTotal = (total) => {

    //     total = Number(this.state.seal);
    //     if (!total)
    //         return 0;
    //     return total;
    // }


    getCurrentDate = () => {
        const date = new Date();
        return (<Moment format="MMM DD, YYYY">{date}</Moment>)
    }

    renderBody = (total) => {
        console.log("products List ", this.props.productList)
        return (
            <div className="container mt-5">
                <div className="card ml-md-3">
                    <div className="card-inner">
                        <div className="card-head mt-2">
                            <h4 className="ff-base fw-medium">New Transaction</h4>
                            <span>Date: <DatePicker
                                selected={this.state.startDate}
                                onChange={this.handleInputDate}
                            /></span>
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
                                                    <option value=""></option>
                                                    <option value="Employees">Employees</option>
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
                                                    <option value={-1}> Select {this.state.source}</option>

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
                                <div className="col-md-4">
                                    <div className="form-group">
                                        <label className="form-label" htmlFor="ttype">
                                            Type
                                         </label>
                                        <div className="form-control-wrap ">
                                            <div className="form-control-select">
                                                <select required onChange={this.handleInputTtype} className="form-control" id="ttype" required>
                                                    <option value="Other Expense">Other Expense</option>
                                                    <option value="Sales">Sales</option>
                                                    <option value="Purchase">Purchase</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="form-group">
                                        <label className="form-label" htmlFor="taction">Action</label>
                                        <div className="form-control-wrap ">
                                            <div className="form-control-select">
                                                <select required onChange={this.handleInputTaction} className="form-control" id="taction" required>
                                                    <option value="Pay Salary" >Pay Salary</option>
                                                    <option value="Fuel Cost">Fuel Cost</option>
                                                    <option value="Vehicle Maintenance">Vehicle Maintenance</option>
                                                    <option value="Advance Paid">Advance Paid</option>
                                                    <option value="Inventory Transfer">Transfer Inventory</option>
                                                    <option value="Sales Return">Sales Return</option>
                                                    <option value="Purchase Return">Purchase Return</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
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
                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label className="form-label" htmlFor="toitem">To Product</label>
                                                <div className="form-control-wrap ">
                                                    <div className="form-control-select">
                                                        <select required onChange={this.handleInputTitem} className="form-control" id="toitem" required>
                                                            <option value={-1}> To Item</option>
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
                                {this.state.taction === "Sales Return" || this.state.taction === "Purchase Return" ?
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
                                }
                                <div className="col-md-4">
                                    <div className="form-group">
                                        <label className="form-label" htmlFor="qty">Quantity</label>
                                        <div className="form-control-wrap">
                                            <input type="number" min={0} value={this.state.qty} onChange={this.handleInputQty} className="form-control" id="qty" placeholder="Transaction Quantity" />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4">
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

                                    {/* <div className="col-md-6 d-flex justify-content-end">
                                        <span className="fw-medium ccap ">Rs. {this.calculateTotal(total)}</span>
                                    </div> */}

                                </div>

                            </div>

                            {/* <div className="row g-4 mt-5"> */}
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
                                        <button onClick={this.submitForm} className="btn btn-lg btn-primary">
                                            <em className="icon ni ni-plus-c"></em> <span>  Save </span>
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
            this.props.history.push('/transactions')
        }

        let total = 0;
        console.log("List", this.state)
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
        productsList: state.product.productList,
        suppliersList: state.supplier.supplierList,
        customerList: state.customer.customerList,
        userList: state.user.userList,
        addTransaction: state.transaction.transaction
    }
}

export default connect(mapStateToProps)(AddTransaction)