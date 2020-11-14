import React, { Component } from 'react'
import ItemRow from '../itemsreturn'
import NumberFormat from 'react-number-format';

class PurchaseDetails extends Component {

    state = {
        itemsList: [],
        count: 0,
        productsList: this.props.productsList,
        totalAmount: 0,
        paidAmount: 0
    }

    productsList = [];


    addItemRow = () => {
        var itemsList = this.state.itemsList;
        itemsList.push(<ItemRow />)
        this.setState({
            count: this.state.count + 1,
            itemsList
        })
    }

    clearAllItems = () => {
        this.setState({
            itemsList: [],
            totalAmount: 0,
            paidAmount: 0
        })
        if (this.props.valid === true) {
            this.props.setValid()
        }
    }

    addSelectedItem = (product, i) => {
        this.productsList.push({ ...product, index: Number(i) });
        if (this.props.valid === false && this.productsList.length > 0) {
            this.props.setValid();
        }
    }

    removeSelectedItem = (index) => {
        const p = this.productsList.find(x => x.index === index);
        this.productsList.splice(this.productsList.indexOf(p));
        if (this.productsList.length == 0 && this.props.valid === true) {
            this.props.setValid()
        }
    }

    updateTotalAmount = (index, qty, product) => {

        const p = this.productsList.find(x => x.index === index);
        const index2 = this.productsList.indexOf(p)
        this.productsList[index2] = { ...this.productsList[index2], qty: qty, totalAmount: (Number(qty) * Number(product.price.total)) }
        this.calculateTotal();
    }

    calculateTotal = () => {
        let total = 0;
        this.productsList.forEach(element => {
            if (element.totalAmount) {
                total += element.totalAmount
            }
        });
        this.setState({
            totalAmount: total,
            paidAmount: total
        })
    }

    handleInputPaidAmount = (event) => {
        if (event.target.value >= 0 && event.target.value <= this.state.totalAmount) {
            this.setState({
                paidAmount: event.target.value
            })
        }
    }

    render() {
        if (this.props.loading === true) {
            this.props.getProductsList(this.productsList, this.state.paidAmount, this.state.totalAmount);
        }

        return (
            <div className="nk-block nk-block-lg">
                <div className="nk-block-head">
                    <div className="nk-block-head-content">
                        <ul className="nk-block-tools-opt">
                            {
                                this.state.itemsList.length < 20 ?
                                    <div onClick={this.addItemRow} className="btn btn-primary"><em className="icon ni ni-plus"></em><span>Add Item</span></div>
                                    : null
                            }
                            {
                                this.state.itemsList.length > 0 ?
                                    <div className="d-flex justify-content-end text-primary " ><span style={{ cursor: "pointer" }} onClick={this.clearAllItems}>Clear all items</span></div>
                                    : null
                            }
                        </ul>
                    </div>
                </div>
                <div className="card card-preview ">
                    <div className="table-responsive">
                        <table className="table">
                            <thead className="border-top">
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Item Name</th>
                                    <th scope="col">SKU</th>
                                    <th scope="col">Brand</th>
                                    <th scope="col">Quantity.</th>
                                    <th scope="col">UOM</th>
                                    <th scope="col">Rate</th>
                                    <th scope="col">Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.itemsList.map((item, i) => (
                                        <ItemRow
                                            key={i}
                                            productsList={this.state.productsList}
                                            remove={this.removeItem}
                                            item={item}
                                            updateTotalAmount={this.updateTotalAmount}
                                            addSelectedItem={this.addSelectedItem}
                                            removeSelectedItem={this.removeSelectedItem}
                                            index={i} />
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="row mt-5">
                    <div className="d-flex col-md-6 ml-md-auto">
                        <label className="col-md-4 offset-md-2 form-label">Amount to be paid</label>
                        <span className="col-md-8 offset-md-2"> Rs. <NumberFormat value={Number(this.state.totalAmount)} displayType={'text'} thousandSeparator={true} /></span>
                    </div>
                </div>

                <div className="mt-1 row ">
                    <div className="d-flex col-md-6 ml-md-auto">
                        <div className="col-md-3 offset-md-2">
                            <label className="form-label" htmlFor="paidAmount">Paid Amount</label>
                        </div>
                        <div className="col-md-5 offset-md-2">
                            <div className="form-control-wrap">
                                <div className="form-icon form-icon-left">
                                    <em className="icon ni ni-money"></em>
                                </div>
                                <input type="number" value={this.state.paidAmount} onChange={this.handleInputPaidAmount} className="form-control" id="paidAmount" placeholder="Paid Amount (Rs.)" required />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default PurchaseDetails;