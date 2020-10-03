import React, { Component } from 'react'
import { updateUser, changePassword } from '../../../actions'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom';
import axios from 'axios'
import $ from 'jquery'
import DatePicker from 'react-datepicker';
import Moment from 'react-moment';
class ProfileContent extends Component {


    state = {
        name: '',
        role: '',
        dob: '',
        address: '',
        phone: '',
        city: '',
        error: '',
        validated: false,
        success: false,
        confirmPassword: '',
        oldPassword: '',
        newPassword: '',
        pwstatus: '',
        pwmessage: '',
        newDob: '',
        logout: false
    }

    setValidated(value) {
        this.setState({
            validated: value
        })
    }

    signOut = () => {

        let request = axios.get(`/api/logout`)
            .then(request => {
                this.setState({ logout: true })
            });
    }



    handleInputName = (event) => {
        this.setState({ name: event.target.value })
    }

    handleInputCity = (event) => {
        this.setState({ city: event.target.value })
    }
    handleInputAddress = (event) => {
        this.setState({ address: event.target.value })
    }
    handleInputPhone = (event) => {
        this.setState({ phone: event.target.value })
    }

    handleInputDob = date => {
        this.setState({
            dob: date,
            newDob: date
        });
    };

    handleInputNewPassword = (event) => {
        this.setState({ newPassword: event.target.value })
    }

    handleInputOldPassword = (event) => {
        this.setState({ oldPassword: event.target.value })
    }

    handleInputConfirmNewPassword = (event) => {
        this.setState({ confirmPassword: event.target.value })
    }


