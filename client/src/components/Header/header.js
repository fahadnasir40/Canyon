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
            <div className="nk-header nk-header-fixed is-light">
                <div className="container-fluid">
                    <div className="nk-header-wrap">
                        <div className="nk-menu-trigger d-xl-none ml-n1">
                            <a href="#" className="nk-nav-toggle nk-quick-nav-icon" data-target="sidebarMenu"><em className="icon ni ni-menu"></em></a>
                        </div>
                        <div className="nk-header-brand d-xl-none">
                            <Link to="/" className="logo-link">
                                <img className="logo-light logo-img" srcSet="./images/logo.png" srcSet="./images/logo2x.png 2x" alt="logo" />
                                <img className="logo-dark logo-img" srcSet="./images/logo-dark.png" srcSet="./images/logo-dark2x.png 2x" alt="logo-dark" />
                            </Link>
                        </div>

                        <div className="nk-header-tools">
                            <ul className="nk-quick-nav">

                                <li className="dropdown user-dropdown">
                                    <a href="#" className="dropdown-toggle mr-n1" data-toggle="dropdown">
                                        {
                                            this.props.user.login ?
                                                <div className="user-toggle">
                                                    <div className="user-avatar sm">
                                                        <em className="icon ni ni-user-alt"></em>
                                                    </div>
                                                    <div className="user-info d-none d-xl-block">
                                                        <div className="user-status user-status-primary ccap">{this.props.user.login.role}</div>
                                                        <div className="user-name dropdown-indicator ccap">{this.props.user.login.name}</div>
                                                    </div>
                                                </div>
                                                : null
                                        }
                                    </a>
                                    <div className="dropdown-menu dropdown-menu-md dropdown-menu-right">
                                        <div className="dropdown-inner user-card-wrap bg-lighter d-none d-md-block">
                                            {
                                                this.props.user.login ?
                                                    <div className="user-card">
                                                        <div className="user-avatar">
                                                            <span>{this.getInitials(this.props.user.login.name)}</span>
                                                        </div>
                                                        <div className="user-info">
                                                            <span className="lead-text">{this.props.user.login.name}</span>
                                                            <span className="sub-text">{this.props.user.login.email}</span>
                                                        </div>
                                                    </div>
                                                    : null
                                            }
                                        </div>
                                        <div className="dropdown-inner">
                                            <ul className="link-list">
                                                <li><Link to="/profile"><em className="icon ni ni-user-alt"></em><span>View Profile</span></Link></li>
                                                <li><Link to="/profile"><em className="icon ni ni-setting-alt"></em><span>Account Setting</span></Link></li>
                                            </ul>
                                        </div>
                                        <div className="dropdown-inner">
                                            <ul className="link-list">
                                                <li><a style={{ cursor: "pointer" }} onClick={this.signOut}><em className="icon ni ni-signout"></em><span>Sign out</span></a></li>
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