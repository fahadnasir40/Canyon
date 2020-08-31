import React, { Component } from 'react'
import Sidebar from '../Sidebar/sidebar'
import Header from '../Header/header'
import Footer from '../Footer/footer'
import Content from './Content/content'
import { getSuppliers, deleteSupplier, updateSupplier,clearNewSupplier } from '../../actions'

import Swal from 'sweetalert2'
import { connect } from 'react-redux'

class Suppliers extends Component {

    state = {
        userUpdated: false,
        redirect: false,
    }

    componentDidMount(){
        this.props.dispatch(getSuppliers());
    }


    changeStatus = (supplier) => {
        if (supplier.status === 'active') {
            supplier.status = 'suspended'
            this.props.dispatch(updateSupplier(supplier))
        }
        else if (supplier.status === 'suspended') {
            supplier.status = 'active'
            this.props.dispatch(updateSupplier(supplier))
        }
    }


    componentWillUnmount(){
        this.props.dispatch(clearNewSupplier());
    }

    deleteAlert = (supplier) => {

        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.value) {
                this.props.dispatch(deleteSupplier(supplier._id))
            }
        })
    }

    static getDerivedStateFromProps(nextProps, prevState) {

        if (nextProps.editSupplier === true) {
                    
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Supplier status has been changed',
                showConfirmButton: false,
                timer: 1500
            }).then(function () {
                nextProps.dispatch(clearNewSupplier());
            });
        }

        if (nextProps.removeSupplier) {
            Swal.fire(
                'Deleted!',
                'Supplier has been deleted.',
                'success'
            ).then((result) => {
                if (result.value) { }
                window.location.reload(false)
            });
        }
        return null;
    }

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
                                this.props.suppliersList ?
                                    <Content key={this.props.bar} {...this.props} deleteSupplier={this.deleteAlert} changeStatus={this.changeStatus} />
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

function mapStateToProps(state) {
    return {
        suppliersList: state.supplier.supplierList,
        removeSupplier: state.supplier.postDeleted,
        editSupplier: state.supplier.post
    }
}

export default connect(mapStateToProps)(Suppliers)
