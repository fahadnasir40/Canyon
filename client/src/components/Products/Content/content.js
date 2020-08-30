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
        if(prevProps.productsList !== this.props.productsList) {
          this.setState({productsList: this.props.productsList});
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
        console.log("Content",this.props);
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
                            <div class="nk-block">

                              
                                {/* <div class="nk-tb-list is-separate mb-3">
                                        <div class="nk-tb-item nk-tb-head">
                              
                                            <div class="nk-tb-col "><span>Name</span></div>
                                            <div class="nk-tb-col"><span>SKU</span></div>
                                            <div class="nk-tb-col"><span>Price</span></div>
                                            <div class="nk-tb-col"><span>Stock</span></div>
                                            <div class="nk-tb-col tb-col-md"><span>Brand</span></div>
                                            <div class="nk-tb-col tb-col-md"><span>UOM</span></div>
                                            <div class="nk-tb-col tb-col-md"><span>Status</span></div>
                                            <div class="nk-tb-col nk-tb-col-tools">
                                                <ul class="nk-tb-actions gx-1 my-n1">
                                                    <li class="mr-n1">
                                                        <div class="dropdown">
                                                            <a href="#" class="dropdown-toggle btn btn-icon btn-trigger" data-toggle="dropdown"><em class="icon ni ni-more-h"></em></a>
                                                            <div class="dropdown-menu dropdown-menu-right">
                                                                <ul class="link-list-opt no-bdr">
                                                                    <li><a href="#"><em class="icon ni ni-edit"></em><span>Edit Selected</span></a></li>
                                                                    <li><a href="#"><em class="icon ni ni-trash"></em><span>Remove Selected</span></a></li>
                                                                    <li><a href="#"><em class="icon ni ni-bar-c"></em><span>Update Stock</span></a></li>
                                                                    <li><a href="#"><em class="icon ni ni-invest"></em><span>Update Price</span></a></li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div class="nk-tb-item">
                                            <div class="nk-tb-col nk-tb-col-check">
                                                <div class="custom-control custom-control-sm custom-checkbox notext">
                                                    <input type="checkbox" class="custom-control-input" id="uid1"/>
                                                    <label class="custom-control-label" for="uid1"></label>
                                                </div>
                                            </div>
                                            <div class="nk-tb-col">
                                                <span class="tb-product">
                                                    <span class="title">19 Ltr. Water Bottle</span>
                                                </span>
                                            </div>
                                            <div class="nk-tb-col">
                                                <span class="tb-sub">CN19L</span>
                                            </div>
                                            <div class="nk-tb-col">
                                                <span class="tb-lead">Rs. 150</span>
                                            </div>
                                            <div class="nk-tb-col">
                                                <span class="tb-sub">10</span>
                                            </div>
                                            <div class="nk-tb-col tb-col-md">
                                                <span class="tb-sub">Canyon</span>
                                            </div>
                                            <div class="nk-tb-col tb-col-md">
                                                <span class="tb-sub">Pcs.</span>
                                            </div>

                                            <div class="nk-tb-col tb-col-md">
                                                <span class="tb-sub">Active</span>
                                            </div>
                                          
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
                                        </div>
                                    </div> */}
                                {/* <div class="card">
                                        <div class="card-inner">
                                            <div class="nk-block-between-md g-3">
                                                <div class="g">
                                                    <ul class="pagination justify-content-center justify-content-md-start">
                                                        <li class="page-item"><a class="page-link" href="#"><em class="icon ni ni-chevrons-left"></em></a></li>
                                                        <li class="page-item"><a class="page-link" href="#">1</a></li>
                                                        <li class="page-item"><a class="page-link" href="#">2</a></li>
                                                        <li class="page-item"><span class="page-link"><em class="icon ni ni-more-h"></em></span></li>
                                                        <li class="page-item"><a class="page-link" href="#">6</a></li>
                                                        <li class="page-item"><a class="page-link" href="#">7</a></li>
                                                        <li class="page-item"><a class="page-link" href="#"><em class="icon ni ni-chevrons-right"></em></a></li>
                                                    </ul>
                                                </div>
                                                <div class="g">
                                                    <div class="pagination-goto d-flex justify-content-center justify-content-md-start gx-3">
                                                        <div>Page</div>
                                                        <div>
                                                            <select class="form-select form-select-sm" data-search="on" data-dropdown="xs center">
                                                                <option value="page-1">1</option>
                                                                <option value="page-2">2</option>
                                                                <option value="page-4">4</option>
                                                                <option value="page-5">5</option>
                                                                <option value="page-6">6</option>
                                                                <option value="page-7">7</option>
                                                                <option value="page-8">8</option>
                                                                <option value="page-9">9</option>
                                                                <option value="page-10">10</option>
                                                                <option value="page-11">11</option>
                                                                <option value="page-12">12</option>
                                                                <option value="page-13">13</option>
                                                                <option value="page-14">14</option>
                                                                <option value="page-15">15</option>
                                                                <option value="page-16">16</option>
                                                                <option value="page-17">17</option>
                                                                <option value="page-18">18</option>
                                                                <option value="page-19">19</option>
                                                                <option value="page-20">20</option>
                                                            </select>
                                                        </div>
                                                        <div>OF 102</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div> */}
                            </div>

                            {/* <!-- Modal Content Code - to add product--> */}
                            {/* <div class="modal fade" tabindex="-1" id="addmodal">
                                <div class="modal-dialog" role="document">
                                    <div class="modal-content">
                                        <a href="#" class="close" data-dismiss="modal" aria-label="Close">
                                            <em class="icon ni ni-cross"></em>
                                        </a>
                                        <div class="modal-header">
                                            <h5 class="modal-title">Add Product</h5>
                                        </div>
                                        <div class="modal-body">
                                            <div class="nk-block">
                                                <div class="row g-3">
                                                    <div class="col-12">
                                                        <div class="form-group">
                                                            <label class="form-label" for="product-title">Product Title</label>
                                                            <div class="form-control-wrap">
                                                                <input type="text" class="form-control" id="product-title" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-mb-4">
                                                        <div class="form-group">
                                                            <label class="form-label" for="uom">Unit of Measure</label>
                                                            <div class="form-control-wrap ">
                                                                <div class="form-control-select">
                                                                    <select class="form-control" id="uom">
                                                                        <option value="default_option">PC</option>
                                                                        <option value="KG">KG</option>
                                                                        <option value="Pet">Pet</option>
                                                                        <option value="Ltr">Ltr</option>
                                                                        <option value="Number">Number</option>
                                                                        <option value="Others">Others</option>
                                                                    </select>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-mb-8">
                                                        <div class="form-group">
                                                            <label class="form-label" for="brand">Brand</label>
                                                            <div class="form-control-wrap ">
                                                                <div class="form-control-select">
                                                                    <select class="form-control" id="brand">
                                                                        <option value="default_option">Canyon</option>
                                                                        <option value="option_select_name">Others</option>
                                                                    </select>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-4">

                                                        <div class="form-group">
                                                            <label class="form-label" for="status">Status</label>
                                                            <div class="form-control-wrap ">
                                                                <div class="form-control-select">
                                                                    <select class="form-control" id="status">
                                                                        <option value="default_option">Active</option>
                                                                        <option value="option_select_name">Inactive</option>
                                                                    </select>
                                                                </div>
                                                            </div>
                                                        </div>

                                                    </div>
                                                    <div class="col-mb-8">
                                                        <div class="form-group">
                                                            <label class="form-label" for="SKU">SKU</label>
                                                            <div class="form-control-wrap">
                                                                <input type="text" class="form-control" id="SKU" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row g-4" id="addmodal">
                                                    <div class="col-12 mt-3 justify-text-center">
                                                        <li class="nk-block-tools-opt">
                                                            <button data-toggle="modal" data-target="#addmodal" class="toggle btn btn-icon btn-primary d-md-none"><em class="icon ni ni-plus"></em></button>
                                                            <button data-toggle="modal" data-target="#addmodalcost" class="toggle btn btn-primary d-none d-md-inline-flex"><em class="icon ni ni-plus"></em><span>Define cost</span></button>
                                                            <button data-dismiss="modal" class="btn btn-info">Cancel</button>
                                                        </li>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div> */}
                        </div>

                        {/* <!-- Modal Content Code - to define cost --> */}

                        {/* <div class="modal fade" tabindex="-1" id="addmodalcost">
                            <div class="modal-dialog" role="document">
                                <div class="modal-content">
                                    <a href="#" class="close" data-dismiss="modal" aria-label="Close">
                                        <em class="icon ni ni-cross"></em>
                                    </a>
                                    <div class="modal-header">
                                        <h5 class="modal-title">Define Cost</h5>
                                    </div>
                                    <div class="modal-body">
                                        <div class="nk-block">
                                            <div class="row g-3">
                                                <div class="col-12">
                                                    <div class="form-group">
                                                        <label class="form-label" for="product-title">Product Title</label>
                                                        <div class="form-control-wrap">
                                                            <input type="text" class="form-control" id="product-title" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-mb-8">
                                                    <div class="form-group">
                                                        <label class="form-label" for="brand">Brand</label>
                                                        <div class="form-control-wrap ">
                                                            <div class="form-control-select">
                                                                <select class="form-control" id="brand">
                                                                    <option value="default_option">Canyon</option>
                                                                    <option value="option_select_name">Others</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-4">
                                                    <div class="form-group">
                                                        <label class="form-label" for="status">Status</label>
                                                        <div class="form-control-wrap ">
                                                            <div class="form-control-select">
                                                                <select class="form-control" id="status">
                                                                    <option value="default_option">Active</option>
                                                                    <option value="option_select_name">Inactive</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>
                                                <div class="col-mb-8">
                                                    <div class="form-group">
                                                        <label class="form-label" for="seal">Seal</label>
                                                        <div class="form-control-wrap">
                                                            <input type="text" class="form-control" id="seal" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-mb-8">
                                                    <div class="form-group">
                                                        <label class="form-label" for="wrapper">wrapper</label>
                                                        <div class="form-control-wrap">
                                                            <input type="text" class="form-control" id="wrapper" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-mb-8">
                                                    <div class="form-group">
                                                        <label class="form-label" for="others">Others</label>
                                                        <div class="form-control-wrap">
                                                            <input type="text" class="form-control" id="others" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-mb-8">
                                                    <div class="form-group">
                                                        <label class="form-label" for="flat">Flat Rate</label>
                                                        <div class="form-control-wrap">
                                                            <input type="text" class="form-control" id="flat" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row g-4" id="addmodalcost">
                                                <div class="col-12 mt-3 justify-text-center">
                                                    <li class="nk-block-tools-opt">
                                                        <button data-toggle="modal" data-target="#addmodal" class="toggle btn btn-icon btn-primary d-md-none"><em class="icon ni ni-plus"></em></button>
                                                        <button data-toggle="modal" data-target="#addmodal" class="toggle btn btn-primary d-none d-md-inline-flex"><span>Save Price</span></button>
                                                        <button data-dismiss="modal" class="btn btn-info">Cancel</button>
                                                    </li>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> */}
                    </div>

                </div>
            </div>


        )
    }
}

export default Content