import React, { Component } from 'react'
import Sidebar from '../../Sidebar/sidebar'
import Header from '../../Header/header'
import Footer from '../../Footer/footer'
import Moment from 'react-moment'
import { Link } from 'react-router-dom'

class supplierInfo extends Component {

    state = {
        supplier: null
    }

    getInitials = (name) => {
        var initials = name.match(/\b\w/g) || [];
        initials = ((initials.shift() || '') + (initials.pop() || '')).toUpperCase();
        return initials;
    }

    componentDidMount() {
        if (!this.props.location.state) {
            this.props.history.push('/suppliers')
        }
        else {
            this.setState({
                supplier: this.props.location.state.supplierInfo
            })
        }
    }

    renderSupplierInfo = (supplier) => (

        <div className="nk-content ml-5">
            <div className="container-fluid">
                <div className="nk-content-inner">
                    <div className="nk-content-body">
                        <div className="nk-block-head nk-block-head-sm">
                            <div className="nk-block-between g-3">
                                <div className="nk-block-head-content">
                                    <h3 className="nk-block-title page-title">Supplier / <strong className="text-primary small">{supplier.name}</strong></h3>
                                </div>
                                <div className="nk-block-head-content">
                                    <Link to="/suppliers" className="btn btn-outline-light bg-white d-none d-sm-inline-flex"><em className="icon ni ni-arrow-left"></em><span>Back</span></Link>
                                    <Link to="/suppliers" className="btn btn-icon btn-outline-light bg-white d-inline-flex d-sm-none"><em className="icon ni ni-arrow-left"></em></Link>
                                </div>
                            </div>
                        </div>
                        <div className="nk-block">
                            <div className="card">
                                <div className="card-aside-wrap">
                                    <div className="card-content">
                                        <ul className="nav nav-tabs nav-tabs-mb-icon nav-tabs-card">
                                            <li className="nav-item">
                                                <a className="nav-link active" href="#"><em className="icon ni ni-user-circle"></em><span>Personal</span></a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" href="#"><em className="icon ni ni-repeat"></em><span>Orders</span></a>
                                            </li>

                                            <li className="nav-item nav-item-trigger d-xxl-none">
                                                <a href="#" className="toggle btn btn-icon btn-trigger" data-target="userAside"><em className="icon ni ni-user-list-fill"></em></a>
                                            </li>
                                        </ul>
                                        <div className="card-inner">
                                            <div className="nk-block">
                                                <div className="nk-block-head">
                                                    <h5 className="title">Personal Information</h5>
                                                    <p>Basic supplier info, like name and address that you use on your platform.</p>
                                                </div>
                                                <div className="profile-ud-list">

                                                    <div className="profile-ud-item">
                                                        <div className="profile-ud wider">
                                                            <span className="profile-ud-label">Full Name</span>
                                                            <span className="profile-ud-value">{supplier.name}</span>
                                                        </div>
                                                    </div>

                                                    <div className="profile-ud-item">
                                                        <div className="profile-ud wider">
                                                            <span className="profile-ud-label">Mobile Number</span>
                                                            <span className="profile-ud-value">{supplier.phone}</span>
                                                        </div>
                                                    </div>
                                                    <div className="profile-ud-item">
                                                        <div className="profile-ud wider">
                                                            <span className="profile-ud-label">Email Address</span>
                                                            <span className="profile-ud-value">{supplier.email}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="nk-block">
                                                <div className="nk-block-head nk-block-head-line">
                                                    <h6 className="title overline-title text-base">Additional Information</h6>
                                                </div>
                                                <div className="profile-ud-list">
                                                    {

                                                        supplier.address.map((item, i) => {
                                                            return (<div className="profile-ud-item" key={i}>
                                                                <div className="profile-ud wider">
                                                                    <span className="profile-ud-label">Address {i + 1}</span>
                                                                    <span className="profile-ud-value">{item.name}</span>
                                                                </div>
                                                            </div>)
                                                        })
                                                    }
                                                </div>
                                            </div>
                                            <div className="nk-divider divider md"></div>
                                            <div className="nk-block">
                                                <div className="nk-block-head nk-block-head-sm nk-block-between">
                                                    <h5 className="title">Admin Note</h5>
                                                    <a href="#" className="link link-sm">+ Add Note</a>
                                                </div>
                                                <div className="bq-note">
                                                    <div className="bq-note-item">
                                                        <div className="bq-note-text">
                                                            <p>Aproin at metus et dolor tincidunt feugiat eu id quam. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aenean sollicitudin non nunc vel pharetra. </p>
                                                        </div>
                                                        <div className="bq-note-meta">
                                                            <span className="bq-note-added">Added on <span className="date">November 18, 2019</span> at <span className="time">5:34 PM</span></span>
                                                            <span className="bq-note-sep sep">|</span>
                                                            <span className="bq-note-by">By <span>Softnio</span></span>
                                                            <a href="#" className="link link-sm link-danger">Delete Note</a>
                                                        </div>
                                                    </div>
                                                    <div className="bq-note-item">
                                                        <div className="bq-note-text">
                                                            <p>Aproin at metus et dolor tincidunt feugiat eu id quam. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aenean sollicitudin non nunc vel pharetra. </p>
                                                        </div>
                                                        <div className="bq-note-meta">
                                                            <span className="bq-note-added">Added on <span className="date">November 18, 2019</span> at <span className="time">5:34 PM</span></span>
                                                            <span className="bq-note-sep sep">|</span>
                                                            <span className="bq-note-by">By <span>Softnio</span></span>
                                                            <a href="#" className="link link-sm link-danger">Delete Note</a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-aside card-aside-right user-aside toggle-slide toggle-slide-right toggle-break-xxl" data-content="userAside" data-toggle-screen="xxl" data-toggle-overlay="true" data-toggle-body="true">
                                        <div className="card-inner-group" data-simplebar>
                                            <div className="card-inner">
                                                <div className="user-card user-card-s2">
                                                    <div className="user-avatar lg bg-primary">
                                                        <span>{this.getInitials(supplier.name)}</span>
                                                    </div>
                                                    <div className="user-info">
                                                        <div className="badge badge-outline-light badge-pill ucap">Supplier</div>
                                                        <h5>{supplier.name}</h5>
                                                        <span className="sub-text">{supplier.email}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="card-inner card-inner-sm">
                                                <ul className="btn-toolbar justify-center gx-1">
                                                    <li><a href="#" className="btn btn-trigger btn-icon"><em className="icon ni ni-shield-off"></em></a></li>
                                                    <li><a href="#" className="btn btn-trigger btn-icon"><em className="icon ni ni-mail"></em></a></li>
                                                    <li><a href="#" className="btn btn-trigger btn-icon"><em className="icon ni ni-download-cloud"></em></a></li>
                                                    <li> <Link to={{
                                                        pathname: "/editSupplier",
                                                        state: {
                                                            supplierInfo: supplier
                                                        }

                                                    }} className="btn btn-trigger btn-icon">
                                                        <em className="icon ni ni-edit-alt"></em></Link></li>
                                                    <li><a href="#" className="btn btn-trigger btn-icon text-danger"><em className="icon ni ni-na"></em></a></li>
                                                </ul>
                                            </div>
                                            <div className="card-inner">
                                                <div className="overline-title-alt mb-2">Ordered Amount</div>
                                                <div className="profile-balance">
                                                    <div className="profile-balance-group gx-4">
                                                        <div className="profile-balance-sub">
                                                            <div className="profile-balance-amount">
                                                                <div className="number"> <small className="currency currency-usd">Rs.</small> 2,556.57</div>
                                                            </div>
                                                            <div className="profile-balance-subtitle">Complete Order</div>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                            <div className="card-inner">
                                                <div className="row text-center">
                                                    <div className="col-4">
                                                        <div className="profile-stats">
                                                            <span className="amount">23</span>
                                                            <span className="sub-text">Total Order</span>
                                                        </div>
                                                    </div>
                                                    <div className="col-4">
                                                        <div className="profile-stats">
                                                            <span className="amount">20</span>
                                                            <span className="sub-text">Complete</span>
                                                        </div>
                                                    </div>
                                                    <div className="col-4">
                                                        <div className="profile-stats">
                                                            <span className="amount">3</span>
                                                            <span className="sub-text">Progress</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="card-inner">
                                                <h6 className="overline-title-alt mb-2">Additional</h6>
                                                <div className="row g-3">
                                                    <div className="col-6">
                                                        <span className="sub-text">User ID:</span>
                                                        <span className="sub-text-sm">{supplier._id}</span>
                                                    </div>

                                                    <div className="col-6">
                                                        <span className="sub-text">Register At:</span>
                                                        <span>    <Moment format="MMM DD, YYYY">
                                                            {supplier.createdAt}
                                                        </Moment></span>
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
            </div>
        </div>
        // <!-- content @e -->
    )

    render() {
        return (
            <div className="nk-body bg-lighter npc-default has-sidebar ">
                <div className="nk-app-root">
                    <div className="nk-main"></div>
                    <Sidebar />
                    <div className="wrap container-fluid">
                        <Header user={this.props.user} />
                        <div className="custom-dashboard mt-5">
                            {
                                this.state.supplier ?
                                    this.renderSupplierInfo(this.state.supplier)
                                    : null
                            }
                            <Footer />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default supplierInfo;