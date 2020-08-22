import React, { Component } from 'react'
import Sidebar from '../Sidebar/sidebar'
import Header from './../Header/header'
import Content from './Content/content'
import Footer from '../Footer/footer'
import {connect} from 'react-redux'
import {getProfile} from '../../actions'

class Profile extends Component {

    UNSAFE_componentWillMount(){
        this.props.dispatch(getProfile());
    }

    
    renderProfile = ()=>{
        return(
            <div className="nk-body bg-lighter npc-general has-sidebar">
                <div className="nk-app-root">
                    <div className="nk-main "></div>
                    <Sidebar />         
                    <div className="wrap container-fluid">
                        <Header user = {this.props.user}/>   
                        <div className="custom-dashboard">
                            <Content profile= {this.props.user}/>    
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
                {this.renderProfile()}
            </div>
        )
    }
}

function mapStateToProps(state){
 
    return{
        profile: state.user.profile
    }
  }
  
  export default connect(mapStateToProps)(Profile)