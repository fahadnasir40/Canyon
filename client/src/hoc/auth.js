
import React, { Component } from 'react';
import { auth } from '../actions'
import { connect } from 'react-redux';

export default function (ComposedClass, reload) {
    class AuthenticationCheck extends Component {

        state = {
            loading: true
        }

        componentDidMount() {
            this.props.dispatch(auth())
        }

        UNSAFE_componentWillReceiveProps(nextProps) {
            this.setState({ loading: false })

            if (!nextProps.user.login.isAuth) {
                if (reload) {
                    this.props.history.push('/');
                }
            } else {
                if (reload === false) {
                    this.props.history.push('/dashboard')
                }
            }
        }

        render() {
            if (this.state.loading) {
                return null;
            }
            return (
                <ComposedClass {...this.props} user={this.props.user} />
            )
        }
    }

    function mapStateToProps(state) {
        return {
            user: state.user
        }
    }

    return connect(mapStateToProps)(AuthenticationCheck)
}