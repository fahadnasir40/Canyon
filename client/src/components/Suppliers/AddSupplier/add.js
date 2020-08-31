import React, { Component } from "react";
import Header from "../../Header/header";
import Sidebar from "../../Sidebar/sidebar";
import Footer from "../../Footer/footer";
import { saveSupplier, clearNewSupplier } from '../../../actions';
import { connect } from 'react-redux';
// import { Redirect } from 'react-router-dom'


class addSupplier extends Component {

  state = {
    addressCount: 2,
    name: '',
    email: '',
    phone: '',
    brand: 'canyon',
    address: [{ name: "" }],
    redirect: false,
    error: ''
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.addSupplier.supplier) {
      if (nextProps.addSupplier.supplier.post === true) {
        return {
          redirect: true
        }
      }
      else if (nextProps.addSupplier.supplier.post === false) {
        return {
          error: 'Error registering the supplier'
        }
      }
    }

    return null;
  }

  componentWillUnmount() {
    this.props.dispatch(clearNewSupplier());
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


  handleInputBrand = (event) => {
    this.setState({ brand: event.target.value })
  }

  submitForm = (event) => {

    // const form = event.currentTarget;

    event.preventDefault();

    this.props.dispatch(saveSupplier({
      email: this.state.email,
      name: this.state.name,
      brand: this.state.brand,
      address: this.state.address,
      phone: this.state.phone,
      city: this.state.city,
      addedBy: this.props.user.login.id
    }))
  }


  addressRow = (i) => (

    <div className="col-lg-6 " key={i}>
      <div className="form-group" key={i}>
        <label className="form-label" htmlFor={"address-line-" + i}>
          Address Line {i + 1}
        </label>
        <div className="form-control-wrap">
          <input
            key={i}
            onChange={this.handleInputAddress}
            type="text"
            className="form-control"
            id={"address-line-" + i}
          />
        </div>
      </div>
    </div>
  )

  getAddressField = () => {
    var rows = [];
    for (var i = 0; i < this.state.addressCount; i++) {
      // note: we add a key prop here to allow react to uniquely identify each
      // element in this array. see: https://reactjs.org/docs/lists-and-keys.html
      rows.push(this.addressRow(i));
    }

    return <div className="row col-lg-8 g-4" >
      {rows}
    </div>;
  }
  addAddressField = () => {
    if (this.state.addressCount < 5) {
      this.setState({
        addressCount: this.state.addressCount + 1
      })
    }
  }

  resetAddressField = () => {
    this.setState({
      addressCount: 1
    })
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
              <h4 className="ff-base fw-medium">Add Supplier</h4>
            </div>
            <form className="form-validate">
              <div className="row g-4">
                <div className="col-lg-4">
                  <div className="form-group">
                    <label className="form-label" htmlFor="full-name-1">
                      Full Name
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

                        <div className="form-group ">
                          <label className="form-label" htmlFor={"address-line-" + idx}>
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
                      Save Informations
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
      this.props.history.push('/suppliers')
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
    addSupplier: state.supplier
  }
}

export default connect(mapStateToProps)(addSupplier)
