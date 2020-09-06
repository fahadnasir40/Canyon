import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import DataTable from 'react-data-table-component';
import NumberFormat from 'react-number-format';
import transactions from '../transactions';

class Content extends Component {

    state = {
        transactionsList: this.props.transactionsList
    }

    columns = [

        {
            name: 'Brand',
            selector: 'brand',
            sortable: true,

        },
        {
            name: 'Source',
            selector: 'transaction_source',
            sortable: true,
            grow: 2,
            style: {
                color: '#202124',
                fontSize: '14px',
                fontWeight: 500,
            },
        },
        {
            name: 'Value',
            selector: 'transaction_value',
            sortable: true,

        },
        {
            name: 'Type',
            selector: 'transaction_type',
            sortable: true,
            style: {
                color: 'rgba(0,0,0,.54)',
            },
        },
        {
            name: 'Action',
            selector: 'transaction_action',
            sortable: true,
            style: {
                color: 'rgba(0,0,0,.54)',
            },
        },
        {
            name: 'Date',
            selector: 'transaction_date',
            sortable: true,
            style: {
                color: 'rgba(0,0,0,.54)',
            },
        },
        {
            name: 'Qty',
            selector: 'primary_quantity',
            sortable: true,
            thousandSeparator : true,
            style: {
                color: 'rgba(0,0,0,.54)',
            },
        },
        {
            name: 'Rate',
            selector: 'rate',
            sortable: true,
            style: {
                color: 'rgba(0,0,0,.54)',
            },
        },
        {
            name: 'Status',
            selector: 'rate',
            sortable: true,
            style: {
                color: 'rgba(0,0,0,.54)',
            },
        },
        {
            cell: row => (
                <div className="nk-tb-col nk-tb-col-tools">
                    <ul className="nk-tb-actions gx-1 my-n1">
                        <li className="mr-n1">
                            <div className="dropdown">
                                <a href="#" className="dropdown-toggle btn btn-icon btn-trigger" data-toggle="dropdown"><em className="icon ni ni-more-h"></em></a>
                                <div className="dropdown-menu dropdown-menu-right">
                                    <ul className="link-list-opt no-bdr">
                                        <li><a href="#"><em className="icon ni ni-edit"></em><span>Edit</span></a></li>
                                        <li><a href="#"><em className="icon ni ni-eye"></em><span>View</span></a></li>
                                        <li><a onClick={() => { this.props.deleteTransaction(transactions) }}><em className="icon ni ni-trash"></em><span style={{ cursor: "pointer" }}>Remove Transaction</span></a></li>
                                        {/* <li><a onClick={() => { this.props.deleteSupplier(supplier) }}><em className="icon ni ni-trash"></em><span style={{ cursor: "pointer" }} className="text-danger ">Remove Supplier</span></a></li> */}
                                    </ul>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            ),
            allowOverflow: true,
            button: true,
        },
    ];

    // componentDidUpdate(prevProps) {
    //     if (prevProps.productsList !== this.props.productsList) {
    //         this.setState({ productsList: this.props.productsList });
    //     }
    // }
    componentDidUpdate(prevProps) {
        if (prevProps.transactionsList !== this.props.transactionsList) {
            this.setState({ transactionsList: this.props.transactionsList });
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
            // currentList = this.props.productsList;
            currentList = this.props.transactionsList;

            // Use .filter() to determine which items should be displayed
            // based on the search terms
            newList = currentList.filter(item => {
                // change current item to lowercase
                // const lc = item.name.toLowerCase();
                const lc = item.transaction_value.toLowerCase();
                // change search term to lowercase
                const filter = e.target.value.toLowerCase();
                // check to see if the current list item includes the search term
                // If it does, it will be added to newList. Using lowercase eliminates
                // issues with capitalization in search terms and search content
                return lc.includes(filter);
            });
        } else {
            // If the search bar is empty, set newList to original task list
            // newList = this.props.productsList;
            newList = this.props.transactionsList;
        }
        // Set the filtered state based on what our rules added to newList
        // this.setState({
        //     productsList: newList
        // });
        this.setState({
            transactionsList: newList
        });
    }


    render() {
        console.log("Content", this.props);
        return (
            <div className="nk-content ml-md-5 ">
                <div className="container-fluid">
                    <div className="nk-content-inner">
                        <div className="nk-content-body">
                            <div className="nk-block-head nk-block-head-sm">
                                <div className="nk-block-between">
                                    <div className="nk-block-head-content">
                                        <h3 className="nk-block-title page-title">Transactions</h3>
                                    </div>
                                    <div className="nk-block-head-content">
                                        <div className="toggle-wrap nk-block-tools-toggle">
                                            <a href="#" className="btn btn-icon btn-trigger toggle-expand mr-n1" data-target="pageMenu"><em className="icon ni ni-more-v"></em></a>
                                            <div className="toggle-expand-content" data-content="pageMenu">
                                                <ul className="nk-block-tools g-3">
                                                    <li>
                                                        <div className="form-control-wrap">
                                                            <div className="form-icon form-icon-right">
                                                                <em className="icon ni ni-search"></em>
                                                            </div>
                                                            <input type="text" className="form-control" onChange={this.handleSearchChange} id="default-04" placeholder="Quick search by value" />
                                                        </div>
                                                    </li>
                                                    <li className="nk-block-tools-opt">
                                                        <Link to="/addTransaction"><button className="toggle btn btn-primary d-none d-md-inline-flex"><em className="icon ni ni-plus"></em><span>Add Transaction</span></button></Link>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <DataTable
                                columns={this.columns}
                                data={this.state.transactionsList}
                                highlightOnHover
                                pointerOnHover
                                pagination
                                paginationPerPage={10}
                            />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Content