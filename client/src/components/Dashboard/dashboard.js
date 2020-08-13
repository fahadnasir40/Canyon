import React, { Component } from 'react'
import Sidebar from '../Sidebar/sidebar'
import Header from './../Header/header'
import Content from './Content/content'
import Footer from '../Footer/footer'

class Dashboard extends Component {

    renderDashboard = ()=>{
        return(
            <div className="nk-body bg-lighter npc-general has-sidebar">
                <div className="nk-app-root">
                    <div className="nk-main "></div>
                    <Sidebar/>         
                    <div className="wrap container-fluid">
                        <Header user = {this.props.user}/>   
                        <div className="custom-dashboard">
                            <Content/>    
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
                {this.renderDashboard()}
            </div>
        )
    }
}

export default Dashboard;