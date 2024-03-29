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

    getUserStatus = (row) => (
        row.status === "active" ?
            <li><a onClick={() => { this.props.changeStatus(row) }}>
                <em className="icon ni ni-na"></em><span style={{ cursor: "pointer" }} className="text-danger">Change Status</span>
            </a></li>
            :
            <li><a onClick={() => { this.props.changeStatus(row) }}>
                <em class="icon ni ni-check-thick"></em><span style={{ cursor: "pointer" }}>Change Status</span>
            </a></li>
    )

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
                        {this.props.user.login.id !== user._id ?
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
                                        <span className="tb-lead ccap">{user.name}{user.status ? user.status == 'suspended' ? <span className="dot dot-danger d-md-none ml-1"> </span>
                                            : <span className="dot dot-success d-md-none ml-1"> </span> : <span className="dot dot-success d-md-none ml-1"> </span>}</span>
                                        <span>{user.email}</span>
                                    </div>
                                </div>
                            </Link>
                            :
                            <div className="user-card">
                                <div className={"user-avatar " + this.getCustomBg()}>
                                    <span>{this.getInitials(user.name)}</span>
                                </div>
                                <div className="user-info">
                                    <span className="tb-lead ccap">{user.name} <span className="text-muted"> (You)</span><span className="dot dot-success d-md-none ml-1"> </span></span>
                                    <span>{user.email}</span>
                                </div>
                            </div>

                        }

                    </div>
                    <div className="nk-tb-col tb-col-mb">
                        <span className="tb-status ccap">{user.role}</span>
                    </div>
                    <div className="nk-tb-col tb-col-md">
                        <span>{user.phone}</span>
                    </div>
                    <div className="nk-tb-col tb-col-lg">
                        <ul className="list-status">
                            <li> <span>{user.city ? user.city : 'N/A'}</span></li>
                        </ul>
                    </div>

                    <div className="nk-tb-col tb-col-md">
                        {
                            user.status ?
                                user.status === 'suspended' ?
                                    <span className="tb-status ccap text-danger">{user.status}</span>
                                    :
                                    <span className="tb-status ccap text-success">{user.status}</span>
                                :
                                <span className="tb-status text-success">Active</span>
                        }
                    </div>
                    {
                        this.props.user.login.id != user._id ?
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

                                                    {
                                                        this.props.user.login.role === 'administrator' && user.role != 'administrator' ?
                                                            this.getUserStatus(user)
                                                            : null
                                                    }
                                                </ul>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            : null
                    }
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
                                            <div className="nk-tb-col tb-col-lg"><span className="sub-text">City</span></div>
                                            <div className="nk-tb-col tb-col-md"><span className="sub-text">Status</span></div>
                                            <div className="nk-tb-col tb-col text-right"><span className="sub-text">Action</span></div>
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