import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import DataTable from 'react-data-table-component';
import Moment from 'react-moment';
import Swal from 'sweetalert2';
import NumberFormat from 'react-number-format'
import $ from 'jquery'
import { Button } from 'bootstrap';

class Content extends Component {

    state = {
        saleList: this.props.saleList,
    }

    columns = [

        // {
        //     // name: 'Sale Order',
        //     // selector: '_id',
        //     // sortable: true,
        //     // style: {
        //     //     color: '#202124',
        //     //     fontSize: '14px',
        //     //     fontWeight: 500,
        //     // },
        //     cell: row => (
        //         <div className="tb-odr-item">
        //             <td className="tb-odr-info">
        //                 {/* <span className="tb-odr-id text-azure">{row._id}</span> */}
        //                 <span className="tb-odr-date d-sm-none"><Moment format={'DD MMM YYYY'}>{row.saleDate}</Moment></span>
        //             </td>
        //         </div>
        //     )
        // },
        {
            name: 'Date',
            selector: 'saleDate',
            sortable: true,
            hide: 'lg',
            cell: row => (
                <div className="tb-odr-item">
                    <td className="tb-odr-info">
                        <span className="tb-odr-date"><Moment format={'DD MMM YYYY'}>{row.saleDate}</Moment></span>
                    </td>
                </div>
            )
        },
        {
            name: 'Customer',
            selector: 'customerName',
            sortable: true,
            hide: 'md',
            cell: row => (
                <div className="tb-odr-item">
                    <div className="title">{row.customerName}</div>
                </div>
            )

        },
        {
            name: 'Amount',
            selector: 'totalAmount',
            sortable: true,
            style: {
                color: 'rgba(0,0,0,.54)',
            },
            cell: row => (
                <div className="tb-odr-item">
                    <td className="tb-odr-amount">
                        <span className="tb-odr-total">
                            <span className="amount">Rs. <NumberFormat value={this.calculateTotalAmount(row)} displayType={'text'} thousandSeparator={true} /> </span>
                        </span>
                        <span className="tb-odr-status d-sm-none">
                            {
                                row.status === 'Pending' ?
                                    <span className="badge badge-dot badge-warning">{row.status}</span>
                                    :
                                    row.status === 'Complete' ?
                                        <span className="badge badge-dot badge-success">{row.status}</span>
                                        :
                                        row.status === 'Returned' ?
                                            <span className="badge badge-dot badge-success">{row.status}</span>
                                            : null
                            }
                        </span>
                    </td>
                </div>
            ),
        },
        , {
            name: 'Due Line Amt',
            selector: 'Due Line Amt',
            sortable: true,
            style: {
                color: 'rgba(0,0,0,.54)',
            },
            cell: row => (
                <div className="tb-odr-item">
                    <td className="tb-odr-amount">
                        <span className="amount">Rs. <NumberFormat value={Number(row.totalAmount) - Number(row.paidAmount) > 0 ? Number(row.totalAmount) - Number(row.paidAmount) : 0} displayType={'text'} thousandSeparator={true} /> </span>
                    </td>
                </div>
            ),
        },
        // {
        //     name: 'Description',
        //     selector: 'description',
        //     sortable: true,
        //     hide: 'md',
        //     cell: row => (
        //         <div>
        //             {
        //                 row.description.length > 20 ?
        //                     <p className="fw-normal">{row.description.substr(0, 20) + ' ...'}</p> :
        //                     <p className="text-muted">No description added</p>
        //             }
        //         </div>
        //     ),
        // },
        , {
            name: 'Sec Due',
            selector: 'Sec Due',
            sortable: true,
            style: {
                color: 'rgba(0,0,0,.54)',
            },
            cell: row => (
                <div className="tb-odr-item">
                    <td className="tb-odr-amount">
                        <span className="amount">Rs. <NumberFormat value={Number(row.secAmount) > 0 ? Number(row.secAmount) : 0} displayType={'text'} thousandSeparator={true} /> </span>
                    </td>
                </div>
            ),
        },
        {
            name: 'Status',
            selector: 'status',
            sortable: true,
            hide: 'sm',
            cell: row => (
                <div className="tb-odr-item">
                    <td className="tb-odr-amount">
                        <span className="tb-odr-status">
                            {
                                row.status === 'Pending' ?
                                    <span className="badge badge-dot badge-warning">{row.status}</span>
                                    :

                                    row.status === 'Complete' ?
                                        <span className="badge badge-dot badge-success">{row.status}</span>
                                        :
                                        row.status === 'Returned' ?
                                            <span className="badge badge-dot badge-info">{row.status}</span>
                                            : null
                            }
                        </span>
                    </td>
                </div>
            )
        },

        // {
        //     name: 'Action',
        //     selector: 'action',

        //     cell: row => (
        //         <div>
        //             <div className="d-none d-md-inline">
        //                 <Link to={{
        //                     pathname: `/sale_invoice_id=${row._id}`,
        //                 }} className="btn btn-dim btn-sm btn-primary">View</Link>
        //             </div>
        //         </div>
        //     ),
        // },
        {
            name: 'Mark Line Amt Complete',
            selector: 'mark',
            sortable: true,
            cell: row => (
                <div>
                    {
                        Number(row.totalAmount) - Number(row.paidAmount) > 0 ?
                            <button className="btn btn-dim btn-sm btn-danger" onClick={() => { this.markLineAmountComplete(row) }}
                                disabled={false}>Due</button>
                            : <button className="btn btn-sm btn-info" disabled={true}>Paid</button>}
                </div>
            )
        },
        {
            name: 'Mark Security Complete',
            selector: 'security',
            sortable: true,
            cell: row => (
                <div>
                    {
                        Number(row.secAmount) > 0 ?
                            <button className="btn btn-dim btn-sm btn-danger" onClick={() => { this.markSecurityComplete(row) }}
                                disabled={false}>Due </button>
                            : <button className="btn btn-sm btn-info" disabled={true}>Paid</button>}
                </div>
            )
        },
        {
            name: 'Action',
            selector: 'action',

            cell: row => (
                <div>
                    <div className="d-none d-md-inline">
                        <Link to={{
                            pathname: `/sale_invoice_id=${row._id}`,
                        }} className="btn btn-dim btn-sm btn-primary">View</Link>
                    </div>
                </div>
            ),
        },
        {
            cell: row => (
                <div>
                    <div className="d-none d-md-inline">
                        {
                            Number(row.totalAmount) > 0 ?
                                <button className="btn btn-icon btn-white btn-dim btn-lg  btn-primary py-n1" onClick={() => { this.editPaidAmount(row) }}
                                    disabled={false}><em className="iconicon ni ni-edit"></em></button>
                                : <div className="btn btn-icon btn-white btn-dim btn-lg  btn-primary py-n1"><em className="iconicon ni ni-edit"></em></div>
                        }
                    </div>
                </div>
            )
        },
    ];

