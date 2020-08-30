import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import DataTable from 'react-data-table-component';


class Content extends Component {

    state = {
        productsList: this.props.productsList
    }

    columns = [

        {
            name: 'Name',
            selector: 'name',
            sortable: true,
            grow: 2,
            style: {
                color: '#202124',
                fontSize: '14px',
                fontWeight: 500,
            },
        },
        {
            name: 'SKU',
            selector: 'sku',
            sortable: true,

        },
        // {
        //     name: 'Price',
        //     selector: 'price',
        //     sortable: true,
        //     style: {
        //         color: 'rgba(0,0,0,.54)',
        //     },
        // },
        {
            name: 'Stock',
            selector: 'stock',
            sortable: true,
            style: {
                color: 'rgba(0,0,0,.54)',
            },
        },
        {
            name: 'Brand',
            selector: 'brand',
            sortable: true,
            style: {
                color: 'rgba(0,0,0,.54)',
            },
        },
        {
            name: 'UOM',
            selector: 'uom',
            sortable: true,
            style: {
                color: 'rgba(0,0,0,.54)',
            },
        },
        {
            name: 'Status',
            selector: 'status',
            sortable: true,
            style: {
                color: 'rgba(0,0,0,.54)',
            },
        },

        {
            cell: row => (
                <div class="nk-tb-col nk-tb-col-tools">
                    <ul class="nk-tb-actions gx-1 my-n1">
                        <li class="mr-n1">
                            <div class="dropdown">
                                <a href="#" class="dropdown-toggle btn btn-icon btn-trigger" data-toggle="dropdown"><em class="icon ni ni-more-h"></em></a>
                                <div class="dropdown-menu dropdown-menu-right">
                                    <ul class="link-list-opt no-bdr">
                                        <li><a href="#"><em class="icon ni ni-edit"></em><span>Edit Product</span></a></li>
                                        <li><a href="#"><em class="icon ni ni-eye"></em><span>View Product</span></a></li>
                                        <li><a href="#"><em class="icon ni ni-activity-round"></em><span>Product Orders</span></a></li>
                                        <li><a href="#"><em class="icon ni ni-trash"></em><span>Remove Product</span></a></li>
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

    componentDidUpdate(prevProps) {
        if (prevProps.productsList !== this.props.productsList) {
            this.setState({ productsList: this.props.productsList });
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
            currentList = this.props.productsList;

            // Use .filter() to determine which items should be displayed
            // based on the search terms
            newList = currentList.filter(item => {
                // change current item to lowercase
                const lc = item.name.toLowerCase();
                // change search term to lowercase
                const filter = e.target.value.toLowerCase();
                // check to see if the current list item includes the search term
                // If it does, it will be added to newList. Using lowercase eliminates
                // issues with capitalization in search terms and search content
                return lc.includes(filter);
            });
        } else {
            // If the search bar is empty, set newList to original task list
            newList = this.props.productsList;
        }
        // Set the filtered state based on what our rules added to newList
        this.setState({
            productsList: newList
        });
    }


    render() {
        console.log("Content", this.props);
        return (
            <div class="nk-content ml-md-5 ">
                <div class="container-fluid">
                    <div class="nk-content-inner">
                        <div class="nk-content-body">
                            <div class="nk-block-head nk-block-head-sm">
                                <div class="nk-block-between">
                                    <div class="nk-block-head-content">
                                        <h3 class="nk-block-title page-title">Products</h3>
                                    </div>
                                    <div class="nk-block-head-content">
                                        <div class="toggle-wrap nk-block-tools-toggle">
                                            <a href="#" class="btn btn-icon btn-trigger toggle-expand mr-n1" data-target="pageMenu"><em class="icon ni ni-more-v"></em></a>
                                            <div class="toggle-expand-content" data-content="pageMenu">
                                                <ul class="nk-block-tools g-3">
                                                    <li>
                                                        <div class="form-control-wrap">
                                                            <div class="form-icon form-icon-right">
                                                                <em class="icon ni ni-search"></em>
                                                            </div>
                                                            <input type="text" class="form-control" onChange={this.handleSearchChange} id="default-04" placeholder="Quick search by name" />
                                                        </div>
                                                    </li>
                                                    <li class="nk-block-tools-opt">
                                                        <button data-toggle="modal" data-target="#addmodal" class="toggle btn btn-icon btn-primary d-md-none"><em class="icon ni ni-plus"></em></button>
                                                        <Link to="/addProduct"><button class="toggle btn btn-primary d-none d-md-inline-flex"><em class="icon ni ni-plus"></em><span>Add Product</span></button></Link>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <DataTable
                                columns={this.columns}
                                data={this.state.productsList}
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