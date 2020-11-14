import React, { Component } from 'react'
import axios from 'axios'
import { Redirect, Link } from 'react-router-dom'
import $ from 'jquery';
import { NavDropdown } from 'react-bootstrap'
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

    showNav = () => {
        $('.nk-sidebar').css('transform', 'translateX(0)');
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
                            <a style={{ cursor: "pointer" }} onClick={this.showNav} className="nk-nav-toggle nk-quick-nav-icon" data-target="sidebarMenu"><em className="icon ni ni-menu"></em></a>
                        </div>

                        <div className="nk-header-brand d-xl-none">
                            <Link to="/" className="logo-link">
                                <img className="logo-light logo-img" srcSet="./images/logo.png" srcSet="./images/logo2x.png 2x" alt="logo" />
                                <img className="logo-dark logo-img" srcSet="./images/logo-dark.png" alt="logo-dark" />
                            </Link>
                        </div>

                        <div className="nk-header-tools my-n1">

                            <NavDropdown title={
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
                            } className="nk-quick-nav " >

                                <div className="dropdown-menu-right ">
                                    <NavDropdown.Item className="user-dropdown dropdown mx-n1" href="/" ><div className="dropdown-inner user-card-wrap bg-lighter ">
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

                                    </div></NavDropdown.Item>
                                    <div></div>
                                    <div className="dropdown-inner">
                                        <NavDropdown.Item href="/profile"><em className="icon ni ni-user-alt"></em><span>View Profile</span></NavDropdown.Item>
                                        <NavDropdown.Item href="/profile"><em className="icon ni ni-setting-alt"></em><span>Account Setting</span></NavDropdown.Item>

                                    </div>
                                    <NavDropdown.Divider />
                                    <div className="dropdown-inner">
                                        <NavDropdown.Item ><a style={{ cursor: "pointer" }} onClick={this.signOut}><em className="icon ni ni-signout"></em><span>Sign out</span></a></NavDropdown.Item>
                                    </div>
                                </div>
                            </NavDropdown>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

export default Header;