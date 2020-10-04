import React, { Component } from 'react'
import Sidebar from '../Sidebar/sidebar'
import Header from './../Header/header'
import Content from './Content/content'
import Footer from '../Footer/footer'
import { connect } from 'react-redux'
import { getDashboard, getDashboardProducts } from '../../actions';

class Dashboard extends Component {

    state = {
        productsList: []
    }

    componentDidMount() {
        this.props.dispatch(getDashboard())
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.data) {
            if (nextProps.data.topProducts) {
                if (!nextProps.topProducts)
                    nextProps.dispatch(getDashboardProducts(nextProps.data.topProducts));
            }
        }
    }

    renderDashboard = () => {
        return (
            <div className="nk-body bg-lighter npc-general has-sidebar">
                <div className="nk-app-root">
                    <div className="nk-main "></div>
                    <Sidebar {...this.props} />
                    <div className="wrap container-fluid">
                        <Header user={this.props.user} />
                        <div className="custom-dashboard">
                            <Content {...this.props} />
                            <Footer />
                        </div>
                    </div>
                </div>
            </div>
        )
    }


    render() {
        return (
            <div>
                {this.renderDashboard()}
            </div>
        )
    }
}


function mapStateToProps(state) {
    console.log("State", state)
    return {
        data: state.dashboard.data,
        topProducts: state.dashboard.topProduct
    }
}

export default connect(mapStateToProps)(Dashboard)