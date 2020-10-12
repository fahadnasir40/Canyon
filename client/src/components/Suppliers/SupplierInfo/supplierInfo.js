import React, { Component } from 'react'
import Sidebar from '../../Sidebar/sidebar'
import Header from '../../Header/header'
import Footer from '../../Footer/footer'
import Moment from 'react-moment'
import { Link } from 'react-router-dom'
import NumberFormat from 'react-number-format'
import { clearSupplier, getSupplierDetails, updateSupplier } from '../../../actions'
import { connect } from 'react-redux';
import Swal from 'sweetalert2';
import $ from 'jquery'
class supplierInfo extends Component {

    state = {
        supplier: '',
        completeOrderAmount: 0,
        totalOrders: 0,
        completeOrders: 0,
        pendingOrders: 0,
        returnedOrders: 0,
        changeState: false,
    }

    static getDerivedStateFromProps(nextProps, prevState) {

        if (nextProps.purchaseDetails) {
            if (nextProps.editSupplier) {
                if (nextProps.editSupplier.post === true) {
                    return {
                        supplier: nextProps.editSupplier.supplier,
                        totalOrders: nextProps.purchaseDetails.totalOrders,
                        completeOrders: nextProps.purchaseDetails.completedOrders,
                        pendingOrders: nextProps.purchaseDetails.pendingOrders,
                        returnedOrders: nextProps.purchaseDetails.returnedOrders,
                        completeOrderAmount: nextProps.purchaseDetails.totalOrdersAmount
                    }
                }
            }
            return ({
                totalOrders: nextProps.purchaseDetails.totalOrders,
                completeOrders: nextProps.purchaseDetails.completedOrders,
                pendingOrders: nextProps.purchaseDetails.pendingOrders,
                returnedOrders: nextProps.purchaseDetails.returnedOrders,
                completeOrderAmount: nextProps.purchaseDetails.totalOrdersAmount
            })
        }
        return null;
    }


