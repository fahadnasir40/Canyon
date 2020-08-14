import React, { Component } from 'react'
import Sidebar from '../Sidebar/sidebar'
import Header from './../Header/header'
import Footer from '../Footer/footer'
import Content from './Content/content'
import { getUsers } from '../../actions';
import { connect } from 'react-redux';

class Users extends Component {

    

    componentWillMount(){
        this.props.dispatch(getUsers());
    }

    renderUsers = ()=>{
        return(
            <div className="nk-body bg-lighter npc-default has-sidebar ">
                <div className="nk-app-root">
                    <div className="nk-main"></div>
                    <Sidebar/>         
                    <div className="wrap container-fluid">
                        <Header user = {this.props.user}/>   
                        <div className="custom-dashboard mt-5">

                            <Content userList={this.props.userList}/>

                            <Footer/>
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

function mapStateToProps(state){
    return{
        userList:state.user.userList
    }
  }
  
  export default connect(mapStateToProps)(Users)