import React, {Component} from 'react'
import SidebarItems from './sidebaritems'

class SideBar extends Component{


    renderMenuItem=()=>{
        return(
            <ul class="nk-menu">
                <SidebarItems/>
            </ul>
        )
    }

    render(){
        return (
            <div>
                {/* <!-- sidebar @s --> */}
                <div class="nk-sidebar nk-sidebar-fixed is-light " data-content="sidebarMenu">
                    <div class="nk-sidebar-element nk-sidebar-head">
                        <div class="nk-sidebar-brand">
                            <a href="html/index.html" class="logo-link nk-sidebar-logo">
                                <img class="logo-light logo-img" src="./images/logo.png" srcset="./images/logo2x.png 2x" alt="logo"/>
                                <img class="logo-dark logo-img" src="./images/logo-dark.png" srcset="./images/logo-dark2x.png 2x" alt="logo-dark"/>
                                <img class="logo-small logo-img logo-img-small" src="./images/logo-small.png" srcset="./images/logo-small2x.png 2x" alt="logo-small"/>
                            </a>
                        </div>
                        <div class="nk-menu-trigger mr-n2">
                            <a href="#" class="nk-nav-toggle nk-quick-nav-icon d-xl-none" data-target="sidebarMenu"><em class="icon ni ni-arrow-left"></em></a>
                            <a href="#" class="nk-nav-compact nk-quick-nav-icon d-none d-xl-inline-flex" data-target="sidebarMenu"><em class="icon ni ni-menu"></em></a>
                        </div>
                    </div>
                    {/* <!-- .nk-sidebar-element --> */}
                    <div class="nk-sidebar-element">
                        <div class="nk-sidebar-content">
                            <div class="nk-sidebar-menu" data-simplebar>
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