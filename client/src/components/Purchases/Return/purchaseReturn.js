import React, { cloneElement, Component } from "react";
import Sidebar from "../../Sidebar/sidebar";
import Header from "../../Header/header";
import Footer from "../../Footer/footer";
import { connect } from "react-redux";
import Moment from "react-moment";
import { Link,Redirect } from 'react-router-dom'
import { updatePurchase } from "../../../actions";
class PurchaseReturn extends Component {
    state = {
        purchase: "",
        products: "",
        oldPurchase: "",
        loading: false,
        redirect: false,
        error: ''
    };

    componentDidMount() {
        if (!this.props.location.state) {
            this.props.history.push("/purchases");
        } else {

            let newPurchase = this.props.location.state.purchase.doc;
            const oldPurchase = JSON.parse(JSON.stringify(this.props.location.state.purchase.doc));
             
            const products = this.props.location.state.purchase.products;           
            newPurchase.productDetails.forEach(element => {
                const p = products.find(x => x._id === element._id);
                if (p) {
                    if (element.returnQty > 0){
                        element.pqty = (element.pqty - element.returnQty )
                    }
                    
                  
                    
                    element.returnQty = element.pqty;
                    if (element.pqty > p.stock) {
                        element.returnQty = 0;
                    }   
                    if(element.pqty === 0)
                       element.returnQty = 0;
                

                    element.ptotal = (element.pqty - element.returnQty) * element.pprice;

                }
            });

            this.setState({
                purchase: newPurchase,
                products: products,
                oldPurchase: oldPurchase
            });
        }
    }

    static getDerivedStateFromProps(nextProps,prevState){
        if(nextProps.purchaseReturned){
            if(nextProps.purchaseReturned === true){
                return({
                    loading: false,
                    redirect: true
                })
            }
        }

        return null;
    }

    handleSubmit = () => {
        this.setState({ loading: true });
        console.log("Data", this.state.purchase);
        console.log("Old Data", this.state.oldPurchase);
        
        let purchase = this.state.purchase;

        let totalAmount = 0;
        purchase.productDetails.forEach(element => {            
            const index = purchase.productDetails.indexOf(element);
            if(purchase.status === 'Returned Items'){
                if(element.pqty === 0){
                    element.returnQty = this.state.oldPurchase.productDetails[index].returnQty;  
                    element.ptotal = this.state.oldPurchase.productDetails[index].ptotal;
                }
                else
                {
                    element.returnSelected = element.returnQty;
                    element.returnQty = this.state.oldPurchase.productDetails[index].returnQty + element.returnQty;
                }
                element.pqty = this.state.oldPurchase.productDetails[index].pqty; 
                
            }
            else{
                element.returnSelected = element.returnQty;
            }
            totalAmount += element.ptotal
        })

        purchase.totalAmount = totalAmount;
        purchase.productDetails.every(element => element.returnQty === element.pqty) ?
            purchase.status = "Returned" :
            purchase.status = "Returned Items";

        this.props.dispatch(updatePurchase(purchase));
    }

    handleInputQuantity = (event, stock, index,item) => {

        const qty = event.target.value;
        let p = this.state.purchase;

        if(item){
            if (qty >= 0 && qty <= stock &&  qty <= item.pqty ) {
                if (qty == 0) {
                    const total = p.productDetails[index].pprice * (p.productDetails[index].pqty - qty);
                    p.productDetails[index] = {
                        ...p.productDetails[index],
                        returnQty: Number(qty),
                        ptotal: total
                    }
                }
                else {
                    p.productDetails[index] = {
                        ...p.productDetails[index],
                        returnQty: Number(qty),
                        ptotal: (p.productDetails[index].pqty - Number(qty)) * Number(p.productDetails[index].pprice)
                    }
                }
    
                this.setState({
                    ...this.state,
                    purchase: p
                })
            }
        }

    };
    checkValid = () => {
        if (this.state.loading)
            return true;

        if (this.state.purchase) {
            return this.state.purchase.productDetails.every(element => element.returnQty === 0)
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
                        <div className="d-flex justify-content-end m-2">
                            <Link to={{
                                pathname: `/purchase_invoice_id=${this.state.purchase._id}`,
                            }} className="btn btn-outline-light bg-white d-none d-sm-inline-flex mr-3"><em className="icon ni ni-arrow-left"></em><span>Back</span></Link>
                            <Link to={{
                                pathname: `/purchase_invoice_id=${this.state.purchase._id}`,
                            }} className="btn btn-icon btn-outline-light bg-white d-inline-flex d-sm-none"><em className="icon ni ni-arrow-left"></em></Link>
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
                                    <span className="fw-normal">{purchase.description ? purchase.description : 'No description added.'}</span>
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
                                <div className="col-12 mt-5 ml-3">
                                    <button type="button" onClick={this.handleSubmit} className="btn btn-primary" disabled={this.checkValid()}>
                                        <span> Return Items</span>
                                    </button>
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

   
    
    checkDisabled = (item)=>{
        if(item.pqty === 0)
            return true;
        return false;
    }
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
                            <th scope="col">UOM</th>
                            <th scope="col">Available Qty.</th>
                            <th scope="col">Purchased Qty.</th>
                            <th scope="col">Return Qty.</th>
                            <th scope="col">Rate</th>
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
                                        <span className="ccap">{product.uom}</span>
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
                                            maxLength={7}
                                            value={item.returnQty}
                                            onChange={(event) => { this.handleInputQuantity(event, product.stock, key,item) }}
                                            min={0}
                                            // defaultValue={this.getDefaultValue(product,item,key)}
                                            max={item.pqty}
                                            className="form-control form-control-sm"
                                            id="quantity"
                                            placeholder="Quantity"
                                        />
                                        {/* <input
                                            type="number"
                                            maxLength={7}
                                            value={item.returnQty}
                                            onChange={(event) => { this.handleInputQuantity(event, product.stock, key,item) }}
                                            min={0}
                                            max={item.pqty}
                                            disabled= {this.checkDisabled(item)}
                                            className="form-control d-block d-md-none"
                                            id="quantity"
                                            placeholder="Quantity"
                                        /> */}
                                    </td>
                                    <td scope="row">
                                        <span className="ccap">{item.pprice}</span>
                                    </td>
                                    <td scope="row">

                                        <span className="text-muted">{item.pqty * item.pprice}</span>
                                        <span> <em className="icon ni ni-chevrons-right"></em> </span>

                                        <span className="ccap"> {item.ptotal}</span>
                                    </td>
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

        if(this.state.redirect){
            return <Redirect to="/purchases"/>
        }

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
    console.log("Response got",state);
    return {
        purchaseReturned: state.purchase.post
        // productsList: state.product.productList,
        // removeSupplier: state.supplier.postDeleted,
        // editSupplier: state.supplier.post
    };
}

export default connect(mapStateToProps)(PurchaseReturn);
