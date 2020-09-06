import React, { Component } from "react";
import Header from "../../Header/header";
import Sidebar from "../../Sidebar/sidebar";
import Footer from "../../Footer/footer";
import { updateCustomer, clearNewCustomer } from '../../../actions';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'


class EditCustomer extends Component {

  state = {
    addressCount: 2,
    name: '',
    email: '',
    phone: '',
    address: [{ name: "" }],
    redirect: false,
    error: ''
  }



  componentDidMount() {

    if (this.props.location.state) {
      if (this.props.location.state.customerInfo) {
        let customer = this.props.location.state.customerInfo;
        this.setState({
          name: customer.name,
          email: customer.email,
          phone: customer.phone,
          addressCount: customer.address.length,
          address: customer.address
        })
      }
    }
    else {
      this.setState({
        redirect: true
      })
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {

    if (nextProps.editCustomer) {
      if (nextProps.editCustomer.post === true) {
        return {
          redirect: true
        }
      }
      else if (nextProps.editCustomer.post === false) {
        return {
          error: 'Error registering the customer'
        }
      }
    }
    return null;
  }

  handleShareholderNameChange = idx => evt => {
    const newAddress = this.state.address.map((address, sidx) => {
      if (idx !== sidx) return address;
      return { ...address, name: evt.target.value };
    });

    this.setState({ address: newAddress });
  };

  handleAddShareholder = () => {
    this.setState({
      address: this.state.address.concat([{ name: "" }])
    });
  };

  handleRemoveShareholder = idx => () => {
    this.setState({
      address: this.state.address.filter((s, sidx) => idx !== sidx)
    });
  };

  handleInputEmail = (event) => {
    this.setState({ email: event.target.value })
  }


  handleInputName = (event) => {
    this.setState({ name: event.target.value })
  }

  handleInputAddress = () => {
    var address = [...this.state.address];
    address.push(this.nextValue.value);
    this.setState({
      address
    })
  }
  handleInputPhone = (event) => {
    this.setState({ phone: event.target.value })
  }

  submitForm = (event) => {

    // const form = event.currentTarget;

    event.preventDefault();

    let customer = this.props.location.state.customerInfo;

    customer.name = this.state.name;
    customer.email = this.state.email;
    customer.phone = this.state.phone;
    customer.address = this.state.address;

    this.props.dispatch(updateCustomer(customer));
  }

  componentWillUnmount() {
    this.props.dispatch(clearNewCustomer());
  }

  getButton = () => {
    if (this.state.addressCount < 5) {
      if (this.state.addressCount > 1) {
        return (
          <div className="row mt-2 ml-n4">
            <div className="col-lg-2">
              <button className="btn" onClick={this.addAddressField}><em className="icon ni ni-plus-c"></em><span> Add Address line</span></button>
            </div>

            <div className="col-lg-2">
              <button className="btn" onClick={this.resetAddressField}><em className="icon ni ni-minus-c"></em><span> Reset Address line</span></button>
            </div>
          </div>
        )

      }
      else
        return (
          <div className="row mt-2 ml-n4">
            <div className="col-lg-4">
              <button className="btn" onClick={this.addAddressField}><em className="icon ni ni-plus-c"></em><span> Add Address line</span></button>
            </div>
          </div>
        )
    }
    else
      return (
        <div className="row mt-2 ml-n4">
          <div className="col-lg-4">
            <button className="btn" onClick={this.resetAddressField}><em className="icon ni ni-minus-c"></em><span> Reset Address line</span></button>
          </div>
        </div>
      )
  }

  renderBody = () => {
    return (
      <div className="container mt-5">
        <div className="card">
          <div className="card-inner">
            <div className="card-head mt-1">
              <h4 className="ff-base fw-medium">Edit Customer</h4>
            </div>
            <form className="form-validate">
              <div className="row g-4">
                <div className="col-lg-4">
                  <div className="form-group">
                    <label className="form-label" htmlFor="full-name-2">
                      Full Name
                    </label>
                    <div className="form-control-wrap">
                      <input
                        type="text"
                        value={this.state.name}
                        onChange={this.handleInputName}
                        required
                        className="form-control"
                        id="full-name-2"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="row g-4">
                <div className="col-lg-4">
                  <div className="form-group">
                    <label className="form-label" htmlFor="mobile">
                      Phone No
                    </label>
                    <div className="form-control-wrap">
                      <input type="text" value={this.state.phone}
                        onChange={this.handleInputPhone} className="form-control" id="mobile" />
                    </div>
                  </div>
                </div>

                <div className="col-lg-4">
                  <div className="form-group">
                    <label className="form-label" htmlFor="email">Email</label>
                    <div className="form-control-wrap">
                      <input type="text" value={this.state.email}
                        onChange={this.handleInputEmail} className="form-control" id="email" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="row g-4">
                <div className="col-lg-12">


                  {
                    this.state.address.map((address, idx) => (
                      <div className="col-lg-4" key={idx}>

                        <div className="form-group " >
                          <label className="form-label" htmlFor={"address-line-" + idx} >
                            Address Line {idx + 1}
                          </label>
                          <div className="form-control-wrap">
                            <input
                              type="text"
                              value={address.name}
                              onChange={this.handleShareholderNameChange(idx)}
                              id={"address-line-" + idx}
                              className="form-control"
                            />
                            {idx > 0 && idx < 5 ? <div className="btn" onClick={this.handleRemoveShareholder(idx)}><em className="icon ni ni-minus-c"></em><span>Remove address</span></div> : null}

                          </div>
                        </div>
                      </div>
                    ))
                  }
                </div>
              </div>
              {
                this.state.address.length < 5 ? <div className="row mt-2 ml-n4">
                  <div className="col-lg-4">
                    <div className="btn" onClick={this.handleAddShareholder}><em className="icon ni ni-plus-c"></em><span> Add Address line</span></div>
                  </div>
                </div> : null
              }

              <div className="row g-4">
                <div className="col-12 mt-4 mb-2">
                  <div className="form-group">

                    <button onClick={this.submitForm} className="btn btn-lg btn-primary">
                      Update Information
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
      return <Redirect to="/customers" />
    }

    return (
      <div className="nk-body bg-lighter npc-default has-sidebar ">
        <div className="nk-app-root">
          <div className="nk-main"></div>
          <Sidebar />
          <div className="wrap container-fluid">
            <Header user={this.props.user} />
            <div className="custom-dashboard mt-5">
              {this.renderBody()}
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
    editCustomer: state.customer
  }
}

export default connect(mapStateToProps)(EditCustomer)
