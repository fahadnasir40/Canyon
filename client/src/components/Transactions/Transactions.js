import React, { Component } from 'react'
import Sidebar from '../Sidebar/sidebar'
import Header from '../Header/header'
import Footer from '../Footer/footer'
import Content from './Content/content'

class Transactions extends Component {
        render(){
            return(
                <div className="nk-body bg-lighter npc-default has-sidebar ">
                <div className="nk-app-root">
                    <div className="nk-main"></div>
                    <Sidebar/>         
                    <div className="wrap container-fluid">
                        <Header user = {this.props.user}/>   
                        <div className="custom-dashboard mt-5">

                            {/* <Content userList={this.props.userList}/> */}

                            <Footer/>
                        </div>
                    </div>  
                 </div>
            </div>
            )
        }
}

export default Transactions