import React, { Component } from 'react'
import Sidebar from '../../Sidebar/sidebar'
import Header from '../../Header/header'
import Footer from '../../Footer/footer'
import Moment from 'react-moment'
import { Link } from 'react-router-dom'
import NumberFormat from 'react-number-format'
import { clearCustomer, getCustomerDetails, updateCustomer } from '../../../actions'
import { connect } from 'react-redux';
import Swal from 'sweetalert2';
import $ from 'jquery'
class customerInfo extends Component {

    state = {
        customer: '',
        completeOrderAmount: 0,
        totalOrders: 0,
        completeOrders: 0,
        pendingOrders: 0,
        // returnedOrders: 0,
        changeState: false,
    }

    static getDerivedStateFromProps(nextProps, prevState) {

        if (nextProps.saleDetails) {
            if (nextProps.editCustomer) {
                if (nextProps.editCustomer.post === true) {
                    return {
                        customer: nextProps.editCustomer.customer,
                        totalOrders: nextProps.saleDetails.totalOrders,
                        completeOrders: nextProps.saleDetails.completedOrders,
                        pendingOrders: nextProps.saleDetails.pendingOrders,
                        // returnedOrders: nextProps.purchaseDetails.returnedOrders,
                        completeOrderAmount: nextProps.saleDetails.totalOrdersAmount
                    }
                }
            }
            return ({
                totalOrders: nextProps.saleDetails.totalOrders,
                completeOrders: nextProps.saleDetails.completedOrders,
                pendingOrders: nextProps.saleDetails.pendingOrders,
                // returnedOrders: nextProps.purchaseDetails.returnedOrders,
                completeOrderAmount: nextProps.saleDetails.totalOrdersAmount
            })
        }
        return null;
    }


