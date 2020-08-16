import React, { Component } from 'react'
import Sidebar from '../Sidebar/sidebar'
import Header from './../Header/header'
import Footer from '../Footer/footer'
// import Content from './Content/content'

class Products extends Component {
        render(){
            return(
                <div className="nk-body bg-lighter npc-default has-sidebar ">
                    <div class="nk-app-root">
                        <div class="nk-main"></div>
                        <Sidebar/>         
                        <div className="wrap container-fluid">
                        <Header/>
                            <div className="custom-dashboard ml-md-5 mt-5">

                                {/* <Content/> */}

                                <Footer/>
                            </div>
                        </div>  
                    </div>
                </div>
            )
        }
}

export default Products