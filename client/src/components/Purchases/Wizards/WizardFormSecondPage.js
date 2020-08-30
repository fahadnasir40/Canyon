import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import ItemRow from '../itemsreturn'

class WizardFormSecondPage extends Component {

    state = {
        itemsList: [],
        count: 0,
        productsList: this.props.productsList,
        totalAmount: 0

    }

    addItemRow = () => {
        var itemsList = [...this.state.itemsList];
        itemsList.push(<ItemRow />)
        this.setState({
            count: this.state.count + 1,
            itemsList
        })
    }

    removeItem = (index) => {

        var itemsList = this.state.itemsList;
        itemsList.splice(index, 1);

        this.setState(
            { itemsList }
        )
    }

    clearAllItems = () => {
        this.setState({
            itemsList: [],
            totalAmount: 0
        })
    }

    // componentWillUpdate(nextProps,nextState){
    //     if(this.props != nextProps){
    //         if(this.props.productsList != nextProps.productsList){
    //             nextState.setState({
    //                 productsList: nextProps.productsList
    //             })
    //         }
    //     }
    // }

    getTotalAmount = (qty,price) =>{
        console.log("Updatecalled",qty,price)
        if(qty && price){
            this.setState({
                totalAmount: this.state.totalAmount + (Number(qty) * Number(price))
             });
        }
    }

    render() {
        const handleSubmit = this.props.onSubmit;
        const previousPage = this.props.previousPage;

        return (

            <div className="nk-block nk-block-lg">
                <div className="nk-block-head">
                    <div className="nk-block-head-content">
                        <ul class="nk-block-tools-opt">
                            <div onClick={this.addItemRow} class="btn btn-primary"><em class="icon ni ni-plus"></em><span>Add Item</span></div>
                            {
                                this.state.itemsList.length > 0 ?
                                    <div class="d-flex justify-content-end text-primary " ><span style={{ cursor: "pointer" }} onClick={this.clearAllItems}>Clear all items</span></div>
                                    : null
                            }
                        </ul>
                    </div>
                </div>
                <div className="card card-preview ">
                    <div class="table-responsive">
                        <table class="table">
                            <thead className="border-top">
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Item Name</th>
                                    <th scope="col">SKU</th>
                                    <th scope="col">Brand</th>
                                    <th scope="col">Quantity.</th>
                                    <th scope="col">Rate</th>
                                    <th scope="col">UOM</th>
                                    <th scope="col">Total</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.itemsList.map((item, i) => (
                                        <ItemRow key={i} productsList={this.state.productsList} remove={this.removeItem} item={item} updateTotalAmount ={this.getTotalAmount} index={i} />
                                    ))

                                }
                            </tbody>
                        </table>
                    </div>

                   
                </div>
                <div className="row mt-5">
                        <div className="d-flex col-md-6 ml-md-auto">
                            <label className="col-md-4 offset-md-2 form-label">Amount to be paid</label>
                            <span className="col-md-8 offset-md-2"> Rs. {this.state.totalAmount} </span>
                        </div>
                    </div>

                    <div className="mt-1 row ">
                        <div className="d-flex col-md-6 ml-md-auto">
                            <div className="col-md-3 offset-md-2">
                                <label class="form-label" for="default-04">Paid Amount</label>
                            </div>
                            <div className="col-md-5 offset-md-2">
                                <div class="form-control-wrap">
                                <div class="form-icon form-icon-left">
                                        <em class="icon ni ni-money"></em>
                                    </div>
                                    <input type="text" value={100} class="form-control" id="default-04" placeholder="Paid Amount (Rs.)" required />
                                </div>
                            </div>
                        </div>
                    </div>
            </div>
        )
    }
}

export default WizardFormSecondPage