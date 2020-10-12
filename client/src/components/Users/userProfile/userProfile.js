import React, { Component } from 'react'
import Sidebar from '../../Sidebar/sidebar'
import Header from '../../Header/header'
import Content from './Content/profileContent'
import Footer from '../../Footer/footer'
import { connect } from 'react-redux'
import $ from 'jquery';

class UserProfile extends Component {

    state = {
        profile: ''
    }

    componentDidMount() {
        if (!this.props.location.state) {
            this.props.history.push('/users')
        }
        else {
            this.setState({
                profile: this.props.location.state.userInfo
            })
        }

        $('#container').on('click', function (e) {
            if ($('#sidebarUserProfile').hasClass('content-active'))
                $('#sidebarUserProfile').removeClass('content-active');
        });

    }

    renderProfile = () => {
        return (
            <div className="nk-body bg-lighter npc-general has-sidebar" id="container">
                <div className="nk-app-root">
                    <div className="nk-main "></div>
                    <Sidebar />
                    <div className="wrap container-fluid">
                        <Header user={this.props.user} />
                        <div className="custom-dashboard">
                            <Content {...this.props} profile={this.state.profile} />
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
        // profile: state.user.profile
    }
}

export default connect(mapStateToProps)(UserProfile)