    changeStatus = () => {
        const supplier = this.state.supplier;

        if (supplier.status === 'active') {
            supplier.status = 'suspended'
            this.props.dispatch(updateSupplier(supplier))
        }
        else if (supplier.status === 'suspended') {
            supplier.status = 'active'
            this.props.dispatch(updateSupplier(supplier))
        }


        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Supplier status has been changed',
            showConfirmButton: false,
            timer: 1500
        })

        this.setState({
            changeState: true
        })
    }

    componentWillUnmount() {
        this.props.dispatch(clearSupplier());
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
            this.props.history.push('/suppliers')
        }
        else {
            this.props.dispatch(getSupplierDetails(this.props.location.state.supplierInfo._id));
            this.setState({
                supplier: this.props.location.state.supplierInfo
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
                    let newSupplier = selfObject.state.supplier;
                    newSupplier.notes.push({ data: text, addedById: selfObject.props.user.login._id, addedByName: selfObject.props.user.login.name });
                    selfObject.props.dispatch(updateSupplier(newSupplier));
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

                let newSupplier = this.state.supplier;
                const note = newSupplier.notes.find(x => x._id === id);
                newSupplier.notes.splice(newSupplier.notes.indexOf(note), 1);
                Swal.fire({
                    icon: 'success',
                    title: 'Your note has been deleted',
                    showConfirmButton: false,
                    timer: 1500
                })
                if (note)
                    this.props.dispatch(updateSupplier(newSupplier));
            }
        })
    }

    showBar = () => {
        if (!$('#sidebarProfile').hasClass('content-active')) {
            $('#sidebarProfile').addClass('content-active');
        }
    }

    renderSupplierInfo = (supplier) => (

        <div className="nk-content ml-md-5">
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

                                            <li className="nav-item nav-item-trigger d-xxl-none">
                                                <a onClick={this.showBar} className="toggle btn btn-icon btn-trigger" data-target="userAside"><em className="icon ni ni-user-list-fill"></em></a>
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
                                                            {this.getColText(supplier.name)}
                                                        </div>
                                                    </div>
                                                    <div className="profile-ud-item">
                                                        <div className="profile-ud wider">
                                                            <span className="profile-ud-label">Brand</span>
                                                            <span className="profile-ud-value ccap">{supplier.brand}</span>
                                                        </div>
                                                    </div>

                                                    <div className="profile-ud-item">
                                                        <div className="profile-ud wider">
                                                            <span className="profile-ud-label">Email Address</span>
                                                            {this.getColText(supplier.email)}
                                                        </div>
                                                    </div>
                                                    <div className="profile-ud-item">
                                                        <div className="profile-ud wider">
                                                            <span className="profile-ud-label">Mobile Number</span>
                                                            {this.getColText(supplier.phone)}
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
                                                    {
                                                        supplier.notes.length < 3 ?
                                                            <span className="text-azure fw-medium link-sm" style={{ cursor: "pointer" }} onClick={this.addNote}>+ Add Note</span>
                                                            : null
                                                    }
                                                </div>
                                                <div className="bq-note">
                                                    {
                                                        supplier.notes.length === 0 ?
                                                            <span className="text-muted"> No notes added.</span>
                                                            : null
                                                    }
                                                    {
                                                        supplier.notes.map((item, key) => (
                                                            <div key={key} className="bq-note-item">
                                                                <div className="bq-note-text">
                                                                    <p className="text-break">{item.data}</p>
                                                                </div>
                                                                <div className="bq-note-meta">
                                                                    <span className="bq-note-added">Added on <span className="date"><Moment format="MMMM DD, YYYY">{item.createdOn}</Moment></span> at
                                                                      <span className="time"> <Moment format="hh:mm A">{item.createdOn}</Moment></span></span>
                                                                    <span className="bq-note-sep sep">|</span>
                                                                    <span className="bq-note-by">By <span>{item.addedByName}</span></span>
                                                                    <span className="text-danger  link-sm" style={{ cursor: "pointer" }} onClick={() => { this.deleteNote(item._id) }}>&nbsp;&nbsp;&nbsp;&nbsp;Delete Note</span>
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
                                                    {
                                                        supplier.status === 'suspended' ?
                                                            <li><div onClick={this.changeStatus} className="btn btn-trigger btn-icon text-info"><em className="icon ni ni-shield-off"></em></div></li>
                                                            : null
                                                    }

                                                    <li><a href={"mailto:" + supplier.email} className="btn btn-trigger btn-icon"><em className="icon ni ni-mail"></em></a></li>
                                                    {/* <li><a href="#" className="btn btn-trigger btn-icon"><em className="icon ni ni-download-cloud"></em></a></li> */}
                                                    <li> <Link to={{
                                                        pathname: "/editSupplier",
                                                        state: {
                                                            supplierInfo: supplier
                                                        }

                                                    }} className="btn btn-trigger btn-icon">
                                                        <em className="icon ni ni-edit-alt"></em></Link></li>
                                                    {
                                                        supplier.status === 'active' ?
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
                                                    <div className="col-3">
                                                        <div className="profile-stats">
                                                            <span className="amount">{this.state.returnedOrders}</span>
                                                            <span className="sub-text">Returned</span>
                                                        </div>
                                                    </div>
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
                                                        <span className="sub-text-sm">{supplier._id}</span>
                                                    </div>

                                                    <div className="col-6">
                                                        <span className="sub-text">Register At:</span>
                                                        <span>    <Moment format="MMM DD, YYYY hh:mm A">
                                                            {supplier.createdAt}
                                                        </Moment></span>
                                                    </div>
                                                    <div className="col-6">
                                                        <span className="sub-text">Status:</span>
                                                        {
                                                            supplier.status === 'active' ?
                                                                <span className="tb-status text-success fs-12px ccap">{supplier.status}</span>
                                                                : <span className="tb-status text-danger fs-12px ccap"><strong>{supplier.status}</strong></span>
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
        const supplier = this.state.supplier;

        return (
            <div className="nk-body bg-lighter npc-default has-sidebar " id="container">
                <div className="nk-app-root">
                    <div className="nk-main"></div>
                    <Sidebar />
                    <div className="wrap container-fluid">
                        <Header user={this.props.user} />
                        <div className="custom-dashboard mt-5">
                            {supplier ? this.renderSupplierInfo(supplier) : null}
                            <Footer />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        purchaseDetails: state.supplier.purchaseDetails,
        editSupplier: state.supplier
    }
}

export default connect(mapStateToProps)(supplierInfo)