    SampleExpandedComponent = ({ data }) => {
        return (
            <div className="container-fluid">
                <div className="row d-lg-none">
                    <div className="col">
                        <span className="title fw-medium">Id# </span> <span className="fw-normal"> {data._id}</span>
                    </div>
                </div>
                <div className="row d-lg-none">
                    <div className="col">
                        <span className="title fw-medium">Name: </span> <span className="fw-normal"> {data.customerName}</span>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <span className="title fw-medium">Description: </span> <span className="fw-normal"> {data.description ? data.description : 'No description added.'}</span>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <span className=" fw-medium">Items Paid Amount: </span> <span className="fw-normal">Rs. <NumberFormat value={Number(data.paidAmount)} displayType={'text'} thousandSeparator={true} /></span>

                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <span className=" fw-medium">Total Paid Amount: </span> <span className="fw-normal">Rs. <NumberFormat value={Number(data.paidAmount) + (Number(this.calculateTotalSecurity(data)) - Number(data.secAmount))} displayType={'text'} thousandSeparator={true} /></span>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <span className=" fw-medium">Line Amount Due: </span> <span className="fw-normal">Rs. {Number(data.totalAmount) - Number(data.paidAmount) > 0 ? Number(data.totalAmount) - Number(data.paidAmount) : 0}</span>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <span className=" fw-medium">Security Due: </span> <span className="fw-normal">Rs. {Number(data.secAmount)}</span>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <span className=" fw-medium">Sale Date: </span> <span className="fw-normal"><Moment format="DD MMM, YYYY hh:mm A">{data.saleDate}</Moment></span>
                    </div>
                </div>
                {
                    data.status !== 'Returned' ?
                        <div className="row my-3">
                            <div width="20px">
                                <div onClick={() => { this.props.refundSale(data) }} class="btn btn-icon  btn-danger    ml-3 d-sm-block px-2"><em class="iconicon ni ni-edit"> Refund</em></div>
                            </div>
                        </div>
                        : null
                }
                <div className="row d-md-none">
                    <div width="20px">
                        <div onClick={() => { this.editPaidAmount(data) }} class="btn btn-icon btn-white btn-dim btn-lg  btn-primary  ml-3 d-sm-block px-2"><em class="iconicon ni ni-edit"> Edit</em></div>
                    </div>
                </div>
            </div>
        )
    };



