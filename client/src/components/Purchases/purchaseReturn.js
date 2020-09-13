import React, { Component } from 'react'
import Sidebar from '../Sidebar/sidebar'
import Header from '../Header/header'
import Footer from '../Footer/footer'
import { connect } from 'react-redux';
import Moment from 'react-moment';


class PurchaseReturn extends Component {

    state = {
        purchase: '',
        products: ''
    }

    componentDidMount() {
        if (!this.props.location.state) {
            this.props.history.push('/purchases')
        }
        else {
            this.setState({
                purchase: this.props.location.state.purchase.doc,
                products: this.props.location.state.purchase.products
            })
        }
    }

    renderBody = (purchase, products) => {
        return (
            <div className="container mt-5">
                <div className="card ml-md-3">
                    <div className="card-inner">
                        <div className="card-head mt-1">
                            <h4 className="ff-base fw-medium">Purchase Return</h4>
                        </div>
                        <form className="form-validate">
                            <div className="row g-4">
                                <div className="col-lg-6 order-md-last">
                                    <div className="d-flex justify-content-end" >
                                        <span className="fw-medium">Purchase Date</span><span className="ml-2"><Moment format={'DD/MM/YYYY'}>{purchase.purchaseDate}</Moment></span>
                                    </div>
                                </div>
                                <div className="col-lg-4 ">
                                    <span className="fw-medium">Description: </span><span className="fw-normal">{purchase.description}</span>
                                </div>
                            </div>
                            <div className="row g-4">
                                <div className="col">
                                    <span className="fw-medium">Supplier Name: </span><span>{purchase.supplierName}</span>
                                </div>
                            </div>
                            <div className="row g-4">

                            <div className="col">
                                    <span className="fw-medium">Address: </span><span>{purchase.supplierAddress?
                                    purchase.supplierAddress.name
                                :null}</span>
                                </div>
                            </div>
                            <div id="accordion-2" className="accordion accordion-s3 mt-4">
                                <div className="accordion-item">
                                    <a href="#" className="accordion-head" data-toggle="collapse" data-target="#accordion-item-2-1">
                                        <h6 className="title">Purchase Details</h6>
                                        <span className="accordion-icon"></span>
                                    </a>
                                    {/* <div className="accordion-body collapse show" id="accordion-item-2-1" data-parent="#accordion-2">
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
                                    </div> */}
                                </div>
                            </div>
                            <div className="row g-4">
                                <div className="col-12 mt-4 ml-2">
                                    <div className="form-group">
                                        {/* <button type="button" onClick={this.submitForm} className="btn btn-lg btn-primary" disabled={!this.state.valid || this.state.loading}>
                                            <em className="icon ni ni-plus-c"></em> <span>  Save</span>
                                        </button> */}
                                    </div>
                                </div>
                            </div>
                        </form>
                        <div className="text-danger  mt-2">
                            {/* {this.state.error ?
                                <span className="ff-bold"><strong>{this.state.error}</strong></span>
                                : null} */}
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    render() {
        const purchase = this.state.purchase;
        const products = this.state.products;

        return (
            <div className="nk-body  npc-default has-sidebar ">
                <div className="nk-app-root">
                    <div className="nk-main"></div>
                    <Sidebar />
                    <div className="wrap container-fluid">
                        <Header user={this.props.user} />
                        <div className="custom-dashboard mt-5">
                            {purchase ?
                                this.renderBody(purchase, products)
                                : null}
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

        // productsList: state.product.productList,
        // removeSupplier: state.supplier.postDeleted,
        // editSupplier: state.supplier.post
    }
}

export default connect(mapStateToProps)(PurchaseReturn)