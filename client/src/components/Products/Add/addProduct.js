import React, { Component } from "react";
import Header from "../../Header/header";
import Sidebar from "../../Sidebar/sidebar";
import Footer from "../../Footer/footer";
import { saveProduct, clearProduct } from '../../../actions';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'


class AddProduct extends Component {

    state = {
        name: '',
        sku: '',
        uom: 'Pcs',
        brand: 'canyon',
        seal: '',
        wrapper: '',
        others: '',
        security: '',
        flatRate: '',
        redirect: false,
        error: ''
    }

      static getDerivedStateFromProps(nextProps, prevState) {
         
        if (nextProps.addProduct) {
          if (nextProps.addProduct.post === true) {
            return {
              redirect: true
            }
          }
          else if (nextProps.addProduct.post === false) {
            return {
              error: 'Error adding the product.'
            }
          }
        }

        return null;
      }

    componentWillUnmount() {
         this.props.dispatch(clearProduct());
    }


    handleInputName = (event) => {
        this.setState({ name: event.target.value })
    }


    handleInputSku = (event) => {
        this.setState({ sku: event.target.value })
    }


    handleInputUom = (event) => {
        this.setState({ uom: event.target.value })
    }

    handleInputSeal = (event) => {
        let value = Number(event.target.value);
        if (value >= 0)
            this.setState({ seal: event.target.value })
    }

    handleInputWrapper = (event) => {
        let value = Number(event.target.value);
        if (value >= 0)
            this.setState({ wrapper: event.target.value })
    }

    handleInputSecurity = (event) => {
        let value = Number(event.target.value);
        if (value >= 0)
            this.setState({ security: event.target.value })
    }

    handleInputFlatRate = (event) => {
        let value = Number(event.target.value);
        if (value >= 0)
            this.setState({ flatRate: event.target.value })
    }

    handleInputOthers = (event) => {
        let value = Number(event.target.value);
        if (value >= 0)
            this.setState({ others: event.target.value })
    }

    handleInputBrand = (event) => {
        this.setState({ brand: event.target.value })
    }

    submitForm = (event) => {

        const form = event.currentTarget;

        event.preventDefault();

        this.props.dispatch(saveProduct({
          name: this.state.name,
          brand: this.state.brand,
          sku: this.state.sku,
          uom: this.state.uom,
          price:{
              cost_seal: this.state.seal,
              cost_wrapper: this.state.wrapper,
              cost_others: this.state.others,
              cost_flatRate: this.state.flatRate,
              cost_security: this.state.security
          },
          addedBy: this.props.user.login.id
        }))
    }

    calculateTotal = (total) =>{
    
        total = Number(this.state.wrapper) + Number(this.state.seal) + Number(this.state.others);
        if(!total)
            return 0;
        return total;
    }


