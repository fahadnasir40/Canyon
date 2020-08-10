import React,{Component} from 'react'
import {Link} from 'react-router-dom'

class Login extends Component {

    LoginScreen =()=>{
        return (
            <div class="nk-app-root">
            {/* <!-- main @s --> */}
            <div class="nk-main ">
                {/* <!-- wrap @s --> */}
                <div class="nk-wrap nk-wrap-nosidebar">
                    {/* <!-- content @s --> */}
                    <div class="nk-content ">
                        <div class="nk-block nk-block-middle nk-auth-body  wide-xs">
                            <div class="brand-logo pb-4 text-center">
                                <a href="html/index.html" class="logo-link">
                                    <img class="logo-light logo-img logo-img-lg" src="./images/logo.png" srcset="./images/logo2x.png 2x" alt="logo"/>
                                    <img class="logo-dark logo-img logo-img-lg" src="./images/logo-dark.png" srcset="./images/logo-dark2x.png 2x" alt="logo-dark"/>
                                </a>
                            </div>
                            <div class="card">
                                <div class="card-inner card-inner-lg">
                                    <div class="nk-block-head">
                                        <div class="nk-block-head-content">
                                            <h4 class="nk-block-title">Sign-In</h4>
                                            <div class="nk-block-des">
                                            </div>
                                        </div>
                                    </div>
                                    <form>
                                        <div class="form-group">
                                            <div class="form-label-group">
                                                <label class="form-label" for="default-01">Email or Username</label>
                                            </div>
                                            <input type="text" class="form-control form-control-lg" id="default-01" placeholder="Enter your email address or username"/>
                                        </div>
                                        <div class="form-group">
                                            <div class="form-label-group">
                                                <label class="form-label" for="password">Passcode</label>
                                                <a class="link link-primary link-sm" href="html/pages/auths/auth-reset-v2.html">Forgot Code?</a>
                                            </div>
                                            <div class="form-control-wrap">
                                                <a href="#" class="form-icon form-icon-right passcode-switch" data-target="password">
                                                    <em class="passcode-icon icon-show icon ni ni-eye"></em>
                                                    <em class="passcode-icon icon-hide icon ni ni-eye-off"></em>
                                                </a>
                                                <input type="password" class="form-control form-control-lg" id="password" placeholder="Enter your passcode"/>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <Link to="/home">

                                            <button class="btn btn-lg btn-primary btn-block">Sign in</button>
                                            </Link>

                                        </div>
                                    </form>
                                    <div class="form-note-s2 text-center pt-4"> New on our platform? <a href="html/pages/auths/auth-register-v2.html">Create an account</a>
                                    </div>
                               
                                </div>
                            </div>
                        </div>
                        <div class="nk-footer nk-auth-footer-full">
                            <div class="container wide-lg">
                                <div class="row g-3">
                                    <div class="col-lg-6 order-lg-last">
                                        <ul class="nav nav-sm justify-content-center justify-content-lg-end">
                                            <li class="nav-item">
                                                <a class="nav-link" href="#">Terms and Condition</a>
                                            </li>
                                            <li class="nav-item">
                                                <a class="nav-link" href="#">Privacy Policy</a>
                                            </li>
                                            <li class="nav-item">
                                                <a class="nav-link" href="#">Help</a>
                                            </li>
                                
                                        </ul>
                                    </div>
                                    <div class="col-lg-6">
                                        <div class="nk-block-content text-center text-lg-left">
                                            <p class="text-soft">&copy; 2020 Canyon Waters. All Rights Reserved.</p>
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

    state = {  }
    render() {
        return (
            
            this.LoginScreen()
        );
    }
}

export default Login;