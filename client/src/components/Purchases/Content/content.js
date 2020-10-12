import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import DataTable from 'react-data-table-component';
import Moment from 'react-moment';
import $ from 'jquery';
import Swal from 'sweetalert2';
import NumberFormat from 'react-number-format'
class Content extends Component {

    state = {
        purchaseList: this.props.purchaseList,
        editPaidAmount: 0
    }

    columns = [

        {
            name: 'Purchase Id',
            selector: '_id',
            sortable: true,
            style: {
                color: '#202124',
                fontSize: '14px',
                fontWeight: 500,
            },
            cell: row => (
                <div className="tb-odr-item">
                    <td className="tb-odr-info">
                        <span className="tb-odr-id text-azure">{row._id}</span>
                        <span className="tb-odr-date d-sm-none"><Moment format={'DD MMM YYYY'}>{row.puchaseDate}</Moment></span>
                    </td>
                </div>
            )
        }, {
            name: 'Supplier Name',
            selector: 'supplierName',
            sortable: true,
            hide: 'md',
            cell: row => (
                <div className="tb-odr-item">
                    <div className="title">{row.supplierName}</div>
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
                            {
                                <span className="amount">Rs. <NumberFormat value={row.totalAmount} displayType={'text'} thousandSeparator={true} /></span>
                            }

                        </span>
                        <span className="tb-odr-status d-sm-none">
                            {
                                row.status === 'Pending' ?
                                    <span className="badge badge-dot badge-warning">{row.status}</span>
                                    : row.status === 'Returned' || row.status === 'Returned Items' ?
                                        <span className="badge badge-dot badge-info">{row.status}</span>
                                        : row.status === 'Returned Items Pending' ?
                                            <span className="badge badge-dot badge-warning text-break">Returned Items</span>
                                            :
                                            <span className="badge badge-dot badge-success">{row.status}</span>
                            }
                        </span>
                    </td>
                </div>
            ),
        },
        {
            name: 'Purchase Date',
            selector: 'purchaseDate',
            sortable: true,
            hide: 'lg',
            cell: row => (
                <div className="tb-odr-item">
                    <div className="tb-odr-info">
                        <span className="tb-odr-date"><Moment format={'DD MMM YYYY'}>{row.purchaseDate}</Moment></span>
                    </div>
                </div>
            )
        },
        {
            name: 'Description',
            selector: 'description',
            sortable: true,
            hide: 'md',
            cell: row => (
                <div>
                    {
                        row.description.length > 20 ?
                            <p className="fw-normal">{row.description.substr(0, 20) + ' ...'}</p> :
                            <p className="text-muted">No description added</p>
                    }
                </div>
            ),
        },
        {
            name: 'Status',
            selector: 'status',
            hide: 'sm',
            sortable: true,
            cell: row => (
                <div className="tb-odr-item">
                    <td className="tb-odr-amount">
                        <span className="tb-odr-status">
                            {
                                row.status === 'Pending' ?
                                    <span className="badge badge-dot badge-warning">{row.status}</span>
                                    : row.status === 'Returned' || row.status === 'Returned Items' ?
                                        <span className="badge badge-dot badge-info">{row.status}</span>
                                        : row.status === 'Returned Items Pending' ?
                                            <span className="badge badge-dot badge-warning">Returned Items</span>
                                            :
                                            <span className="badge badge-dot badge-success">{row.status}</span>
                            }
                        </span>
                    </td>
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
                            pathname: `/purchase_invoice_id=${row._id}`,
                        }} className="btn btn-dim btn-sm btn-primary">View</Link>

                        <div onClick={() => { this.editPaidAmount(row) }} class="btn btn-icon btn-white btn-dim btn-lg  btn-primary py-n1 ml-3"><em class="iconicon ni ni-edit"></em></div>
                    </div>
                    <Link to={{
                        pathname: `/purchase_invoice_id=${row._id}`,
                    }} className="btn btn-pd-auto d-md-none"><em className="icon ni ni-chevron-right"></em></Link>
                </div>
            )
        },
    ];


    SampleExpandedComponent = ({ data }) => {
        return (
            <div className="container-fluid">
                <div className="row d-lg-none">
                    <div className="col">
                        <span className="title fw-medium">Name: </span> <span className="fw-normal"> {data.supplierName}</span>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <span className="title fw-medium">Description: </span> <span className="fw-normal"> {data.description ? data.description : 'No description added.'}</span>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <span className=" fw-medium">Paid Amount: </span> <span className="fw-normal">Rs. {data.paidAmount}</span>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <span className=" fw-medium">Added on: </span> <span className="fw-normal"><Moment format="DD MMM, YYYY hh:mm A">{data.createdAt}</Moment></span>
                    </div>
                </div>
                <div className="row d-md-none">
                    <div width="20px">
                        <div onClick={() => { this.editPaidAmount(data) }} class="btn btn-icon btn-white btn-dim btn-lg  btn-primary  ml-3 d-sm-block px-2"><em class="iconicon ni ni-edit"> Edit</em></div>
                    </div>
                </div>
            </div>
        )
    };


    componentDidUpdate(prevProps) {
        if (prevProps.purchaseList !== this.props.purchaseList) {
            this.setState({ purchaseList: this.props.purchaseList });
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
            currentList = this.props.purchaseList;

            // Use .filter() to determine which items should be displayed
            // based on the search terms
            newList = currentList.filter(item => {
                // change current item to lowercase
                const lc = item.supplierName.toLowerCase();
                // change search term to lowercase
                const filter = e.target.value.toLowerCase();
                // check to see if the current list item includes the search term
                // If it does, it will be added to newList. Using lowercase eliminates
                // issues with capitalization in search terms and search content
                return lc.includes(filter);
            });
        } else {
            // If the search bar is empty, set newList to original task list
            newList = this.props.purchaseList;
        }
        // Set the filtered state based on what our rules added to newList
        this.setState({
            purchaseList: newList
        });
    }

    getProductDetails = (toggleState, data) => {
        if (toggleState === true) {

        }
    }

    //     ----- Export in Excel File -----
    //     // Blatant "inspiration" from https://codepen.io/Jacqueline34/pen/pyVoWr
    //    convertArrayOfObjectsToCSV=(array)=> {
    //     let result;

    //     const columnDelimiter = ',';
    //     const lineDelimiter = '\n';
    //     const keys = Object.keys(this.state.purchaseList[0]);

    //     result = '';
    //     result += keys.join(columnDelimiter);
    //     result += lineDelimiter;

    //     array.forEach(item => {
    //       let ctr = 0;
    //       keys.forEach(key => {
    //         if (ctr > 0) result += columnDelimiter;

    //         result += item[key];

    //         ctr++;
    //       });
    //       result += lineDelimiter;
    //     });

    //     return result;
    //   }

    //   // Blatant "inspiration" from https://codepen.io/Jacqueline34/pen/pyVoWr
    //    downloadCSV =(array)=> {
    //     const link = document.createElement('a');
    //     let csv = this.convertArrayOfObjectsToCSV(array);
    //     if (csv == null) return;

    //     const filename = 'export.csv';

    //     if (!csv.match(/^data:text\/csv/i)) {
    //       csv = `data:text/csv;charset=utf-8,${csv}`;
    //     }

    //     link.setAttribute('href', encodeURI(csv));
    //     link.setAttribute('download', filename);
    //     link.click();
    //   }

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

    editPaidAmount = (purchase) => {
        openModal(this);
        async function openModal(object) {
            const { value: formValues } = await Swal.fire({
                title: 'Edit Purchase',
                input: 'number',
                inputAttributes: {
                    max: purchase.totalAmount,
                    min: 0,
                    maxlength: 2
                },

                inputPlaceholder: 'Enter Paid Amount',
                inputValue: purchase.paidAmount,
                showCancelButton: true,
                inputValidator: (value) => {
                    if (!value) {
                        return 'You need to write something!'
                    }
                    else if (value > purchase.totalAmount)
                        return 'Paid Amount must be less than total amount'
                    else if (value < 0) {
                        return 'Paid Amount must be greater or equal to zero'
                    }
                    if (value) {
                        purchase.paidAmount = value;
                        object.props.updatePurchase(purchase)
                    }
                },
                html:
                    `<div><span class="fs-10">Purchase # </span><span>${purchase._id}</span></div >
                    <div class="mt-3"><span class="fw-bold">Total Amount: </span><span> Rs. ${purchase.totalAmount}</span></div >
                    <div class="fw-bold mt-2">Paid Amount</div>`,
                focusConfirm: false,
            })
            if (formValues) {
                Swal.fire("Paid Amount Changed", JSON.stringify(formValues))
            }
        }

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
                                        <h3 className="nk-block-title page-title">Purchase List</h3>
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
                                                        {/* <button type="btn" onClick={e => this.downloadCSV(this.state.purchaseList)} className="btn btn-primary mr-3" >Export</button> */}
                                                        <Link to="/addPurchase" className="toggle btn btn-icon btn-primary d-md-none mr-4"><em className="icon ni ni-plus"></em></Link>
                                                        <Link to="/addPurchase"><button className="toggle btn btn-primary d-none d-md-inline-flex"><em className="icon ni ni-plus"></em><span>Add Purchase</span></button></Link>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <DataTable
                                columns={this.columns}
                                data={this.state.purchaseList}
                                highlightOnHover
                                pointerOnHover
                                pagination
                                expandableRows={true}
                                expandableRowsComponent={<this.SampleExpandedComponent />}
                                onRowExpandToggled={(toggleState, row) => { this.getProductDetails(toggleState, row) }}
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