import React, { Component } from 'react'
import Sidebar from '../Sidebar/sidebar'
import Header from '../Header/header'
import Footer from '../Footer/footer'
import Content from './Content/content';
import { connect } from 'react-redux';
import { getProducts, updateProduct, clearNewProduct } from '../../actions';
import Swal from 'sweetalert2';
class Products extends Component {

    state = {
        reload: false
    }

    componentDidMount() {
        this.props.dispatch(getProducts());
    }

    changeStatus = (product) => {

        if (product.status === 'active') {
            product.status = 'inactive'
            this.props.dispatch(updateProduct(product))
        }
        else if (product.status === 'inactive') {
            product.status = 'active'
            this.props.dispatch(updateProduct(product))
        }

        this.setState({ reload: true })
    }

    componentWillUnmount() {
        this.props.dispatch(clearNewProduct());
    }

    render() {

        if (this.state.reload) {
            Swal.fire({
                icon: 'success',
                title: `Product Status Changed`,
                showConfirmButton: false,
                timer: 1500
            }).then(() => {
                this.setState({ reload: false });
                window.location.reload(false);
            })
        }

        return (
            <div className="nk-body bg-lighter npc-default has-sidebar ">
                <div className="nk-app-root">
                    <div className="nk-main"></div>
                    <Sidebar />
                    <div className="wrap container-fluid">
                        <Header user={this.props.user} />
                        <div className="custom-dashboard mt-5">
                            <Content key={this.props.bar} productsList={this.props.productsList} changeStatus={this.changeStatus} />
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
        productsList: state.product.productList,
    }
}

export default connect(mapStateToProps)(Products)