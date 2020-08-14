import React, { Component } from 'react'
import {updateUser} from '../../../actions'
import {connect} from 'react-redux'

class ProfileContent extends Component {
    

    state ={
        name:'',
        password:'canyon123',
        role:'worker',
        dob: '',
        address: '',
        phone:'',
        city:'',
        error:'',
        validated: false,
        success: false
    }

    setValidated(value){
        this.setState({
            validated: value
        })
    }


    handleInputName = (event) => {
        this.setState({name:event.target.value})
    }
  
    handleInputCity = (event) => {
    this.setState({city:event.target.value})
    }
    handleInputAddress = (event) => {
        this.setState({address:event.target.value})
    }
    handleInputPhone = (event) => {
        this.setState({phone:event.target.value})
    }
    handleInputDob = (event) => {
        this.setState({dob:event.target.value})
    } 
    
    submitForm = (event) => {

        const form = event.currentTarget;

        event.preventDefault();
    
        this.setValidated(true);
      
        // e.preventDefault();
      
        this.props.dispatch(updateUser({
            name:this.state.name,
            dob: this.state.dob,
            address:this.state.address,
            phone:this.state.phone,
            city:this.state.city,
            
        }))
        // // perform all neccassary validations
        // if (this.state.password !== this.state.cpassword) {
        //     this.setState({error:'Passwords does not match'})
        // } else {
        //     // make API call        
        //     this.setState({error:''});
    
          
        
    }

    componentWillReceiveProps(nextProps){

        if(this.props != nextProps){
            if(nextProps.profile.data){
                this.setState({
                    email:nextProps.profile.data.email,
                    name:nextProps.profile.data.name,
                    dob:nextProps.profile.data.dob,
                    address:nextProps.profile.data.address,
                    phone:nextProps.profile.data.phone,
                    city:nextProps.profile.data.city,
                })
            }
        }
       
    
    }

