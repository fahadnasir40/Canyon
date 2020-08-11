import React, { Component } from 'react'
import Sidebar from '../../Sidebar/sidebar'
import Header from './../../Header/header'
import Footer from '../../Footer/footer'


class AddUser extends Component {

    renderBody = ()=> (
            <div className="container mt-5">
            <div className="card">
                <div className="card-inner">
                    <div className="card-head mt-1">
                         <h4 className="ff-base fw-medium">
                             Add User
                        </h4>
                    </div>
                    <form action="#">
                        <div className="row g-4">
                            <div className="col-lg-4">
                                <div className="form-group">
                                    <label className="form-label" htmlFor="full-name-1">Full Name</label>
                                    <div className="form-control-wrap">
                                        <input type="text" className="form-control" id="full-name-1"/>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4">
                                <div className="form-group">
                                    <label className="form-label" htmlFor="email-address-1">Email address</label>
                                    <div className="form-control-wrap">
                                        <input type="text" className="form-control" id="email-address-1"/>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="row g-4">
                            <div className="col-lg-4">
                                <div className="form-group">
                                    <label className="form-label" htmlFor="user-name-1">Username</label>
                                    <div className="form-control-wrap">
                                        <input type="text" className="form-control" id="user-name-1"/>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4">
                            <div className="form-group">
                                <label className="form-label">Role</label>
                                    <div className="form-control-wrap">
                                        <select className="form-select form-control form-control-lg">
                                            <option value="default_option">Worker</option>
                                            <option value="option_select_name">Administrator</option>
                                        </select>
                                    </div>
                                 </div>
                            </div>
                        </div>

                        <div className="row g-4">
                        <div className="col-lg-4">
                                <div className="form-group">
                                    <label className="form-label" htmlFor="phone-no-1">Phone No</label>
                                    <div className="form-control-wrap">
                                        <input type="text" className="form-control" id="phone-no-1"/>
                                    </div>
                                </div>
                            </div>
                           
                        </div>

                        <div className="row g-4">
                            <div className="col-lg-4">
                            <div class="form-group">
                                <label class="form-label">Date of Birth</label>
                                <div class="form-control-wrap">
                                    <div class="form-icon form-icon-left">
                                        <em class="icon ni ni-calendar"></em>
                                    </div>
                                    <input type="text" class="form-control date-picker" data-date-format="yyyy-mm-dd"/>
                                </div>
                                <div class="form-note">Date format <code>yyyy-mm-dd</code></div>
                            </div>

                            </div>
                        </div>

                        <div  className="row g-4">
                          <div className="col-lg-4">
                                    <div className="form-group">
                                        <label className="form-label" htmlFor="address-line-1">Address</label>
                                        <div className="form-control-wrap">
                                            <input type="text" className="form-control" id="address-line-1"/>
                                        </div>
                                    </div>
                            </div>
                        </div>
                        <div  className="row g-4">
                          <div className="col-lg-4">
                                    <div className="form-group">
                                        <label className="form-label" htmlFor="city-1">City</label>
                                        <div className="form-control-wrap">
                                            <input type="text" className="form-control" id="City"/>
                                        </div>
                                    </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-lg-6">
                                    <div className="form-group">
                                        <label className="form-label">Communication</label>
                                        <ul className="custom-control-group g-3 align-center">
                                            <li>
                                                <div className="custom-control custom-control-sm custom-checkbox">
                                                    <input type="checkbox" className="custom-control-input" id="com-email-1"/>
                                                    <label className="custom-control-label" htmlFor="com-email-1">Email</label>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="custom-control custom-control-sm custom-checkbox">
                                                    <input type="checkbox" className="custom-control-input" id="com-sms-1"/>
                                                    <label className="custom-control-label" htmlFor="com-sms-1">SMS</label>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="custom-control custom-control-sm custom-checkbox">
                                                    <input type="checkbox" className="custom-control-input" id="com-phone-1"/>
                                                    <label className="custom-control-label" htmlFor="com-phone-1">Phone</label>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                        </div>
                        <div className="row g-4">
                            <div className="col-12 mt-3 mb-2">
                                <div className="form-group">
                                    <button type="submit" className="btn btn-lg btn-primary">Save Informations</button>
                                </div>
                            </div>

                        </div>
                    
                    </form>
                </div>
             </div>
             </div>
    )
      

    render() {
        return (
            <div className="nk-body bg-lighter npc-default has-sidebar ">
               
            <div className="nk-app-root">
        
                    <div className="nk-main"></div>
                    <Sidebar/>        
                    
                    <div className="wrap container-fluid">
                        <Header/>   
                        <div className="custom-dashboard">
                              {this.renderBody()}
                          <div className="mt-5">
                              <Footer/>
                          </div>
                        </div>
                   
                
                </div>
                </div>
            </div>
        )
    }
}

export default AddUser;