    renderBody = (total) => {
        return (
            <div className="container mt-5">
                <div className="card ml-3">
                    <div className="card-inner">
                        <div className="card-head mt-1">
                            <h4 className="ff-base fw-medium">Add Product</h4>
                        </div>
                        <form className="form-validate">
                            <div className="row g-4">
                                <div className="col-lg-4">
                                    <div className="form-group">
                                        <label className="form-label" htmlFor="full-name-1">
                                            Product Title
                                        </label>
                                        <div className="form-control-wrap">
                                            <input
                                                type="text"
                                                value={this.state.name}
                                                onChange={this.handleInputName}
                                                className="form-control"
                                                id="full-name-1"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4">
                                    <div className="form-group">
                                        <label className="form-label" htmlFor="brand">
                                            Brand
                                         </label>
                                        <div className="form-control-wrap ">
                                            <div className="form-control-select">
                                                <select required onChange={this.handleInputBrand} className="form-control" id="brand">
                                                    <option value="canyon">Canyon</option>
                                                    <option value="others">Others</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="row g-4">
                                <div className="col-lg-4">
                                    <div className="form-group">
                                        <label className="form-label" htmlFor="sku">
                                            Item Code (SKU)
                                        </label>
                                        <div className="form-control-wrap">
                                            <input type="text" value={this.state.sku}
                                                onChange={this.handleInputSku} className="form-control" id="sku" />
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-4">
                                    <div class="form-group">
                                        <label class="form-label" for="uom">Unit of Measure</label>
                                        <div class="form-control-wrap ">
                                            <div class="form-control-select">
                                                <select required onChange={this.handleInputUom} class="form-control" id="uom">
                                                    <option value="Pcs">Pcs</option>
                                                    <option value="KG">KG</option>
                                                    <option value="Pet">Pet</option>
                                                    <option value="Ltr">Ltr</option>
                                                    <option value="Number">Number</option>
                                                    <option value="Others">Others</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                            </div>



                            <div id="accordion-2" class="accordion accordion-s3 mt-4">
                                <div class="accordion-item">
                                    <a href="#" class="accordion-head" data-toggle="collapse" data-target="#accordion-item-2-1">
                                        <h6 class="title">Define Price</h6>
                                        <span class="accordion-icon"></span>
                                    </a>
                                    <div class="accordion-body collapse show" id="accordion-item-2-1" data-parent="#accordion-2">
                                        <div class="accordion-inner">
                                            <div class="row g-3">

                                                <div class="col-md-3">
                                                    <div class="form-group">
                                                        <label class="form-label" for="seal">Seal</label>
                                                        <div class="form-control-wrap">
                                                            <input type="number" min={0} value={this.state.seal} onChange={this.handleInputSeal} class="form-control" id="seal" placeholder="Enter Seal Price" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-md-3 ml-md-5">
                                                    <div class="form-group">
                                                        <label class="form-label" for="wrapper">Wrapper</label>
                                                        <div class="form-control-wrap">
                                                            <input type="number"  min="0" value={this.state.wrapper} onChange={this.handleInputWrapper} class="form-control" id="wrapper" placeholder="Enter Wrapper Price" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="row g-3">
                                                <div class="col-md-3 ">
                                                    <div class="form-group">
                                                        <label class="form-label" for="flat">Flat Rate</label>
                                                        <div class="form-control-wrap">
                                                            <input type="number" min="0" value={this.state.flatRate} onChange={this.handleInputFlatRate}class="form-control" id="flat" placeholder="Enter Flat Rate" />
                                                        </div>
                                                    </div>
                                                </div>

                                                <div class="col-md-3 ml-md-5">
                                                    <div class="form-group">
                                                        <label class="form-label" for="security">Security</label>
                                                        <div class="form-control-wrap">
                                                            <input type="number" min="0" value={this.state.security} onChange={this.handleInputSecurity} class="form-control" id="security" placeholder="Enter Security Price" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row g-3">
                                                <div class="col-md-3">
                                                    <div class="form-group">
                                                        <label class="form-label" for="others">Others</label>
                                                        <div class="form-control-wrap">
                                                            <input type="number" min="0" value={this.state.others} onChange={this.handleInputOthers} class="form-control" id="others" placeholder="Others" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="row g-3 mt-2">
                                            <div class="col-md-6 mt-4 ml-3  border-info    border-top border-bottom">
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <strong className="ff-base  h6 ccap">Total</strong>
                                                    </div>

                                                    <div className="col-md-6 d-flex justify-content-end">
                                                        <span className="fw-medium ccap ">Rs. {this.calculateTotal(total)}</span>
                                                    </div>

                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row g-4">

                                <div className="col-12 mt-4 ml-2">
                                    <div className="form-group">
                                        <button onClick={this.submitForm} className="btn btn-lg btn-primary">
                                            <em class="icon ni ni-plus-c"></em> <span>  Save Product</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>

                        <div className="text-danger  mt-2">
                            {this.state.error ?
                                <span className="ff-bold"><strong>{this.state.error}</strong></span>
                                : null}
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    render() {

        if (this.state.redirect === true) {
            this.props.history.push('/products')
        }

        let total = 0;

        return (
            <div className="nk-body bg-lighter npc-default has-sidebar ">
                <div className="nk-app-root">
                    <div className="nk-main"></div>
                    <Sidebar />
                    <div className="wrap container-fluid">
                        <Header user={this.props.user} />
                        <div className="custom-dashboard mt-5">
                            {this.renderBody(total)}
                            <Footer />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        addProduct: state.product.product
    }
}

export default connect(mapStateToProps)(AddProduct)
