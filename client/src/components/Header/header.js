import React, { Component } from 'react'
import axios from 'axios'
import { Redirect, Link } from 'react-router-dom'

class Header extends Component {

    state = {
        logout: false,
    }

    signOut = () => {

        let request = axios.get(`/api/logout`)
            .then(request => {
                this.setState({ logout: true })
            });
    }

    getInitials = (name) => {
        if (name) {
            var initials = name.match(/\b\w/g) || [];
            initials = ((initials.shift() || '') + (initials.pop() || '')).toUpperCase();
            return initials;
        }
    }

    componentDidMount() {
        this.setState({
            user: this.props.user
        })
    }


    render() {


        if (this.state.logout) {
            return <Redirect to="/" />
        }

        return (
            <div class="nk-header nk-header-fixed is-light">
                <div class="container-fluid">
                    <div class="nk-header-wrap">
                        <div class="nk-menu-trigger d-xl-none ml-n1">
                            <a href="#" class="nk-nav-toggle nk-quick-nav-icon" data-target="sidebarMenu"><em class="icon ni ni-menu"></em></a>
                        </div>
                        <div class="nk-header-brand d-xl-none">
                            <a href="html/index.html" class="logo-link">
                                <img class="logo-light logo-img" src="./images/logo.png" srcset="./images/logo2x.png 2x" alt="logo" />
                                <img class="logo-dark logo-img" src="./images/logo-dark.png" srcset="./images/logo-dark2x.png 2x" alt="logo-dark" />
                            </a>
                        </div>
                      
                        <div class="nk-header-tools">
                            <ul class="nk-quick-nav">

                                <li class="dropdown user-dropdown">
                                    <a href="#" class="dropdown-toggle mr-n1" data-toggle="dropdown">
                                        {
                                            this.props.user.login ?
                                                <div class="user-toggle">
                                                    <div class="user-avatar sm">
                                                        <em class="icon ni ni-user-alt"></em>
                                                    </div>
                                                    <div class="user-info d-none d-xl-block">
                                                        <div class="user-status user-status-primary ccap">{this.props.user.login.role}</div>
                                                        <div class="user-name dropdown-indicator ccap">{this.props.user.login.name}</div>
                                                    </div>
                                                </div>
                                                : null
                                        }
                                    </a>
                                    <div class="dropdown-menu dropdown-menu-md dropdown-menu-right">
                                        <div class="dropdown-inner user-card-wrap bg-lighter d-none d-md-block">
                                            {
                                                this.props.user.login?
                                                    <div class="user-card">
                                                        <div class="user-avatar">
                                                            <span>{this.getInitials(this.props.user.login.name)}</span>
                                                        </div>
                                                        <div class="user-info">
                                                            <span class="lead-text">{this.props.user.login.name}</span>
                                                            <span class="sub-text">{this.props.user.login.email}</span>
                                                        </div>
                                                    </div>
                                                : null
                                            }
                                        </div>
                                        <div class="dropdown-inner">
                                            <ul class="link-list">
                                                <li><Link to="/profile"><em class="icon ni ni-user-alt"></em><span>View Profile</span></Link></li>
                                                <li><Link to="/profile"><em class="icon ni ni-setting-alt"></em><span>Account Setting</span></Link></li>
                                            </ul>
                                        </div>
                                        <div class="dropdown-inner">
                                            <ul class="link-list">
                                                <li><a  style={{cursor:"pointer"}} onClick={this.signOut}><em class="icon ni ni-signout"></em><span>Sign out</span></a></li>
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