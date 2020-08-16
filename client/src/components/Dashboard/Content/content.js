import React, { Component } from 'react'
import Dashboard from '../dashboard'

class DashboardContent extends Component {
    render() {
        return (
            <div>
                <div className="nk-content mt-5 ml-md-2">
                    <div className="ml-md-5">
                        <div className="nk-content-inner">
                            <div className="nk-content-body">
                                <div className="nk-block-head nk-block-head-sm">
                                    <div className="nk-block-between">
                                        <div className="nk-block-head-content">
                                            <h4 className="nk-block-title page-title">Dashboard</h4>
                                        </div>
                                    </div>
                                </div>
                                <div className="nk-block">
                                    <div className="row g-gs">
                                        <div className="col-xxl-4 col-md-6">
                                            <div className="card is-dark h-100">
                                                <div className="nk-ecwg nk-ecwg1">
                                                    <div className="card-inner">
                                                        <div className="card-title-group">
                                                            <div className="card-title">
                                                                <h6 className="title">Total Sales</h6>
                                                            </div>
                                                            <div className="card-tools">
                                                                <a href="#" className="link">View Report</a>
                                                            </div>
                                                        </div>
                                                        <div className="data">
                                                            <div className="amount">$74,958.49</div>
                                                            <div className="info"><strong>$7,395.37</strong> in last month</div>
                                                        </div>
                                                        <div className="data">
                                                            <h6 className="sub-title">This week so far</h6>
                                                            <div className="data-group">
                                                                <div className="amount">$1,338.72</div>
                                                                <div className="info text-right"><span className="change up text-danger"><em className="icon ni ni-arrow-long-up"></em>4.63%</span><br/><span>vs. last week</span></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="nk-ecwg1-ck">
                                                        <canvas className="ecommerce-line-chart-s1" id="totalSales"></canvas>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-xxl-4 col-md-6">
                                            <div className="card h-100">
                                                <div className="nk-ecwg nk-ecwg2">
                                                    <div className="card-inner">
                                                        <div className="card-title-group mt-n1">
                                                            <div className="card-title">
                                                                <h6 className="title">Averarge order</h6>
                                                            </div>
                                                            <div className="card-tools mr-n1">
                                                                <div className="dropdown">
                                                                    <a href="#" className="dropdown-toggle btn btn-icon btn-trigger" data-toggle="dropdown"><em className="icon ni ni-more-h"></em></a>
                                                                    <div className="dropdown-menu dropdown-menu-sm dropdown-menu-right">
                                                                        <ul className="link-list-opt no-bdr">
                                                                            <li><a href="#" className="active"><span>15 Days</span></a></li>
                                                                            <li><a href="#"><span>30 Days</span></a></li>
                                                                            <li><a href="#"><span>3 Months</span></a></li>
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="data">
                                                            <div className="data-group">
                                                                <div className="amount">$463.35</div>
                                                                <div className="info text-right"><span className="change up text-danger"><em className="icon ni ni-arrow-long-up"></em>4.63%</span><br/><span>vs. last week</span></div>
                                                            </div>
                                                        </div>
                                                        <h6 className="sub-title">Orders over time</h6>
                                                    </div>
                                                    <div className="nk-ecwg2-ck">
                                                        <canvas className="ecommerce-bar-chart-s1" id="averargeOrder"></canvas>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-xxl-4">
                                            <div className="row g-gs">
                                                <div className="col-xxl-12 col-md-6">
                                                    <div className="card">
                                                        <div className="nk-ecwg nk-ecwg3">
                                                            <div className="card-inner pb-0">
                                                                <div className="card-title-group">
                                                                    <div className="card-title">
                                                                        <h6 className="title">Orders</h6>
                                                                    </div>
                                                                </div>
                                                                <div className="data">
                                                                    <div className="data-group">
                                                                        <div className="amount">329</div>
                                                                        <div className="info text-right"><span className="change up text-danger"><em className="icon ni ni-arrow-long-up"></em>4.63%</span><br/><span>vs. last week</span></div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="nk-ecwg3-ck">
                                                                <canvas className="ecommerce-line-chart-s1" id="totalOrders"></canvas>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-xxl-12 col-md-6">
                                                    <div className="card">
                                                        <div className="nk-ecwg nk-ecwg3">
                                                            <div className="card-inner pb-0">
                                                                <div className="card-title-group">
                                                                    <div className="card-title">
                                                                        <h6 className="title">Customers</h6>
                                                                    </div>
                                                                </div>
                                                                <div className="data">
                                                                    <div className="data-group">
                                                                        <div className="amount">194</div>
                                                                        <div className="info text-right"><span className="change up text-danger"><em className="icon ni ni-arrow-long-up"></em>4.63%</span><br/><span>vs. last week</span></div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="nk-ecwg3-ck">
                                                                <canvas className="ecommerce-line-chart-s1" id="totalCustomers"></canvas>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-xxl-8">
                                            <div className="card card-full">
                                                <div className="card-inner">
                                                    <div className="card-title-group">
                                                        <div className="card-title">
                                                            <h6 className="title">Recent Orders</h6>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="nk-tb-list mt-n2">
                                                    <div className="nk-tb-item nk-tb-head">
                                                        <div className="nk-tb-col"><span>Order No.</span></div>
                                                        <div className="nk-tb-col tb-col-sm"><span>Customer</span></div>
                                                        <div className="nk-tb-col tb-col-md"><span>Date</span></div>
                                                        <div className="nk-tb-col"><span>Amount</span></div>
                                                        <div className="nk-tb-col"><span className="d-none d-sm-inline">Status</span></div>
                                                    </div>
                                                    <div className="nk-tb-item">
                                                        <div className="nk-tb-col">
                                                            <span className="tb-lead"><a href="#">#95954</a></span>
                                                        </div>
                                                        <div className="nk-tb-col tb-col-sm">
                                                            <div className="user-card">
                                                                <div className="user-avatar sm bg-purple-dim">
                                                                    <span>AB</span>
                                                                </div>
                                                                <div className="user-name">
                                                                    <span className="tb-lead">Abu Bin Ishtiyak</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="nk-tb-col tb-col-md">
                                                            <span className="tb-sub">02/11/2020</span>
                                                        </div>
                                                        <div className="nk-tb-col">
                                                            <span className="tb-sub tb-amount">4,596.75 <span>USD</span></span>
                                                        </div>
                                                        <div className="nk-tb-col">
                                                            <span className="badge badge-dot badge-dot-xs badge-success">Paid</span>
                                                        </div>
                                                    </div>
                                                    <div className="nk-tb-item">
                                                        <div className="nk-tb-col">
                                                            <span className="tb-lead"><a href="#">#95850</a></span>
                                                        </div>
                                                        <div className="nk-tb-col tb-col-sm">
                                                            <div className="user-card">
                                                                <div className="user-avatar sm bg-azure-dim">
                                                                    <span>DE</span>
                                                                </div>
                                                                <div className="user-name">
                                                                    <span className="tb-lead">Desiree Edwards</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="nk-tb-col tb-col-md">
                                                            <span className="tb-sub">02/02/2020</span>
                                                        </div>
                                                        <div className="nk-tb-col">
                                                            <span className="tb-sub tb-amount">596.75 <span>USD</span></span>
                                                        </div>
                                                        <div className="nk-tb-col">
                                                            <span className="badge badge-dot badge-dot-xs badge-danger">Canceled</span>
                                                        </div>
                                                    </div>
                                                    <div className="nk-tb-item">
                                                        <div className="nk-tb-col">
                                                            <span className="tb-lead"><a href="#">#95812</a></span>
                                                        </div>
                                                        <div className="nk-tb-col tb-col-sm">
                                                            <div className="user-card">
                                                                <div className="user-avatar sm bg-warning-dim">
                                                                    <img src="./images/avatar/b-sm.jpg" alt=""/>
                                                                </div>
                                                                <div className="user-name">
                                                                    <span className="tb-lead">Blanca Schultz</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="nk-tb-col tb-col-md">
                                                            <span className="tb-sub">02/01/2020</span>
                                                        </div>
                                                        <div className="nk-tb-col">
                                                            <span className="tb-sub tb-amount">199.99 <span>USD</span></span>
                                                        </div>
                                                        <div className="nk-tb-col">
                                                            <span className="badge badge-dot badge-dot-xs badge-success">Paid</span>
                                                        </div>
                                                    </div>
                                                    <div className="nk-tb-item">
                                                        <div className="nk-tb-col">
                                                            <span className="tb-lead"><a href="#">#95256</a></span>
                                                        </div>
                                                        <div className="nk-tb-col tb-col-sm">
                                                            <div className="user-card">
                                                                <div className="user-avatar sm bg-purple-dim">
                                                                    <span>NL</span>
                                                                </div>
                                                                <div className="user-name">
                                                                    <span className="tb-lead">Naomi Lawrence</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="nk-tb-col tb-col-md">
                                                            <span className="tb-sub">01/29/2020</span>
                                                        </div>
                                                        <div className="nk-tb-col">
                                                            <span className="tb-sub tb-amount">1099.99 <span>USD</span></span>
                                                        </div>
                                                        <div className="nk-tb-col">
                                                            <span className="badge badge-dot badge-dot-xs badge-success">Paid</span>
                                                        </div>
                                                    </div>
                                                    <div className="nk-tb-item">
                                                        <div className="nk-tb-col">
                                                            <span className="tb-lead"><a href="#">#95135</a></span>
                                                        </div>
                                                        <div className="nk-tb-col tb-col-sm">
                                                            <div className="user-card">
                                                                <div className="user-avatar sm bg-success-dim">
                                                                    <span>CH</span>
                                                                </div>
                                                                <div className="user-name">
                                                                    <span className="tb-lead">Cassandra Hogan</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="nk-tb-col tb-col-md">
                                                            <span className="tb-sub">01/29/2020</span>
                                                        </div>
                                                        <div className="nk-tb-col">
                                                            <span className="tb-sub tb-amount">1099.99 <span>USD</span></span>
                                                        </div>
                                                        <div className="nk-tb-col">
                                                            <span className="badge badge-dot badge-dot-xs badge-warning">Due</span>
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
                </div>
             
        </div>
            
        )
    }
}

export default DashboardContent;
