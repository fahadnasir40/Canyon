import React, { Component } from 'react'
import Sidebar from '../Sidebar/sidebar'
import Header from '../Header/header'
import Footer from '../Footer/footer'
import Content from './Content/content';
import { connect } from 'react-redux';
import { getTransactions , deleteTransaction} from '../../actions';
import Swal from 'sweetalert2'

class Transactions extends Component {

    componentDidMount() {
        console.log("getTreansactions", this.props.dispatch(getTransactions()))
        this.props.dispatch(getTransactions());
    }

    deleteAlert = (transaction) => {

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
                this.props.dispatch(deleteTransaction(transaction._id))
            }
        })
    }

    static getDerivedStateFromProps(nextProps, prevState) {

        // if (nextProps.editSupplier === true) {
                    
        //     Swal.fire({
        //         position: 'center',
        //         icon: 'success',
        //         title: 'Supplier status has been changed',
        //         showConfirmButton: false,
        //         timer: 1500
        //     }).then(function () {
        //         nextProps.dispatch(clearNewSupplier());
        //     });
        // }

        if (nextProps.removeTransaction) {
            Swal.fire(
                'Deleted!',
                'Transaction has been deleted.',
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
                                this.props.transactionsList ?
                                    <Content key={this.props.bar} {...this.props} deleteTransaction={this.deleteAlert} changeStatus={this.changeStatus} />
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
        transactionsList: state.transaction.transactionList,
        removeTransaction: state.transaction.postDeleted,
        // editSupplier: state.supplier.post
    }
}

export default connect(mapStateToProps)(Transactions)