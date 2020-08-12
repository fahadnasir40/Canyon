import React, {Component} from 'react'
import SidebarItems from './sidebaritems'

class SideBar extends Component{


    renderMenuItem=()=>{
        return(
            <ul className="nk-menu">
                <SidebarItems/>
            </ul>
        )
    }

    render(){
        return (
            <div>
                {/* <!-- sidebar @s --> */}
                <div className="nk-sidebar nk-sidebar-fixed is-light " data-content="sidebarMenu">
                    <div className="nk-sidebar-element nk-sidebar-head">
                        <div className="nk-sidebar-brand">
                            <a href="/dashboard" className="logo-link nk-sidebar-logo">
                                <img className="logo-light logo-img" src="./images/logo.png" srcSet="./images/logo2x.png 2x" alt="logo"/>
                                <img className="logo-dark logo-img" src="./images/logo-dark.png" srcSet="./images/logo-dark2x.png 2x" alt="logo-dark"/>
                                <img className="logo-small logo-img logo-img-small" src="./images/logo-small.png" srcSet="./images/logo-small2x.png 2x" alt="logo-small"/>
                            </a>
                        </div>
                        <div className="nk-menu-trigger mr-n2">
                            <a href="#" className="nk-nav-toggle nk-quick-nav-icon d-xl-none" data-target="sidebarMenu"><em className="icon ni ni-arrow-left"></em></a>
                            <a href="#" className="nk-nav-compact nk-quick-nav-icon d-none d-xl-inline-flex" data-target="sidebarMenu"><em className="icon ni ni-menu"></em></a>
                        </div>
                    </div>
                    {/* <!-- .nk-sidebar-element --> */}
                    <div className="nk-sidebar-element">
                        <div className="nk-sidebar-content">
                            <div className="nk-sidebar-menu" data-simplebar>
                                {this.renderMenuItem()}
                                {/* <!-- .nk-menu --> */}
                            </div>
                            {/* <!-- .nk-sidebar-menu --> */}
                        </div>
                        {/* <!-- .nk-sidebar-content --> */}
                    </div>
                    {/* <!-- .nk-sidebar-element --> */}
                </div>
        </div>
    )
    }

}

export default SideBar;