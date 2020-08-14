import React, { Component } from 'react'
import Sidebar from '../../Sidebar/sidebar'
import Header from './../../Header/header'
import Footer from '../../Footer/footer'
import { userRegister } from '../../../actions';
import { connect } from 'react-redux';
import {Redirect} from 'react-router-dom';

class AddUser extends Component {

    
    state ={
        name:'',
        email:'',
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

    handleInputEmail = (event) => {
        this.setState({email:event.target.value})
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
    
    handleInputRole = (event) => {
        this.setState({role:event.target.value})
    } 

    submitForm = (event) => {

        const form = event.currentTarget;

        event.preventDefault();
    
        this.setValidated(true);
      
        // e.preventDefault();
      
        this.props.dispatch(userRegister({
            email:this.state.email,
            password:this.state.password,
            name:this.state.name,
            role:this.state.role,
            // dob: this.state.dob,
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
    
          
        // }
    }


   

    renderBody = ()=> (
            <div className="container mt-5">
            <div className="card">
                <div className="card-inner">
                    <div className="card-head mt-1">
                         <h4 className="ff-base fw-medium">
                             Add User
                        </h4>
                    </div>
                    <form  className="form-validate"  onSubmit={this.submitForm}>
                        <div className="row g-4">
                            <div className="col-lg-4">
                                <div className="form-group">
                                    <label className="form-label" htmlFor="full-name-1">Full Name</label>
                                    <div className="form-control-wrap">
                                        <input type="text" required  value={this.state.name} onChange={this.handleInputName} className="form-control" id="full-name-1"/>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4">
                                <div className="form-group">
                                    <label className="form-label" htmlFor="email-address-1">Email address</label>
                                    <div className="form-control-wrap">
                                        <input type="email" required value={this.state.email} onChange={this.handleInputEmail} className="form-control" id="email-address-1"/>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="row g-4">
              
                        <div className="col-lg-4">
                            <div class="form-group">
                                <label class="form-label">Date of Birth</label>
                                <div class="form-control-wrap">
                                   
                                    <input type="date" value={this.state.dob}   onFocus={this.handleInputDob}
                                          onChange={this.handleInputDob} class="form-control date-picker" data-date-format="dd-mm-yyyy"/>
                                </div>
                                <div class="form-note">Date format <code>dd-mm-yyyy</code></div>
                            </div>

                            </div>

                            <div className="col-lg-4">
                            <div className="form-group">
                                <label className="form-label">Role</label>
                                    <div className="form-control-wrap ">
                                        <select required onChange={this.handleInputRole}  className="form-control form-control-md">
                                            <option  value="worker">Worker</option>
                                            <option value="adminsitrator">Administrator</option>
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
                                        <input required type="phone" value={this.state.phone} onChange={this.handleInputPhone} className="form-control" id="phone-no-1"/>
                                    </div>
                                </div>
                            </div>
                           
                        </div>

                        <div className="row g-4">
                     
                        </div>

                        <div  className="row g-4">
                          <div className="col-lg-4">
                                    <div className="form-group">
                                        <label className="form-label" htmlFor="address-line-1">Address</label>
                                        <div className="form-control-wrap">
                                            <input type="text" value={this.state.address} onChange={this.handleInputAddress} className="form-control" id="address-line-1"/>
                                        </div>
                                    </div>
                            </div>
                        </div>
                        <div  className="row g-4">
                          <div className="col-lg-4">
                                    <div className="form-group">
                                        <label className="form-label" htmlFor="city-1">City</label>
                                        <div className="form-control-wrap">
                                            <input type="text" value={this.state.city} onChange={this.handleInputCity}className="form-control" id="City"/>
                                        </div>
                                    </div>
                            </div>
                        </div>

                        <div className="row mt-4">
                            <div className="col-lg-4">
                                    <div className="form-group">
                                      
                                        <ul className="custom-control-group g-3 align-center">
                                            <li>
                                                <div className="custom-control custom-control-sm custom-checkbox">
                                                    <input type="checkbox" checked  className="custom-control-input" id="com-password-1"/>
                                                    <label className="custom-control-label" htmlFor="com-password-1">Use Default Password</label>
                                                </div>
                                            </li>
                                          
                                        </ul>
                                    </div>
                                </div>
                        </div>
                        <div className="row g-4">
                            <div className="col-12 mt-4 mb-2">
                                <div className="form-group">
                                    <button type="submit" className="btn btn-lg btn-primary">Save Informations</button>
                                </div>
                            </div>

                        </div>
                    </form>

                    <div className="text-danger  mt-2">
                        {this.state.error ? 
                            <span className="ff-bold"><strong>{this.state.error}</strong></span>
                        :null}
                    </div>
                </div>
             </div>
             </div>
    )
      
    componentDidUpdate(prevProps){
        if(this.props != prevProps){
            if(this.props.user){
                if(this.props.user.success == false){
                    this.setState({error:'Error registering the account.'})
                }
            }
        }
    }

    render() {

        if(this.props.user.success){
            return <Redirect
            to={{
                pathname: "/users",
                // state: { registerToast: this.state.success}
            }}
         />
        }

        return (
            <div className="nk-body bg-lighter npc-default has-sidebar ">
               
            <div className="nk-app-root">
                    <div className="nk-main"></div>
                    <Sidebar/>        
                    
                    <div className="wrap container-fluid">
                        <Header user = {this.props.user}/>   
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

function mapStateToProps(state){

    return{
        user:state.user
    }
  }
  
  export default connect(mapStateToProps)(AddUser)