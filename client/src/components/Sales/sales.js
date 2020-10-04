import React, { Component } from 'react'
import Sidebar from '../Sidebar/sidebar'
import Header from '../Header/header'
import Footer from '../Footer/footer'
import Content from './Content/content';
import { connect } from 'react-redux';
import { getSales, updateSalePaid } from '../../actions';


class Sale extends Component {

    componentDidMount() {
        this.props.dispatch(getSales());
    }

    updateSale = (sale) => {
        this.props.dispatch(updateSalePaid(sale))
    }

    static getDerivedStateFromProps(nextProps) {
        if (nextProps.updateSale) {
            if (nextProps.updateSale === true) {
                window.location.reload(false);
            }
        }
    }


    render() {
        return (
            <div className="nk-body bg-lighter npc-default has-sidebar ">
                <div className="nk-app-root">
                    <div className="nk-main"></div>
                    <Sidebar {...this.props} />
                    <div className="wrap container-fluid">
                        <Header user={this.props.user} />
                        <div className="custom-dashboard mt-5">
                            <Content updateSale={this.updateSale} saleList={this.props.saleList} />
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
        saleList: state.sale.saleList,
        updateSale: state.sale.post
    }
}

export default connect(mapStateToProps)(Sale)