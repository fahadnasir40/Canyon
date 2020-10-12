import React, { Component } from 'react'
import Sidebar from '../Sidebar/sidebar'
import Header from './../Header/header'
import Footer from '../Footer/footer'
import Content from './Content/content'
import { getUsers, changeUser } from '../../actions';
import { connect } from 'react-redux';
import Swal from 'sweetalert2'
class Users extends Component {

    state = {
        reload: false
    }

    componentDidMount() {
        this.props.dispatch(getUsers());
    }

    changeStatus = (user) => {

        Swal.fire({
            title: 'Are you sure?',
            text: "Change status of user account",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, change it!'
        }).then((result) => {
            if (result.value) {
                if (user.status) {
                    if (user.status === 'suspended') {
                        user.status = 'active'
                        this.props.dispatch(changeUser(user))
                    }
                    else {
                        user.status = 'suspended'
                        this.props.dispatch(changeUser(user))
                    }
                }
                else {
                    user.status = 'suspended'
                    this.props.dispatch(changeUser(user))
                }
                this.setState({
                    reload: true
                })
            }
        })
    }


    static getDerivedStateFromProps(nextProps, prevState) {

        if (prevState.reload) {
            window.location.reload(false);
        }
        return null;
    }

    renderUsers = () => {
        return (
            <div className="nk-body bg-lighter npc-default has-sidebar ">
                <div className="nk-app-root">
                    <div className="nk-main"></div>
                    <Sidebar />
                    <div className="wrap container-fluid">
                        <Header user={this.props.user} />
                        <div className="custom-dashboard mt-5">
                            <Content {...this.props} userList={this.props.userList} changeStatus={this.changeStatus} />
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
                {this.renderUsers()}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        userList: state.user.userList
    }
}

export default connect(mapStateToProps)(Users)