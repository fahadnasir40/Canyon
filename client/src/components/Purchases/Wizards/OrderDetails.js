import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import Purchases from '../purchases'

class OrderDetails extends Component {

    constructor(props) {
        super(props)
        this.nextPage = this.nextPage.bind(this)
        this.previousPage = this.previousPage.bind(this)
        this.state = {
          page: 1
        }
      }
      nextPage() {
          console.log("Next Page Called");
        this.setState({ page: this.state.page + 1 })
      }
    
      previousPage=()=> {
        this.setState({ page: this.state.page - 1 })
      }


    render(){
        const { onSubmit } = this.props
        const { page } = this.state
        //   const handleSubmit = this.props.onSubmit;
    //   const previousPage = this.props.previousPage;

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
                                </div>
                            </div>
                            <div className="card card-preview">
                                <table className="table table-tranx">
                                    <thead>
                                        <tr className="tb-tnx-head">
                                            <th className="tb-tnx-id"><span className="">#</span></th>
                                            <th className="tb-tnx-info">
                                                <span className="tb-tnx-desc d-none d-sm-inline-block">
                                                    <span>Bill For</span>
                                                </span>
                                                <span className="tb-tnx-date d-md-inline-block d-none">
                                                    <span className="d-md-none">Date</span>
                                                    <span className="d-none d-md-block">
                                                        <span>Issue Date</span>
                                                        <span>Due Date</span>
                                                    </span>
                                                </span>
                                            </th>
                                            <th className="tb-tnx-amount is-alt">
                                                <span className="tb-tnx-total">Total</span>
                                                <span className="tb-tnx-status d-none d-md-inline-block">Status</span>
                                            </th>
                                            <th className="tb-tnx-action">
                                                <span>&nbsp;</span>
                                            </th>
                                        </tr>
                                    </thead>
                                </table>
                            </div>
                            <div className="actions clearfix">
                                <ul role="menu" aria-label="Pagination">
                                    <li className="disabled" aria-disabled="true"><a href="#previous" role="menuitem">Prev</a></li>
                                    <li  aria-disabled="false"><button  className="btn " onClick={previousPage} role="menuitem">Prev</button></li>
                                    <li aria-hidden="false" aria-disabled="false"><button onClick={this.props.onSubmit} className="btn btn-primary" role="menuitem">Next</button></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
        )}
}

export default OrderDetails