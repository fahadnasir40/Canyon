import React, { Component } from 'react'
import Sidebar from '../Sidebar/sidebar'
import Header from './../Header/header'
import Footer from '../Footer/footer'
import Content from './Content/content'
class Users extends Component {

    renderUsers = ()=>{
        return(
            <div className="nk-body bg-lighter npc-default has-sidebar ">
                <div class="nk-app-root">
                    <div class="nk-main"></div>
                    <Sidebar/>         
                    <div className="wrap container-fluid">
                        <Header/>   
                        <div className="custom-dashboard">
                        <div class="nk-block-head-content ml-5">
                                <h3 class="nk-block-title page-title">Users Lists</h3>
                                <div class="nk-block-des text-soft">
                                    <p>You have total 2,595 users.</p>
                                </div>
                            </div>
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
                {this.renderUsers()}
            </div>
        )
    }
}

export default Users;