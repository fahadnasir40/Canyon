import React, { Component } from 'react'
import Sidebar from '../Sidebar/sidebar'
import Header from '../Header/header'
import Footer from '../Footer/footer'
import Content from './Content/content';
import { connect } from 'react-redux';
import { getPurchases, updatePurchasePaid } from '../../actions';

class Purchase extends Component {

    componentDidMount() {
        this.props.dispatch(getPurchases());
    }

    updatePurchase = (purchase) => {
        this.props.dispatch(updatePurchasePaid(purchase))
    }

    static getDerivedStateFromProps(nextProps) {
        if (nextProps.updatePurchase) {
            if (nextProps.updatePurchase === true) {
                window.location.reload(false);
            }
        }
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
                            <Content updatePurchase={this.updatePurchase} purchaseList={this.props.purchaseList} />
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
        purchaseList: state.purchase.purchaseList,
        updatePurchase: state.purchase.post
        // productsList: state.product.productList,
        // removeSupplier: state.supplier.postDeleted,
        // editSupplier: state.supplier.post
    }
}

export default connect(mapStateToProps)(Purchase)