import React, { Component } from 'react'
import Sidebar from '../Sidebar/sidebar'
import Header from './../Header/header'
import Content from './Content/content'
import Footer from '../Footer/footer'
import { connect } from 'react-redux'
import { getDashboard } from '../../actions';

class Dashboard extends Component {

    componentDidMount() {
        this.props.dispatch(getDashboard())
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        console.log(("Next Props", nextProps));
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
        // salesList: state.dashboard.data.salesList
    }
}

export default connect(mapStateToProps)(Dashboard)