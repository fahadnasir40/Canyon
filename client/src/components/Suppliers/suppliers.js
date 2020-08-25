import React, { Component } from 'react'
import Sidebar from '../Sidebar/sidebar'
import Header from '../Header/header'
import Footer from '../Footer/footer'
import Content from './Content/content'
import {getSuppliers} from '../../actions'
import {connect} from 'react-redux'

class Suppliers extends Component {


    componentDidMount(){
        this.props.dispatch(getSuppliers());
    }

    render(){
     
        return(
            <div className="nk-body bg-lighter npc-default has-sidebar ">
            <div className="nk-app-root">
                <div className="nk-main"></div>
                <Sidebar/>         
                <div className="wrap container-fluid">
                    <Header user = {this.props.user}/>   
                    <div className="custom-dashboard mt-5">
                        {
                            this.props.suppliersList ?
                            <Content {...this.props}/>
                            :null
                        }
                  

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
      suppliersList: state.supplier.supplierList
    }
  }
  
  export default connect(mapStateToProps)(Suppliers)
  