    componentDidUpdate(prevProps) {
        if (prevProps.saleList !== this.props.saleList) {
            this.setState({ saleList: this.props.saleList });
        }
    }


    handleSearchChange = (e) => {
        // Variable to hold the original version of the list
        let currentList = [];
        // Variable to hold the filtered list before putting into state
        let newList = [];

        // If the search bar isn't empty
        if (e.target.value !== "") {
            // Assign the original list to currentList
            currentList = this.props.saleList;

            // Use .filter() to determine which items should be displayed
            // based on the search terms
            newList = currentList.filter(item => {
                // change current item to lowercase
                const lc = item.customerName.toLowerCase();
                // change search term to lowercase
                const filter = e.target.value.toLowerCase();
                // check to see if the current list item includes the search term
                // If it does, it will be added to newList. Using lowercase eliminates
                // issues with capitalization in search terms and search content
                return lc.includes(filter);
            });
        } else {
            // If the search bar is empty, set newList to original task list
            newList = this.props.saleList;
        }
        // Set the filtered state based on what our rules added to newList
        this.setState({
            saleList: newList
        });
    }

    showBar = () => {
        if (!$('#showButton').hasClass('active')) {

            $('#showButton').addClass('active');
            $('#expandBar').addClass('expanded');
            $('#expandBar').css('display', 'block');
        }
        else {
            $('#showButton').removeClass('active');
            $('#expandBar').removeClass('expanded');
            $('#expandBar').css('display', 'none');
        }
    }


    editPaidAmount = (sale) => {
        openModal(this);
        async function openModal(object) {
            const { value: formValues } = await Swal.fire({
                title: 'Paid Amount',
                input: 'number',
                inputAttributes: {
                    max: Number(sale.totalAmount),
                    min: 1,
                    maxlength: 2
                },

                inputPlaceholder: 0,
                inputValue: Number(sale.totalAmount),
                showCancelButton: true,
                inputValidator: (value) => {
                    if (value) {
                        sale.paidAmount = Number(value);
                        sale = { ...sale, type: "paid_amount_update" }
                        object.props.updateSale(sale)
                    }
                },
                html:
                    `<div><span className="fs-10">Sale # </span><span>${sale._id}</span></div >
                    <div className="mt-3"><span className="fw-bold">Total Amount: </span><span> Rs. ${sale.totalAmount}</span></div >
                    <div className="fw-bold mt-2">Paid Amount</div>`,
                focusConfirm: false,
            })
            if (formValues) {
                Swal.fire("Sale Marked as Complete", JSON.stringify(formValues))
            }
        }

    }


    markLineAmountComplete = (sale) => {

        openModal(this);
        async function openModal(object) {
            const { value: formValues } = await Swal.fire({
                title: 'Mark Line Complete',
                input: 'number',
                inputAttributes: {
                    max: Number(sale.totalAmount) - Number(sale.paidAmount),
                    min: 0,
                    maxlength: 2
                },

                inputPlaceholder: 'Due Amount',
                inputValue: Number(sale.totalAmount) - Number(sale.paidAmount),
                showCancelButton: true,
                inputValidator: (value) => {
                    if (value) {
                        sale.paidAmount += Number(value);
                        sale = { ...sale, type: "due_update" }
                        object.props.updateSale(sale)
                    }
                },
                html:
                    `<div><span className="fs-10">Sale # </span><span>${sale._id}</span></div >
                    <div className="mt-3"><span className="fw-bold">Line Due Amount: </span><span> Rs. ${Number(sale.totalAmount) - Number(sale.paidAmount)}</span></div >
                    <div className="fw-bold mt-2">Paid Amount</div>
                    </div>`,
                focusConfirm: false,
            })
            if (formValues) {
                Swal.fire("Sale Marked as Complete", JSON.stringify(formValues))
            }
        }

    }

