import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { loginUser } from '../../actions'


class Login extends Component {

    state = {
        email: '',
        password: '',
        redirectMessage: '',
        error: '',
        validated: false,
        hasError: false
    }

    handleInputEmail = (event) => {
        this.setState({ email: event.target.value })
    }

    handleInputPassword = (event) => {
        this.setState({ password: event.target.value })
    }


    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.user.login) {
            if (nextProps.user.login.isAuth && nextProps.user.login.role == 'worker') {
                nextProps.history.push('/orders')
            }
            else if (nextProps.user.login.isAuth) {
                nextProps.history.push('/dashboard')
            }
        }

        return null;
    }

    componentDidUpdate(prevProps) {

        if (prevProps.location.redirect) {
            if (!this.props.location.redirect.message) {
                if (prevProps.location.redirect.message) {
                    this.props.location.redirect.message = prevProps.location.redirect.message;
                    this.setState({
                        redirectMessage: this.props.location.redirect.message
                    })
                }
            }
        }
    }

    submitForm = (e) => {
        e.preventDefault();
        this.props.dispatch(loginUser(this.state))
    }

    LoginScreen = (user, message) => {
        return (
            <div className="nk-app-root">
                {/* <!-- main @s --> */}
                <div className="nk-main ">
                    {/* <!-- wrap @s --> */}
                    <div className="nk-wrap nk-wrap-nosidebar">
                        {/* <!-- content @s --> */}
                        <div className="nk-content ">
                            <div className="nk-block nk-block-middle nk-auth-body  wide-xs">
                                <div className="brand-logo pb-4 text-center">
                                    <a href="html/index.html" className="logo-link">
                                        <img className="logo-light logo-img logo-img-lg" src="./images/logo.png" srcSet="./images/logo2x.png 2x" alt="logo" />
                                        <img className="logo-dark logo-img logo-img-lg" src="./images/logo-dark.png" srcSet="./images/logo-dark2x.png 2x" alt="logo-dark" />
                                    </a>
                                </div>
                                <div className="card">
                                    <div className="card-inner card-inner-lg">
                                        <div className="nk-block-head">
                                            <div className="nk-block-head-content">
                                                <h4 className="nk-block-title">Sign-In</h4>
                                                <div className="nk-block-des">
                                                </div>
                                            </div>
                                        </div>
                                        <form onSubmit={this.submitForm}>
                                            <div className="form-group">
                                                <div className="form-label-group">
                                                    <label className="form-label" htmlFor="default-01">Email</label>
                                                </div>
                                                <input type="text" value={this.state.email} onChange={this.handleInputEmail} className="form-control form-control-lg" id="default-01" placeholder="Enter your email address" />
                                            </div>
                                            <div className="form-group">
                                                <div className="form-label-group">
                                                    <label className="form-label" htmlFor="password">Password</label>
                                                    <a className="link link-primary link-sm" href="#">Forgot Code?</a>
                                                </div>
                                                <div className="form-control-wrap">
                                                    <input type="password" value={this.state.password} onChange={this.handleInputPassword} className="form-control form-control-lg" id="password" placeholder="Enter your password" />
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <button type="submit" className="btn btn-lg btn-primary btn-block">Sign in</button>
                                            </div>
                                        </form>
                                        <div className="form-note-s2 text-center pt-4"> New on our platform? <a href="#">Contact Canyon Pty Ltd.</a>
                                        </div>
                                        <div className="text-danger  mt-2 text-center">
                                            {user.login ?
                                                <span className="ff-bold"><strong>{user.login.message}</strong></span>
                                                : null}
                                        </div>

                                    </div>
                                </div>
                            </div>
                            {
                                message ?
                                    <div className="container ">
                                        <div className="alert alert-pro alert-success alert-dismissible mb-2">
                                            <div className="alert-text">
                                                <h6>Password Changed Successfully</h6>
                                                <p>Your password has been changed. Please sign in again with your new password. </p>
                                            </div>
                                            <button className="close" data-dismiss="alert"></button>
                                        </div>
                                    </div>
                                    : null
                            }

                            <div className="nk-footer nk-auth-footer-full">
                                <div className="container wide-lg">

                                    <div className="row g-3">
                                        <div className="col-lg-6 order-lg-last">
                                            <ul className="nav nav-sm justify-content-center justify-content-lg-end">
                                                <li className="nav-item">
                                                    <a className="nav-link" href="#">Terms and Condition</a>
                                                </li>
                                                <li className="nav-item">
                                                    <a className="nav-link" href="#">Privacy Policy</a>
                                                </li>
                                                <li className="nav-item">
                                                    <a className="nav-link" href="#">Help</a>
                                                </li>

                                            </ul>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="nk-block-content text-center text-lg-left">
                                                <p className="text-soft">&copy; 2020 Canyon Waters. All Rights Reserved.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* <!-- wrap @e --> */}
                    </div>
                    {/* <!-- content @e --> */}
                </div>
                {/* <!-- main @e --> */}
            </div>
        )
    }

    render() {
        let user = this.props.user;
        let rm = '';

        if (this.state.redirectMessage) {
            rm = this.props.location.redirect.message
        }

        if (user.login) {
            if (user.login.message === 'Request failed with status code 504') {
                return <Redirect to="/error" />
            }
        }

        return (
            this.LoginScreen(user, rm)
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(Login)