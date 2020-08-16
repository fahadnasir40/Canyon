import React, { Component } from 'react'
import {Link} from 'react-router-dom'

class Content extends Component {

    render(){
        return (
            <div >
                <div className="nk-content ml-5">
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
                                                <a href="#" className="btn btn-icon btn-trigger toggle-expand mr-n1" data-target="pageMenu"><em className="icon ni ni-more-v"></em></a>
                                                <div className="toggle-expand-content" data-content="pageMenu">
                                                    <ul className="nk-block-tools g-3">
                                                        <li>
                                                            <div className="form-control-wrap">
                                                                <div className="form-icon form-icon-right">
                                                                    <em className="icon ni ni-search"></em>
                                                                </div>
                                                                <input type="text" className="form-control" id="default-04" placeholder="Quick search by id"/>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div className="drodown">
                                                                <a href="#" className="dropdown-toggle dropdown-indicator btn btn-outline-light btn-white" data-toggle="dropdown">Status</a>
                                                                <div className="dropdown-menu dropdown-menu-right">
                                                                    <ul className="link-list-opt no-bdr">
                                                                        <li><a href="#"><span>New Items</span></a></li>
                                                                        <li><a href="#"><span>Featured</span></a></li>
                                                                        <li><a href="#"><span>Out of Stock</span></a></li>
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        </li>
                                                        <li className="nk-block-tools-opt">
                                                            <a href="#" data-target="addProduct" className="toggle btn btn-icon btn-primary d-md-none"><em className="icon ni ni-plus"></em></a>
                                                            <a href="#" data-target="addProduct" className="toggle btn btn-primary d-none d-md-inline-flex"><em className="icon ni ni-plus"></em><span>Add Product</span></a>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="nk-block">
                                    <div className="nk-tb-list is-separate mb-3">
                                        <div className="nk-tb-item nk-tb-head">
                                            <div className="nk-tb-col nk-tb-col-check">
                                                <div className="custom-control custom-control-sm custom-checkbox notext">
                                                    <input type="checkbox" className="custom-control-input" id="uid"/>
                                                    <label className="custom-control-label" for="uid"></label>
                                                </div>
                                            </div>
                                            <div className="nk-tb-col tb-col-sm"><span>Name</span></div>
                                            <div className="nk-tb-col"><span>SKU</span></div>
                                            <div className="nk-tb-col"><span>Price</span></div>
                                            <div className="nk-tb-col"><span>Stock</span></div>
                                            <div className="nk-tb-col tb-col-md"><span>Category</span></div>
                                            <div className="nk-tb-col tb-col-md"><em className="tb-asterisk icon ni ni-star-round"></em></div>
                                            <div className="nk-tb-col nk-tb-col-tools">
                                                <ul className="nk-tb-actions gx-1 my-n1">
                                                    <li className="mr-n1">
                                                        <div className="dropdown">
                                                            <a href="#" className="dropdown-toggle btn btn-icon btn-trigger" data-toggle="dropdown"><em className="icon ni ni-more-h"></em></a>
                                                            <div className="dropdown-menu dropdown-menu-right">
                                                                <ul className="link-list-opt no-bdr">
                                                                    <li><a href="#"><em className="icon ni ni-edit"></em><span>Edit Selected</span></a></li>
                                                                    <li><a href="#"><em className="icon ni ni-trash"></em><span>Remove Selected</span></a></li>
                                                                    <li><a href="#"><em className="icon ni ni-bar-c"></em><span>Update Stock</span></a></li>
                                                                    <li><a href="#"><em className="icon ni ni-invest"></em><span>Update Price</span></a></li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="nk-tb-item">
                                            <div className="nk-tb-col nk-tb-col-check">
                                                <div className="custom-control custom-control-sm custom-checkbox notext">
                                                    <input type="checkbox" className="custom-control-input" id="uid1"/>
                                                    <label className="custom-control-label" for="uid1"></label>
                                                </div>
                                            </div>
                                            <div className="nk-tb-col tb-col-sm">
                                                <span className="tb-product">
                                                    <img src="./images/product/a.png" alt="" className="thumb"/>
                                                    <span className="title">Pink Fitness Tracker</span>
                                                </span>
                                            </div>
                                            <div className="nk-tb-col">
                                                <span className="tb-sub">UY3749</span>
                                            </div>
                                            <div className="nk-tb-col">
                                                <span className="tb-lead">$ 99.49</span>
                                            </div>
                                            <div className="nk-tb-col">
                                                <span className="tb-sub">49</span>
                                            </div>
                                            <div className="nk-tb-col tb-col-md">
                                                <span className="tb-sub">Fitbit, Tracker</span>
                                            </div>
                                            <div className="nk-tb-col tb-col-md">
                                                <div className="asterisk tb-asterisk">
                                                    <a href="#"><em className="asterisk-off icon ni ni-star"></em><em className="asterisk-on icon ni ni-star-fill"></em></a>
                                                </div>
                                            </div>
                                            <div className="nk-tb-col nk-tb-col-tools">
                                                <ul className="nk-tb-actions gx-1 my-n1">
                                                    <li className="mr-n1">
                                                        <div className="dropdown">
                                                            <a href="#" className="dropdown-toggle btn btn-icon btn-trigger" data-toggle="dropdown"><em className="icon ni ni-more-h"></em></a>
                                                            <div className="dropdown-menu dropdown-menu-right">
                                                                <ul className="link-list-opt no-bdr">
                                                                    <li><a href="#"><em className="icon ni ni-edit"></em><span>Edit Product</span></a></li>
                                                                    <li><a href="#"><em className="icon ni ni-eye"></em><span>View Product</span></a></li>
                                                                    <li><a href="#"><em className="icon ni ni-activity-round"></em><span>Product Orders</span></a></li>
                                                                    <li><a href="#"><em className="icon ni ni-trash"></em><span>Remove Product</span></a></li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        
                                    <div className="card">
                                        <div className="card-inner">
                                            <div className="nk-block-between-md g-3">
                                                <div className="g">
                                                    <ul className="pagination justify-content-center justify-content-md-start">
                                                        <li className="page-item"><a className="page-link" href="#"><em className="icon ni ni-chevrons-left"></em></a></li>
                                                        <li className="page-item"><a className="page-link" href="#">1</a></li>
                                                        <li className="page-item"><a className="page-link" href="#">2</a></li>
                                                        <li className="page-item"><span className="page-link"><em className="icon ni ni-more-h"></em></span></li>
                                                        <li className="page-item"><a className="page-link" href="#">6</a></li>
                                                        <li className="page-item"><a className="page-link" href="#">7</a></li>
                                                        <li className="page-item"><a className="page-link" href="#"><em className="icon ni ni-chevrons-right"></em></a></li>
                                                    </ul>
                                                </div>
                                                <div className="g">
                                                    <div className="pagination-goto d-flex justify-content-center justify-content-md-start gx-3">
                                                        <div>Page</div>
                                                        <div>
                                                            <select className="form-select form-select-sm" data-search="on" data-dropdown="xs center">
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
                                    </div>
                                </div>
                                <div className="nk-add-product toggle-slide toggle-slide-right" data-content="addProduct" data-toggle-screen="any" data-toggle-overlay="true" data-toggle-body="true" data-simplebar>
                                    <div className="nk-block-head">
                                        <div className="nk-block-head-content">
                                            <h5 className="nk-block-title">New Product</h5>
                                            <div className="nk-block-des">
                                                <p>Add information and add new product.</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="nk-block">
                                        <div className="row g-3">
                                            <div className="col-12">
                                                <div className="form-group">
                                                    <label className="form-label" for="product-title">Product Title</label>
                                                    <div className="form-control-wrap">
                                                        <input type="text" className="form-control" id="product-title"/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-mb-6">
                                                <div className="form-group">
                                                    <label className="form-label" for="regular-price">Regular Price</label>
                                                    <div className="form-control-wrap">
                                                        <input type="text" className="form-control" id="regular-price"/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-mb-6">
                                                <div className="form-group">
                                                    <label className="form-label" for="sale-price">Sale Price</label>
                                                    <div className="form-control-wrap">
                                                        <input type="text" className="form-control" id="sale-price"/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-mb-6">
                                                <div className="form-group">
                                                    <label className="form-label" for="stock">Stock</label>
                                                    <div className="form-control-wrap">
                                                        <input type="text" className="form-control" id="stock"/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-mb-6">
                                                <div className="form-group">
                                                    <label className="form-label" for="SKU">SKU</label>
                                                    <div className="form-control-wrap">
                                                        <input type="text" className="form-control" id="SKU"/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-12">
                                                <div className="form-group">
                                                    <label className="form-label" for="category">Category</label>
                                                    <div className="form-control-wrap">
                                                        <input type="text" className="form-control" id="category"/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-12">
                                                <div className="form-group">
                                                    <label className="form-label" for="tags">Tags</label>
                                                    <div className="form-control-wrap">
                                                        <input type="text" className="form-control" id="tags"/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-12">
                                                <div className="upload-zone small bg-lighter my-2">
                                                    <div className="dz-message">
                                                        <span className="dz-message-text">Drag and drop file</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-12">
                                                <button className="btn btn-primary"><em className="icon ni ni-plus"></em><span>Add New</span></button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )}
}

export default Content