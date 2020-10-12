import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import DataTable from 'react-data-table-component';
import $ from 'jquery'
import Swal from 'sweetalert2'

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
            cell: row => (
                <div className="tb-odr-item">
                    <td className="tb-odr-info">
                        <span className="tb-odr-item tb-lead">{row.name}   {
                            row.status === "active" ?
                                <span className="dot dot-success d-md-none ml-1 mt-1"></span>
                                :
                                <span className="dot dot-danger d-md-none ml-1 mt-1"></span>
                        } </span>
                        <span className="tb-odr-date d-sm-none">{row.sku}</span>
                        <span className="tb-odr-item text-muted d-sm-none">Rs. {row.price.total}</span>
                        <span className="tb-odr-item text-muted d-sm-none">Stock {row.stock}</span>
                    </td>
                </div>
            )
        },
        {
            name: 'SKU',
            selector: 'sku',
            hide: 'md',
            sortable: true,

        },
        {
            name: 'Stock',
            selector: 'stock',
            hide: 'md',
            sortable: true,
        },
        {
            name: 'Brand',
            selector: 'brand',
            sortable: true,
            hide: 'md',
            cell: row => (
                <span className="ccap">{row.brand}</span>
            )

        },
        {
            name: 'UOM',
            selector: 'uom',
            sortable: true,
            hide: 'md',
        },
        {
            name: 'Status',
            selector: 'status',
            sortable: true,
            hide: 'md',
            cell: row => (
                <div>
                    {
                        row.status === 'active' ?
                            <span className="tb-status text-success ccap">{row.status}</span>
                            : <span className="tb-status text-danger ccap">{row.status}</span>
                    }
                </div>
            )
        },

        {
            name: 'Action',
            cell: row => (
                <div className="nk-tb-col nk-tb-col-tools">
                    <ul className="nk-tb-actions gx-1 my-n1">
                        <li className="mr-n1">
                            <div className="dropdown">
                                <a href="#" className="dropdown-toggle btn btn-icon btn-trigger" data-toggle="dropdown"><em className="icon ni ni-more-h"></em></a>
                                <div className="dropdown-menu dropdown-menu-right">
                                    <ul className="link-list-opt no-bdr">
                                        <li><Link to={{
                                            pathname: "/editProduct",
                                            state: {
                                                productInfo: row
                                            }
                                        }}>
                                            <em className="icon ni ni-pen"></em><span>Edit Product</span></Link></li>
                                        <li><a onClick={() => { this.showData(row) }}><em className="icon ni ni-eye"></em><span>View Product</span></a></li>
                                        {
                                            row.status === "active" ?
                                                <li><a onClick={() => { this.props.changeStatus(row) }}>
                                                    <em className="icon ni ni-na"></em><span style={{ cursor: "pointer" }} className="text-danger">Change Status</span>
                                                </a></li>
                                                :
                                                <li><a onClick={() => { this.props.changeStatus(row) }}>
                                                    <em class="icon ni ni-check-thick"></em><span style={{ cursor: "pointer" }}>Change Status</span>
                                                </a></li>
                                        }
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


    showData = (row) => {
        return (
            Swal.fire({
                title: '<strong>Product Info</strong>',
                html:
                    `<div class="container">
                        <div class="row g-4">
                            <div class="col text-left">
                                <span> <strong>Name:  ${row.name}</strong>   </span>
                            </div>
                        </div>
                        <div class="row g-4">
                            <div class="col-6 text-left">
                                <span> <strong>Sku:  ${row.sku}</strong>   </span>
                            </div>
                            <div class="col-6 text-right">
                                <span> <strong>Uom:  ${row.uom}</strong>   </span>
                            </div>
                        </div>
                        <div class="row g-4">
                            <div class="col-6 text-left">
                                <span> <strong>Stock:  ${row.stock}</strong>   </span>
                            </div>
                            <div class="col-6 text-right">
                                <span class='ccap'> <strong>Brand:  ${row.brand}</strong>   </span>
                            </div>
                        </div>
                        <div class="row g-4">
                            <div class='col text-left'>
                                <span class='ccap'> <strong>Status:  ${row.status}</strong>   </span>
                            </div>
                        </div>
                        <div class="row g-4">
                            <div class="col text-left">
                                <span> <strong>Total Price:  Rs. ${row.price.total}</strong>   </span>
                            </div>
                        </div>
                        <div class="row g-4">
                            <div class='col-6 text-left'>
                                <span> <strong>Seal:  ${Number(row.price.cost_seal) ? Number(row.price.cost_seal) : 'N/A'}</strong ></span >
                            </div >
                            <div class='col-6 text-right'>
                                <span> <strong>Wrapper:  ${Number(row.price.cost_wrapper) ? Number(row.price.cost_wrapper) : 'N/A'}</strong>   </span>
                            </div>
    
                        </div >
                        <div class="row g-4">
                            <div class='col-6 text-left'>
                                <span> <strong>Seal:  ${Number(row.price.cost_flatRate) ? Number(row.price.cost_flatRate) : 'N/A'}</strong ></span >
                            </div >
                            <div class='col-6 text-right'>
                                <span> <strong>Security:  ${Number(row.price.cost_security) ? Number(row.price.cost_security) : 'N/A'}</strong>   </span>
                            </div>
                        </div >
                        <div class="row g-4">
                            <div class='col-6 text-left'>
                                <span> <strong>Other price:  ${Number(row.price.cost_others) ? Number(row.price.cost_others) : 'N/A'}</strong ></span >
                            </div >
                        </div >
                    </div >`,

                focusConfirm: false,
                confirmButtonText: 'Close'

            })

        )
    }

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

    render() {
        return (
            <div className="nk-content ml-md-5 ">
                <div className="container-fluid">
                    <div className="nk-content-inner">
                        <div className="nk-content-body">
                            <div className="nk-block-head nk-block-head-sm">
                                <div className="nk-block-between">
                                    <div className="nk-block-head-content">
                                        <h3 className="nk-block-title page-title">Products</h3>
                                    </div>
                                    <div className="nk-block-head-content">
                                        <div className="toggle-wrap nk-block-tools-toggle">
                                            <a onClick={this.showBar} id="showButton" className="btn btn-icon btn-trigger toggle-expand mr-n1" data-target="pageMenu"><em className="icon ni ni-more-v"></em></a>
                                            <div className="toggle-expand-content" id="expandBar" data-content="pageMenu">
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
                                                        <Link to="/addProduct" className="toggle btn btn-icon btn-primary d-md-none mr-4"><em className="icon ni ni-plus"></em></Link>
                                                        <Link to="/addProduct"><button className="toggle btn btn-primary d-none d-md-inline-flex"><em className="icon ni ni-plus"></em><span>Add Product</span></button></Link>
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
                                onRowClicked={(data) => { this.showData(data) }}
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