import React, { Component } from 'react'
import Moment from 'react-moment'
import moment from 'moment';
import Chart from 'chart.js';
import NumberFormat from 'react-number-format'
import $ from 'jquery';

class DashboardContent extends Component {

    getDates = () => {
        Date.prototype.addDays = function (days) {
            var dat = new Date(this.valueOf())
            dat.setDate(dat.getDate() + days);
            return dat;
        }

        function getDates(startDate, stopDate) {
            var dateArray = new Array();
            var currentDate = startDate;
            while (currentDate <= stopDate) {
                dateArray.push(currentDate)
                currentDate = currentDate.addDays(1);
            }
            return dateArray;
        }

        var dateArray = getDates(new Date(), (new Date()).addDays(-30));
        let result = [];

        for (var i = 0; i < dateArray.length; i++) {
            result.push(dateArray[i].getDate() + ' ' + dateArray[i].getMonth());
        }

        return result;
    }

    getListData = (dataList) => {

        let data = new Array(30).fill(0);
        const currentDate = new Date();

        for (var i = 0; i < data.length; i++) {
            dataList.forEach(element => {
                if (moment(element.createdAt).toDate().getDate() === (i + 1)) {
                    const elementDate = moment(element.createdAt);
                    if (currentDate.getMonth() == elementDate.toDate().getMonth()) {

                        const days = elementDate.diff(moment().date(1), 'days')
                        data[i - days + 1] += element.rate;
                    }
                    else
                        data[i] += element.rate;
                }
            });
        }
        return data.reverse();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.data !== this.props.data) {
            const lastThirtyDays = [...new Array(30)].map((i, idx) => moment().startOf("day").subtract(idx, "days").format('DD MMM'));
            var salesStatistics = {
                labels: lastThirtyDays.reverse(),
                dataUnit: 'Rs. ',
                lineTension: .4,
                datasets: [{
                    label: "Total Sales",
                    color: "#835cde",
                    dash: 0,
                    background: '#3b3d98',
                    data: this.getListData(this.props.data.lastMonthSaleList.reverse())
                }]
            };

            this.ecommerceLineS1(salesStatistics)
        }
    }


    ecommerceLineS1 = (set_data) => {
        var $selector = $('.ecommerce-line-chart-s1');
        $selector.each(function () {
            var $self = $(this),
                _self_id = $self.attr('id'),
                _get_data = typeof set_data === 'undefined' ? eval(_self_id) : set_data;

            var selectCanvas = document.getElementById('totalSales').getContext("2d");
            var chart_data = [];

            if (_get_data.datasets) {
                for (var i = 0; i < _get_data.datasets.length; i++) {
                    chart_data.push({
                        label: _get_data.datasets[i].label,
                        tension: _get_data.lineTension,
                        backgroundColor: _get_data.datasets[i].background,
                        borderWidth: 2,
                        borderColor: _get_data.datasets[i].color,
                        pointBorderColor: 'transparent',
                        pointBackgroundColor: 'transparent',
                        pointHoverBackgroundColor: "#fff",
                        pointHoverBorderColor: _get_data.datasets[i].color,
                        pointBorderWidth: 2,
                        pointHoverRadius: 4,
                        pointHoverBorderWidth: 2,
                        pointRadius: 4,
                        pointHitRadius: 4,
                        data: _get_data.datasets[i].data
                    });
                }

            }

            var chart = new Chart(selectCanvas, {
                type: 'line',
                data: {
                    labels: _get_data.labels,
                    datasets: chart_data
                },
                options: {
                    legend: {
                        display: _get_data.legend ? _get_data.legend : false,
                        labels: {
                            boxWidth: 12,
                            padding: 20,
                            fontColor: '#6783b8'
                        }
                    },
                    maintainAspectRatio: false,
                    tooltips: {
                        enabled: true,
                        callbacks: {
                            title: function title(tooltipItem, data) {
                                return data['labels'][tooltipItem[0]['index']];
                            },
                            label: function label(tooltipItem, data) {
                                return data.datasets[tooltipItem.datasetIndex]['data'][tooltipItem['index']] + ' ' + _get_data.dataUnit;
                            }
                        },
                        backgroundColor: '#1c2b46',
                        titleFontSize: 10,
                        titleFontColor: '#fff',
                        titleMarginBottom: 4,
                        bodyFontColor: '#fff',
                        bodyFontSize: 10,
                        bodySpacing: 4,
                        yPadding: 6,
                        xPadding: 6,
                        footerMarginTop: 0,
                        displayColors: false
                    },
                    scales: {
                        yAxes: [{
                            display: false,
                            ticks: {
                                beginAtZero: true,
                                fontSize: 12,
                                fontColor: '#9eaecf',
                                padding: 0
                            },
                            gridLines: {
                                color: "#e5ecf8",
                                tickMarkLength: 0,
                                zeroLineColor: '#e5ecf8'
                            }
                        }],
                        xAxes: [{
                            display: false,
                            ticks: {
                                fontSize: 12,
                                fontColor: '#9eaecf',
                                source: 'auto',
                                padding: 0,
                            },
                            gridLines: {
                                color: "transparent",
                                tickMarkLength: 0,
                                zeroLineColor: '#e5ecf8',
                                offsetGridLines: true
                            }
                        }]
                    }
                }
            });
        });
    } // init chart

    getInitials = (name) => {
        var initials = name.match(/\b\w/g) || [];
        initials = ((initials.shift() || '') + (initials.pop() || '')).toUpperCase();
        return initials;
    }

    bgArray = ['bg-purple-dim', 'bg-azure-dim', 'bg-success-dim', 'bg-warning-dim', 'bg-primary-dim'];
    prArray = ['bg-warning-dim', 'bg-success-dim', 'bg-azure-dim', 'bg-purple-dim', 'bg-primary-dim'];

    render() {
        let data = this.props.data;
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
                                                    {
                                                        data ?
                                                            <div className="card-inner">
                                                                <div className="card-title-group">
                                                                    <div className="card-title">
                                                                        <h6 className="title">Total Sales</h6>
                                                                    </div>
                                                                </div>

                                                                <div className="data">
                                                                    <div className="amount">Rs. <NumberFormat value={data.totalSales} displayType={'text'} thousandSeparator={true} /></div>
                                                                    <div className="info"><strong>Rs. <NumberFormat value={data.lastMonthSale} displayType={'text'} thousandSeparator={true} /></strong> in last month</div>
                                                                </div>
                                                                <div className="data">
                                                                    <h6 className="sub-title">This week so far</h6>
                                                                    <div className="data-group">
                                                                        <div className="amount">Rs. <NumberFormat value={data.lastWeekSale} displayType={'text'} thousandSeparator={true} /></div>
                                                                        <div className="info text-right"><span className="change up text-danger"><em className="icon ni ni-arrow-long-up"></em>{((data.lastWeekSale - data.prevWeekSale) / data.lastWeekSale) * 100}%</span><br /><span>vs. last week</span></div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            : null
                                                    }

                                                    <div className="nk-ecwg1-ck">
                                                        <canvas className="ecommerce-line-chart-s1" id="totalSales"></canvas>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-xxl-4 col-md-8 col-lg-6 order-xxl-last ">
                                            <div className="card h-100">
                                                <div className="card-inner">
                                                    <div className="card-title-group mb-2">
                                                        <div className="card-title">
                                                            <h6 className="title">Top products</h6>
                                                        </div>

                                                    </div>
                                                    <ul className="nk-top-products">
                                                        {
                                                            this.props.topProducts ?
                                                                this.props.topProducts.data ?
                                                                    this.props.topProducts.data.map((item, key) => {
                                                                        const product = this.props.topProducts.products.find(x => x._id === item._id);
                                                                        if (key < 5) {
                                                                            return (
                                                                                <li className="item">
                                                                                    <div className="thumb">
                                                                                        <div className={"user-avatar " + this.prArray[key]}>
                                                                                            <em className="icon ni ni-award"></em>
                                                                                            <span>{key + 1}</span>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="info">
                                                                                        <div className="title">{product.name}</div>
                                                                                        <div className="price">{product.sku}</div>
                                                                                        <div className="price">Rs. {product.price.total}</div>

                                                                                    </div>
                                                                                    <div className="total">
                                                                                        <div className="amount">Rs. {item.totalAmount}</div>
                                                                                        <div className="count">{item.count} Sold</div>
                                                                                    </div>
                                                                                </li>
                                                                            )
                                                                        }
                                                                        return null;
                                                                    })
                                                                    : null
                                                                : null
                                                        }
                                                    </ul>
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
                                                        <div className="nk-tb-col"><span>Customer</span></div>
                                                        <div className="nk-tb-col tb-col-md"><span>Date</span></div>
                                                        <div className="nk-tb-col"><span>Amount</span></div>
                                                        <div className="nk-tb-col"><span className="d-none d-md-inline">Status</span></div>
                                                    </div>
                                                    {
                                                        this.props.data ?
                                                            this.props.data.recentOrders.map((item, key) => (
                                                                <div className="nk-tb-item" key={key}>
                                                                    <div className="nk-tb-col">
                                                                        <span className="tb-lead"><a href="#">#{item._id}</a></span>
                                                                    </div>
                                                                    <div className="nk-tb-col ">
                                                                        <div className="user-card ">
                                                                            <div className={"user-avatar sm " + this.bgArray[key]}>
                                                                                <span>{this.getInitials(item.customerName)}</span>
                                                                            </div>
                                                                            <div className="user-name">
                                                                                <span className="tb-lead">{item.customerName}</span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="nk-tb-col tb-col-md">
                                                                        <span className="tb-sub"><Moment format="DD/MM/YYYY">{item.saleDate}</Moment></span>
                                                                    </div>
                                                                    <div className="nk-tb-col">
                                                                        <span className="tb-sub tb-amount"> <span>Rs.</span> {item.totalAmount}</span>
                                                                    </div>
                                                                    <div className="nk-tb-col  tb-col-md">
                                                                        <span className="badge badge-dot badge-dot-xs badge-success">{item.status}</span>
                                                                    </div>
                                                                </div>
                                                            ))
                                                            : null
                                                    }

                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-xxl-4 col-md-6">
                                            {
                                                data ?
                                                    <div className="card h-100">
                                                        <div className="card-inner">
                                                            <div className="card-title-group mb-2">
                                                                <div className="card-title">
                                                                    <h6 className="title">Store Statistics</h6>
                                                                </div>
                                                            </div>
                                                            <ul className="nk-store-statistics">
                                                                <li className="item">
                                                                    <div className="info">
                                                                        <div className="title">Orders</div>
                                                                        <div className="count"><NumberFormat value={data.totalSalesAmount} displayType={'text'} thousandSeparator={true} /></div>
                                                                    </div>
                                                                    <em className="icon bg-primary-dim ni ni-bag"></em>
                                                                </li>
                                                                <li className="item">
                                                                    <div className="info">
                                                                        <div className="title">Customers</div>
                                                                        <div className="count"><NumberFormat value={data.customerCount} displayType={'text'} thousandSeparator={true} /></div>
                                                                    </div>
                                                                    <em className="icon bg-info-dim ni ni-users"></em>
                                                                </li>
                                                                <li className="item">
                                                                    <div className="info">
                                                                        <div className="title">Suppliers</div>
                                                                        <div className="count"><NumberFormat value={data.supplierCount} displayType={'text'} thousandSeparator={true} /></div>
                                                                    </div>
                                                                    <em className="icon bg-purple-dim ni ni-truck"></em>
                                                                </li>
                                                                <li className="item">
                                                                    <div className="info">
                                                                        <div className="title">Products</div>
                                                                        <div className="count"><NumberFormat value={data.productCount} displayType={'text'} thousandSeparator={true} /></div>
                                                                    </div>
                                                                    <em className="icon bg-pink-dim ni ni-box"></em>
                                                                </li>

                                                            </ul>
                                                        </div>
                                                    </div>
                                                    : null
                                            }
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
