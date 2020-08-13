import React, {Component} from 'react'
import axios from 'axios'
import {Redirect} from 'react-router-dom'

class Header extends Component{
    
    state = {
        logout: false
    }

    signOut = ()=>{

        let request = axios.get(`/api/logout`)
        .then(request =>{
            this.setState({logout:true})
        });    
    }

    getInitials = (name) =>{
        if(name){
            var initials = name.match(/\b\w/g) || [];
            initials = ((initials.shift() || '') + (initials.pop() || '')).toUpperCase();
            return initials;
        }
    }

    render (){
    
        let user = '';
        if(this.props.user){
            user = this.props.user.login;
        }
   
        if(this.state.logout){
            return <Redirect to="/"/>
        }

        return(
            <div className="nk-header nk-header-fixed is-light">
                <div className="container-fluid">
                    <div className="nk-header-wrap">
                        <div className="nk-menu-trigger d-xl-none ml-n1">
                            <a href="#" className="nk-nav-toggle nk-quick-nav-icon" data-target="sidebarMenu"><em className="icon ni ni-menu"></em></a>
                        </div>
                        <div className="nk-header-brand d-xl-none">
                            <a href="html/index.html" className="logo-link">
                                <img className="logo-light logo-img" src="./images/logo.png" srcSet="./images/logo2x.png 2x" alt="logo"/>
                                <img className="logo-dark logo-img" src="./images/logo-dark.png" srcSet="./images/logo-dark2x.png 2x" alt="logo-dark"/>
                            </a>
                        </div>
                
                        <div className="nk-header-tools">
                            <ul className="nk-quick-nav">
                                <li className="dropdown chats-dropdown hide-mb-xs">
                                    <a href="#" className="dropdown-toggle nk-quick-nav-icon" data-toggle="dropdown">
                                        <div className="icon-status icon-status-na"><em className="icon ni ni-comments"></em></div>
                                    </a>
                                    <div className="dropdown-menu dropdown-menu-xl dropdown-menu-right">
                                        <div className="dropdown-head">
                                            <span className="sub-title nk-dropdown-title">Recent Chats</span>
                                            <a href="#">Setting</a>
                                        </div>
                                        <div className="dropdown-body">
                                            <ul className="chat-list">
                                                <li className="chat-item">
                                                    <a className="chat-link" href="html/apps-chats.html">
                                                        <div className="chat-media user-avatar">
                                                            <span>IH</span>
                                                            <span className="status dot dot-lg dot-gray"></span>
                                                        </div>
                                                        <div className="chat-info">
                                                            <div className="chat-from">
                                                                <div className="name">Iliash Hossain</div>
                                                                <span className="time">Now</span>
                                                            </div>
                                                            <div className="chat-context">
                                                                <div className="text">You: Please confrim if you got my last messages.</div>
                                                                <div className="status delivered">
                                                                    <em className="icon ni ni-check-circle-fill"></em>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </a>
                                                </li>
                                                <li className="chat-item is-unread">
                                                    <a className="chat-link" href="html/apps-chats.html">
                                                        <div className="chat-media user-avatar bg-pink">
                                                            <span>AB</span>
                                                            <span className="status dot dot-lg dot-success"></span>
                                                        </div>
                                                        <div className="chat-info">
                                                            <div className="chat-from">
                                                                <div className="name">Abu Bin Ishtiyak</div>
                                                                <span className="time">4:49 AM</span>
                                                            </div>
                                                            <div className="chat-context">
                                                                <div className="text">Hi, I am Ishtiyak, can you help me with this problem ?</div>
                                                                <div className="status unread">
                                                                    <em className="icon ni ni-bullet-fill"></em>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </a>
                                                </li>
                                                <li className="chat-item">
                                                    <a className="chat-link" href="html/apps-chats.html">
                                                        <div className="chat-media user-avatar">
                                                            <img src="./images/avatar/b-sm.jpg" alt=""/>
                                                        </div>
                                                        <div className="chat-info">
                                                            <div className="chat-from">
                                                                <div className="name">George Philips</div>
                                                                <span className="time">6 Apr</span>
                                                            </div>
                                                            <div className="chat-context">
                                                                <div className="text">Have you seens the claim from Rose?</div>
                                                            </div>
                                                        </div>
                                                    </a>
                                                </li>
                                                <li className="chat-item">
                                                    <a className="chat-link" href="html/apps-chats.html">
                                                        <div className="chat-media user-avatar user-avatar-multiple">
                                                            <div className="user-avatar">
                                                                <img src="./images/avatar/c-sm.jpg" alt=""/>
                                                            </div>
                                                            <div className="user-avatar">
                                                                <span>AB</span>
                                                            </div>
                                                        </div>
                                                        <div className="chat-info">
                                                            <div className="chat-from">
                                                                <div className="name">Softnio Group</div>
                                                                <span className="time">27 Mar</span>
                                                            </div>
                                                            <div className="chat-context">
                                                                <div className="text">You: I just bought a new computer but i am having some problem</div>
                                                                <div className="status sent">
                                                                    <em className="icon ni ni-check-circle"></em>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </a>
                                                </li>
                                                <li className="chat-item">
                                                    <a className="chat-link" href="html/apps-chats.html">
                                                        <div className="chat-media user-avatar">
                                                            <img src="./images/avatar/a-sm.jpg" alt=""/>
                                                            <span className="status dot dot-lg dot-success"></span>
                                                        </div>
                                                        <div className="chat-info">
                                                            <div className="chat-from">
                                                                <div className="name">Larry Hughes</div>
                                                                <span className="time">3 Apr</span>
                                                            </div>
                                                            <div className="chat-context">
                                                                <div className="text">Hi Frank! How is you doing?</div>
                                                            </div>
                                                        </div>
                                                    </a>
                                                </li>
                                                <li className="chat-item">
                                                    <a className="chat-link" href="html/apps-chats.html">
                                                        <div className="chat-media user-avatar bg-purple">
                                                            <span>TW</span>
                                                        </div>
                                                        <div className="chat-info">
                                                            <div className="chat-from">
                                                                <div className="name">Tammy Wilson</div>
                                                                <span className="time">27 Mar</span>
                                                            </div>
                                                            <div className="chat-context">
                                                                <div className="text">You: I just bought a new computer but i am having some problem</div>
                                                                <div className="status sent">
                                                                    <em className="icon ni ni-check-circle"></em>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="dropdown-foot center">
                                            <a href="html/apps-chats.html">View All</a>
                                        </div>
                                    </div>
                                </li>
                                <li className="dropdown notification-dropdown">
                                    <a href="#" className="dropdown-toggle nk-quick-nav-icon" data-toggle="dropdown">
                                        <div className="icon-status icon-status-info"><em className="icon ni ni-bell"></em></div>
                                    </a>
                                    <div className="dropdown-menu dropdown-menu-xl dropdown-menu-right">
                                        <div className="dropdown-head">
                                            <span className="sub-title nk-dropdown-title">Notifications</span>
                                            <a href="#">Mark All as Read</a>
                                        </div>
                                        <div className="dropdown-body">
                                            <div className="nk-notification">
                                                <div className="nk-notification-item dropdown-inner">
                                                    <div className="nk-notification-icon">
                                                        <em className="icon icon-circle bg-warning-dim ni ni-curve-down-right"></em>
                                                    </div>
                                                    <div className="nk-notification-content">
                                                        <div className="nk-notification-text">You have requested to <span>Widthdrawl</span></div>
                                                        <div className="nk-notification-time">2 hrs ago</div>
                                                    </div>
                                                </div>
                                                <div className="nk-notification-item dropdown-inner">
                                                    <div className="nk-notification-icon">
                                                        <em className="icon icon-circle bg-success-dim ni ni-curve-down-left"></em>
                                                    </div>
                                                    <div className="nk-notification-content">
                                                        <div className="nk-notification-text">Your <span>Deposit Order</span> is placed</div>
                                                        <div className="nk-notification-time">2 hrs ago</div>
                                                    </div>
                                                </div>
                                                <div className="nk-notification-item dropdown-inner">
                                                    <div className="nk-notification-icon">
                                                        <em className="icon icon-circle bg-warning-dim ni ni-curve-down-right"></em>
                                                    </div>
                                                    <div className="nk-notification-content">
                                                        <div className="nk-notification-text">You have requested to <span>Widthdrawl</span></div>
                                                        <div className="nk-notification-time">2 hrs ago</div>
                                                    </div>
                                                </div>
                                                <div className="nk-notification-item dropdown-inner">
                                                    <div className="nk-notification-icon">
                                                        <em className="icon icon-circle bg-success-dim ni ni-curve-down-left"></em>
                                                    </div>
                                                    <div className="nk-notification-content">
                                                        <div className="nk-notification-text">Your <span>Deposit Order</span> is placed</div>
                                                        <div className="nk-notification-time">2 hrs ago</div>
                                                    </div>
                                                </div>
                                                <div className="nk-notification-item dropdown-inner">
                                                    <div className="nk-notification-icon">
                                                        <em className="icon icon-circle bg-warning-dim ni ni-curve-down-right"></em>
                                                    </div>
                                                    <div className="nk-notification-content">
                                                        <div className="nk-notification-text">You have requested to <span>Widthdrawl</span></div>
                                                        <div className="nk-notification-time">2 hrs ago</div>
                                                    </div>
                                                </div>
                                                <div className="nk-notification-item dropdown-inner">
                                                    <div className="nk-notification-icon">
                                                        <em className="icon icon-circle bg-success-dim ni ni-curve-down-left"></em>
                                                    </div>
                                                    <div className="nk-notification-content">
                                                        <div className="nk-notification-text">Your <span>Deposit Order</span> is placed</div>
                                                        <div className="nk-notification-time">2 hrs ago</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="dropdown-foot center">
                                            <a href="#">View All</a>
                                        </div>
                                    </div>
                                </li>
                                <li className="dropdown user-dropdown">
                                    <a href="#" className="dropdown-toggle mr-n1" data-toggle="dropdown">
                                        <div className="user-toggle">
                                            <div className="user-avatar sm">
                                                <em className="icon ni ni-user-alt"></em>
                                            </div>
                                            <div className="user-info d-none d-xl-block">
                                                <div className="user-status user-status-active ccap">{user.role}</div>
                                                <div className="user-name dropdown-indicator">{user.name}</div>
                                            </div>
                                        </div>
                                    </a>
                                    <div className="dropdown-menu dropdown-menu-md dropdown-menu-right">
                                        <div className="dropdown-inner user-card-wrap bg-lighter d-none d-md-block">
                                            <div className="user-card">
                                                <div className="user-avatar">
                                                    <span>{this.getInitials(user.name)}</span>
                                                </div>
                                                <div className="user-info">
                                                    <span className="lead-text">{user.name}</span>
                                                    <span className="sub-text">{user.email}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="dropdown-inner">
                                            <ul className="link-list">
                                                <li><a href="html/ecommerce/user-profile.html"><em className="icon ni ni-user-alt"></em><span>View Profile</span></a></li>
                                                <li><a href="html/ecommerce/user-profile.html"><em className="icon ni ni-setting-alt"></em><span>Account Setting</span></a></li>
                                                <li><a href="html/ecommerce/user-profile.html"><em className="icon ni ni-activity-alt"></em><span>Login Activity</span></a></li>
                                            </ul>
                                        </div>
                                        <div className="dropdown-inner">
                                            <ul className="link-list">
                                                <li><a style={{cursor:"pointer"}} onClick={this.signOut}><em className="icon ni ni-signout"></em><span>Sign out</span></a></li>
                                            </ul>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        
        );
    }

}

export default Header;