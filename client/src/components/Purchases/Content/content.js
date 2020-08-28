import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Content extends Component {

    render() {
        return (

            <div class="nk-content ">
                <div class="container-fluid">
                    <div class="nk-content-inner">
                        <div class="nk-content-body">
                            <div class="components-preview wide-md mx-auto">
                                <div class="nk-block-head nk-block-head-lg wide-sm">
                                    <div class="nk-block-head-content">
                                        <h2 class="nk-block-title fw-normal">Purchase</h2>
                                    </div>
                                    <div class="nk-header-search ml-3 ml-xl-0">
                                        <em class="icon ni ni-search"></em>
                                        <input type="text" class="form-control border-transparent form-focus-none" placeholder="Search" />
                                    </div>
                                    <ul class="nk-block-tools-opt">
                                        <Link to="/addpurchases"><button class="btn btn-primary"><em class="icon ni ni-plus"></em><span>New Purchase</span></button></Link>
                                    </ul>
                                </div>
                                <div class="nk-block nk-block-lg">
                                    <div class="card card-preview">
                                        <div class="card-inner">
                                            <table class="datatable-init nk-tb-list nk-tb-ulist" data-auto-responsive="false">
                                                <thead>
                                                    <tr class="nk-tb-item nk-tb-head">
                                                        <th class="nk-tb-col nk-tb-col-check">
                                                            <div class="custom-control custom-control-sm custom-checkbox notext">
                                                                <input type="checkbox" class="custom-control-input" id="uid" />
                                                                <label class="custom-control-label" for="uid"></label>
                                                            </div>
                                                        </th>
                                                        <th class="nk-tb-col"><span class="sub-text">Supplier</span></th>
                                                        <th class="nk-tb-col tb-col-mb"><span class="sub-text">Total Purchase</span></th>
                                                        <th class="nk-tb-col tb-col-md"><span class="sub-text">Last Purchase</span></th>
                                                        <th class="nk-tb-col nk-tb-col-tools text-right">Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr class="nk-tb-item">
                                                        <td class="nk-tb-col nk-tb-col-check">
                                                            <div class="custom-control custom-control-sm custom-checkbox notext">
                                                                <input type="checkbox" class="custom-control-input" id="uid13" />
                                                                <label class="custom-control-label" for="uid13"></label>
                                                            </div>
                                                        </td>
                                                        <td class="nk-tb-col">
                                                            <div class="user-card">
                                                                <div class="user-info">
                                                                    <span class="tb-lead">Canyon Supplier<span class="dot dot-success d-md-none ml-1"></span></span>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td class="nk-tb-col tb-col-mb" data-order="440.34">
                                                            <span class="tb-amount">440.34</span>
                                                        </td>
                                                        <td class="nk-tb-col tb-col-md">
                                                            <span>18 Jan 2020</span>
                                                        </td>
                                                        <td class="nk-tb-col nk-tb-col-tools">
                                                            <ul class="nk-tb-actions gx-1">
                                                                <li class="nk-tb-action-hidden">
                                                                    <a href="#" class="btn btn-trigger btn-icon" data-toggle="tooltip" data-placement="top" title="Wallet">
                                                                        <em class="icon ni ni-wallet-fill"></em>
                                                                    </a>
                                                                </li>
                                                                <li class="nk-tb-action-hidden">
                                                                    <a href="#" class="btn btn-trigger btn-icon" data-toggle="tooltip" data-placement="top" title="Send Email">
                                                                        <em class="icon ni ni-mail-fill"></em>
                                                                    </a>
                                                                </li>
                                                                <li class="nk-tb-action-hidden">
                                                                    <a href="#" class="btn btn-trigger btn-icon" data-toggle="tooltip" data-placement="top" title="Suspend">
                                                                        <em class="icon ni ni-user-cross-fill"></em>
                                                                    </a>
                                                                </li>
                                                                <li>
                                                                    <div class="drodown">
                                                                        <a href="#" class="dropdown-toggle btn btn-icon btn-trigger" data-toggle="dropdown"><em class="icon ni ni-more-h"></em></a>
                                                                        <div class="dropdown-menu dropdown-menu-right">
                                                                            <ul class="link-list-opt no-bdr">
                                                                                <li><a href="#"><em class="icon ni ni-focus"></em><span>Supplier Details</span></a></li>
                                                                                <li><a href="#"><em class="icon ni ni-eye"></em><span>View Transaction</span></a></li>
                                                                            </ul>
                                                                        </div>
                                                                    </div>
                                                                </li>
                                                            </ul>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
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

export default Content