    changeStatus = () => {
        const customer = this.state.customer;

        if (customer.status === 'active') {
            customer.status = 'suspended'
            this.props.dispatch(updateCustomer(customer))
        }
        else if (customer.status === 'suspended') {
            customer.status = 'active'
            this.props.dispatch(updateCustomer(customer))
        }


        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Customer status has been changed',
            showConfirmButton: false,
            timer: 1500
        })

        this.setState({
            changeState: true
        })
    }

    componentWillUnmount() {
        this.props.dispatch(clearCustomer());
    }

    getInitials = (name) => {
        var initials = name.match(/\b\w/g) || [];
        initials = ((initials.shift() || '') + (initials.pop() || '')).toUpperCase();
        return initials;
    }

    getColText = (value) => {
        if (value)
            return (<span className="profile-ud-value">{value}</span>)
        return (<span className="profile-ud-value ff-italic text-muted">Not added yet</span>)
    }

    componentDidMount() {
        if (!this.props.location.state) {
            this.props.history.push('/customers')
        }
        else {
            this.props.dispatch(getCustomerDetails(this.props.location.state.customerInfo._id));
            this.setState({
                customer: this.props.location.state.customerInfo
            })
        }
        $('#container').on('click', function (e) {
            if ($('#sidebarProfile').hasClass('content-active'))
                $('#sidebarProfile').removeClass('content-active');
        });
    }

    addNote = () => {

        OpenSwal(this);

        async function OpenSwal(selfObject) {
            const { value: text } = await Swal.fire({
                title: 'Add a new note',
                input: 'textarea',
                inputPlaceholder: 'Type your message here...',
                inputAttributes: {
                    maxlength: 300,
                    'aria-label': 'Type your message here'
                },
                showCancelButton: true
            })
            if (text) {
                Swal.fire({
                    icon: 'success',
                    title: 'New Note Added',
                    showConfirmButton: false,
                    timer: 1500
                })
                {
                    let newCustomer = selfObject.state.customer;
                    newCustomer.notes.push({ data: text, addedById: selfObject.props.user.login._id, addedByName: selfObject.props.user.login.name });
                    selfObject.props.dispatch(updateCustomer(newCustomer));
                }
            }
        }
    }



    deleteNote = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {

                let newCustomer = this.state.customer;
                const note = newCustomer.notes.find(x => x._id === id);
                newCustomer.notes.splice(newCustomer.notes.indexOf(note), 1);
                Swal.fire({
                    icon: 'success',
                    title: 'Your note has been deleted',
                    showConfirmButton: false,
                    timer: 1500
                })
                if (note)
                    this.props.dispatch(updateCustomer(newCustomer));
            }
        })
    }

    showBar = () => {
        if (!$('#sidebarProfile').hasClass('content-active')) {
            $('#sidebarProfile').addClass('content-active');
        }
    }

    renderCustomerInfo = (customer) => (

        <div className="nk-content ml-md-5">
            <div className="container-fluid">
                <div className="nk-content-inner">
                    <div className="nk-content-body">
                        <div className="nk-block-head nk-block-head-sm">
                            <div className="nk-block-between g-3">
                                <div className="nk-block-head-content">
                                    <h3 className="nk-block-title page-title">Customer / <strong className="text-primary small">{customer.name}</strong></h3>
                                </div>
                                <div className="nk-block-head-content">
                                    <Link to="/customers" className="btn btn-outline-light bg-white d-none d-sm-inline-flex"><em className="icon ni ni-arrow-left"></em><span>Back</span></Link>
                                    <Link to="/customers" className="btn btn-icon btn-outline-light bg-white d-inline-flex d-sm-none"><em className="icon ni ni-arrow-left"></em></Link>
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
                                            {
                                                this.props.user.login.role !== 'worker' ?
                                                    <li className="nav-item nav-item-trigger d-xxl-none">
                                                        <a onClick={this.showBar} className="toggle btn btn-icon btn-trigger" data-target="userAside"><em className="icon ni ni-user-list-fill"></em></a>
                                                    </li>
                                                    : null
                                            }
                                        </ul>
                                        <div className="card-inner">
                                            <div className="nk-block">
                                                <div className="nk-block-head">
                                                    <h5 className="title">Personal Information</h5>
                                                    <p>Basic customer info, like name and address that you use on your platform.</p>
                                                </div>
                                                <div className="profile-ud-list">

                                                    <div className="profile-ud-item">
                                                        <div className="profile-ud wider">
                                                            <span className="profile-ud-label">Full Name</span>
                                                            {this.getColText(customer.name)}
                                                        </div>
                                                    </div>
                                                    <div className="profile-ud-item">
                                                        <div className="profile-ud wider">
                                                            <span className="profile-ud-label">Email Address</span>
                                                            {this.getColText(customer.email)}
                                                        </div>
                                                    </div>
                                                    <div className="profile-ud-item">
                                                        <div className="profile-ud wider">
                                                            <span className="profile-ud-label">Mobile Number</span>
                                                            {this.getColText(customer.phone)}
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
                                                        customer.address.map((item, i) => {
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
                                                    {
                                                        customer.notes.length < 3 && this.props.user.login.role !== 'worker' ?
                                                            <span className="text-azure fw-medium link-sm" style={{ cursor: "pointer" }} onClick={this.addNote}>+ Add Note</span>
                                                            : null
                                                    }
                                                </div>
                                                <div className="bq-note">
                                                    {
                                                        customer.notes.length === 0 ?
                                                            <span className="text-muted"> No notes added.</span>
                                                            : null
                                                    }
                                                    {
                                                        customer.notes.map((item, key) => (
                                                            <div key={key} className="bq-note-item">
                                                                <div className="bq-note-text">
                                                                    <p className="text-break">{item.data}</p>
                                                                </div>
                                                                <div className="bq-note-meta">
                                                                    <span className="bq-note-added">Added on <span className="date"><Moment format="MMMM DD, YYYY">{item.createdOn}</Moment></span> at
                                                                      <span className="time"> <Moment format="hh:mm A">{item.createdOn}</Moment></span></span>
                                                                    <span className="bq-note-sep sep">|</span>
                                                                    <span className="bq-note-by">By <span>{item.addedByName}</span></span>
                                                                    {
                                                                        this.props.user.login.role !== 'worker' ?
                                                                            <span className="text-danger  link-sm" style={{ cursor: "pointer" }} onClick={() => { this.deleteNote(item._id) }}>&nbsp;&nbsp;&nbsp;&nbsp;Delete Note</span>

                                                                            : null
                                                                    }
                                                                </div>
                                                            </div>
                                                        ))
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-aside card-aside-right user-aside toggle-slide toggle-slide-right toggle-break-xxl" id="sidebarProfile" data-content="userAside" data-toggle-screen="xxl" data-toggle-overlay="true" data-toggle-body="true">
                                        <div className="card-inner-group" data-simplebar>
                                            <div className="card-inner">
                                                <div className="user-card user-card-s2">
                                                    <div className="user-avatar lg bg-primary">
                                                        <span>{this.getInitials(customer.name)}</span>
                                                    </div>
                                                    <div className="user-info">
                                                        <div className="badge badge-outline-light badge-pill ucap">Customer</div>
                                                        <h5>{customer.name}</h5>
                                                        <span className="sub-text">{customer.email}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="card-inner card-inner-sm">
                                                <ul className="btn-toolbar justify-center gx-1">
                                                    {
                                                        customer.status === 'suspended' ?
                                                            <li><div onClick={this.changeStatus} className="btn btn-trigger btn-icon text-info"><em className="icon ni ni-shield-off"></em></div></li>
                                                            : null
                                                    }

                                                    <li><a href={"mailto:" + customer.email} className="btn btn-trigger btn-icon"><em className="icon ni ni-mail"></em></a></li>
                                                    {/* <li><a href="#" className="btn btn-trigger btn-icon"><em className="icon ni ni-download-cloud"></em></a></li> */}
                                                    <li> <Link to={{
                                                        pathname: "/editCustomer",
                                                        state: {
                                                            customerInfo: customer
                                                        }

                                                    }} className="btn btn-trigger btn-icon">
                                                        <em className="icon ni ni-edit-alt"></em></Link></li>
                                                    {
                                                        customer.status === 'active' ?
                                                            <li><div onClick={this.changeStatus} className="btn btn-trigger btn-icon text-danger"><em className="icon ni ni-na"></em></div></li>
                                                            : null
                                                    }

                                                </ul>
                                            </div>
                                            <div className="card-inner">
                                                <div className="overline-title-alt mb-2">Ordered Amount</div>
                                                <div className="profile-balance">
                                                    <div className="profile-balance-group gx-4">
                                                        <div className="profile-balance-sub">
                                                            <div className="profile-balance-amount">
                                                                <div className="number"> <small className="currency currency-usd">Rs.</small> <NumberFormat value={this.state.completeOrderAmount} displayType={'text'} thousandSeparator={true} /></div>
                                                            </div>
                                                            <div className="profile-balance-subtitle">Complete Order</div>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                            <div className="card-inner">
                                                <div className="row text-center">
                                                    <div className="col-3">
                                                        <div className="profile-stats">
                                                            <span className="amount">{this.state.totalOrders}</span>
                                                            <span className="sub-text">Total Order</span>
                                                        </div>
                                                    </div>
                                                    <div className="col-3">
                                                        <div className="profile-stats">
                                                            <span className="amount">{this.state.completeOrders}</span>
                                                            <span className="sub-text">Complete</span>
                                                        </div>
                                                    </div>
                                                    {/* <div className="col-3">
                                                        <div className="profile-stats">
                                                            <span className="amount">{this.state.returnedOrders}</span>
                                                            <span className="sub-text">Returned</span>
                                                        </div>
                                                    </div> */}
                                                    <div className="col-3">
                                                        <div className="profile-stats">
                                                            <span className="amount">{this.state.pendingOrders}</span>
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
                                                        <span className="sub-text-sm">{customer._id}</span>
                                                    </div>

                                                    <div className="col-6">
                                                        <span className="sub-text">Register At:</span>
                                                        <span>    <Moment format="MMM DD, YYYY hh:mm A">
                                                            {customer.createdAt}
                                                        </Moment></span>
                                                    </div>
                                                    <div className="col-6">
                                                        <span className="sub-text">Status:</span>
                                                        {
                                                            customer.status === 'active' ?
                                                                <span className="tb-status text-success fs-12px ccap">{customer.status}</span>
                                                                : <span className="tb-status text-danger fs-12px ccap"><strong>{customer.status}</strong></span>
                                                        }
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
        const customer = this.state.customer;

        return (
            <div className="nk-body bg-lighter npc-default has-sidebar " id="container">
                <div className="nk-app-root">
                    <div className="nk-main"></div>
                    <Sidebar {...this.props} />
                    <div className="wrap container-fluid">
                        <Header user={this.props.user} />
                        <div className="custom-dashboard mt-5">
                            {customer ? this.renderCustomerInfo(customer) : null}
                            <Footer />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    console.log("State Recieved", state)
    return {
        saleDetails: state.customer.saleDetails,
        editCustomer: state.customer
    }
}

export default connect(mapStateToProps)(customerInfo)
