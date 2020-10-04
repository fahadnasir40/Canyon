import React, { Component } from 'react'
import SidebarItems from './sidebaritems'
import { Link } from 'react-router-dom'
import $ from 'jquery'

class SideBar extends Component {


    renderMenuItem = () => {
        return (
            <ul className="nk-menu">
                <SidebarItems {...this.props} />
            </ul>
        )
    }

    sbCompact = function () {
        var toggle = '.nk-nav-compact', $toggle = $(toggle), $content = $('[data-content]');

        $toggle.on('click', function (e) {
            e.preventDefault();
            var $self = $(this), get_target = $self.data('target'),
                $self_content = $('[data-content=' + get_target + ']');

            $self.toggleClass('compact-active');
            $self_content.toggleClass('is-compact');
        });
    };

    showNav = (x) => {
        if (x.matches) {
            $('.nk-sidebar').css('transform', 'translateX(0)');
        } else {
            $('.nk-sidebar').css('transform', 'translateX(-100%)');
        }
    }

    componentDidMount() {
        var x = window.matchMedia("(min-width: 1200px)")
        x.addListener(this.showNav)
    }

    hideNav = () => {
        if (window.matchMedia('(max-width: 1200px)').matches) {
            $('.nk-sidebar').css('transform', 'translateX(-100%)');
        }
    }

    render() {
        return (
            <div>
                {/* <!-- sidebar @s --> */}
                <div className="nk-sidebar nk-sidebar-fixed is-theme " data-content="sidebarMenu">
                    <div className="nk-sidebar-element nk-sidebar-head">
                        <div className="nk-sidebar-brand">
                            <Link to="/" className="logo-link nk-sidebar-logo">
                                <img className="logo-light logo-img" srcSet="./images/logo.png" srcSet="./images/logo2x.png 2x" alt="logo" />
                                <img className="logo-dark logo-img" srcSet="./images/logo-dark.png" srcSet="./images/logo-dark2x.png 2x" alt="logo-dark" />
                                <img className="logo-small logo-img logo-img-small" srcSet="./images/logo-small.png" srcSet="./images/logo-small2x.png 2x" alt="logo-small" />
                            </Link>
                        </div>
                        <div className="nk-menu-trigger mr-n2">
                            <a style={{ cursor: "pointer" }} onClick={this.hideNav} className="nk-nav-toggle nk-quick-nav-icon d-xl-none" data-target="sidebarMenu"><em className="icon ni ni-arrow-left"></em></a>
                            <a style={{ cursor: "pointer" }} onClick={this.sbCompact} className="nk-nav-compact nk-quick-nav-icon d-none d-xl-inline-flex" data-target="sidebarMenu"><em className="icon ni ni-menu"></em></a>
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