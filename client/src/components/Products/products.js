import React, { Component } from 'react'
import Sidebar from '../Sidebar/sidebar'
import Header from '../Header/header'
import Footer from '../Footer/footer'
import Content from './Content/content';
import {connect} from 'react-redux';
import {getProducts} from '../../actions';

class Products extends Component {

    componentDidMount(){
        this.props.dispatch(getProducts());
    }

    render(){
        console.log("props",this.props);
        return(
            <div className="nk-body bg-lighter npc-default has-sidebar ">
            <div className="nk-app-root">
                <div className="nk-main"></div>
                <Sidebar/>         
                <div className="wrap container-fluid">
                    <Header user = {this.props.user}/>   
                    <div className="custom-dashboard mt-5">

                        <Content productsList={this.props.productsList} />

                        <Footer/>
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
        // removeSupplier: state.supplier.postDeleted,
        // editSupplier: state.supplier.post
    }
}

export default connect(mapStateToProps)(Products)