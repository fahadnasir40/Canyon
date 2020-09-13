import React, { Component } from "react";
import Sidebar from "../../Sidebar/sidebar";
import Header from "../../Header/header";
import Footer from "../../Footer/footer";
import { connect } from "react-redux";
import Moment from "react-moment";
import purchase from "../purchase";

class PurchaseReturn extends Component {
    state = {
        purchase: "",
        products: "",
    };

    componentDidMount() {
        if (!this.props.location.state) {
            this.props.history.push("/purchases");
        } else {
            this.setState({
                purchase: this.props.location.state.purchase.doc,
                products: this.props.location.state.purchase.products,
            });
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
                                    <div className="d-flex justify-content-end">
                                        <span className="fw-medium">Purchase Date</span>
                                        <span className="ml-2">
                                            <Moment format={"DD-MMM-YYYY"}>
                                                {purchase.purchaseDate}
                                            </Moment>
                                        </span>
                                    </div>
                                </div>
                                <div className="col-lg-4 ">
                                    <span className="fw-medium">Description: </span>
                                    <span className="fw-normal">{purchase.description}</span>
                                </div>
                            </div>
                            <div className="row g-4">
                                <div className="col">
                                    <span className="fw-medium">Supplier Name: </span>
                                    <span>{purchase.supplierName}</span>
                                </div>
                            </div>
                            <div className="row g-4">
                                <div className="col">
                                    <span className="fw-medium">Address: </span>
                                    <span>
                                        {purchase.supplierAddress
                                            ? purchase.supplierAddress.name
                                            : null}
                                    </span>
                                </div>
                            </div>

                            <div className="row mt-4">
                                <h6 className="title text-primary ml-3">Purchase Details</h6>
                            </div>

                            {this.renderTable(purchase, products)}

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

    handleInputQuantity = (event) => {
        const qty = event.target.value;
    };

    renderTable = (purchase, products) => (
        <div className="card card-preview mt-4">
            <div className="table-responsive">
                <table className="table">
                    <thead className="border-top">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Item Name</th>
                            <th scope="col">SKU</th>
                            <th scope="col">Brand</th>
                            <th scope="col">Available Qty.</th>
                            <th scope="col">Purchased Qty.</th>
                            <th scope="col">Return Qty.</th>
                            <th scope="col">Rate</th>
                            <th scope="col">UOM</th>
                            <th scope="col">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {purchase.productDetails.map((item, key) => {
                            let product = products.find((x) => x._id === item._id);
                            return (
                                <tr key={key}>
                                    <td scope="row">
                                        <span className="text-primary">{key + 1}</span>
                                    </td>
                                    <td scope="row">
                                        <span>{item.pname}</span>
                                    </td>
                                    <td scope="row">
                                        <span>{product.sku}</span>
                                    </td>
                                    <td scope="row">
                                        <span className="ccap">{product.brand}</span>
                                    </td>
                                    <td scope="row">
                                        {item.pqty > product.stock ? (
                                            <span className="ccap text-danger">{product.stock}</span>
                                        ) : (
                                                <span className="ccap">{product.stock}</span>
                                            )}
                                    </td>
                                    <td scope="row">
                                        <span className="ccap">{item.pqty}</span>
                                    </td>
                                    <td scope="row">
                                        <input
                                            type="number"
                                            min={1}
                                            maxLength={7}
                                            value={item.pty}
                                            onChange={this.handleInputQuantity}
                                            className="form-control form-control-sm"
                                            id="quantity"
                                            placeholder="Quantity"
                                        />
                                    </td>
                                    <td scope="row">
                                        <span className="ccap">{item.pprice}</span>
                                    </td>
                                    <td scope="row">
                                        <span className="ccap">{product.uom}</span>
                                    </td>
                                    <td scope="row">
                                        <span className="ccap">{item.ptotal}</span>
                                    </td>
                                    {/* <td>
                                        <div className="form-control-wrap">
                                            <div className="form-control-select">
                                                <select className="form-control" onChange={this.handleProductDropdown} data-search="on">
                                                    <option value={-1}>Select Item</option>
                                                    {
                                                        this.props.productsList ?
                                                            this.props.productsList.map((item, key) => {
                                                                return <option key={key} value={key} className="ccap" >{item.name}</option>;
                                                            })
                                                            : null
                                                    }
                                                </select>
                                            </div>
                                        </div>
                                    </td>
                                    <td>{currentProduct ? currentProduct.sku : 'N/A'}</td>
                                    <td className="ccap">{currentProduct ? currentProduct.brand : 'N/A'}</td>
                                    <td><input type="number" min={1} maxLength={7} value={this.state.currentQuantity} onChange={this.handleInputQuantity} className="form-control" id="quantity" placeholder="Quantity" /></td>
                                    <td>{currentProduct ? currentProduct.price.total : 'N/A'}</td>
                                    <td>{currentProduct ? currentProduct.uom : 'N/A'}</td>
                                    <td>{currentProduct ? (Number(currentProduct.price.total) * Number(this.state.currentQuantity)) : 'N/A'}</td>
                                    <td className="tb-tnx-action">
                                        <div className="dropdown">
                                            <a className="text-soft dropdown-toggle btn btn-icon btn-trigger" data-toggle="dropdown"><em className="icon ni ni-more-h"></em></a>
                                            <div className="dropdown-menu dropdown-menu-right dropdown-menu-xs">
                                                <ul className="link-list-plain">
                                                    <li><a onClick={() => { this.props.remove(this.props.item.key) }}>Remove</a></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </td> */}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );

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
                            {purchase ? this.renderBody(purchase, products) : null}
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
        // productsList: state.product.productList,
        // removeSupplier: state.supplier.postDeleted,
        // editSupplier: state.supplier.post
    };
}

export default connect(mapStateToProps)(PurchaseReturn);
