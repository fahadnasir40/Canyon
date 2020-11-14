import React, { Component } from 'react'
import Sidebar from '../Sidebar/sidebar'
import Header from '../Header/header'
import Footer from '../Footer/footer'
import { Link } from 'react-router-dom'
import { clearSale, getCustomer, getSaleProduct } from '../../actions'
import { connect } from 'react-redux'
import Moment from 'react-moment'
import ReactToPrint from 'react-to-print'
import NumberFormat from 'react-number-format'

class SaleInvoice extends Component {
    state = {
        customer: '',
        products: '',
        totalSecurity: ''
    }

    componentDidMount() {
        this.props.dispatch(getSaleProduct(this.props.match.params.id));
    }

    componentWillUnmount() {
        this.props.dispatch(clearSale());
    }

    static getDerivedStateFromProps(nextProps, prevState) {

        if (!prevState.sale) {
            if (nextProps.sale) {
                if (nextProps.sale.doc) {
                    nextProps.dispatch(getCustomer(nextProps.sale.doc.customerId))
                    const p = nextProps.sale.products.find(x => x.sku == 'CN19LL');
                    if (!p) {
                        const other = nextProps.sale.products.find(x => x.sku == 'O19L');
                        if (other) {
                            return {
                                sale: nextProps.sale.doc,
                                products: nextProps.sale.products,
                                totalSecurity: 0.00001
                            }
                        }
                        else {
                            return {
                                sale: nextProps.sale.doc,
                                products: nextProps.sale.products,
                            }
                        }
                    }
                    else {
                        const s = nextProps.sale.doc.productDetails.find(x => x._id === p._id);
                        // console.log("Value", s.custExBottles, s.secRate)
                        return {
                            sale: nextProps.sale.doc,
                            products: nextProps.sale.products,
                            totalSecurity: Number(nextProps.sale.doc.custExBottles) * Number(s.secRate)
                        }
                    }
                }
                else {
                    return {
                        sale: nextProps.sale.doc,
                        products: nextProps.sale.products
                    }
                }
            }
        }
        return null;
    }

    getCustomerAddress = (value) => {
        let newValue = '';
        let check = false;
        for (var i = 0; i < value.length; i++) {
            newValue += value[i];
            if (value[i] === ',' && i > 5 && !check) {
                check = true;
                newValue += '\n   '
            }
        }
        return newValue;
    }


    renderBody = (sale, products) => (

        sale ?
            <div className="nk-content bg-white ml-md-5">
                <div className="container wide-xl">
                    <div className="nk-content-body">
                        <div className="nk-content-wrap">
                            <div className="nk-block-head">
                                <div className="nk-block-between g-3">
                                    <div className="nk-block-head-content">
                                        <h3 className="nk-block-title page-title">Invoice <strong className="text-primary small"># {sale._id}</strong>  {sale.status === 'Returned' ? ' (Returned)' : null}</h3>
                                        <div className="nk-block-des text-soft">
                                            <ul className="list-inline">
                                                <li>Created At: <span className="text-base"><Moment format="DD MMM, YYYY hh:mm A"></Moment></span></li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="nk-block-head-content">
                                        <Link to="/orders" className="btn btn-outline-light bg-white d-none d-sm-inline-flex mr-md-3"><em className="icon ni ni-arrow-left"></em><span>Back</span></Link>

                                        <Link to="/orders" className="btn btn-icon btn-outline-light bg-white d-inline-flex d-sm-none "><em className="icon ni ni-arrow-left"></em></Link>
                                    </div>
                                </div>
                            </div>
                            <div className="nk-block border border-light bg-white p-3">
                                <div className="invoice-action">
                                    <ReactToPrint
                                        trigger={() => {
                                            // NOTE: could just as easily return <SomeComponent />. Do NOT pass an `onClick` prop
                                            // to the root node of the returned component as it will be overwritten.
                                            return <a className="btn btn-icon btn-lg btn-white btn-dim btn-outline-primary" onClick={this.printInvoice}><em className="icon ni ni-printer-fill"></em></a>
                                        }}
                                        documentTitle={`Sale Invoice #${sale._id}`}
                                        bodyClass="bg-white"
                                        content={() => this.componentRef}
                                    />
                                </div>
                                <div className="invoice m-5" ref={el => (this.componentRef = el)} >

                                    <div className="invoice-wrap">
                                        <div className="invoice-brand text-center">
                                            <img src="./images/logo-dark.png" style={{ width: "140px", height: "56px" }} srcSet="./images/logo-dark.png" alt="" />
                                        </div>
                                        <div className="invoice-head mb-2 mt-4">
                                            <div className="row mt-2">
                                                <div className="d-flex mr-auto ml-md-4">
                                                    <div className="invoice-contact  ">
                                                        <span className="overline-title">Invoice To</span>
                                                        <div className="invoice-contact-info">
                                                            <h4 className="title">{sale.customerName}</h4>
                                                            <ul className="list-plain">
                                                                <li><em className="icon ni ni-map-pin-fill mt-1"></em><span style={{ whiteSpace: " pre-wrap" }}> {this.getCustomerAddress(sale.customerAddress.name)}<br /></span></li>
                                                                {this.props.customer ?
                                                                    this.props.customer.phone ?
                                                                        <li><em className="icon ni ni-call-fill mt-1 "></em><span>{this.props.customer.phone}</span></li>
                                                                        : null
                                                                    : null}
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="d-flex ml-auto mr-5">
                                                    <div className="invoice-desc">
                                                        <h3 className="title">Invoice</h3>
                                                        <ul className="list-plain">
                                                            <li className="invoice-id"><span>Invoice ID</span>: <span>{sale._id}</span></li>
                                                            <li className="invoice-date"><span>Issue Date</span>: <span><Moment format="DD MMM, YYYY"></Moment></span></li>
                                                            <li className="invoice-date"><span>Sale Date</span>: <span><Moment format="DD MMM, YYYY">{sale.saleDate}</Moment></span></li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="invoice-bills mt-5">
                                            <div className="table-responsive">
                                                <table className="table">
                                                    <thead>
                                                        <tr>
                                                            <th>Item ID</th>
                                                            <th>Name</th>
                                                            <th>Price</th>
                                                            {this.state.totalSecurity ? <th>Qty Rec</th> : null}
                                                            <th>Qty Del</th>
                                                            <th>Discount</th>
                                                            <th>Amount</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            sale.productDetails.map((item, key) => {
                                                                return (

                                                                    <tr key={key}>
                                                                        <td>{products.find(x => x._id === item._id).sku}</td>
                                                                        <td>{item.pname}</td>
                                                                        <td>{item.pprice}</td>
                                                                        {this.state.totalSecurity ? <td>{item.rqty}</td> : null}
                                                                        <td>{item.dqty}</td>
                                                                        <td>{item.disc}</td>
                                                                        <td>{item.ptotal}</td>
                                                                    </tr>
                                                                )
                                                            })}


