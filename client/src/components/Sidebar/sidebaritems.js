import React from 'react';
import { Link, withRouter } from 'react-router-dom';

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
            text: 'Purchases',
            link: '/purchases',
            login: ''
        },
        {
            icon: 'icon ni ni-bag-fill',
            text: 'Orders',
            link: '/news',
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
            icon: 'icon ni ni-users-fill',
            text: 'Suppliers',
            link: '/suppliers',
            login: false
        },
        {
            icon: 'icon ni ni-chat-fill',
            text: 'Transactions',
            link: '/transactions',
            login: true
        },
        {
            icon: 'icon ni ni-chat-fill',
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

    const element = (item,i) => (
          <div key={i} className={item.type}>
              {/* <!-- .nk-menu-item --> */}
            <li className="nk-menu-item">    
              <Link to={item.link} className="nk-menu-link">
                    <span className="nk-menu-icon"><em className= {item.icon}></em></span>
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
        return items.map( (item,i) =>{
            return element(item,i);
        } )
    }


    return(
           <div>
               {showItems()}
           </div> 
    )
}

export default withRouter(SideNavItems);