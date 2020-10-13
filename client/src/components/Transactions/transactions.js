import React, { Component } from 'react'
import Sidebar from '../Sidebar/sidebar'
import Header from '../Header/header'
import Footer from '../Footer/footer'
import Content from './Content/content';
import { connect } from 'react-redux';
import { getTransactions, clearNewTransaction, updateTransaction } from '../../actions';
import Swal from 'sweetalert2'

class Transactions extends Component {

    componentDidMount() {
        this.props.dispatch(getTransactions());
    }

    static getDerivedStateFromProps(nextProps, prevState) {

        if (nextProps.editTransaction === true) {

            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Transaction status has been changed',
                showConfirmButton: false,
                timer: 1500
            }).then(function () {
                nextProps.dispatch(clearNewTransaction());
            });
        }

        return null;
    }

    changeStatus = (transaction) => {
        if (transaction.status === 'active') {
            transaction.status = 'Inactive'
            this.props.dispatch(updateTransaction(transaction))
        }
        else if (transaction.status === 'Inactive') {
            transaction.status = 'active'
            this.props.dispatch(updateTransaction(transaction))
        }
        window.location.reload(false)
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
        // removeTransaction: state.transaction_source.postDeleted,
        // editSupplier: state.supplier.post
    }
}

export default connect(mapStateToProps)(Transactions)