    markSecurityComplete = (sale) => {
        console.log("Sale Object", sale)
        openModal(this);
        async function openModal(object) {
            const { value: formValues } = await Swal.fire({
                title: 'Mark Security Complete',
                input: 'number',
                inputAttributes: {
                    max: Number(sale.secAmount),
                    min: 0,
                    maxlength: 2
                },

                inputPlaceholder: 'Due Security',
                inputValue: Number(sale.secAmount),
                showCancelButton: true,
                inputValidator: (value) => {
                    if (value) {
                        // sale.secAmount = Number(value);
                        sale = { ...sale, type: "security_update", payment_amount: Number(value) }
                        object.props.updateSale(sale)
                    }
                },
                html:
                    `<div><span className="fs-10">Sale # </span><span>${sale._id}</span></div >
                    <div className="mt-3"><span className="fw-bold">Security Due Amount: </span><span> Rs. ${sale.secAmount}</span></div >
                    <div className="fw-bold mt-2">Paid Amount</div>
                    </div>`,
                focusConfirm: false,
            })
            if (formValues) {
                Swal.fire("Sale Marked as Complete", JSON.stringify(formValues))
            }
        }

    }

    calculateTotalAmount = (row) => {
        if (row.productDetails.some(x => x.secRate > 0)) {

            let srate = 0;
            row.productDetails.forEach(item => {
                srate += Number(item.secRate);
            })
            let totalSecurity = this.calculateTotalSecurity(row) //Number(row.custExBottles) * Number(srate)
            let totalAmountPaid = Number(row.totalAmount) + Number(totalSecurity)

            return totalAmountPaid
        }
        else
            return row.totalAmount
    }

    calculateTotalSecurity = (row) => {

        if (row.productDetails.some(x => x.secRate > 0)) {

            let srate = 0;
            row.productDetails.forEach(item => {
                srate += Number(item.secRate);
            })
            let totalSecurity = Number(row.custExBottles) * Number(srate)

            return totalSecurity
        }
        else
            return 0
    }

    render() {
        return (
            <div className="nk-content ml-md-5 ">
                <div className="container-fluid">
                    <div className="nk-content-inner">
                        <div className="nk-content-body">
                            <div className="nk-block-head nk-block-head-sm">
                                <div className="nk-block-between">
                                    <div className="nk-block-head-content">
                                        <h3 className="nk-block-title page-title">Sale Contracts</h3>
                                    </div>
                                    <div className="nk-block-head-content">
                                        <div className="toggle-wrap nk-block-tools-toggle">
                                            <a onClick={this.showBar} id="showButton" className="btn btn-icon btn-trigger toggle-expand mr-n1" data-target="pageMenu2"><em className="icon ni ni-more-v"></em></a>
                                            <div className="toggle-expand-content" id="expandBar" data-content="pageMenu2">
                                                <ul className="nk-block-tools g-3">
                                                    <li>
                                                        <div className="form-control-wrap">
                                                            <div className="form-icon form-icon-right">
                                                                <em className="icon ni ni-search"></em>
                                                            </div>
                                                            <input type="text" className="form-control" onChange={this.handleSearchChange} id="default-04" placeholder="Quick search by name" />
                                                        </div>
                                                    </li>
                                                    <li className="nk-block-tools-opt">
                                                        <Link to="/addSale" className="toggle btn btn-icon btn-primary d-md-none mr-4"><em className="icon ni ni-plus "></em></Link>
                                                        <Link to="/addSale"><button className="toggle btn btn-primary d-none d-md-inline-flex"><em className="icon ni ni-plus"></em><span>Add Sale</span></button></Link>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <DataTable
                                columns={this.columns}
                                data={this.state.saleList}
                                highlightOnHover
                                pointerOnHover
                                pagination
                                expandableRows={true}
                                expandableRowsComponent={<this.SampleExpandedComponent />}
                                paginationPerPage={10}
                            />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Content;