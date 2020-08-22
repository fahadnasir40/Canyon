import React, { Component } from 'react'
import {Link} from 'react-router-dom'

class Content extends Component {

    render(){
        return (
            <div class="nk-content ml-5">
                    <div class="container-fluid">
                        <div class="nk-content-inner">
                            <div class="nk-content-body">
                                <div class="nk-block-head nk-block-head-sm">
                                    <div class="nk-block-between">
                                        <div class="nk-block-head-content">
                                            <h3 class="nk-block-title page-title">Suppliers</h3>
                                        </div>
                                        <div class="nk-block-head-content">
                                            <div class="toggle-wrap nk-block-tools-toggle">
                                                <a href="#" class="btn btn-icon btn-trigger toggle-expand mr-n1" data-target="more-options"><em class="icon ni ni-more-v"></em></a>
                                                <div class="toggle-expand-content" data-content="more-options">
                                                    <ul class="nk-block-tools g-3">
                                                        <li>
                                                            <div class="form-control-wrap">
                                                                <div class="form-icon form-icon-right">
                                                                    <em class="icon ni ni-search"></em>
                                                                </div>
                                                                <input type="text" class="form-control" id="default-04" placeholder="Search by name"/>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div class="drodown">
                                                                <a href="#" class="dropdown-toggle dropdown-indicator btn btn-outline-light btn-white" data-toggle="dropdown">Status</a>
                                                                <div class="dropdown-menu dropdown-menu-right">
                                                                    <ul class="link-list-opt no-bdr">
                                                                        <li><a href="#"><span>Actived</span></a></li>
                                                                        <li><a href="#"><span>Inactived</span></a></li>
                                                                        <li><a href="#"><span>Blocked</span></a></li>
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        </li>
                                                        <li class="nk-block-tools-opt">
                                                            <a href="#" class="btn btn-icon btn-primary d-md-none"><em class="icon ni ni-plus"></em></a>
                                                            <button data-toggle="modal" data-target="#addmodal" class="toggle btn btn-primary d-none d-md-inline-flex"><em class="icon ni ni-plus"></em><span>Add Supplier</span></button>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="nk-block">
                                    <div class="nk-tb-list is-separate mb-3">
                                        <div class="nk-tb-item nk-tb-head">
                                            <div class="nk-tb-col nk-tb-col-check">
                                                <div class="custom-control custom-control-sm custom-checkbox notext">
                                                    <input type="checkbox" class="custom-control-input" id="uid"/>
                                                    <label class="custom-control-label" for="uid"></label>
                                                </div>
                                            </div>
                                            <div class="nk-tb-col"><span class="sub-text">User</span></div>
                                            <div class="nk-tb-col tb-col-mb"><span class="sub-text">Ordered</span></div>
                                            <div class="nk-tb-col tb-col-md"><span class="sub-text">Phone</span></div>
                                            <div class="nk-tb-col tb-col-lg"><span class="sub-text">Country</span></div>
                                            <div class="nk-tb-col tb-col-lg"><span class="sub-text">Last Order</span></div>
                                            <div class="nk-tb-col tb-col-md"><span class="sub-text">Status</span></div>
                                            <div class="nk-tb-col nk-tb-col-tools">
                                                <ul class="nk-tb-actions gx-1 my-n1">
                                                    <li>
                                                        <div class="drodown">
                                                            <a href="#" class="dropdown-toggle btn btn-icon btn-trigger mr-n1" data-toggle="dropdown"><em class="icon ni ni-more-h"></em></a>
                                                            <div class="dropdown-menu dropdown-menu-right">
                                                                <ul class="link-list-opt no-bdr">
                                                                    <li><a href="#"><em class="icon ni ni-mail"></em><span>Send Email to All</span></a></li>
                                                                    <li><a href="#"><em class="icon ni ni-na"></em><span>Suspend Selected</span></a></li>
                                                                    <li><a href="#"><em class="icon ni ni-trash"></em><span>Remove Seleted</span></a></li>
                                                                    <li><a href="#"><em class="icon ni ni-shield-star"></em><span>Reset Password</span></a></li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div class="nk-tb-item">
                                            <div class="nk-tb-col nk-tb-col-check">
                                                <div class="custom-control custom-control-sm custom-checkbox notext">
                                                    <input type="checkbox" class="custom-control-input" id="uid1"/>
                                                    <label class="custom-control-label" for="uid1"></label>
                                                </div>
                                            </div>
                                            <div class="nk-tb-col">
                                                <a href="html/ecommerce/customer-details.html">
                                                    <div class="user-card">
                                                        <div class="user-avatar bg-primary">
                                                            <span>AB</span>
                                                        </div>
                                                        <div class="user-info">
                                                            <span class="tb-lead">Abu Bin Ishtiyak <span class="dot dot-success d-md-none ml-1"></span></span>
                                                            <span>info@softnio.com</span>
                                                        </div>
                                                    </div>
                                                </a>
                                            </div>
                                            <div class="nk-tb-col tb-col-mb">
                                                <span class="tb-amount">35,040.34 <span class="currency">USD</span></span>
                                            </div>
                                            <div class="nk-tb-col tb-col-md">
                                                <span>+811 847-4958</span>
                                            </div>
                                            <div class="nk-tb-col tb-col-lg">
                                                <span>United State</span>
                                            </div>
                                            <div class="nk-tb-col tb-col-lg">
                                                <span>10 Feb 2020</span>
                                            </div>
                                            <div class="nk-tb-col tb-col-md">
                                                <span class="tb-status text-success">Active</span>
                                            </div>
                                            <div class="nk-tb-col nk-tb-col-tools">
                                                <ul class="nk-tb-actions gx-1">
                                                    <li class="nk-tb-action-hidden">
                                                        <a href="#" class="btn btn-trigger btn-icon" data-toggle="tooltip" data-placement="top" title="Send Email">
                                                            <em class="icon ni ni-mail-fill"></em>
                                                        </a>
                                                    </li>
                                                    <li class="nk-tb-action-hidden">
                                                        <a href="#" class="btn btn-trigger btn-icon" data-toggle="tooltip" data-placement="top" title="Suspend">
                                                            <em class="icon ni ni-user-cross-fill"></em>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <div class="drodown">
                                                            <a href="#" class="dropdown-toggle btn btn-icon btn-trigger" data-toggle="dropdown"><em class="icon ni ni-more-h"></em></a>
                                                            <div class="dropdown-menu dropdown-menu-right">
                                                                <ul class="link-list-opt no-bdr">
                                                                    <li><a href="html/ecommerce/customer-details.html"><em class="icon ni ni-eye"></em><span>Add Address</span></a></li>
                                                                    <li><a href="html/ecommerce/customer-details.html"><em class="icon ni ni-eye"></em><span>View Details</span></a></li>
                                                                    <li class="divider"></li>
                                                                    <li><a href="#"><em class="icon ni ni-activity-round"></em><span>View Orders</span></a></li>
                                                                    <li><a href="#"><em class="icon ni ni-na"></em><span>Suspend</span></a></li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="card">
                                        <div class="card-inner">
                                            <div class="nk-block-between-md g-3">
                                                <div class="g">
                                                    <ul class="pagination justify-content-center justify-content-md-start">
                                                        <li class="page-item"><a class="page-link" href="#"><em class="icon ni ni-chevrons-left"></em></a></li>
                                                        <li class="page-item"><a class="page-link" href="#">1</a></li>
                                                        <li class="page-item"><span class="page-link"><em class="icon ni ni-more-h"></em></span></li>
                                                        <li class="page-item"><a class="page-link" href="#"><em class="icon ni ni-chevrons-right"></em></a></li>
                                                    </ul>
                                                </div>
                                                <div class="g">
                                                    <div class="pagination-goto d-flex justify-content-center justify-content-md-start gx-3">
                                                        <div>Page</div>
                                                        <div>
                                                            <select class="form-select form-select-sm" data-search="on" data-dropdown="xs center">
                                                                <option value="page-1">1</option>
                                                                <option value="page-2">2</option>
                                                            </select>
                                                        </div>
                                                        <div>OF 102</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                    
                    {/* <!-- Modal Content Code - add supplier --> */}  
                    <div class="modal fade" tabindex="-1" id="addmodal">
                        <div class="modal-dialog" role="document">
                            <div class="modal-content">
                                <a href="#" class="close" data-dismiss="modal" aria-label="Close">
                                    <em class="icon ni ni-cross"></em>
                                </a>
                                <div class="modal-header">
                                    <h5 class="modal-title">Add Supplier</h5>
                                </div>
                                <div class="modal-body">
                                    <div class="nk-block">
                                        <div class="row g-3">
                                            <div class="col-12">
                                                <div class="form-group">
                                                    <label class="form-label" for="name">Full Name</label>
                                                    <div class="form-control-wrap">
                                                        <input type="text" class="form-control" id="name"/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-mb-4">
                                                <div class="form-group">
                                                    <label class="form-label" for="brand">Brand</label>
                                                    <div class="form-control-wrap ">
                                                        <div class="form-control-select">
                                                            <select class="form-control" id="brand">
                                                                <option value="default_option">Canyon</option>
                                                                <option value="option_select_name">Others</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row g-4" id="addmodal">
                                            <div class="col-10 mt-3 justify-text-center">
                                                    <li class="nk-block-tools-opt">
                                                        <button data-toggle="modal" data-target="#addmodal" class="toggle btn btn-icon btn-primary d-md-none"><em class="icon ni ni-plus"></em></button>
                                                        <button data-toggle="modal" data-target="#addmodaladdress" class="toggle btn btn-info d-none d-md-inline-flex"><span>Save Information</span></button>
                                                        {/* <button data-toggle="modal" data-target="#addmodaladdress" class="toggle btn btn-info d-none d-md-inline-flex"><span>Add Address</span></button> */}
                                                    </li>
                                            </div>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                            </div>
                        </div> 
                    </div>
                    {/* <!-- Modal Supplier Addess --> */}
                    <div class="modal fade" tabindex="-1" id="addmodaladdress">
                        <div class="modal-dialog" role="document">
                            <div class="modal-content">
                                <a href="#" class="close" data-dismiss="modal" aria-label="Close">
                                    <em class="icon ni ni-cross"></em>
                                </a>
                                <div class="modal-header">
                                    <h5 class="modal-title">Supplier Address</h5>
                                </div>
                                <div class="modal-body">
                                <div class="nk-block">
                                        <div class="row g-3">
                                            <div class="col-mb-4">
                                                <div class="form-group">
                                                    <label class="form-label" for="brand">Brand</label>
                                                    <div class="form-control-wrap ">
                                                        <div class="form-control-select">
                                                            <select class="form-control" id="brand">
                                                                <option value="default_option">Canyon</option>
                                                                <option value="option_select_name">Others</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-12">
                                                <div class="form-group">
                                                    <label class="form-label" for="addess">Address</label>
                                                    <div class="form-control-wrap">
                                                        <input type="text" class="form-control" id="address"/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-mb-8">
                                                <div class="form-group">
                                                    <label class="form-label" for="mobile">Mobile</label>
                                                    <div class="form-control-wrap">
                                                        <input type="text" class="form-control" id="mobile"/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-mb-8">
                                                <div class="form-group">
                                                    <label class="form-label" for="email">Email</label>
                                                    <div class="form-control-wrap">
                                                        <input type="text" class="form-control" id="email"/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-mb-8">
                                                <div class="form-group">
                                                    <label class="form-label" for="city">City</label>
                                                    <div class="form-control-wrap">
                                                        <input type="text" class="form-control" id="city"/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-mb-8">
                                                <div class="form-group">
                                                    <label class="form-label" for="country">Country</label>
                                                    <div class="form-control-wrap">
                                                        <input type="text" class="form-control" id="country"/>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row g-4" id="addmodaladdress">
                                            <div class="col-10 mt-3 justify-text-center">
                                                    <li class="nk-block-tools-opt">
                                                        <button data-toggle="modal" data-target="#addmodaladdress" class="toggle btn btn-icon btn-primary d-md-none"><em class="icon ni ni-plus"></em></button>
                                                        <button data-toggle="modal" data-target="#addmodaladdress" class="toggle btn btn-info d-none d-md-inline-flex"><span>Save Information</span></button>
                                                    </li>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
)}
}

export default Content