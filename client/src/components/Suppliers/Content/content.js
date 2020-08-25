import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
class SuppliersContent extends Component {

    getInitials = (name) => {
        var initials = name.match(/\b\w/g) || [];
        initials = ((initials.shift() || '') + (initials.pop() || '')).toUpperCase();
        return initials;
    }

    bg = ["bg-primary", "bg-warning", "bg-info", "bg-secondary", "bg-danger", "bg-dark"];
    count = 0;

    getCustomBg = () => {
        if (this.count > this.bg.length) {
            this.count = 0;
        }
        return (this.bg[this.count++]);
    }


    deleteAlert = () =>{
  
          Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.value) {
                // this.props.dipatch()
              Swal.fire(
                'Deleted!',
                'Supplier has been deleted.',
                'success'
              )
            }
          })
    }


    renderSuppliersList = (suppliersList) => {

        return suppliersList.map((supplier, i) => {
            return (
                <div className="nk-tb-item" key={i}>
                    <div className="nk-tb-col nk-tb-col-check">
                        <div className="custom-control custom-control-sm custom-checkbox notext">
                            <input type="checkbox" className="custom-control-input" id={"uid-" + i} />
                            <label className="custom-control-label" htmlFor={"uid-" + i}></label>
                        </div>
                    </div>
                    <div className="nk-tb-col">
                        <Link to={{
                            pathname: "/supplierInfo",
                            state: {
                                supplierInfo: supplier
                            }
                        }}
                        >
                            <div className="user-card">
                                <div className={"user-avatar " + this.getCustomBg()}>
                                    <span>{this.getInitials(supplier.name)}</span>
                                </div>
                                <div className="user-info">
                                    <span className="tb-lead">{supplier.name} <span className="dot dot-success d-md-none ml-1"></span></span>

                                </div>
                            </div>
                        </Link>
                    </div>
                    <div className="nk-tb-col tb-col-mb">
                        <span className="tb-text">{supplier.email}</span>
                    </div>
                    <div className="nk-tb-col tb-col-md">
                        <span>{supplier.phone}</span>
                    </div>
                    <div className="nk-tb-col tb-col-lg">
                        <span>Lahore</span>
                    </div>
                    <div className="nk-tb-col tb-col-md">
                        <span className="tb-status text-success">Active</span>
                    </div>
                    <div className="nk-tb-col nk-tb-col-tools">
                        <ul className="nk-tb-actions gx-1">
                            <li className="nk-tb-action-hidden">
                                <a href="#" className="btn btn-trigger btn-icon" data-toggle="tooltip" data-placement="top" title="Send Email">
                                    <em className="icon ni ni-mail-fill"></em>
                                </a>
                            </li>
                            <li className="nk-tb-action-hidden">
                                <a href="#" className="btn btn-trigger btn-icon" data-toggle="tooltip" data-placement="top" title="Suspend">
                                    <em className="icon ni ni-user-cross-fill"></em>
                                </a>
                            </li>
                            <li>
                                <div className="drodown">
                                    <a href="#" className="dropdown-toggle btn btn-icon btn-trigger" data-toggle="dropdown"><em className="icon ni ni-more-h"></em></a>
                                    <div className="dropdown-menu dropdown-menu-right">
                                        <ul className="link-list-opt no-bdr">
                                            <li>    <Link to={{
                                                pathname: "/supplierInfo",
                                                state: {
                                                    supplierInfo: supplier
                                                }
                                            }}
                                            ><em className="icon ni ni-eye"></em><span>View Details</span></Link></li>
                                            <li className="divider"></li>
                                            <li><a href="#"><em className="icon ni ni-activity-round"></em><span>View Orders</span></a></li>
                                            <li> <Link to={{
                                                pathname: "/editSupplier",
                                                state: {
                                                    supplierInfo: supplier
                                                }
                                            }}>
                                            <em className="icon ni ni-pen"></em><span>Edit details</span></Link></li>
                                            <li><a href="#"><em className="icon ni ni-na"></em><span className="text-warning">Suspend</span></a></li>
                                            <li><Link onClick={this.deleteAlert}><em class="icon ni ni-trash"></em><span className="text-danger ">Remove Supplier</span></Link></li>
                                        </ul>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            )
        })
    }


    render() {
        let suppliersList = this.props.suppliersList;

        return (
            <div className="nk-content ml-5">
                <div className="container-fluid">
                    <div className="nk-content-inner">
                        <div className="nk-content-body">
                            <div className="nk-block-head nk-block-head-sm">
                                <div className="nk-block-between">
                                    <div className="nk-block-head-content">
                                        <h3 className="nk-block-title page-title">Suppliers</h3>
                                    </div>
                                    <div className="nk-block-head-content">
                                        <div className="toggle-wrap nk-block-tools-toggle">
                                            <a href="#" className="btn btn-icon btn-trigger toggle-expand mr-n1" data-target="more-options"><em className="icon ni ni-more-v"></em></a>
                                            <div className="toggle-expand-content" data-content="more-options">
                                                <ul className="nk-block-tools g-3">
                                                    <li>
                                                        <div className="form-control-wrap">
                                                            <div className="form-icon form-icon-right">
                                                                <em className="icon ni ni-search"></em>
                                                            </div>
                                                            <input type="text" className="form-control" id="default-04" placeholder="Search by name" />
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <div className="drodown">
                                                            <a href="#" className="dropdown-toggle dropdown-indicator btn btn-outline-light btn-white" data-toggle="dropdown">Status</a>
                                                            <div className="dropdown-menu dropdown-menu-right">
                                                                <ul className="link-list-opt no-bdr">
                                                                    <li><a href="#"><span>Actived</span></a></li>
                                                                    <li><a href="#"><span>Inactived</span></a></li>
                                                                    <li><a href="#"><span>Blocked</span></a></li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </li>
                                                    <li className="nk-block-tools-opt">
                                                        <a href="#" className="btn btn-icon btn-primary d-md-none"><em className="icon ni ni-plus"></em></a>
                                                        <Link to={"/addSupplier"}><button className="toggle btn btn-primary d-none d-md-inline-flex"><em className="icon ni ni-plus"></em><span>Add Supplier</span></button></Link>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="nk-block">
                                <div className="nk-tb-list is-separate mb-3">
                                    <div className="nk-tb-item nk-tb-head">
                                        <div className="nk-tb-col nk-tb-col-check">
                                            <div className="custom-control custom-control-sm custom-checkbox notext">
                                                <input type="checkbox" className="custom-control-input" id="uid" />
                                                <label className="custom-control-label" htmlFor="uid"></label>
                                            </div>

                                        </div>
                                        <div className="nk-tb-col"><span className="sub-text">Name</span></div>
                                        <div className="nk-tb-col tb-col-mb"><span className="sub-text">Email</span></div>
                                        <div className="nk-tb-col tb-col-md"><span className="sub-text">Phone</span></div>
                                        <div className="nk-tb-col tb-col-lg"><span className="sub-text">Address</span></div>
                                        <div className="nk-tb-col tb-col-md"><span className="sub-text">Status</span></div>
                                        <div className="nk-tb-col nk-tb-col-tools">
                                            <ul className="nk-tb-actions gx-1 my-n1">
                                                <li>
                                                    <div className="drodown">
                                                        <a href="#" className="dropdown-toggle btn btn-icon btn-trigger mr-n1" data-toggle="dropdown"><em className="icon ni ni-more-h"></em></a>
                                                        <div className="dropdown-menu dropdown-menu-right">
                                                            <ul className="link-list-opt no-bdr">
                                                                <li><a href="#"><em className="icon ni ni-mail"></em><span>Send Email to All</span></a></li>
                                                                <li><a href="#"><em className="icon ni ni-na"></em><span>Suspend Selected</span></a></li>
                                                                <li><a href="#"><em className="icon ni ni-trash"></em><span>Remove Seleted</span></a></li>
                                                                <li><a href="#"><em className="icon ni ni-shield-star"></em><span>Reset Password</span></a></li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    {this.renderSuppliersList(suppliersList)}
                                </div>
                                <div className="card">
                                    <div className="card-inner">
                                        <div className="nk-block-between-md g-3">
                                            <div className="g">
                                                <ul className="pagination justify-content-center justify-content-md-start">
                                                    <li className="page-item"><a className="page-link" href="#"><em className="icon ni ni-chevrons-left"></em></a></li>
                                                    <li className="page-item"><a className="page-link" href="#">1</a></li>
                                                    <li className="page-item"><span className="page-link"><em className="icon ni ni-more-h"></em></span></li>
                                                    <li className="page-item"><a className="page-link" href="#"><em className="icon ni ni-chevrons-right"></em></a></li>
                                                </ul>
                                            </div>
                                            <div className="g">
                                                <div className="pagination-goto d-flex justify-content-center justify-content-md-start gx-3">
                                                    <div>Page</div>
                                                    <div>
                                                        <select className="form-select form-select-sm" data-search="on" data-dropdown="xs center">
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
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default SuppliersContent;