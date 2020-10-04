import React, { Component } from 'react'
import Sidebar from '../Sidebar/sidebar'
import Header from '../Header/header'
import Footer from '../Footer/footer'
import { Link } from 'react-router-dom'
import { clearSale, getCustomer, getSaleProduct } from '../../actions'
import { connect } from 'react-redux'
import Moment from 'react-moment'
import ReactToPrint from 'react-to-print'

class SaleInvoice extends Component {
    state = {
        customer: '',
        products: ''
    }

    componentDidMount() {
        this.props.dispatch(getSaleProduct(this.props.match.params.id));
    }

    componentWillUnmount() {
        this.props.dispatch(clearSale());
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        console.log("State Next", nextProps)
        if (!prevState.sale) {
            if (nextProps.sale) {
                if (nextProps.sale.doc) {
                    nextProps.dispatch(getCustomer(nextProps.sale.doc.customerId))
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
                                        <h3 className="nk-block-title page-title">Invoice <strong className="text-primary small"># {sale._id}</strong></h3>
                                        <div className="nk-block-des text-soft">
                                            <ul className="list-inline">
                                                <li>Created At: <span className="text-base"><Moment format="DD MMM, YYYY hh:mm A"></Moment></span></li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="nk-block-head-content">
                                        <Link to="/sales" className="btn btn-outline-light bg-white d-none d-sm-inline-flex mr-md-3"><em className="icon ni ni-arrow-left"></em><span>Back</span></Link>
                                        {/* {

                                            purchase.status !== 'Returned' ?

                                                <Link to={{
                                                    pathname: "/purchaseReturn",
                                                    state: {
                                                        purchase: this.props.purchase
                                                    }
                                                }} className="btn btn-outline-light bg-white d-none d-sm-inline-flex"><em className="icon ni ni-histroy"></em><span>Return Purchase</span></Link>
                                                : null
                                        }
                                        {
                                            purchase.status !== 'Returned' ?
                                                <Link to={{
                                                    pathname: "/purchaseReturn",
                                                    state: {
                                                        purchase: this.props.purchase
                                                    }
                                                }} className="btn btn-icon btn-outline-light bg-white d-inline-flex d-sm-none mr-md-3"><em className="icon ni ni-histroy"></em></Link>
                                                : null
                                        } */}
                                        <Link to="/sales" className="btn btn-icon btn-outline-light bg-white d-inline-flex d-sm-none "><em className="icon ni ni-arrow-left"></em></Link>
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
                                            <img src="./images/logo-dark.png" srcSet="./images/logo-dark2x.png 2x" alt="" />
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
                                                                    // this.props.customer.customer.phone ?
                                                                    //     : null
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
                                                            <li className="invoice-date"><span>Sale Date</span>: <span><Moment format="DD MMM, YYYY">{sale.date}</Moment></span></li>
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
                                                            <th>Qty</th>
                                                            {/* {purchase.status === 'Returned' || purchase.status === 'Returned Items'  || purchase.status === 'Returned Items Pending' ?
                                                                <th>Returned Qty</th>
                                                                : null} */}
                                                            <th>Amount</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            sale.productDetails.map((item, key) => {
                                                                console.log("Item", item)
                                                                if (item.rqty > 0 && item.dqty > 0) {
                                                                    return (
                                                                        // <tr>
                                                                        //     {/* <tr key={key}>
                                                                        //         <td>{products.find(x => x._id === item._id).sku}</td>
                                                                        //         <td>{item.pname}</td>
                                                                        //         <td>{item.pprice}</td>
                                                                        //         <td>{item.dqty}</td>
                                                                        //         <td>{item.ptotal}</td>
                                                                        //     </tr> */}
                                                                        // </tr>
                                                                        <tr key={key + '-returned'}>
                                                                            <td>{products.find(x => x._id === item._id).sku}</td>
                                                                            <td>{item.pname + '( Returned ) '}</td>
                                                                            <td>{item.pprice}</td>
                                                                            <td>{item.rqty}</td>
                                                                            <td>{item.ptotal}</td>
                                                                        </tr>



                                                                    )
                                                                }
                                                                else {
                                                                    if (item.rqty > 0 && item.dqty === 0) {
                                                                        return (
                                                                            <tr key={key}>
                                                                                <td>{products.find(x => x._id === item._id).sku}</td>
                                                                                <td>{item.pname + ' ( Returned )'} </td>
                                                                                <td>{item.pprice}</td>
                                                                                <td>{item.rqty}</td>
                                                                                <td>{item.ptotal}</td>
                                                                            </tr>
                                                                        )
                                                                    }
                                                                    else if (item.rqty === 0 || !item.rqty) {
                                                                        return (<tr key={key}>
                                                                            <td>{products.find(x => x._id === item._id).sku}</td>
                                                                            <td>{item.pname} </td>
                                                                            <td>{item.pprice}</td>
                                                                            <td>{item.dqty}</td>
                                                                            <td>{item.ptotal}</td>
                                                                        </tr>)
                                                                    }
                                                                }

                                                            })}


                                                    </tbody>
                                                    {/* <tfoot>
                                                        <tr>
                                                            {purchase.status === 'Returned' || purchase.status === 'Returned Items'  || purchase.status === 'Returned Items Pending' ?
                                                                <td colSpan="4"></td> : <td colSpan="2"></td>}
                                                            {purchase.status === 'Returned' || purchase.status === 'Returned Items'  || purchase.status === 'Returned Items Pending' ?
                                                                <td colSpan="1">Subtotal</td> : <td colSpan="2">Subtotal</td>}
                                                            <td>{purchase.totalAmount}</td>
                                                        </tr>
                                                        <tr>
                                                            {purchase.status === 'Returned' || purchase.status === 'Returned Items' || purchase.status === 'Returned Items Pending'?
                                                                <td colSpan="4"></td> : <td colSpan="2"></td>}
                                                            {purchase.status === 'Returned' || purchase.status === 'Returned Items'  || purchase.status === 'Returned Items Pending'? 
                                                                <td colSpan="1"><strong>Grand Total</strong></td> : <td colSpan="2"><strong>Grand Total</strong></td>}
                                                            <td>Rs. {purchase.totalAmount}</td>
                                                        </tr>
                                                    </tfoot> */}
                                                </table>
                                                <div className="nk-notes ff-italic fs-12px text-soft mt-5"> Invoice was created on a computer and is valid without the signature and seal. </div>
                                            </div>
                                        </div>
                                    </div>
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
        console.log("sale", sale)
        let products = this.state.products;
        console.log("products", products)
        return (
            <div className="nk-body bg-lighter npc-default has-sidebar ">
                <div className="nk-app-root">
                    <div className="nk-main"></div>
                    <Sidebar {...this.props} />
                    <div className="wrap container-fluid">
                        <Header user={this.props.user} />
                        <div className="custom-dashboard mt-5">
                            {this.renderBody(sale, products)}
                            <Footer />
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