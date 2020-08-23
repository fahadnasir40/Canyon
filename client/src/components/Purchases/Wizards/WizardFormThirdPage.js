import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import Purchases from '../purchases'
import Swal from 'sweetalert2'

class WizardFormThirdPage extends Component {

    paymentAlert = () =>{
    
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
              confirmButton: 'btn btn-success',
              cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false
          })
          
          swalWithBootstrapButtons.fire({
            title: 'Are you sure?',
            text: "Are you Sure to Save Payment!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes!',
            cancelButtonText: 'No!',
            reverseButtons: true
          }).then((result) => {
            if (result.value) {
              swalWithBootstrapButtons.fire(
                'Paid!',
                'Payment made and Saved',
                'success'
              )
            } else if (
              /* Read more about handling dismissals below */
              result.dismiss === Swal.DismissReason.cancel
            ) {
              swalWithBootstrapButtons.fire(
                'Unapid',
                'No payment saved :)',
                'error'
              )
            }
          })    
    }


    render(){
      // const { handleSubmit, pristine, previousPage, submitting } = this.props
      
      const handleSubmit = this.props.onSubmit;
      const previousPage = this.props.previousPage;
      const onSubmit = this.props.onSubmit;

      return (
        <div className="nk-content ml-5">
        <div className="container-fluid">
            <div className="nk-content-inner">
                <div className="nk-content-body">
                    <div className="components-preview wide-md mx-auto">
                        <div className="nk-block-head nk-block-head-lg wide-sm"></div>
                        <div className="nk-block nk-block-lg">
                            <div className="nk-block-head">
                                <div className="nk-block-head-content">
                                    <h3 className="nk-block-title">Payment Detail</h3>
                                    <ul class="nk-block-tools-opt">
                                </ul>
                                </div>
                            </div>
                            <div className="nk-block-head">
                                <div className="nk-block-head-content">
                                    <h5 className="nk-block-title">Purchase Summary</h5>
                                    <ul class="nk-block-tools-opt">
                                </ul>
                                </div>
                            </div>
                            <div className="card card-preview">
                            <table className="table table-tranx">
                                            <thead>
                                                <tr className="tb-tnx-head">
                                                    <th className="tb-tnx-id"><span className="">Line#</span></th>
                                                    <span className="tb-tnx-date d-md-inline-block d-none">
                                                            <span className="d-md-none">Date</span>
                                                        </span>
                                                    <th className="tb-tnx-info">
                                                        <span className="tb-tnx-desc d-none d-sm-inline-block">
                                                            <span>Item</span>
                                                        </span>
                                                    </th>
                                                    <th className="tb-tnx-info">
                                                        <span className="tb-tnx-desc d-none d-sm-inline-block">
                                                            <span>UOM</span>
                                                        </span>
                                                    </th>
                                                    <th className="tb-tnx-info">
                                                        <span className="tb-tnx-desc d-none d-sm-inline-block">
                                                            <span>Quantity</span>
                                                        </span>
                                                    </th>
                                                    <th className="tb-tnx-info">
                                                        <span className="tb-tnx-desc d-none d-sm-inline-block">
                                                            <span>Price</span>
                                                        </span>
                                                    </th>
                                                    <th className="tb-tnx-info">
                                                        <span className="tb-tnx-desc d-none d-sm-inline-block">
                                                            <span>Discount</span>
                                                        </span>
                                                    </th>
                                                    <th className="tb-tnx-info">
                                                        <span className="tb-tnx-desc d-none d-sm-inline-block">
                                                            <span>Amount</span>
                                                        </span>
                                                    </th>
                                                    <th className="tb-tnx-action">
                                                        <span>&nbsp;</span>
                                                    </th>
                                                </tr>
                                            </thead>
                                        </table>
                            </div>
                            <div className="actions clearfix">
                                <ul role="menu" aria-label="Pagination">
                                    <li aria-disabled="false"><button className="btn " onClick={previousPage} role="menuitem">Prev</button></li>
                                    <li aria-hidden="false" aria-disabled="false"><button onClick={this.paymentAlert} className="btn btn-primary" role="menuitem">Save and Print</button></li>
                                </ul>
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