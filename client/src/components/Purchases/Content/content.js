import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import DataTable from 'react-data-table-component';
import Moment from 'react-moment';

class Content extends Component {

    state = {
        purchaseList: this.props.purchaseList
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
        },
        {
            name: 'Purchase Date',
            selector: 'purchaseDate',
            sortable: true,
            hide: 'lg',
            cell: row => (
                <div className="tb-odr-item">
                    <td className="tb-odr-info">
                        <span className="tb-odr-date"><Moment format={'DD MMM YYYY'}>{row.puchaseDate}</Moment></span>
                    </td>
                </div>
            )
        },
        {
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
                            <span className="amount">Rs. {row.totalAmount}</span>
                        </span>
                        <span className="tb-odr-status d-sm-none">
                            {
                                row.paidAmount < row.totalAmount ?
                                    <span className="badge badge-dot badge-warning">Pending</span>
                                    :
                                    <span className="badge badge-dot badge-success">Complete</span>
                            }
                        </span>
                    </td>
                </div>
            ),
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
            cell: row => (
                <div className="tb-odr-item">
                    <td className="tb-odr-amount">
                        <span className="tb-odr-status">
                            {
                                row.paidAmount < row.totalAmount ?
                                    <span className="badge badge-dot badge-warning">Pending</span>
                                    :
                                    <span className="badge badge-dot badge-success">Complete</span>
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
                            pathname: "/purchase_invoice",
                            state: {
                                purchaseInfo: row
                            }
                        }} className="btn btn-dim btn-sm btn-primary">View</Link>
                    </div>
                    <Link to={{
                        pathname: "/purchase_invoice",
                        state: {
                            purchaseInfo: row
                        }
                    }} className="btn btn-pd-auto d-md-none"><em className="icon ni ni-chevron-right"></em></Link>
                </div>

            )
        },

    ];


    SampleExpandedComponent = ({data}) => {
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
                <div className="row">
                    <div className="col">
                    <br/><span className=" fw-medium">Products List </span><br/>
                    </div>
                </div>
            </div>
        )
    };

    check = (toggle) =>{
        
    }

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

    getProductDetails = (toggleState,data) =>{
        if(toggleState === true){
           
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
                                            <a href="#" className="btn btn-icon btn-trigger toggle-expand mr-n1" data-target="pageMenu2"><em className="icon ni ni-more-v"></em></a>
                                            <div className="toggle-expand-content" data-content="pageMenu2">
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
                                                        <button data-toggle="modal" data-target="#addmodal" className="toggle btn btn-icon btn-primary d-md-none"><em className="icon ni ni-plus"></em></button>
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
                                onRowExpandToggled = {(toggleState,row)=>{this.getProductDetails(toggleState,row)}}
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