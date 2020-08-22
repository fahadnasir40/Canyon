import React, { Component } from 'react'
import Purchases from '../purchases'
import {Link} from 'react-router-dom'

class WizardFormFirstPage extends Component {

    state = {
       name: '',
       address: '',
       email: '',
       brand: '',
       phone: ''
    }

    

    render(){
      console.log("this.props",this.props)
      const { handleSubmit } = this.props.onSubmit;
        return (
            <div className="nk-content ml-5 ">
                    <div className="container-fluid">
                        <div className="nk-content-inner">
                            <div className="nk-content-body">
                                <div className="components-preview wide-md mx-auto">
                                <div class="nk-block-head nk-block-head-lg wide-sm">
                                        <div class="nk-block-head-content">
                                            <h2 class="nk-block-title fw-normal">Purchase</h2>
                                        </div>
                                    </div>
                                    <div className="nk-block nk-block-lg">
                                        <div className="card">
                                            <div className="card-inner">
                                                <div className="nk-wizard nk-wizard-simple is-alter wizard clearfix" id="steps-uid-0" >
                                                    <div className="steps clearfix">
                                                        <ul role="tablist">
                                                            <li role="tab" className="first current" aria-disabled="false" aria-selected="true"><a id="steps-uid-0-t-0" href="#steps-uid-0-h-0" aria-controls="steps-uid-0-p-0"><span className="current-info audible">current step: </span><span className="number">1.</span><h5>Supplier</h5></a></li>
                                                            <li role="tab" className="disabled" aria-disabled="true"><a id="steps-uid-0-t-1" href="#steps-uid-0-h-1" aria-controls="steps-uid-0-p-1"><span className="number">2.</span><h5>Order Detail</h5></a></li>
                                                            <li role="tab" className="disabled last" aria-disabled="true"><a id="steps-uid-0-t-2" href="#steps-uid-0-h-2" aria-controls="steps-uid-0-p-2"><span className="number">3.</span><h5>Bill Payment</h5></a></li>
                                                        </ul>
                                                    </div>
                                                    <div className="content clearfix">
                                                        <div className="nk-wizard-head title current" id="steps-uid-0-h-0" tabindex="-1"><h5>Supplier</h5></div>
                                                    <div className="nk-wizard-content body current" id="steps-uid-0-p-0" role="tabpanel" aria-labelledby="steps-uid-0-h-0" aria-hidden="false">
                                                        <div className="row gy-3">
                                                        <div className="col-md-6">
                                                                <div className="form-group">
                                                                    <label className="form-label" for="brand">Brand</label>
                                                                    <div className="form-control-wrap ">
                                                                        <div className="form-control-select">
                                                                            <select className="form-control required" data-msg="Required" id="brand" name="brand" required>
                                                                                <option value="us">Canyon</option>
                                                                                <option value="uk">Others</option>
                                                                            </select>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-6">
                                                                <div className="form-group">
                                                                    <label className="form-label" for="fw-first-name">Name</label>
                                                                    <div className="form-control-wrap">
                                                                        <input type="text" data-msg="Required" className="form-control required" id="fw-first-name" name="fw-first-name" required/>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-6">
                                                                <div className="form-group">
                                                                    <label className="form-label" for="Address">Address</label>
                                                                    <div className="form-control-wrap">
                                                                        <input type="text" data-msg="Required" className="form-control required" id="Address" name="Address" required/>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-6">
                                                                <div className="form-group">
                                                                    <label className="form-label" for="fw-email-address">Email</label>
                                                                    <div className="form-control-wrap">
                                                                        <input type="text" data-msg="Required" data-msg-email="Wrong Email" className="form-control required email" id="fw-email-address" name="fw-email-address" required/>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-6">
                                                                <div className="form-group">
                                                                    <label className="form-label" for="fw-mobile-number">Mobile Number</label>
                                                                    <div className="form-control-wrap">
                                                                        <input type="text" data-msg="Required" className="form-control required" id="fw-mobile-number" name="fw-mobile-number" required/>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                     <div className="nk-wizard-head title" id="steps-uid-0-h-1" tabindex="-1"><h5>Order Detail</h5></div>
                                                </div>
                                                <div className="actions clearfix">
                                                    <ul role="menu" aria-label="Pagination">
                                                        <li className="disabled" aria-disabled="true"><a href="#previous" role="menuitem">Prev</a></li>
                                                        {/* <li aria-hidden="false" aria-disabled="false"><a href="#next" role="menuitem">Next</a></li> */}
                                                        <li aria-hidden="false" aria-disabled="false"><button onClick={this.props.onSubmit} className="btn btn-primary" role="menuitem">Next</button></li>
                                                        {/* <li aria-hidden="true" style="display:   none;"><a href="#finish" role="menuitem">Submit</a></li> */}
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
        )}
}
export default WizardFormFirstPage