    submitForm = (event) => {

        // const form = event.currentTarget;

        event.preventDefault();

        this.setValidated(true);

        // e.preventDefault();

        this.props.dispatch(updateUser({
            id: this.state.id,
            name: this.state.name,
            dob: this.state.dob,
            address: this.state.address,
            phone: this.state.phone,
            city: this.state.city,
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

        // const form = event.currentTarget;

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
            this.setState({ pwmessage: 'Confirm password does not match with new password' })
        } else {
            // make API call        
            this.props.dispatch(changePassword({
                oldPassword: this.state.oldPassword,
                newPassword: this.state.newPassword
            }));
            this.setState({
                pwstatus: '',
                pwmessage: '',
                oldPassword: '',
                newPassword: '',
                confirmPassword: ''
            })

        };

    }


    UNSAFE_componentWillReceiveProps(nextProps) {

        if (this.props !== nextProps) {

            if (nextProps.changePassword) {
                if (!nextProps.changePassword.success) {
                    this.setState({
                        pwstatus: false,
                        pwmessage: nextProps.changePassword.message
                    })
                }
                else {
                    this.setState({
                        pwstatus: true,
                        pwmessage: nextProps.changePassword.message
                    })
                    this.signOut();
                }
            }
            if (nextProps.profile.data) {
                this.setState({
                    id: nextProps.profile.data.id,
                    email: nextProps.profile.data.email,
                    name: nextProps.profile.data.name,
                    dob: nextProps.profile.data.dob,
                    address: nextProps.profile.data.address,
                    phone: nextProps.profile.data.phone,
                    city: nextProps.profile.data.city,
                })
            }
        }


    }

    getInitials = (name) => {
        if (name) {
            var initials = name.match(/\b\w/g) || [];
            initials = ((initials.shift() || '') + (initials.pop() || '')).toUpperCase();
            return initials;
        }
    }

    showSideBar = () => {
        console.log("show")
        if (!$('#sidebarUserProfile').hasClass('content-active')) {
            console.log("Adding");
            $('#sidebarUserProfile').addClass('content-active')
        }
    }

    renderProfile = (user) => (
        <div id="container">
            <div className="nk-content ml-md-4 mt-5 ">
                <div className="container-fluid">
                    <div className="nk-content-inner">
                        <div className="nk-content-body">
                            <div className="nk-block">
                                <div className="card">
                                    <div className="card-aside-wrap">
                                        <div className="card-inner card-inner-lg">
                                            <div className="tab-content">
                                                <div className="tab-pane active" id="personalTab">
                                                    <div className="nk-block-head nk-block-head-lg">
                                                        <div className="nk-block-between">
                                                            <div className="nk-block-head-content">
                                                                <h4 className="nk-block-title">Personal Information</h4>
                                                                <div className="nk-block-des">
                                                                    <p>Basic info, like your name and address, that you use on this platform.</p>
                                                                </div>
                                                            </div>
                                                            <div className="nk-block-head-content align-self-start d-lg-none">
                                                                <a onClick={this.showSideBar} className="toggle btn btn-icon btn-trigger mt-n1" data-target="userAside"><em className="icon ni ni-menu-alt-r"></em></a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="nk-block">
                                                        <div className="nk-data data-list">
                                                            <div className="data-head">
                                                                <h6 className="overline-title">Basics</h6>
                                                            </div>
                                                            <div className="data-item" data-toggle="modal" data-target="#profile-edit">
                                                                <div className="data-col">
                                                                    <span className="data-label">Full Name</span>
                                                                    <span className="data-value">{user.name}</span>
                                                                </div>
                                                                <div className="data-col data-col-end"><span className="data-more"><em className="icon ni ni-forward-ios"></em></span></div>
                                                            </div>

                                                            <div className="data-item">
                                                                <div className="data-col">
                                                                    <span className="data-label">Email</span>
                                                                    <span className="data-value">{user.email}</span>
                                                                </div>
                                                                <div className="data-col data-col-end"><span className="data-more disable"><em className="icon ni ni-lock-alt"></em></span></div>
                                                            </div>
                                                            <div className="data-item" data-toggle="modal" data-target="#profile-edit">
                                                                <div className="data-col">
                                                                    <span className="data-label">Phone Number</span>
                                                                    <span className="data-value text-soft">{user.phone}</span>
                                                                </div>
                                                                <div className="data-col data-col-end"><span className="data-more"><em className="icon ni ni-forward-ios"></em></span></div>
                                                            </div>
                                                            <div className="data-item" data-toggle="modal" data-target="#profile-edit">
                                                                <div className="data-col">
                                                                    <span className="data-label">Date of Birth</span>
                                                                    <span className="data-value"><Moment format="DD MMMM, YYYY">{user.dob}</Moment></span>
                                                                </div>
                                                                <div className="data-col data-col-end"><span className="data-more"><em className="icon ni ni-forward-ios"></em></span></div>
                                                            </div>
                                                            <div className="data-item" data-toggle="modal" data-target="#profile-edit" data-tab-target="#address">
                                                                <div className="data-col">
                                                                    <span className="data-label">Address</span>
                                                                    <span className="data-value">{user.address},<br />{user.city}</span>
                                                                </div>
                                                                <div className="data-col data-col-end"><span className="data-more"><em className="icon ni ni-forward-ios"></em></span></div>
                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>

                                                <div className="tab-pane" id="settingsTab">
                                                    <div className="nk-block-head nk-block-head-lg">
                                                        <div className="nk-block-between">
                                                            <div className="nk-block-head-content">
                                                                <h4 className="nk-block-title">Security Settings</h4>
                                                                <div className="nk-block-des">
                                                                    <p>These settings are helps you keep your account secure.</p>
                                                                </div>
                                                            </div>
                                                            <div className="nk-block-head-content align-self-start d-lg-none">
                                                                <a onClick={this.showSideBar} className="toggle btn btn-icon btn-trigger mt-n1" data-target="userAside"><em className="icon ni ni-menu-alt-r"></em></a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="nk-block">
                                                        <div className="card">
                                                            <div className="card-inner-group">

                                                                <div className="card-inner">
                                                                    <div className="between-center flex-wrap g-3">
                                                                        <div className="nk-block-text">
                                                                            <h6>Change Password</h6>
                                                                            <p>Set a unique password to protect your account.</p>
                                                                        </div>
                                                                        <div className="nk-block-actions flex-shrink-sm-0">
                                                                            <ul className="align-center flex-wrap flex-sm-nowrap gx-3 gy-2">
                                                                                <li className="order-md-last">
                                                                                    <button data-toggle="modal" data-target="#change-password-modal" className="btn btn-primary">Change Password</button>
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
                                        <div className="card-aside card-aside-left user-aside toggle-slide toggle-slide-left toggle-break-lg" id='sidebarUserProfile' data-content="userAside" data-toggle-screen="lg" data-toggle-overlay="true">
                                            <div className="card-inner-group" data-simplebar>
                                                <div className="card-inner">
                                                    <div className="user-card">
                                                        <div className="user-avatar bg-primary">
                                                            <span>{this.getInitials(user.name)}</span>
                                                        </div>
                                                        <div className="user-info">
                                                            <span className="lead-text">{user.name}</span>
                                                            <span className="sub-text">{user.email}</span>
                                                        </div>

                                                    </div>
                                                </div>
                                                <div className="card-inner">
                                                    <div className="user-account-info py-0">
                                                        <h6 className="overline-title-alt">Role</h6>
                                                        <p className="ccap">{user.role}</p>

                                                    </div>
                                                </div>
                                                <div className="card-inner p-0">
                                                    <ul className="link-list-menu nav nav-tabs">
                                                        <li><a data-toggle="tab" href="#personalTab" className="active"><em className="icon ni ni-user-fill-c"></em><span>Personal Infomation</span></a></li>

                                                        <li><a data-toggle="tab" href="#settingsTab" ><em className="icon ni ni-lock-alt-fill"></em><span>Security Settings</span></a></li>
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
            <div className="modal fade" tabIndex="-1" role="dialog" id="profile-edit">
                <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
                    <div className="modal-content">
                        <a href="#" className="close" data-dismiss="modal"><em className="icon ni ni-cross-sm"></em></a>
                        <div className="modal-body modal-body-lg">
                            <h5 className="title">Update Profile</h5>
                            <ul className="nk-nav nav nav-tabs">
                                <li className="nav-item">
                                    <a className="nav-link active" data-toggle="tab" href="#personal-tab">Personal</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" data-toggle="tab" href="#address">Address</a>
                                </li>
                            </ul>

                            <div className="tab-content">
                                <div className="tab-pane active" id="personal-tab">
                                    <div className="row gy-4">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label className="form-label" htmlFor="full-name">Full Name</label>
                                                <input type="text" required value={this.state.name} onChange={this.handleInputName} className="form-control form-control-lg" id="full-name" placeholder="Enter Full name" />
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label className="form-label" htmlFor="phone-no">Phone Number</label>
                                                <input value={this.state.phone} onChange={this.handleInputPhone} type="phone" className="form-control form-control-lg" id="phone-no" placeholder="Phone Number" />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label className="form-label" htmlFor="birth-day">Date of Birth</label>

                                                <DatePicker
                                                    selected={this.state.newDob}
                                                    onChange={this.handleInputDob}
                                                    dateFormat={'dd-MMM-yyyy'}
                                                    className="form-control ml-2"
                                                    id="birth-day"
                                                    placeholder="Enter date of birth"
                                                />
                                            </div>
                                        </div>

                                        <div className="col-12">
                                            <ul className="align-center flex-wrap flex-sm-nowrap gx-4 gy-2">
                                                <li>
                                                    <button onClick={this.submitForm} className="btn btn-lg btn-primary">Update Profile</button>
                                                </li>
                                                <li>
                                                    <button data-dismiss="modal" className="link link-light">Cancel</button>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="tab-pane" id="address">
                                    <div className="row gy-4">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label className="form-label" htmlFor="address-l1">Address Line 1</label>
                                                <input type="text" className="form-control form-control-lg" id="address-l1" value={this.state.address} onChange={this.handleInputAddress} />
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label className="form-label" htmlFor="address-st">City</label>
                                                <input type="text" className="form-control form-control-lg" id="address-st" value={this.state.city} onChange={this.handleInputCity} />
                                            </div>
                                        </div>


                                        <div className="col-12">
                                            <ul className="align-center flex-wrap flex-sm-nowrap gx-4 gy-2">
                                                <li>
                                                    <button onClick={this.submitForm} className="btn btn-lg btn-primary">Update Address</button>
                                                </li>
                                                <li>
                                                    <button data-dismiss="modal" className="link link-light">Cancel</button>
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
            <div className="modal fade" tabIndex="-1" role="dialog" id="change-password-modal">
                <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
                    <div className="modal-content">
                        <a href="#" className="close" data-dismiss="modal"><em className="icon ni ni-cross-sm"></em></a>

                        <div className="modal-header">
                            <h5 className="modal-title">Change Password</h5>
                        </div>
                        <div className="modal-body modal-body-md">

                            <div className="row  gy-4">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label className="form-label" htmlFor="old-password">Old Password</label>
                                        <input type="password" required value={this.state.oldPassword} onChange={this.handleInputOldPassword} className="form-control form-control-lg" id="old-password" placeholder="Enter old password" />
                                    </div>
                                </div>
                            </div>

                            <div className="row mt-4 gy-4">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label className="form-label" htmlFor="new-password">New Password</label>
                                        <input required value={this.state.newPassword} onChange={this.handleInputNewPassword} type="password" className="form-control form-control-lg" id="new-password" placeholder="Enter new password" />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label className="form-label" htmlFor="confirm-password">Confirm New Password</label>
                                        <input required type="password" value={this.state.confirmPassword} onChange={this.handleInputConfirmNewPassword} className="form-control form-control-lg" id="confirm-password" placeholder="Confirm new password" />
                                    </div>
                                </div>

                                <div className="text-center text-danger ml-2">
                                    <span>{(!this.state.pwstatus) ? this.state.pwmessage : null}</span>
                                </div>

                                <div className="col-12 mt-2">
                                    <ul className="align-center flex-wrap flex-sm-nowrap gx-4 gy-2">
                                        <li>
                                            <button onClick={this.submitPasswordChange} className="btn btn-lg btn-danger">Change Password</button>
                                        </li>
                                        <li>
                                            <button data-dismiss="modal" className="link link-light">Cancel</button>
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

        if (this.state.logout === true) {
            $('body').removeClass('modal-open');
            $('#change-password-modal').hide();
            $('.modal-backdrop').remove();
            return <Redirect to={{
                pathname: '/',
                redirect: { message: this.state.pwmessage }
            }} />
        }

        return (
            user ? this.renderProfile(user) : null
        )
    }
}


function mapStateToProps(state) {

    return {
        register: state.user.profile,
        changePassword: state.user.changePassword
    }
}

export default connect(mapStateToProps)(ProfileContent)