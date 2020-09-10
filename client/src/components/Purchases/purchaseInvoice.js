import React, { Component } from 'react'
import Sidebar from '../Sidebar/sidebar'
import Header from '../Header/header'
import Footer from '../Footer/footer'
import { Link } from 'react-router-dom'
import { getSupplier } from '../../actions'
import { connect } from 'react-redux'
import Moment from 'react-moment'
import ReactToPrint from 'react-to-print'


class PurchaseInvoice extends Component {

    state = {
        purchase: ''
    }

    componentDidMount() {
        if (!this.props.location.state) {
            this.props.history.push('/purchases')
        }
        else {
            console.log("Purchase", this.props.location.state.purchaseInfo)
            this.props.dispatch(getSupplier(this.props.location.state.purchaseInfo.supplierId));
            this.setState({
                purchase: this.props.location.state.purchaseInfo
            })
        }
    }

    getSupplierAddress = (value) => {
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


    renderBody = (purchase) => (
        purchase ?
            <div class="nk-content ml-md-5">
                <div class="container wide-xl">
                    <div class="nk-content-body">
                        <div class="nk-content-wrap">
                            <div class="nk-block-head">
                                <div class="nk-block-between g-3">
                                    <div class="nk-block-head-content">
                                        <h3 class="nk-block-title page-title">Invoice <strong class="text-primary small"># {purchase._id}</strong></h3>
                                        <div class="nk-block-des text-soft">
                                            <ul class="list-inline">
                                                <li>Created At: <span class="text-base"><Moment format="DD MMM, YYYY hh:mm A"></Moment></span></li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div class="nk-block-head-content">
                                        <Link to="/purchases" class="btn btn-outline-light bg-white d-none d-sm-inline-flex"><em class="icon ni ni-arrow-left"></em><span>Back</span></Link>
                                        <Link to="/purchases" class="btn btn-icon btn-outline-light bg-white d-inline-flex d-sm-none"><em class="icon ni ni-arrow-left"></em></Link>
                                    </div>
                                </div>
                            </div>
                            <div class="nk-block border border-light bg-white p-3">
                                <div class="invoice-action">
                                    <ReactToPrint
                                        trigger={() => {
                                            // NOTE: could just as easily return <SomeComponent />. Do NOT pass an `onClick` prop
                                            // to the root node of the returned component as it will be overwritten.
                                            return <Link class="btn btn-icon btn-lg btn-white btn-dim btn-outline-primary" onClick={this.printInvoice}><em class="icon ni ni-printer-fill"></em></Link>
                                        }}
                                        documentTitle={`Purchase Invoice - ${purchase._id}`}
                                        bodyClass="bg-white"
                                        content={() => this.componentRef}
                                    />
                                </div>
                                <div class="invoice m-5" ref={el => (this.componentRef = el)} >

                                    <div class="invoice-wrap">
                                        <div class="invoice-brand text-center">
                                            <img src="./images/logo-dark.png" srcSet="./images/logo-dark2x.png 2x" alt="" />
                                        </div>
                                        <div class="invoice-head mb-2 mt-4">
                                            <div className="row mt-2">
                                                <div className="d-flex mr-auto ml-md-4">
                                                    <div class="invoice-contact  ">
                                                        <span class="overline-title">Invoice To</span>
                                                        <div class="invoice-contact-info">
                                                            <h4 class="title">{purchase.supplierName}</h4>
                                                            <ul class="list-plain">
                                                                <li><em class="icon ni ni-map-pin-fill mt-1"></em><span style={{ whiteSpace: " pre-wrap" }}> {this.getSupplierAddress(purchase.supplierAddress.name)}<br /></span></li>
                                                                {this.props.supplier ?
                                                                    this.props.supplier.phone ?
                                                                        <li><em class="icon ni ni-call-fill mt-1 "></em><span>{this.props.supplier.phone}</span></li>
                                                                        : null
                                                                    : null}
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="d-flex ml-auto mr-5">
                                                    <div class="invoice-desc">
                                                        <h3 class="title">Invoice</h3>
                                                        <ul class="list-plain">
                                                            <li class="invoice-id"><span>Invoice ID</span>: <span>{purchase._id}</span></li>
                                                            <li class="invoice-date"><span>Issue Date</span>: <span><Moment format="DD MMM, YYYY"></Moment></span></li>
                                                            <li class="invoice-date"><span>Purchase Date</span>: <span><Moment format="DD MMM, YYYY">{purchase.date}</Moment></span></li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="invoice-bills mt-5">
                                            <div class="table-responsive">
                                                <table class="table">
                                                    <thead>
                                                        <tr>
                                                            <th>Item ID</th>
                                                            <th>Name</th>
                                                            <th>Price</th>
                                                            <th>Qty</th>
                                                            <th>Amount</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            purchase.productDetails.map((item, key) => (
                                                                <tr>
                                                                    <td>24108054</td>
                                                                    <td>{item.pname}</td>
                                                                    <td>{item.pprice}</td>
                                                                    <td>{item.pqty}</td>
                                                                    <td>{item.ptotal}</td>
                                                                </tr>
                                                            ))
                                                        }
                                                    </tbody>
                                                    <tfoot>
                                                        <tr>
                                                            <td colspan="2"></td>
                                                            <td colspan="2">Subtotal</td>
                                                            <td>{purchase.totalAmount}</td>
                                                        </tr>
                                                        <tr>
                                                            <td colspan="2"></td>
                                                            <td colspan="2"><strong>Grand Total</strong></td>
                                                            <td>Rs. {purchase.totalAmount}</td>
                                                        </tr>
                                                    </tfoot>
                                                </table>
                                                <div class="nk-notes ff-italic fs-12px text-soft mt-5"> Invoice was created on a computer and is valid without the signature and seal. </div>
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
        let purchase = this.state.purchase;
        return (
            <div className="nk-body bg-lighter npc-default has-sidebar ">
                <div className="nk-app-root">
                    <div className="nk-main"></div>
                    <Sidebar />
                    <div className="wrap container-fluid">
                        <Header user={this.props.user} />
                        <div className="custom-dashboard mt-5">
                            {this.renderBody(purchase)}
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
        supplier: state.supplier.supplier
    }
}

export default connect(mapStateToProps)(PurchaseInvoice)