import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import $ from 'jquery'

const SideNavItems = (props) => {
    const items = [
        {
            icon: 'icon ni ni-dashboard-fill',
            text: 'Dashboard',
            link: '/dashboard',
            login: ''
        },
        {
            icon: 'icon ni ni-bag-fill',
            text: 'Orders',
            link: '/orders',
            login: true
        },
        {
            icon: 'icon ni  ni-cc-alt2-fill',
            text: 'Purchases',
            link: '/purchases',
            login: ''
        },
        {
            icon: 'icon ni ni-package-fill',
            text: 'Products',
            link: '/products',
            login: ''
        },
        {
            icon: 'icon ni ni-users-fill',
            text: 'Customers',
            link: '/customers',
            login: true
        },
        ,
        {
            icon: 'icon ni ni-truck',
            text: 'Suppliers',
            link: '/suppliers',
            login: ''

        },
        {
            icon: 'icon ni ni-activity-round-fill',
            text: 'Transactions',
            link: '/transactions',
            login: ''
        },
        {
            icon: 'icon ni ni-user-list-fill',
            text: 'Users',
            link: '/users',
            login: ''
        }
    ]

    const setCurrentLink = () => {

        var _link = '.nk-menu-link, .menu-link, .nav-link',
            _currentURL = window.location.href,
            fileName = _currentURL.substring(0, _currentURL.indexOf("#") == -1 ? _currentURL.length : _currentURL.indexOf("#")),
            fileName = fileName.substring(0, fileName.indexOf("?") == -1 ? fileName.length : fileName.indexOf("?"));

        $(_link).each(function () {
            var self = $(this),
                _self_link = self.attr('href');

            if (fileName.match(_self_link)) {
                self.closest("li").addClass('active current-page').parents().closest("li").addClass("active current-page");
                self.closest("li").children('.nk-menu-sub').css('display', 'block');
                self.parents().closest("li").children('.nk-menu-sub').css('display', 'block');
            } else {
                self.closest("li").removeClass('active current-page').parents().closest("li:not(.current-page)").removeClass("active");
            }
        });
    }; // PasswordSwitch @v1.0

    const element = (item, i, props) => {
        if (props.user) {
            if (props.user.login.role === 'worker' && item.login === true) {
                return (<div key={i} className={item.type}>
                    <li className="nk-menu-item">
                        <Link to={item.link} className="nk-menu-link">
                            <span className="nk-menu-icon"><em className={item.icon}></em></span>
                            <span className="nk-menu-text">{item.text}</span>
                        </Link>
                    </li>
                </div>)
            }
            else if (props.user.login.role !== 'worker') {
                return (<div key={i} className={item.type}>
                    <li className="nk-menu-item">
                        <Link to={item.link} className="nk-menu-link">
                            <span className="nk-menu-icon"><em className={item.icon}></em></span>
                            <span className="nk-menu-text">{item.text}</span>
                        </Link>
                    </li>
                </div>)
            }

        }
        else {
            return (<div key={i} className={item.type}>
                <li className="nk-menu-item">
                    <Link to={item.link} className="nk-menu-link">
                        <span className="nk-menu-icon"><em className={item.icon}></em></span>
                        <span className="nk-menu-text">{item.text}</span>
                    </Link>
                </li>
            </div>)
        }
    }



    const showItems = (props) => {
        return items.map((item, i) => {
            return element(item, i, props);
        })
    }


    return (
        <div>
            {showItems(props)}
            {setCurrentLink()}
        </div>
    )
}

export default withRouter(SideNavItems);