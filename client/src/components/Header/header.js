import React, {Component} from 'react'
import axios from 'axios'
import {Redirect,Link} from 'react-router-dom'

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
            user?
            <div className="nk-header nk-header-fixed is-light">
                <div className="container-fluid">
                    <div className="nk-header-wrap">
                        <div className="nk-menu-trigger d-xl-none ml-n1">
                            <div className="nk-nav-toggle nk-quick-nav-icon" data-target="sidebarMenuId"><em className="icon ni ni-menu"></em></div>
                        </div>
                        <div className="nk-header-brand d-xl-none">
                            <a href="html/index.html" className="logo-link">
                                <img className="logo-light logo-img" src="./images/logo.png" srcSet="./images/logo2x.png 2x" alt="logo"/>
                                <img className="logo-dark logo-img" src="./images/logo-dark.png" srcSet="./images/logo-dark2x.png 2x" alt="logo-dark"/>
                            </a>
                        </div>
                
                        <div className="nk-header-tools">
                            <ul className="nk-quick-nav">
                               
                            
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
                                                <li><Link to="/profile"><em className="icon ni ni-user-alt"></em><span>View Profile</span></Link></li>
                                                <li><Link to="/profile"><em className="icon ni ni-setting-alt"></em><span>Account Setting</span></Link></li>
                                               
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
            </div>: null
        
        );
    }

}

export default Header;