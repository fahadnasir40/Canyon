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
            link: '/sales',
            login: ''
        },
        {
            icon: 'icon ni  ni-cc-alt2-fill',
            text: 'Purchases',
            link: '/addpurchase',
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
            login: false
        },
        ,
        {
            icon: 'icon ni ni-truck',
            text: 'Suppliers',
            link: '/suppliers',
            login: false
        },
        {
            icon: 'icon ni ni-activity-round-fill',
            text: 'Transactions',
            link: '/transactions',
            login: true
        },
        {
            icon: 'icon ni ni-user-list-fill',
            text: 'Users',
            link: '/users',
            login: true
        },
        {
            icon: 'icon ni ni-server-fill',
            text: 'Settings',
            link: '/settings',
            login: false
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

    const element = (item, i) => (
        <div key={i} className={item.type}>
            {/* <!-- .nk-menu-item --> */}
            <li className="nk-menu-item">
                <Link to={item.link} className="nk-menu-link">
                    <span className="nk-menu-icon"><em className={item.icon}></em></span>
                    <span className="nk-menu-text">{item.text}</span>
                </Link>
            </li>
        </div>
    )


    // const restricted = (item,i) => {
    //     let template = null;

    //     if( props.user === null && item.login ){
    //         template = element(item,i)
    //     }

    //     if(props.user !== null && !item.login){
    //         if(item.link === '/sign-out'){
    //             template = (
    //                 <div key={i} 
    //                     className={item.type}
    //                     onClick={()=>{
    //                         firebase.auth().signOut()
    //                         .then(()=>{
    //                             props.history.push("/")
    //                         })
    //                     }}
    //                     >
    //                     <FontAwesome name={item.icon}/>
    //                     {item.text}
    //                 </div>
    //             )

    //         } else {
    //             template = element(item,i)
    //         }
    //     }

    //     return template;
    // }


    const showItems = () => {
        return items.map((item, i) => {
            return element(item, i);
        })
    }


    return (
        <div>
            {showItems()}
            {setCurrentLink()}
        </div>
    )
}

export default withRouter(SideNavItems);