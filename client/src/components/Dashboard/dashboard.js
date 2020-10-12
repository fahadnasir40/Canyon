import React, { PureComponent } from 'react'
import Sidebar from '../Sidebar/sidebar'
import Header from './../Header/header'
import Content from './Content/content'
import Footer from '../Footer/footer'
import { connect } from 'react-redux'
import { getDashboard, getDashboardProducts, clearDashboard } from '../../actions';
import { data } from 'jquery'

class Dashboard extends PureComponent {

    state = {
        productsList: [],
        data: '',
        topProducts: ''
    }

    componentDidMount() {
        this.props.dispatch(getDashboard())

    }

    componentDidUpdate(prevProps, prevState) {
        if (!this.state.data) {
            this.props.dispatch(getDashboard())
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {

        if (nextProps.data) {
            if (nextProps.data.error) {
                return {
                    error: true
                }
            }
            if (nextProps.data.topProducts) {
                if (!nextProps.topProducts)
                    nextProps.dispatch(getDashboardProducts(nextProps.data.topProducts));
            }

            return {
                data: nextProps.data,
                topProducts: nextProps.topProducts
            }
        }
        return null;
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
                            <Content data={this.state.data} topProducts={this.state.topProducts} />
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
    return {
        data: state.dashboard.data,
        topProducts: state.dashboard.topProduct
    }
}

export default connect(mapStateToProps)(Dashboard)