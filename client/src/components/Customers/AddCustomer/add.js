import React, { Component } from "react";
import Header from "../../Header/header";
import Sidebar from "../../Sidebar/sidebar";
import Footer from "../../Footer/footer";
import { saveCustomer, clearNewCustomer, getActiveProducts } from '../../../actions';
import { connect } from 'react-redux';
// import { Redirect } from 'react-router-dom'


class AddCustomer extends Component {

  state = {
    addressCount: 2,
    name: '',
    flatrate: false,
    salerate: false,
    email: '',
    phone: '',
    address: [{ name: "" }],
    redirect: false,
    error: '',
    productsList: '',
    products: [{ _id: "", rate: "" }],
    rate: ''
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.addCustomer.customer) {
      if (nextProps.addCustomer.customer.post === true) {
        return {
          redirect: true
        }
      }
      else if (nextProps.addCustomer.customer.post === false) {
        return {
          error: 'Error registering the customer'
        }
      }
    }

    return null;
  }

  componentWillUnmount() {
    this.props.dispatch(clearNewCustomer());
  }


  handleShareholderNameChange = idx => evt => {
    const newAddress = this.state.address.map((address, sidx) => {
      if (idx !== sidx) return address;
      return { ...address, name: evt.target.value };
    });

    this.setState({ address: newAddress });
  };

  handleProductAdd = () => {
    this.setState({
      products: this.state.products.concat([{ _id: "", rate: "" }])
    });
  };

  handleRemoveProduct = idx => () => {
    this.setState({
      products: this.state.products.filter((s, sidx) => idx !== sidx)
    });
  };


  handleRemoveShareholder = idx => () => {
    this.setState({
      address: this.state.address.filter((s, sidx) => idx !== sidx)
    });
  };

  handleProductChange = id => event => {
    if (event.target.value !== -1) {
      const newProduct = this.state.products.map((product, sidx) => {
        if (id !== sidx) return product;
        return { ...product, _id: this.props.productsList[event.target.value]._id, rate: Number(this.props.productsList[event.target.value].price.total) };
      });

      this.setState({ products: newProduct });
    }
    else {
      let newProduct = this.state.products;
      newProduct[id] = { _id: "", rate: "" };
      this.setState({ products: newProduct });
    }
  };

  handleProductRateChange = id => event => {
    if (event.target.value >= 0) {
      const newProduct = this.state.products.map((product, sidx) => {
        if (id !== sidx) return product;
        return { ...product, rate: Number(event.target.value) };
      });

      this.setState({ products: newProduct });
    }
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

  handleInputflatrate = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    // const name = target.value;

    this.setState({
      flatrate: value
    });
  }

  handleInputsalerate = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    this.setState({ salerate: value });

    if (value === true && !this.props.productsList) {
      this.props.dispatch(this.props.dispatch(getActiveProducts()))
    }
    else if (value === false) {
      this.setState({ products: [] })
    }
  }


  handleInputName = (event) => {
    this.setState({ name: event.target.value })
  }

  handleInputDropdown = (event) => {
    this.setState({ product: event.target.value })
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

    let newList = this.state.products;
    this.state.products.forEach(element => {
      if (element._id === '') {
        newList.splice(this.state.products.indexOf(element), 1);
      }
    })

    let addressFound = false;
    this.state.address.forEach(element => {
      if (element.name.length > 0) {
        addressFound = true;
      }
    })

    if (!addressFound) {
      this.setState({
        error: "Address is required."
      })
    }
    else if (!this.state.name) {
      this.setState({ error: 'Name is required.' })
    }
    else {

      this.props.dispatch(saveCustomer({
        email: this.state.email,
        name: this.state.name,
        address: this.state.address,
        phone: this.state.phone,
        addedBy: this.props.user.login.id,
        flatRate: this.state.flatrate,
        salePrice: newList
      }))
    }
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
      <div className="container mt-5  ml-md-5">
        <div className="card">
          <div className="card-inner">
            <div className="card-head mt-1">
              <h4 className="ff-base fw-medium">Add Customer</h4>
            </div>
            <form className="form-validate">
              <div className="row g-8">
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
                <div className="col-lg-4 mt-4 text-right">
                  <div class="custom-control custom-control-sm custom-checkbox">
                    <input
                      type="checkbox"
                      className="custom-control-input"
                      id="flatrate"
                      onChange={this.handleInputflatrate}
                      checked={this.state.flatrate} />
                    <label className="custom-control-label" htmlFor="flatrate">Apply Flat Rate</label>
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
                <div className="col-lg-4 mt-4 ml-md-2">
                  <div className="custom-control custom-control-sm custom-checkbox">
                    <input
                      type="checkbox"
                      className="custom-control-input"
                      id="salerate"
                      onChange={this.handleInputsalerate}
                      checked={this.state.salerate} />
                    <label className="custom-control-label" htmlFor="salerate">Apply Sale Rate</label>
                  </div>
                </div>
              </div>
              {
                this.state.salerate === true ?
                  <div>
                    {
                      this.state.products.map((item, key) => {
                        return (
                          <div className="row g-4">
                            <div className="col-sm-4">
                              <div className="form-group">
                                <label className="form-label" htmlFor="product">Product</label>
                                <div className="form-control-wrap ">
                                  <div className="form-control-select">
                                    <select required onChange={this.handleProductChange(key)} className="form-control ccap" id="product">
                                      <option value={-1}> Select Product</option>
                                      {
                                        this.props.productsList ?
                                          this.props.productsList.map((item, key) => {
                                            return <option key={key} value={key} disabled={this.state.products.find(x => x._id === item._id) ? true : null} className="ccap" >{item.name} ({item.brand})</option>;
                                          })
                                          : null
                                      }
                                    </select>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="col-sm-4" >
                              <div className="form-group">
                                <label className="form-label" htmlFor="productrate">Rate</label>
                                <div className="form-control-wrap">
                                  <input type="text" value={item.rate} disabled={item._id ? false : true} min={0} max={999999999}
                                    onChange={this.handleProductRateChange(key)} className="form-control" id="rate"
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="mt-md-4">
                              {key >= 0 && key < this.state.products.length ? <div className="btn" onClick={this.handleRemoveProduct(key)}><em className="icon ni ni-minus-c"></em><span>Remove</span></div> : null}
                            </div>

                          </div>
                        )
                      })}
                    {
                      this.props.productsList ?
                        this.state.products.length < this.props.productsList.length ? <div className="row mt-2 ml-n4">
                          <div className="col-lg-4">
                            <div className="btn" onClick={this.handleProductAdd}><em className="icon ni ni-plus-c"></em><span> Add product</span></div>
                          </div>
                        </div> : null : null
                    }
                  </div>
                  : null

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
      this.props.history.push('/customers')
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
    addCustomer: state.customer,
    productsList: state.product.productList
  }
}

export default connect(mapStateToProps)(AddCustomer)