    getInitials = (name) =>{
        if(name){
            var initials = name.match(/\b\w/g) || [];
            initials = ((initials.shift() || '') + (initials.pop() || '')).toUpperCase();
            return initials;
        }
    }

    
    renderProfile = (user)=>(
        <div>

        <div class="nk-content ml-4 mt-5 ">
        <div class="container-fluid">
            <div class="nk-content-inner">
                <div class="nk-content-body">
                    <div class="nk-block">
                        <div class="card">
                            <div class="card-aside-wrap">
                                <div class="card-inner card-inner-lg">
                                    <div class="tab-content">
                                        <div class="tab-pane active" id="personal">
                                            <div class="nk-block-head nk-block-head-lg">
                                                <div class="nk-block-between">
                                                    <div class="nk-block-head-content">
                                                        <h4 class="nk-block-title">Personal Information</h4>
                                                        <div class="nk-block-des">
                                                            <p>Basic info, like your name and address, that you use on this platform.</p>
                                                        </div>
                                                    </div>
                                                    <div class="nk-block-head-content align-self-start d-lg-none">
                                                        <a href="#" class="toggle btn btn-icon btn-trigger mt-n1" data-target="userAside"><em class="icon ni ni-menu-alt-r"></em></a>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="nk-block">
                                                <div class="nk-data data-list">
                                                    <div class="data-head">
                                                        <h6 class="overline-title">Basics</h6>
                                                    </div>
                                                    <div class="data-item" data-toggle="modal" data-target="#profile-edit">
                                                        <div class="data-col">
                                                            <span class="data-label">Full Name</span>
                                                                 <span class="data-value">{user.name}</span>
                                                        </div>
                                                        <div class="data-col data-col-end"><span class="data-more"><em class="icon ni ni-forward-ios"></em></span></div>
                                                    </div>
                                                  
                                                    <div class="data-item">
                                                        <div class="data-col">
                                                            <span class="data-label">Email</span>
                                                                <span class="data-value">{user.email}</span>
                                                        </div>
                                                        <div class="data-col data-col-end"><span class="data-more disable"><em class="icon ni ni-lock-alt"></em></span></div>
                                                    </div>
                                                    <div class="data-item" data-toggle="modal" data-target="#profile-edit">
                                                        <div class="data-col">
                                                            <span class="data-label">Phone Number</span>
                                                                <span class="data-value text-soft">{user.phone}</span>
                                                        </div>
                                                        <div class="data-col data-col-end"><span class="data-more"><em class="icon ni ni-forward-ios"></em></span></div>
                                                    </div>
                                                    <div class="data-item" data-toggle="modal" data-target="#profile-edit">
                                                        <div class="data-col">
                                                            <span class="data-label">Date of Birth</span>
                                                            <span class="data-value">{user.dob}</span>
                                                        </div>
                                                        <div class="data-col data-col-end"><span class="data-more"><em class="icon ni ni-forward-ios"></em></span></div>
                                                    </div>
                                                    <div class="data-item" data-toggle="modal" data-target="#profile-edit" data-tab-target="#address">
                                                        <div class="data-col">
                                                            <span class="data-label">Address</span>
                                                                <span class="data-value">{user.address},<br/>{user.city}</span>
                                                        </div>
                                                        <div class="data-col data-col-end"><span class="data-more"><em class="icon ni ni-forward-ios"></em></span></div>
                                                    </div>
                                                </div>
                                               
                                            </div>
                                        </div>
                                        <div class="tab-pane" id="notification">
                                            <div class="nk-block-head nk-block-head-lg">
                                                <div class="nk-block-between">
                                                    <div class="nk-block-head-content">
                                                        <h4 class="nk-block-title">Notification Settings</h4>
                                                        <div class="nk-block-des">
                                                            <p>You will get only notification what have enabled.</p>
                                                        </div>
                                                    </div>
                                                    <div class="nk-block-head-content align-self-start d-lg-none">
                                                        <a href="#" class="toggle btn btn-icon btn-trigger mt-n1" data-target="userAside"><em class="icon ni ni-menu-alt-r"></em></a>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="nk-block-head nk-block-head-sm">
                                                <div class="nk-block-head-content">
                                                    <h6>Security Alerts</h6>
                                                    <p>You will get only those email notification what you want.</p>
                                                </div>
                                            </div>
                                            <div class="nk-block-content">
                                                <div class="gy-3">
                                                    <div class="g-item">
                                                        <div class="custom-control custom-switch">
                                                            <input type="checkbox" class="custom-control-input" checked id="unusual-activity"/>
                                                            <label class="custom-control-label" for="unusual-activity">Email me whenever encounter unusual activity</label>
                                                        </div>
                                                    </div>
                                                    <div class="g-item">
                                                        <div class="custom-control custom-switch">
                                                            <input type="checkbox" class="custom-control-input" id="new-browser"/>
                                                            <label class="custom-control-label" for="new-browser">Email me if new browser is used to sign in</label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="nk-block-head nk-block-head-sm">
                                                <div class="nk-block-head-content">
                                                    <h6>News</h6>
                                                    <p>You will get only those email notification what you want.</p>
                                                </div>
                                            </div>
                                            <div class="nk-block-content">
                                                <div class="gy-3">
                                                    <div class="g-item">
                                                        <div class="custom-control custom-switch">
                                                            <input type="checkbox" class="custom-control-input" checked id="latest-sale"/>
                                                            <label class="custom-control-label" for="latest-sale">Notify me by email about sales and latest news</label>
                                                        </div>
                                                    </div>
                                                    <div class="g-item">
                                                        <div class="custom-control custom-switch">
                                                            <input type="checkbox" class="custom-control-input" id="feature-update"/>
                                                            <label class="custom-control-label" for="feature-update">Email me about new features and updates</label>
                                                        </div>
                                                    </div>
                                                    <div class="g-item">
                                                        <div class="custom-control custom-switch">
                                                            <input type="checkbox" class="custom-control-input" checked id="account-tips"/>
                                                            <label class="custom-control-label" for="account-tips">Email me about tips on using account</label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="tab-pane" id="settings">
                                            <div class="nk-block-head nk-block-head-lg">
                                                <div class="nk-block-between">
                                                    <div class="nk-block-head-content">
                                                        <h4 class="nk-block-title">Security Settings</h4>
                                                        <div class="nk-block-des">
                                                            <p>These settings are helps you keep your account secure.</p>
                                                        </div>
                                                    </div>
                                                    <div class="nk-block-head-content align-self-start d-lg-none">
                                                        <a href="#" class="toggle btn btn-icon btn-trigger mt-n1" data-target="userAside"><em class="icon ni ni-menu-alt-r"></em></a>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="nk-block">
                                                <div class="card">
                                                    <div class="card-inner-group">
                                                        <div class="card-inner">
                                                            <div class="between-center flex-wrap flex-md-nowrap g-3">
                                                                <div class="nk-block-text">
                                                                    <h6>Save my Activity Logs</h6>
                                                                    <p>You can save your all activity logs including unusual activity detected.</p>
                                                                </div>
                                                                <div class="nk-block-actions">
                                                                    <ul class="align-center gx-3">
                                                                        <li class="order-md-last">
                                                                            <div class="custom-control custom-switch mr-n2">
                                                                                <input type="checkbox" class="custom-control-input" checked="" id="activity-log"/>
                                                                                <label class="custom-control-label" for="activity-log"></label>
                                                                            </div>
                                                                        </li>
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="card-inner">
                                                            <div class="between-center flex-wrap g-3">
                                                                <div class="nk-block-text">
                                                                    <h6>Change Password</h6>
                                                                    <p>Set a unique password to protect your account.</p>
                                                                </div>
                                                                <div class="nk-block-actions flex-shrink-sm-0">
                                                                    <ul class="align-center flex-wrap flex-sm-nowrap gx-3 gy-2">
                                                                        <li class="order-md-last">
                                                                            <a href="#" class="btn btn-primary">Change Password</a>
                                                                        </li>
                                                                        <li>
                                                                            <em class="text-soft text-date fs-12px">Last changed: <span>Oct 2, 2019</span></em>
                                                                        </li>
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="card-inner">
                                                            <div class="between-center flex-wrap flex-md-nowrap g-3">
                                                                <div class="nk-block-text">
                                                                    <h6>2 Factor Auth &nbsp; <span class="badge badge-success ml-0">Enabled</span></h6>
                                                                    <p>Secure your account with 2FA security. When it is activated you will need to enter not only your password, but also a special code using app. You can receive this code by in mobile app. </p>
                                                                </div>
                                                                <div class="nk-block-actions">
                                                                    <a href="#" class="btn btn-primary">Disable</a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="tab-pane" id="activity">
                                            <div class="nk-block-head nk-block-head-lg">
                                                <div class="nk-block-between">
                                                    <div class="nk-block-head-content">
                                                        <h4 class="nk-block-title">Login Activity</h4>
                                                        <div class="nk-block-des">
                                                            <p>Here is your last 20 login activities log. <span class="text-soft"><em class="icon ni ni-info"></em></span></p>
                                                        </div>
                                                    </div>
                                                    <div class="nk-block-head-content align-self-start d-lg-none">
                                                        <a href="#" class="toggle btn btn-icon btn-trigger mt-n1" data-target="userAside"><em class="icon ni ni-menu-alt-r"></em></a>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="nk-block card">
                                                <table class="table table-ulogs">
                                                    <thead class="thead-light">
                                                        <tr>
                                                            <th class="tb-col-os"><span class="overline-title">Browser <span class="d-sm-none">/ IP</span></span></th>
                                                            <th class="tb-col-ip"><span class="overline-title">IP</span></th>
                                                            <th class="tb-col-time"><span class="overline-title">Time</span></th>
                                                            <th class="tb-col-action"><span class="overline-title">&nbsp;</span></th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td class="tb-col-os">Chrome on Window</td>
                                                            <td class="tb-col-ip"><span class="sub-text">192.149.122.128</span></td>
                                                            <td class="tb-col-time"><span class="sub-text">11:34 PM</span></td>
                                                            <td class="tb-col-action"></td>
                                                        </tr>
                                                        <tr>
                                                            <td class="tb-col-os">Mozilla on Window</td>
                                                            <td class="tb-col-ip"><span class="sub-text">86.188.154.225</span></td>
                                                            <td class="tb-col-time"><span class="sub-text">Nov 20, 2019 <span class="d-none d-sm-inline-block">10:34 PM</span></span></td>
                                                            <td class="tb-col-action"><a href="#" class="link-cross mr-sm-n1"><em class="icon ni ni-cross"></em></a></td>
                                                        </tr>
                                                        <tr>
                                                            <td class="tb-col-os">Chrome on iMac</td>
                                                            <td class="tb-col-ip"><span class="sub-text">192.149.122.128</span></td>
                                                            <td class="tb-col-time"><span class="sub-text">Nov 12, 2019 <span class="d-none d-sm-inline-block">08:56 PM</span></span></td>
                                                            <td class="tb-col-action"><a href="#" class="link-cross mr-sm-n1"><em class="icon ni ni-cross"></em></a></td>
                                                        </tr>
                                                        <tr>
                                                            <td class="tb-col-os">Chrome on Window</td>
                                                            <td class="tb-col-ip"><span class="sub-text">192.149.122.128</span></td>
                                                            <td class="tb-col-time"><span class="sub-text">Nov 03, 2019 <span class="d-none d-sm-inline-block">04:29 PM</span></span></td>
                                                            <td class="tb-col-action"><a href="#" class="link-cross mr-sm-n1"><em class="icon ni ni-cross"></em></a></td>
                                                        </tr>
                                                        <tr>
                                                            <td class="tb-col-os">Mozilla on Window</td>
                                                            <td class="tb-col-ip"><span class="sub-text">86.188.154.225</span></td>
                                                            <td class="tb-col-time"><span class="sub-text">Oct 29, 2019 <span class="d-none d-sm-inline-block">09:38 AM</span></span></td>
                                                            <td class="tb-col-action"><a href="#" class="link-cross mr-sm-n1"><em class="icon ni ni-cross"></em></a></td>
                                                        </tr>
                                                        <tr>
                                                            <td class="tb-col-os">Chrome on iMac</td>
                                                            <td class="tb-col-ip"><span class="sub-text">192.149.122.128</span></td>
                                                            <td class="tb-col-time"><span class="sub-text">Oct 23, 2019 <span class="d-none d-sm-inline-block">04:16 PM</span></span></td>
                                                            <td class="tb-col-action"><a href="#" class="link-cross mr-sm-n1"><em class="icon ni ni-cross"></em></a></td>
                                                        </tr>
                                                        <tr>
                                                            <td class="tb-col-os">Chrome on Window</td>
                                                            <td class="tb-col-ip"><span class="sub-text">192.149.122.128</span></td>
                                                            <td class="tb-col-time"><span class="sub-text">Oct 15, 2019 <span class="d-none d-sm-inline-block">11:41 PM</span></span></td>
                                                            <td class="tb-col-action"><a href="#" class="link-cross mr-sm-n1"><em class="icon ni ni-cross"></em></a></td>
                                                        </tr>
                                                        <tr>
                                                            <td class="tb-col-os">Mozilla on Window</td>
                                                            <td class="tb-col-ip"><span class="sub-text">86.188.154.225</span></td>
                                                            <td class="tb-col-time"><span class="sub-text">Oct 13, 2019 <span class="d-none d-sm-inline-block">05:43 AM</span></span></td>
                                                            <td class="tb-col-action"><a href="#" class="link-cross mr-sm-n1"><em class="icon ni ni-cross"></em></a></td>
                                                        </tr>
                                                        <tr>
                                                            <td class="tb-col-os">Chrome on iMac</td>
                                                            <td class="tb-col-ip"><span class="sub-text">192.149.122.128</span></td>
                                                            <td class="tb-col-time"><span class="sub-text">Oct 03, 2019 <span class="d-none d-sm-inline-block">04:12 AM</span></span></td>
                                                            <td class="tb-col-action"><a href="#" class="link-cross mr-sm-n1"><em class="icon ni ni-cross"></em></a></td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="card-aside card-aside-left user-aside toggle-slide toggle-slide-left toggle-break-lg" data-content="userAside" data-toggle-screen="lg" data-toggle-overlay="true">
                                    <div class="card-inner-group" data-simplebar>
                                        <div class="card-inner">
                                            <div class="user-card">
                                                <div class="user-avatar bg-primary">
                                                    <span>{this.getInitials(user.name)}</span>
                                                </div>
                                                <div class="user-info">
                                                    <span class="lead-text">{user.name}</span>
                                                    <span class="sub-text">{user.email}</span>
                                                </div>
                                                <div class="user-action">
                                                    <div class="dropdown">
                                                        <a class="btn btn-icon btn-trigger mr-n2" data-toggle="dropdown" href="#"><em class="icon ni ni-more-v"></em></a>
                                                        <div class="dropdown-menu dropdown-menu-right">
                                                            <ul class="link-list-opt no-bdr">
                                                                <li><a href="#"><em class="icon ni ni-camera-fill"></em><span>Change Photo</span></a></li>
                                                                <li><a href="#"><em class="icon ni ni-edit-fill"></em><span>Update Profile</span></a></li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="card-inner">
                                            <div class="user-account-info py-0">
                                                <h6 class="overline-title-alt">Role</h6>
                                                <p className="ccap">{user.role}</p>
                                                
                                            </div>
                                        </div>
                                        <div class="card-inner p-0">
                                            <ul class="link-list-menu nav nav-tabs">
                                                <li><a data-toggle="tab" href="#personal" class="active" href="#"><em class="icon ni ni-user-fill-c"></em><span>Personal Infomation</span></a></li>
                                                <li><a data-toggle="tab" href="#notification" href="#"><em class="icon ni ni-bell-fill"></em><span>Notifications</span></a></li>
                                                <li><a data-toggle="tab" href="#settings" href="#"><em class="icon ni ni-lock-alt-fill"></em><span>Security Settings</span></a></li>
                                                <li><a data-toggle="tab" href="#activity" href="#"><em class="icon ni ni-activity-round-fill"></em><span>Account Activity</span></a></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    {/* <!-- @@ Profile Edit Modal @e --> */}
    <div class="modal fade" tabindex="-1" role="dialog" id="profile-edit">
        <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
            <div class="modal-content">
                <a href="#" class="close" data-dismiss="modal"><em class="icon ni ni-cross-sm"></em></a>
                <div class="modal-body modal-body-lg">
                    <h5 class="title">Update Profile</h5>
                    <ul class="nk-nav nav nav-tabs">
                        <li class="nav-item">
                            <a class="nav-link active" data-toggle="tab" href="#personalTab">Personal</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" data-toggle="tab" href="#address">Address</a>
                        </li>
                    </ul>
    
                    <div class="tab-content">
                        <div class="tab-pane active" id="personalTab">
                            <div class="row gy-4">
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label class="form-label" for="full-name">Full Name</label>
                                        <input type="text" required value={this.state.name} onChange={this.handleInputName} class="form-control form-control-lg" id="full-name"  placeholder="Enter Full name"/>
                                    </div>
                                </div>
                                
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label class="form-label" for="phone-no">Phone Number</label>
                                        <input value={this.state.phone} onChange={this.handleInputPhone} type="text" class="form-control form-control-lg" id="phone-no" placeholder="Phone Number"/>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label class="form-label" for="birth-day">Date of Birth</label>
                                        <input type="text" value={this.state.dob} onChange={this.handleInputDob} class="form-control form-control-lg date-picker" id="birth-day" placeholder="Enter your name"/>
                                    </div>
                                </div>
                              
                                <div class="col-12">
                                    <ul class="align-center flex-wrap flex-sm-nowrap gx-4 gy-2">
                                        <li>
                                            <button onClick={this.submitForm} class="btn btn-lg btn-primary">Update Profile</button>
                                        </li>
                                        <li>
                                            <button  data-dismiss="modal" class="link link-light">Cancel</button>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="tab-pane" id="address">
                            <div class="row gy-4">
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label class="form-label" for="address-l1">Address Line 1</label>
                                        <input type="text" class="form-control form-control-lg" id="address-l1" value={this.state.address} onChange={this.handleInputAddress}/>
                                    </div>
                                </div>
                              
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label class="form-label" for="address-st">City</label>
                                        <input type="text" class="form-control form-control-lg" id="address-st"value={this.state.city} onChange={this.handleInputCity}/>
                                    </div>
                                </div>
                              
                                <div class="col-12">
                                    <ul class="align-center flex-wrap flex-sm-nowrap gx-4 gy-2">
                                        <li>
                                            <button onClick={this.submitForm} class="btn btn-lg btn-primary">Update Address</button>
                                        </li>
                                        <li>
                                            <button data-dismiss="modal" class="link link-light">Cancel</button>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    </div>

    
    )

    render() {
        let user = this.props.profile.data;

      return (
            user? this.renderProfile(user): null
        )
    }
}


function mapStateToProps(state){
    return{
        register: state.user.profile
    }
  }
  
  export default connect(mapStateToProps)(ProfileContent)