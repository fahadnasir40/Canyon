import React, { Component } from 'react'
import Sidebar from '../Sidebar/sidebar'
import Header from '../Header/header'
import Footer from '../Footer/footer'
import Content from './Content/customerContent'
import { getCustomers, deleteCustomer, updateCustomer,clearNewCustomer } from '../../actions'

import Swal from 'sweetalert2'
import { connect } from 'react-redux'

class Customers extends Component {

    state = {
        userUpdated: false,
        redirect: false,
    }

    componentDidMount(){
        this.props.dispatch(getCustomers());
    }


    changeStatus = (customer) => {
        if (customer.status === 'active') {
            customer.status = 'suspended'
            this.props.dispatch(updateCustomer(customer))
        }
        else if (customer.status == 'suspended') {
            customer.status = 'active'
            this.props.dispatch(updateCustomer(customer))
        }
    }


    componentWillUnmount(){
        this.props.dispatch(clearNewCustomer());
    }

    deleteAlert = (customer) => {

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
                this.props.dispatch(deleteCustomer(customer._id))
            }
        })
    }

    static getDerivedStateFromProps(nextProps, prevState) {

        if (nextProps.editCustomer === true) {
                    
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Customer status has been changed',
                showConfirmButton: false,
                timer: 1500
            }).then(function () {
                nextProps.dispatch(clearNewCustomer());
            });
        }

        if (nextProps.removeCustomer) {
            Swal.fire(
                'Deleted!',
                'Customer has been deleted.',
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
                                this.props.customersList ?
                                <Content {...this.props} deleteCustomer={this.deleteAlert} changeStatus={this.changeStatus} />
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
        customersList: state.customer.customerList,
        removeCustomer: state.customer.postDeleted,
        editCustomer: state.customer.post
    }
}

export default connect(mapStateToProps)(Customers)
