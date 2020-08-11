import React, { Component } from 'react'
import {Link} from 'react-router-dom'

class Content extends Component {
    render() {
        return (
            <div>
                <div className="nk-content ml-5 ">
                    <div className="container-fluid">
                        <div className="nk-content-inner">
                            <div className="nk-content-body">
                                <div className="nk-block-head nk-block-head-sm">
                                    <div className="nk-block-between">
                                        <div className="nk-block-head-content">
                                            <h3 className="nk-block-title page-title">Users Lists</h3>
                                            <div className="nk-block-des text-soft">
                                                <p>You have total 5 users.</p>
                                            </div>
                                        </div>
                                        <div className="nk-block-head-content">
                                            <div className="toggle-wrap nk-block-tools-toggle">
                                                <a href="#" className="btn btn-icon btn-trigger toggle-expand mr-n1" data-target="pageMenu"><em className="icon ni ni-menu-alt-r"></em></a>
                                                <div className="toggle-expand-content" data-content="pageMenu">
                                                    <ul className="nk-block-tools g-3">
                                                        <li><a href="#" className="btn btn-white btn-outline-light"><em className="icon ni ni-download-cloud"></em><span>Export</span></a></li>
                                                        <li className="nk-block-tools-opt">
                                                            <div className="drodown">
                                                                <a href="#" className="dropdown-toggle btn btn-icon btn-primary" data-toggle="dropdown"><em className="icon ni ni-plus"></em></a>
                                                                <div className="dropdown-menu dropdown-menu-right">
                                                                    <ul className="link-list-opt no-bdr">
                                                                        
                                                                        <li><Link to="/add"><span>Add User</span></Link></li>
                                                                        <li><a href="#"><span>Add Team</span></a></li>
                                                                        <li><a href="#"><span>Import User</span></a></li>
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                              </div>
                            </div>
                        </div>
                    </div>
                </div>
              
        )
    }
}

export default Content;