import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import ItemRow from '../itemsreturn'

class WizardFormSecondPage extends Component {

    state = {
        itemsList: [],
        count: 0
    }

    addItemRow = () =>{
        var itemsList = [...this.state.itemsList];
        itemsList.push(<ItemRow/>)
        this.setState({
            count: this.state.count + 1,
            itemsList
        })
    }

    removeItem = (index) =>{

        var itemsList = this.state.itemsList;
        itemsList.splice(index,1);
        
        this.setState(
            {itemsList}
        )
    }

    render() {
        const handleSubmit = this.props.onSubmit;
        const previousPage = this.props.previousPage;

        return (

            <div className="nk-content ml-5">
                <div className="container-fluid">
                    <div className="nk-content-inner">
                        <div className="nk-content-body">
                            <div className="components-preview wide-md mx-auto">
                                <div className="nk-block-head nk-block-head-lg wide-sm"></div>
                                <div className="nk-block nk-block-lg">
                                    <div className="nk-block-head">
                                        <div className="nk-block-head-content">
                                            <h4 className="nk-block-title">Order Details</h4>
                                            <ul class="nk-block-tools-opt">
                                                {/* <Link to = "/addpurchases"><button class="btn btn-primary"><em class="icon ni ni-plus"></em><span>Add Line</span></button></Link> */}
                                                <button onClick={this.addItemRow} class="btn btn-primary"><em class="icon ni ni-plus"></em><span>Add Line</span></button>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="card card-preview">
                                        <table className="table table-tranx">
                                        <thead>
                                                    <tr class="tb-tnx-head">
                                                        <th class="tb-tnx-id"><span class="">#</span></th>
                                                        <th class="tb-tnx-info">
                                                            <span class="tb-tnx-desc d-none d-sm-inline-block">
                                                                <span>Bill For</span>
                                                            </span>
                                                            <span class="tb-tnx-date d-md-inline-block d-none">
                                                                <span class="d-md-none">Date</span>
                                                                <span class="d-none d-md-block">
                                                                    <span>Issue Date</span>
                                                                    <span>Due Date</span>
                                                                </span>
                                                            </span>
                                                        </th>
                                                        <th class="tb-tnx-amount is-alt">
                                                            <span class="tb-tnx-total">Total</span>
                                                            <span class="tb-tnx-status d-none d-md-inline-block">Status</span>
                                                        </th>
                                                        <th class="tb-tnx-action">
                                                            <span>&nbsp;</span>
                                                        </th>
                                                    </tr>
                                                </thead>
                                            <tbody>
                                                {
                                                    this.state.itemsList.map((item,i)=>(
                                                        <ItemRow  remove={this.removeItem} item={item} index={i}/>
                                                    ))
                                                    
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="actions clearfix">
                                        <ul role="menu" aria-label="Pagination">
                                            <li aria-disabled="false"><button className="btn " onClick={previousPage} role="menuitem">Prev</button></li>
                                            <li aria-hidden="false" aria-disabled="false"><button onClick={this.props.onSubmit} className="btn btn-primary" role="menuitem">Next</button></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

export default WizardFormSecondPage