import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import Purchases from '../purchases'

class WizardFormThirdPage extends Component {

    render(){
      const { handleSubmit, pristine, previousPage, submitting } = this.props
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
                                                <form action="#" className="nk-wizard nk-wizard-simple is-alter wizard clearfix" role="application" id="steps-uid-0" novalidate="novalidate">
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
                                                                            <select className="form-control required" data-msg="Required" id="brand" name="brand" required="">
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
                                                                        <input type="text" data-msg="Required" className="form-control required" id="fw-first-name" name="fw-first-name" required=""/>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-6">
                                                                <div className="form-group">
                                                                    <label className="form-label" for="Address">Address</label>
                                                                    <div className="form-control-wrap">
                                                                        <input type="text" data-msg="Required" className="form-control required" id="Address" name="Address" required=""/>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-6">
                                                                <div className="form-group">
                                                                    <label className="form-label" for="fw-email-address">Email</label>
                                                                    <div className="form-control-wrap">
                                                                        <input type="text" data-msg="Required" data-msg-email="Wrong Email" className="form-control required email" id="fw-email-address" name="fw-email-address" required=""/>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-6">
                                                                <div className="form-group">
                                                                    <label className="form-label" for="fw-mobile-number">Mobile Number</label>
                                                                    <div className="form-control-wrap">
                                                                        <input type="text" data-msg="Required" className="form-control required" id="fw-mobile-number" name="fw-mobile-number" required=""/>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                     <div className="nk-wizard-head title" id="steps-uid-0-h-1" tabindex="-1"><h5>Order Detail</h5></div>
                                                    {/* <div className="nk-wizard-content body" id="steps-uid-0-p-1" role="tabpanel" aria-labelledby="steps-uid-0-h-1" aria-hidden="true" style="display: none;">
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
                                                        {/* <div className="row gy-3">
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
                                                            <div className="col-md-12">
                                                                <div className="custom-control custom-checkbox">
                                                                    <input type="checkbox" data-msg="Required" className="custom-control-input required" name="fw-policy" id="fw-policy" required=""/>
                                                                    <label className="custom-control-label" for="fw-policy">I agreed Terms and policy</label>
                                                                </div>
                                                            </div>
                                                        </div> */}
                                                    {/* </div> */}
                                                    <div className="nk-wizard-head title" id="steps-uid-0-h-2" tabindex="-1"><h5>Bill Payment</h5></div>
                                                    {/* <div className="nk-wizard-content body" id="steps-uid-0-p-2" role="tabpanel" aria-labelledby="steps-uid-0-h-2" aria-hidden="true" style="display: none;">
                                                        <div className="row gy-2">
                                                            <div className="col-md-12">
                                                                <div className="form-group">
                                                                    <label className="form-label" for="fw-token-address">Token Address</label>
                                                                    <div className="form-control-wrap">
                                                                        <input type="text" data-msg="Required" className="form-control required" id="fw-token-address" name="fw-token-address" required=""/>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-12">
                                                                <label className="form-label">I want to contribute</label>
                                                                <ul className="d-flex flex-wrap g-2">
                                                                    <li>
                                                                        <div className="custom-control custom-radio">
                                                                            <input type="radio" data-msg="Required" className="custom-control-input required" name="fw-ethcount" id="fw-lt1eth" required=""/>
                                                                            <label className="custom-control-label" for="fw-lt1eth">Less than 1 ETH</label>
                                                                        </div>
                                                                    </li>
                                                                    <li>
                                                                        <div className="custom-control custom-radio">
                                                                            <input type="radio" data-msg="Required" className="custom-control-input required" name="fw-ethcount" id="fw-ov1eth" required=""/>
                                                                            <label className="custom-control-label" for="fw-ov1eth">Over than 1 ETH</label>
                                                                        </div>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                            <div className="col-md-6">
                                                                <div className="form-group">
                                                                    <label className="form-label" for="fw-telegram-username">Telegram Username</label>
                                                                    <div className="form-control-wrap">
                                                                        <input type="text" data-msg="Required" className="form-control required" id="fw-telegram-username" name="fw-telegram-username" required=""/>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div> */}
                                                </div>
                                                <div className="actions clearfix">
                                                    <ul role="menu" aria-label="Pagination">
                                                        <li className="disabled" aria-disabled="true"><a href="#previous" role="menuitem" onClick={previousPage}>Prev</a></li>
                                                        {/* <li aria-hidden="false" aria-disabled="false"><a href="#next" role="menuitem">Next</a></li> */}
                                                        <li aria-hidden="true" style="display: none;"><a href="#finish" role="menuitem" disabled={pristine || submitting}>Submit</a></li>
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

export default WizardFormThirdPage





// import React from 'react'
// // import { Field, reduxForm } from 'redux-form'
// // import validate from './validate'
// const colors = ['Red', 'Orange', 'Yellow', 'Green', 'Blue', 'Indigo', 'Violet']

// const renderColorSelector = ({ input, meta: { touched, error } }) => (
//   <div>
//     <select {...input}>
//       <option value="">Select a color...</option>
//       {colors.map(val => (
//         <option value={val} key={val}>
//           {val}
//         </option>
//       ))}
//     </select>
//     {touched && error && <span>{error}</span>}
//   </div>
// )

// const WizardFormThirdPage = props => {
//   const { handleSubmit, pristine, previousPage, submitting } = props
//   return (
//     <form onSubmit={handleSubmit}>
//       <div>
//         <label>Favorite Color</label>
//         <Field name="favoriteColor" component={renderColorSelector} />
//       </div>
//       <div>
//         <label htmlFor="employed">Employed</label>
//         <div>
//           <Field
//             name="employed"
//             id="employed"
//             component="input"
//             type="checkbox"
//           />
//         </div>
//       </div>
//       <div>
//         <label>Notes</label>
//         <div>
//           <Field name="notes" component="textarea" placeholder="Notes" />
//         </div>
//       </div>
//       <div>
//         <button type="button" className="previous" onClick={previousPage}>
//           Previous
//         </button>
//         <button type="submit" disabled={pristine || submitting}>
//           Submit
//         </button>
//       </div>
//     </form>
//   )
// }


// export default WizardFormThirdPage
// // export default reduxForm({
// //   form: 'wizard', //Form name is same
// //   destroyOnUnmount: false,
// //   forceUnregisterOnUnmount: true // <------ unregister fields on unmount
// //   // validate
// // })(WizardFormThirdPage)