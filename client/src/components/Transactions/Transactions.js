import React, { Component } from 'react'
import Sidebar from '../Sidebar/sidebar'
import Header from '../Header/header'
import Footer from '../Footer/footer'
import Content from './Content/content'
import { getTransactions } from '../../actions/';

class Transactions extends Component {

    componentDidMount() {
        this.props.dispatch(getTransactions());
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

                            <Content transactionsList={this.props.transactionsList} />

                            <Footer />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Transactions