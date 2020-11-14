import React from 'react'
import Moment from 'react-moment'
const Footer = () => {
    return (
        <div className="nk-footer ml-md-5 ">
            <div className="nk-footer-wrap ml-4">
                <div className="nk-footer-copyright"> &copy; <Moment format='YYYY'></Moment> Canyon Mineral Water. All rights reserved.
                    </div>
            </div>
        </div>
    )
}

export default Footer;