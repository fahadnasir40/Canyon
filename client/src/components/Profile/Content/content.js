import React, { Component } from 'react'
import {updateUser,clearProfile} from '../../../actions'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom';

class ProfileContent extends Component {
    

    state ={
        name:'',
        role:'',
        dob: '',
        address: '',
        phone:'',
        city:'',
        error:'',
        validated: false,
        success: false,
        confirmPassword: '',
        oldPassword: '',
        newPassword: '',
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
    
    handleInputNewPassword = (event) => {
        this.setState({newPassword:event.target.value})
    }  
    
    handleInputOldPassword = (event) => {
        this.setState({oldPassword:event.target.value})
    }   
    
    handleInputConfirmNewPassword = (event) => {
        this.setState({confirmPassword:event.target.value})
    } 


    submitForm = (event) => {

        const form = event.currentTarget;

        event.preventDefault();
    
        this.setValidated(true);
      
        // e.preventDefault();
      
        this.props.dispatch(updateUser({
            id:this.state.id,
            name:this.state.name,
            dob: this.state.dob,
            address:this.state.address,
            phone:this.state.phone,
            city:this.state.city,
        }))

        window.location.reload(false);
        // // perform all neccassary validations
        // if (this.state.password !== this.state.cpassword) {
        //     this.setState({error:'Passwords does not match'})
        // } else {
        //     // make API call        
        //     this.setState({error:''});
    
          
        
    }

    submitPasswordChange = (event) => {

        const form = event.currentTarget;

        event.preventDefault();
    
        // this.setValidated(true);
      
        // e.preventDefault();
      
        // this.props.dispatch(updateUser({
        //     id:this.state.id,
        //     name:this.state.name,
        //     dob: this.state.dob,
        //     address:this.state.address,
        //     phone:this.state.phone,
        //     city:this.state.city,
        // }))

        // window.location.reload(false);
        // perform all neccassary validations
        if (this.state.newPassword !== this.state.confirmPassword) {
            this.setState({error:'Confirm password does not match with new password'})
        } else {
            // make API call        
            this.setState({error:''})
        };
    
          
        
    }


    componentWillReceiveProps(nextProps){

        if(this.props != nextProps){
            if(nextProps.profile.data.success){
               
            }
            if(nextProps.profile.data){
                this.setState({
                    id:nextProps.profile.data.id,
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
                                        <div class="tab-pane active" id="personalTab">
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
            
                                        <div class="tab-pane" id="settingsTab">
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
                                                            <div class="between-center flex-wrap g-3">
                                                                <div class="nk-block-text">
                                                                    <h6>Change Password</h6>
                                                                    <p>Set a unique password to protect your account.</p>
                                                                </div>
                                                                <div class="nk-block-actions flex-shrink-sm-0">
                                                                    <ul class="align-center flex-wrap flex-sm-nowrap gx-3 gy-2">
                                                                        <li class="order-md-last">
                                                                            <button   data-toggle="modal" data-target="#change-password-modal" class="btn btn-primary">Change Password</button>
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
                                                <li><a data-toggle="tab" href="#personalTab" class="active"><em class="icon ni ni-user-fill-c"></em><span>Personal Infomation</span></a></li>
                                        
                                                <li><a data-toggle="tab" href="#settingsTab" ><em class="icon ni ni-lock-alt-fill"></em><span>Security Settings</span></a></li>
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
                            <a class="nav-link active" data-toggle="tab" href="#personal-tab">Personal</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" data-toggle="tab" href="#address">Address</a>
                        </li>
                    </ul>
    
                    <div class="tab-content">
                        <div class="tab-pane active" id="personal-tab">
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
                                        <input value={this.state.phone} onChange={this.handleInputPhone} type="phone" class="form-control form-control-lg" id="phone-no" placeholder="Phone Number"/>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label class="form-label" for="birth-day">Date of Birth</label>
                                        <input type="date" value={this.state.dob} onChange={this.handleInputDob} class="form-control form-control-lg date-picker" id="birth-day" placeholder="Enter your name"/>
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

        {/* <!-- @@ Change Password Modal @e --> */}
        <div class="modal fade" tabindex="-1" role="dialog" id="change-password-modal">
        <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
            <div class="modal-content">
                <a href="#" class="close" data-dismiss="modal"><em class="icon ni ni-cross-sm"></em></a>
                <div class="modal-body modal-body-lg">
                    <h5 class="title">Change Password</h5>
                  
                        <div class="row mt-4 gy-4">
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label class="form-label" for="old-password">Old Password</label>
                                        <input type="password" required value={this.state.oldPassword} onChange={this.handleInputOldPassword} class="form-control form-control-lg" id="old-password"  placeholder="Enter old password"/>
                                    </div>
                                </div>
                         </div>
                         
                         <div class="row mt-4 gy-4">
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label class="form-label" for="new-password">New Password</label>
                                        <input required value={this.state.newPassword} onChange={this.handleInputNewPassword} type="password" class="form-control form-control-lg" id="new-password" placeholder="Enter new password"/>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label class="form-label" for="birth-day">Confirm New Password</label>
                                        <input required type="password" value={this.state.confirmPassword} onChange={this.handleInputConfirmNewPassword} class="form-control form-control-lg date-picker" id="birth-day" placeholder="Confirm new password"/>
                                    </div>
                                </div>
                              
                              <div className="text-center text-danger ml-2">
                                  <span>{this.state.error}</span>
                              </div>

                                <div class="col-12 mt-2">
                                    <ul class="align-center flex-wrap flex-sm-nowrap gx-4 gy-2">
                                        <li>
                                            <button onClick={this.submitPasswordChange} class="btn btn-lg btn-danger">Change Password</button>
                                        </li>
                                        <li>
                                            <button  data-dismiss="modal" class="link link-light">Cancel</button>
                                        </li>
                                    </ul>
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