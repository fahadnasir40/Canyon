import React, { Component } from 'react'


class AddUser extends Component {

    renderBody = ()=>{
        return(
            <div class="nk-body bg-white npc-general pg-auth">
            <div class="nk-app-root">
            
                <div class="nk-main ">
                  
                    <div class="nk-wrap nk-wrap-nosidebar">
                        {/* <!-- content @s --> */}
                        <div class="nk-content ">
                            <div class="nk-block nk-block-middle nk-auth-body wide-xs">
                                <div class="brand-logo pb-4 text-center">
                                    <a href="/" class="logo-link">
                                      Canyon Waters Logo
                                    </a>
                                </div>
                                <div class="card">
                                    <div class="card-inner card-inner-lg">
                                        <div class="nk-block-head">
                                            <div class="nk-block-head-content">
                                                <h4 class="nk-block-title">Register</h4>
                                                <div class="nk-block-des">
                                                    <p>Create New Dashlite Account</p>
                                                </div>
                                            </div>
                                        </div>
                                        <form>
                                            <div class="form-group">
                                                <label class="form-label" for="name">Name</label>
                                                <input type="text" class="form-control form-control-lg" id="name" placeholder="Enter your name"/>
                                            </div>
                                            <div class="form-group">
                                                <label class="form-label" for="email">Email or Username</label>
                                                <input type="text" class="form-control form-control-lg" id="email" placeholder="Enter your email address or username"/>
                                            </div>
                                            <div class="form-group">
                                                <label class="form-label" for="password">Passcode</label>
                                                <div class="form-control-wrap">
                                                    <a href="#" class="form-icon form-icon-right passcode-switch" data-target="password">
                                                        <em class="passcode-icon icon-show icon ni ni-eye"></em>
                                                        <em class="passcode-icon icon-hide icon ni ni-eye-off"></em>
                                                    </a>
                                                    <input type="password" class="form-control form-control-lg" id="password" placeholder="Enter your passcode"/>
                                                </div>
                                            </div>
                                           
                                            <div class="form-group">
                                                <button class="btn btn-lg btn-primary btn-block">Register</button>
                                            </div>
                                        </form>
                                      
                                    
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
        </div>
        )
    }

    render() {
        return (
            <div>
                {this.renderBody()}
            </div>
        )
    }
}

export default AddUser;