                                                    </tbody>
                                                    <tfoot>
                                                        <tr>
                                                            {this.state.totalSecurity ?
                                                                <td colSpan="5"></td> : <td colSpan="4"></td>}

                                                            <td colSpan="1">Subtotal</td>
                                                            <td> {sale.totalAmount}</td>
                                                        </tr>
                                                        {this.state.totalSecurity > 0 ?
                                                            <tr>
                                                                <td colSpan="5"></td>
                                                                <td colSpan="1">Security</td>
                                                                <td> <NumberFormat value={Math.trunc(this.state.totalSecurity)} displayType={'text'} thousandSeparator={true} /></td>
                                                            </tr>
                                                            : null
                                                        }
                                                        <tr>
                                                            {this.state.totalSecurity ?
                                                                <td colSpan="5"></td> : <td colSpan="4"></td>}
                                                            <td colSpan="1"><strong>Grand Total</strong></td>
                                                            <td>Rs. <NumberFormat value={Math.trunc(Number(sale.totalAmount) + Number(this.state.totalSecurity))} displayType={'text'} thousandSeparator={true} /></td>
                                                        </tr>
                                                        <tr>
                                                            {this.state.totalSecurity ?
                                                                <td colSpan="5"></td> : <td colSpan="4"></td>}
                                                            <td colSpan="1"><strong>Paid Amount</strong></td>
                                                            <td>Rs. <NumberFormat value={Math.trunc(Number(sale.paidAmount) + Number(this.state.totalSecurity) - Number(sale.secAmount))} displayType={'text'} thousandSeparator={true} /></td>
                                                        </tr>
                                                        <tr>
                                                            {this.state.totalSecurity ?
                                                                <td colSpan="5"></td> : <td colSpan="4"></td>}
                                                            <td colSpan="1"><strong>Due</strong></td>
                                                            <td>{(Number(sale.totalAmount) + Number(this.state.totalSecurity) - (Number(sale.paidAmount) + Number(this.state.totalSecurity) - Number(sale.secAmount))) == 0 ? <span> Nil</span> : <span className="text-danger"><strong>Rs. <NumberFormat value={(Number(sale.totalAmount) + Number(this.state.totalSecurity) - (Number(sale.paidAmount) + Number(this.state.totalSecurity) - Number(sale.secAmount)))} displayType={'text'} thousandSeparator={true} /></strong></span>}</td>
                                                        </tr>
                                                    </tfoot>
                                                </table>
                                                <div className="nk-notes ff-italic fs-12px text-soft mt-5"> Invoice was created on a computer and is valid without the signature and seal. </div>
                                            </div>
                                        </div>
                                    </div>
                                    <footer className="footer mt-auto ml-0"  >
                                        <div className="my-5 text-center">
                                            <p>
                                                13-B, Public Health Society, Main Boulevard LDA Avenue-1, Raiwind Road, Lahore
                                                    Cell: +92 300 9117673 <br />
                                                    Email: saadkhan138@hotmail.com
                                                </p>

                                        </div>
                                    </footer>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            : null
    )


    render() {

        let sale = this.state.sale;
        let products = this.state.products;

        return (
            <div className="nk-body bg-lighter npc-default has-sidebar ">
                <div className="nk-app-root">
                    <div className="nk-main"></div>
                    <Sidebar {...this.props} />
                    <div className="wrap container-fluid">
                        <Header user={this.props.user} />
                        <div className="custom-dashboard mt-5">
                            {this.renderBody(sale, products)}

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


function mapStateToProps(state) {
    return {
        customer: state.customer.customer,
        sale: state.sale.sale
    }
}
export default connect(mapStateToProps)(SaleInvoice)