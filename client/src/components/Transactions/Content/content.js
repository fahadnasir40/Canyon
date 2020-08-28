import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'

class Transactions extends Component {

    paymentAlert = () =>{
    
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
              confirmButton: 'btn btn-success',
              cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false
          })
          
          swalWithBootstrapButtons.fire({
            // title: 'Are you sure?',
            text: "Are you Sure to Remove Transaction!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes!',
            cancelButtonText: 'No!',
            reverseButtons: true
          }).then((result) => {
            if (result.value) {
              swalWithBootstrapButtons.fire(
                // 'Paid!',
                'Deleted',
                // 'success'
              )
            } else if (
              /* Read more about handling dismissals below */
              result.dismiss === Swal.DismissReason.cancel
            ) {
              swalWithBootstrapButtons.fire(
                // 'Unapid',
                'Unable to Delete Transaction',
                // 'error'
              )
            }
          })    
    }


    render() {
        return (
            <div className="nk-content ">
                <div className="container-fluid">
                    <div className="nk-content-inner">
                        <div className="nk-content-body">
                            <div className="components-preview wide-md mx-auto">

                                <div className="nk-block nk-block-lg">
                                    <div className="nk-block-head">
                                        <div className="nk-block-head-content">
                                            <h4 className="nk-block-title">Transaction List</h4>
                                            <Link to="/addpurchases"><button className="btn btn-primary"><em className="icon ni ni-plus"></em><span>New Transaction</span></button></Link>
                                        </div>
                                    </div>
                                    <div className="card card-preview">
                                        <table className="table table-tranx">
                                            <thead>
                                                <tr className="tb-tnx-head">
                                                    {/* <th className="tb-tnx-id"><span className="">#</span></th> */}
                                                    <th className="tb-tnx-info" width="20%">
                                                        <span className="d-none d-sm-block">
                                                            <span>Date</span>
                                                        </span>
                                                    </th>
                                                    <th className="tb-tnx-info" width = "10%">
                                                        {/* <span className="tb-tnx-desc d-none d-sm-inline-block"> */}
                                                            <span>Source</span>
                                                        {/* </span> */}
                                                    </th>
                                                    <th className="tb-tnx-info">
                                                        <span>Value</span>
                                                    </th>
                                                    <th className="tb-tnx-info">
                                                        <span>Type</span>
                                                    </th>
                                                    <th className="tb-tnx-info">
                                                            <span >Action</span>
                                                    </th>
                                                    
                                                    <th className="tb-tnx-info">
                                                        <span>Quantity</span>
                                                    </th>
                                                    
                                                    <th className="tb-tnx-info">
                                                        <span>Rate</span>
                                                    </th>
                                                    <th className="tb-tnx-amount is-alt">
                                                        <span>Total</span>
                                                    </th>
                                                    <th className="tb-tnx-action">
                                                        <span>&nbsp;</span>
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr className="tb-tnx-item">
                                                    <td className="tb-tnx-id" hidden>
                                                        <a href="#"><span>47895</span></a>
                                                    </td>
                                                    <td className="tb-tnx-input">
                                                        <div className="form-control-wrap">
                                                            <div className="form-icon form-icon-left">
                                                                <em className="icon ni ni-calendar"></em>
                                                            </div>
                                                            <input type="text" className="form-control date-picker" data-date-format="yyyy-mm-dd" placeholder = "25-AUG-2020" />
                                                        </div>
                                                        {/* <div className="form-note">Date format <code>yyyy-mm-dd</code></div> */}
                                                    </td>
                                                    <td className="tb-tnx-info" width="13%">
                                                        <select className="form-select form-control form-control-sm" data-search="on">
                                                            <option value="employees">Employees</option>
                                                            <option value="customers">Customers</option>
                                                            <option value="suppliers">Suppliers</option>
                                                        </select>
                                                    </td>
                                                    <td className="tb-tnx-info" width="15%">
                                                        <div className="form-control-wrap">
                                                            <select className="form-select form-control form-control-md" data-search="on">
                                                                <option value="employees">Saad Khan</option>
                                                                <option value="canyonsupplier">Canyon Supplier</option>
                                                                <option value="canyoncustomer">Canyon Customer</option>
                                                            </select>
                                                        </div>
                                                    </td>
                                                    <td className="tb-tnx-info" width="13%">
                                                        <div className="form-control-wrap">
                                                            <select className="form-select form-control form-control-md" data-search="on">
                                                                <option value="otherexpense">Expense</option>
                                                                <option value="purchase">Purchase</option>
                                                                <option value="purchasereturn">Purchase Return</option>
                                                                <option value="sale">Sale</option>
                                                                <option value="salereturn">Sale Return</option>
                                                            </select>
                                                        </div>
                                                    </td>
                                                    
                                                    <td className="tb-tnx-info" width="14%">
                                                        <div className="form-control-wrap">
                                                            <select className="form-select form-control form-control-md" data-search="on">
                                                                <option value="pay salary">Pay Salary</option>
                                                                <option value="purchase">Purchase</option>
                                                                <option value="sale">Sale</option>
                                                            </select>
                                                        </div>
                                                    </td>
                                                   
                                                     <td className="tb-tnx-info" width = "10%">
                                                        <div className="tb-tnx-info">
                                                            <input type="text" className="form-control" id="quantity" placeholder="10" />
                                                        </div>
                                                    </td>
                                                   
                                                    <td className="tb-tnx-info" width = "10%">
                                                        <div className="tb-tnx-info">
                                                            <input type="text" className="form-control" id="rate" placeholder="150" />
                                                        </div>
                                                    </td>
                                                   
                                                    <td className="tb-tnx-amount is-alt">
                                                        {/* <div className="tb-tnx-total"> */}
                                                            <span className="amount">$125000</span>
                                                        {/* </div> */}
                                                        {/* <div className="tb-tnx-status">
                                                            <span className="badge badge-dot badge-warning">Active</span>
                                                        </div> */}
                                                    </td>
                                                   
                                                    <td className="tb-tnx-action">
                                                        <div className="dropdown">
                                                            <a className="text-soft dropdown-toggle btn btn-icon btn-trigger" data-toggle="dropdown"><em className="icon ni ni-more-h"></em></a>
                                                            <div className="dropdown-menu dropdown-menu-right dropdown-menu-xs">
                                                                <ul className="link-list-plain">
                                                                    <li><a href="#">View</a></li>
                                                                    <li><a href="#" onClick={this.paymentAlert}>Remove</a></li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <div className="nk-block-head-content ml-5">
                                <Link to="/addpurchases"><button className="btn btn-info"><span>Save</span></button></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

export default Transactions