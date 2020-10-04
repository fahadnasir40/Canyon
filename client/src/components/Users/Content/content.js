import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Content extends Component {



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

    renderUserList = () => {
        if (this.props.userList) {
            return this.props.userList.map((user, i) => (
                <div key={i} className="nk-tb-item">
                    <div className="nk-tb-col nk-tb-col-check">
                        <div className="custom-control custom-control-sm custom-checkbox notext">
                            <input type="checkbox" className="custom-control-input" id={"uid1-" + i} />
                            <label className="custom-control-label" htmlFor={"uid1-" + i}></label>
                        </div>
                    </div>
                    <div className="nk-tb-col">
                        <Link to={{
                            pathname: "/userInfo",
                            state: {
                                userInfo: user
                            }
                        }}>
                            <div className="user-card">
                                <div className={"user-avatar " + this.getCustomBg()}>
                                    <span>{this.getInitials(user.name)}</span>
                                </div>
                                <div className="user-info">
                                    <span className="tb-lead ccap">{user.name}<span className="dot dot-success d-md-none ml-1"> </span></span>
                                    <span>{user.email}</span>
                                </div>
                            </div>
                        </Link>
                    </div>
                    <div className="nk-tb-col tb-col-mb">
                        <span className="tb-status ccap">{user.role}</span>
                    </div>
                    <div className="nk-tb-col tb-col-md">
                        <span>{user.phone}</span>
                    </div>
                    <div className="nk-tb-col tb-col-lg">
                        <ul className="list-status">
                            <li><em className="icon text-success ni ni-check-circle"></em> <span>Email</span></li>
                        </ul>
                    </div>

                    <div className="nk-tb-col tb-col-md">
                        <span className="tb-status text-success">Active</span>
                    </div>
                    <div className="nk-tb-col nk-tb-col-tools">
                        <ul className="nk-tb-actions gx-1">

                            <li>
                                <div className="drodown">
                                    <a href="#" className="dropdown-toggle btn btn-icon btn-trigger" data-toggle="dropdown"><em className="icon ni ni-more-h"></em></a>
                                    <div className="dropdown-menu dropdown-menu-right">
                                        <ul className="link-list-opt no-bdr">
                                            <li>  <Link to={{
                                                pathname: "/userInfo",
                                                state: {
                                                    userInfo: user
                                                }
                                            }}
                                            ><em className="icon ni ni-eye"></em><span>View Details</span></Link></li>

                                            <li className="divider"></li>
                                            <li><a href="#"><em className="icon ni ni-na"></em><span>Suspend User</span></a></li>
                                        </ul>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            ));
        }
    }

    getUsersLength() {
        if (this.props.userList) {
            return this.props.userList.length;
        }
    }

    render() {

        return (
            <div>
                <div className="nk-content ml-md-5 ">
                    <div className="container-fluid">
                        <div className="nk-content-inner">
                            <div className="nk-content-body">
                                <div className="nk-block-head nk-block-head-sm">
                                    <div className="nk-block-between">
                                        <div className="nk-block-head-content">
                                            <h3 className="nk-block-title page-title">Users List</h3>
                                            <div className="nk-block-des text-soft">
                                                <p>You have total {this.getUsersLength()} users.</p>
                                            </div>
                                        </div>
                                        <div className="nk-block-head-content">
                                            <ul className="nk-block-tools g-3">
                                                <li className="nk-block-tools-opt">
                                                    <Link to="/add" className="btn btn-icon btn-primary"><em className="icon ni ni-plus"></em> <span className="mr-2">Add User </span></Link></li>
                                            </ul>

                                        </div>
                                    </div>
                                </div>
                                <div className="card-inner p-0 bg-white">
                                    <div className="nk-tb-list nk-tb-ulist">
                                        <div className="nk-tb-item nk-tb-head">
                                            <div className="nk-tb-col nk-tb-col-check">
                                                <div className="custom-control custom-control-sm custom-checkbox notext">
                                                    <input type="checkbox" className="custom-control-input" id="uid" />
                                                    <label className="custom-control-label" htmlFor="uid"></label>
                                                </div>
                                            </div>
                                            <div className="nk-tb-col"><span className="sub-text">User</span></div>
                                            <div className="nk-tb-col tb-col-mb"><span className="sub-text">Role</span></div>
                                            <div className="nk-tb-col tb-col-md"><span className="sub-text">Phone</span></div>
                                            <div className="nk-tb-col tb-col-lg"><span className="sub-text">Verified</span></div>
                                            <div className="nk-tb-col tb-col-lg"><span className="sub-text">Last Login</span></div>
                                            <div className="nk-tb-col tb-col-md"><span className="sub-text">Status</span></div>
                                            <div className="nk-tb-col nk-tb-col-tools text-right">
                                                <div className="dropdown">
                                                    <a href="#" className="btn btn-xs btn-outline-light btn-icon dropdown-toggle" data-toggle="dropdown" data-offset="0,5"><em className="icon ni ni-plus"></em></a>
                                                    <div className="dropdown-menu dropdown-menu-xs dropdown-menu-right">
                                                        <ul className="link-tidy sm no-bdr">
                                                            <li>
                                                                <div className="custom-control custom-control-sm custom-checkbox">
                                                                    <input type="checkbox" className="custom-control-input" checked="" id="bl" />
                                                                    <label className="custom-control-label" htmlFor="bl">Role</label>
                                                                </div>
                                                            </li>
                                                            <li>
                                                                <div className="custom-control custom-control-sm custom-checkbox">
                                                                    <input type="checkbox" className="custom-control-input" checked="" id="ph" />
                                                                    <label className="custom-control-label" htmlFor="ph">Phone</label>
                                                                </div>
                                                            </li>
                                                            <li>
                                                                <div className="custom-control custom-control-sm custom-checkbox">
                                                                    <input type="checkbox" className="custom-control-input" id="vri" />
                                                                    <label className="custom-control-label" htmlFor="vri">Verified</label>
                                                                </div>
                                                            </li>
                                                            <li>
                                                                <div className="custom-control custom-control-sm custom-checkbox">
                                                                    <input type="checkbox" className="custom-control-input" id="st" />
                                                                    <label className="custom-control-label" htmlFor="st">Status</label>
                                                                </div>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {this.renderUserList()}
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


export default Content;