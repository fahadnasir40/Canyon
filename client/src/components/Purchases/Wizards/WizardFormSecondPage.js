import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import Purchases from '../purchases'

class WizardFormSecondPage extends Component {

    render(){
      const handleSubmit = this.props.onSubmit;
      const previousPage = this.props.previousPage;

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
                                                <form  className="nk-wizard nk-wizard-simple is-alter wizard clearfix" role="application" id="steps-uid-0" novalidate="novalidate" >
                                                    <div className="steps clearfix">
                                                        <ul role="tablist">
                                                            <li role="tab" className="disabled first" aria-disabled="true" ><span className="number">1.</span><h5>Supplier</h5></li>
                                                            <li role="tab" className="second current" aria-disabled="true" aria-selected="true"><span className="current-info audible">current step: </span><span className="number">2.</span><h5>Order Detail</h5></li>
                                                            <li role="tab" className="disabled last" aria-disabled="true"><span className="number">3.</span><h5>Bill Payment</h5></li>
                                                        </ul>
                                                    </div>
                                                    <div className="content clearfix">
                                                    <div className="nk-wizard-content body current" id="steps-uid-0-p-0" role="tabpanel" aria-labelledby="steps-uid-0-h-0" aria-hidden="false"></div>
                                                     <div className="nk-wizard-head title" id="steps-uid-0-h-1" tabindex="-1"><h5>Order Detail</h5></div>
                                                     <div className="nk-wizard-content body" id="steps-uid-0-p-1" role="tabpanel" aria-labelledby="steps-uid-0-h-1" aria-hidden="true" >
                                                        <div className="row gy-3">
                                                            <div className="col-md-6">
                                                                <div className="form-group">
                                                                    <label className="form-label" for="fw-username">Username</label>
                                                                    <div className="form-control-wrap">
                                                                        <input type="text" data-msg="Required" className="form-control required" id="fw-username" name="fw-username" required=""/>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="row gy-3">
                                                            <div className="col-md-6">
                                                                <div className="form-group">
                                                                    <label className="form-label" for="fw-password">Password</label>
                                                                    <div className="form-control-wrap">
                                                                        <input type="password" data-msg="Required" className="form-control required" id="fw-password" name="fw-password" required=""/>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-6">
                                                                <div className="form-group">
                                                                    <label className="form-label" for="fw-re-password">Re-Password</label>
                                                                    <div className="form-control-wrap">
                                                                        <input type="password" data-msg="Required" className="form-control required" id="fw-re-password" name="fw-re-password" required=""/>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    
                                                </div>
                                                <div className="actions clearfix">
                                                    <ul role="menu" aria-label="Pagination">
                                                       
                                                        <li aria-hidden="false" aria-disabled="false"><button className="btn btn-primary " onClick={handleSubmit} role="menuitem">Next</button></li>
                                                        <li  aria-disabled="false"><button  className="btn " onClick={previousPage} role="menuitem">Prev</button></li>
                                                        {/* <li aria-hidden="true" style="display: none;"><a href="#finish" role="menuitem">Submit</a></li> */}
                                                    </ul>
                                                </div> 
                                                </form>
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

export default WizardFormSecondPage