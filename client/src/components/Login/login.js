import React,{Component} from 'react'
import {Redirect} from 'react-router-dom'
import { connect } from 'react-redux';
import { loginUser } from '../../actions'


class Login extends Component {

    state ={
        email:'',
        password:'',
      
        error:'',
        validated: false,
    }

    handleInputEmail = (event) => {
        this.setState({email:event.target.value})
    } 

    handleInputPassword = (event) => {
        this.setState({password:event.target.value})
    } 

    componentWillReceiveProps(nextProps){
        if(nextProps.user.login.isAuth){
            this.props.history.push('/dashboard')
        }
    }


    submitForm = (e) =>{
        e.preventDefault();
        this.props.dispatch(loginUser(this.state))
    }

    LoginScreen =(user)=>{
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
                                    <form noValidate validated={this.state.validated} onSubmit={this.submitForm}>
                                        <div class="form-group">
                                            <div class="form-label-group">
                                                <label class="form-label" for="default-01">Email</label>
                                            </div>
                                            <input type="text" value={this.state.email} onChange={this.handleInputEmail} class="form-control form-control-lg" id="default-01" placeholder="Enter your email address"/>
                                        </div>
                                        <div class="form-group">
                                            <div class="form-label-group">
                                                <label class="form-label" for="password">Password</label>
                                                <a class="link link-primary link-sm" href="#">Forgot Code?</a>
                                            </div>
                                            <div class="form-control-wrap">
                                                <a href="#" class="form-icon form-icon-right passcode-switch" data-target="password">
                                                    <em class="passcode-icon icon-show icon ni ni-eye"></em>
                                                    <em class="passcode-icon icon-hide icon ni ni-eye-off"></em>
                                                </a>
                                                <input type="password" value={this.state.password} onChange={this.handleInputPassword} class="form-control form-control-lg" id="password" placeholder="Enter your password"/>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <button type="submit" class="btn btn-lg btn-primary btn-block">Sign in</button>
                                        </div>
                                    </form>
                                    <div class="form-note-s2 text-center pt-4"> New on our platform? <a href="#">Contact Canyon Pty Ltd.</a>
                                    </div>
                                    <div className="text-danger  mt-2 text-center">
                                        {user.login ? 
                                            <span className="ff-bold"><strong>{user.login.message}</strong></span>
                                        :null}
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
        let user = this.props.user;

        if(user.login){
            if(user.login.message == 'Request failed with status code 504'){
                return <Redirect to="/error"/>
            }    
        }

        return (    
            this.LoginScreen(user)
        );
    }
}

function mapStateToProps(state){
    return {
        user:state.user
    }
}

export default connect(mapStateToProps)(Login)