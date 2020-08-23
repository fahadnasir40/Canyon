import React, { Component } from 'react'
class Itemsreturn extends Component {

    render() {
        return (
            <tr class="tb-tnx-item" >
                <td class="tb-tnx-id">
                    <a href="#"><span>{this.props.index + 1}</span></a>
                </td>
                <td class="tb-tnx-info">
                    <div class="tb-tnx-desc">
                        <div class="form-control-wrap">
                            <select class="form-select form-control form-control-md" data-search="on">
                                <option value="19 Ltr Bottle">19 Ltr Bottle</option>
                                <option value="1 Ltr Bottle">1 Ltr Bottle</option>
                                <option value="6 Ltr Bottle">6 Ltr Bottle</option>
                            </select>
                        </div>
                    </div>
                    <div class="tb-tnx-date">
                        <span class="date">10-05-2019</span>
                        <span class="date">10-13-2019</span>
                    </div>
                </td>
                <td class="tb-tnx-amount is-alt">
                    <div class="tb-tnx-total">
                        <span class="amount">$599.00</span>
                    </div>
                    <div class="tb-tnx-status">
                        <span class="badge badge-dot badge-warning">Due</span>
                    </div>
                </td>
                <td class="tb-tnx-action">
                    <div class="dropdown">
                        <a class="text-soft dropdown-toggle btn btn-icon btn-trigger" data-toggle="dropdown"><em class="icon ni ni-more-h"></em></a>
                        <div class="dropdown-menu dropdown-menu-right dropdown-menu-xs">
                            <ul class="link-list-plain">
                                <li><a href="#">View</a></li>
                                <li><a href="#">Edit</a></li>
                                <li><a onClick={()=>{console.log("Remove Called",this.props.index); this.props.remove(this.props.item.key)}}>Remove</a></li>
                            </ul>
                        </div>
                    </div>
                </td>
            </tr>
        )
    }
}


export default Itemsreturn