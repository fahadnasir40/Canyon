import React, { Component } from 'react'
import Sidebar from '../Sidebar/sidebar'
import Header from './../Header/header'
import Content from './Content/content'
import Footer from '../Footer/footer'
import { connect } from 'react-redux'
import { getProfile, clearProfile } from '../../actions';
import $ from 'jquery';

class Profile extends Component {

    componentDidMount() {
        this.props.dispatch(getProfile());

        $('#container').on('click', function (e) {
            if ($('#sidebarUserProfile').hasClass('content-active'))
                $('#sidebarUserProfile').removeClass('content-active');
        });

    }

    componentWillUnmount() {
        this.props.dispatch(clearProfile());
    }


    renderProfile = () => {
        return (
            <div className="nk-body bg-lighter npc-general has-sidebar" id="container">
                <div className="nk-app-root">
                    <div className="nk-main "></div>
                    <Sidebar {...this.props} />
                    <div className="wrap container-fluid">
                        <Header user={this.props.user} />
                        <div className="custom-dashboard">
                            <Content {...this.props} profile={this.props.user} />
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
                {this.renderProfile()}
            </div>
        )
    }
}

function mapStateToProps(state) {

    return {
        profile: state.user.profile
    }
}

export default connect(mapStateToProps)(Profile)