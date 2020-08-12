import React, { Component } from 'react'
import {Link} from 'react-router-dom'

class Content extends Component {

   

    getInitials = (name) =>{
        var initials = name.match(/\b\w/g) || [];
        initials = ((initials.shift() || '') + (initials.pop() || '')).toUpperCase();
        return initials;
    }

    bg  = ["bg-primary","bg-warning","bg-info","bg-secondary","bg-danger","bg-dark"];
    count = 0;
    
    getCustomBg = ()=>{
        if(this.count > this.bg.length){
            this.count = 0;
        }
        return (this.bg[this.count++]);
    }
    
    renderUserList =()=>{
        if(this.props.userList){
            return this.props.userList.map((user,i)=>(
                <div key={i} class="nk-tb-item">
                    <div class="nk-tb-col nk-tb-col-check">
                        <div class="custom-control custom-control-sm custom-checkbox notext">
                            <input type="checkbox" class="custom-control-input" id={"uid1-"+i}/>
                            <label class="custom-control-label" for={"uid1-"+i}></label>
                        </div>
                    </div>
                    <div class="nk-tb-col">
                        <a href="html/user-details-regular.html">
                            <div class="user-card">
                                <div className={"user-avatar " + this.getCustomBg()}>
                                    <span>{this.getInitials(user.name)}</span>
                                </div>
                                <div class="user-info">
                                    <span class="tb-lead ccap">{user.name}<span class="dot dot-success d-md-none ml-1"> </span></span>
                                    <span>{user.email}</span>
                                </div>
                            </div>
                        </a>
                    </div>
                    <div class="nk-tb-col tb-col-mb">
                        <span class="tb-status ccap">{user.role}</span>
                    </div>
                    <div class="nk-tb-col tb-col-md">
                        <span>{user.phone}</span>
                    </div>
                    <div class="nk-tb-col tb-col-lg">
                        <ul class="list-status">
                            <li><em class="icon text-success ni ni-check-circle"></em> <span>Email</span></li>
                            <li><em class="icon ni ni-alert-circle"></em> <span>KYC</span></li>
                        </ul>
                    </div>
                    <div class="nk-tb-col tb-col-lg">
                        <span>10 Feb 2020</span>
                    </div>
                    <div class="nk-tb-col tb-col-md">
                        <span class="tb-status text-success">Active</span>
                    </div>
                    <div class="nk-tb-col nk-tb-col-tools">
                        <ul class="nk-tb-actions gx-1">
                        
                            <li>
                                <div class="drodown">
                                    <a href="#" class="dropdown-toggle btn btn-icon btn-trigger" data-toggle="dropdown"><em class="icon ni ni-more-h"></em></a>
                                    <div class="dropdown-menu dropdown-menu-right">
                                        <ul class="link-list-opt no-bdr">
                                            <li><a href="#"><em class="icon ni ni-focus"></em><span>Quick View</span></a></li>
                                            <li><a href="#"><em class="icon ni ni-eye"></em><span>View Details</span></a></li>
                                            <li><a href="#"><em class="icon ni ni-repeat"></em><span>Transaction</span></a></li>
                                            <li><a href="#"><em class="icon ni ni-activity-round"></em><span>Activities</span></a></li>
                                            <li class="divider"></li>
                                            <li><a href="#"><em class="icon ni ni-shield-star"></em><span>Reset Pass</span></a></li>
                                            <li><a href="#"><em class="icon ni ni-shield-off"></em><span>Reset 2FA</span></a></li>
                                            <li><a href="#"><em class="icon ni ni-na"></em><span>Suspend User</span></a></li>
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

    getUsersLength(){
        if(this.props.userList){
            return this.props.userList.length;
        }        
    }

    render() {
       
        return (
            <div>
                <div className="nk-content ml-5 ">
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
                                            <div className="toggle-wrap nk-block-tools-toggle">
                                                <a href="#" className="btn btn-icon btn-trigger toggle-expand mr-n1" data-target="pageMenu"><em className="icon ni ni-menu-alt-r"></em></a>
                                                <div className="toggle-expand-content" data-content="pageMenu">
                                                    <ul className="nk-block-tools g-3">
                                                        <li><a href="#" className="btn btn-white btn-outline-light"><em className="icon ni ni-download-cloud"></em><span>Export</span></a></li>
                                                        <li className="nk-block-tools-opt">
                                                            <div className="drodown">
                                                                <a href="#" className="dropdown-toggle btn btn-icon btn-primary" data-toggle="dropdown"><em className="icon ni ni-plus"></em></a>
                                                                <div className="dropdown-menu dropdown-menu-right">
                                                                    <ul className="link-list-opt no-bdr">
                                                                        
                                                                        <li><Link to="/add"><span>Add User</span></Link></li>
                                                                        <li><a href="#"><span>Add Team</span></a></li>
                                                                        <li><a href="#"><span>Import User</span></a></li>
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="card-inner p-0">
                                                <div class="nk-tb-list nk-tb-ulist">
                                                    <div class="nk-tb-item nk-tb-head">
                                                        <div class="nk-tb-col nk-tb-col-check">
                                                            <div class="custom-control custom-control-sm custom-checkbox notext">
                                                                <input type="checkbox" class="custom-control-input" id="uid"/>
                                                                <label class="custom-control-label" for="uid"></label>
                                                            </div>
                                                        </div>
                                                        <div class="nk-tb-col"><span class="sub-text">User</span></div>
                                                        <div class="nk-tb-col tb-col-mb"><span class="sub-text">Role</span></div>
                                                        <div class="nk-tb-col tb-col-md"><span class="sub-text">Phone</span></div>
                                                        <div class="nk-tb-col tb-col-lg"><span class="sub-text">Verified</span></div>
                                                        <div class="nk-tb-col tb-col-lg"><span class="sub-text">Last Login</span></div>
                                                        <div class="nk-tb-col tb-col-md"><span class="sub-text">Status</span></div>
                                                        <div class="nk-tb-col nk-tb-col-tools text-right">
                                                            <div class="dropdown">
                                                                <a href="#" class="btn btn-xs btn-outline-light btn-icon dropdown-toggle" data-toggle="dropdown" data-offset="0,5"><em class="icon ni ni-plus"></em></a>
                                                                <div class="dropdown-menu dropdown-menu-xs dropdown-menu-right">
                                                                    <ul class="link-tidy sm no-bdr">
                                                                        <li>
                                                                            <div class="custom-control custom-control-sm custom-checkbox">
                                                                                <input type="checkbox" class="custom-control-input" checked="" id="bl"/>
                                                                                <label class="custom-control-label" for="bl">Role</label>
                                                                            </div>
                                                                        </li>
                                                                        <li>
                                                                            <div class="custom-control custom-control-sm custom-checkbox">
                                                                                <input type="checkbox" class="custom-control-input" checked="" id="ph"/>
                                                                                <label class="custom-control-label" for="ph">Phone</label>
                                                                            </div>
                                                                        </li>
                                                                        <li>
                                                                            <div class="custom-control custom-control-sm custom-checkbox">
                                                                                <input type="checkbox" class="custom-control-input" id="vri"/>
                                                                                <label class="custom-control-label" for="vri">Verified</label>
                                                                            </div>
                                                                        </li>
                                                                        <li>
                                                                            <div class="custom-control custom-control-sm custom-checkbox">
                                                                                <input type="checkbox" class="custom-control-input" id="st"/>
                                                                                <label class="custom-control-label" for="st">Status</label>
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