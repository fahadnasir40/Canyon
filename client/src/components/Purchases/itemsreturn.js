import React, { PureComponent } from 'react'
class Itemsreturn extends PureComponent {

    state = {
        currentProduct: '',
        currentQuantity: ''
    }

    handleProductDropdown = (event) => {

        if (this.props.productsList) {
            if (event.target.value == -1 && this.state.currentProduct) {
                this.setState({ currentProduct: '', currentQuantity: '' });
            }
            else {
                this.setState({
                    currentProduct: this.props.productsList[event.target.value],
                    currentQuantity: 1
                })
                    this.props.updateTotalAmount(1,this.props.productsList[event.target.value].price.total);
            }
        }

    }

    handleInputQuantity = (event) => {
        if(event.target.value < 100000){
            this.setState({
                currentQuantity: event.target.value
            })
            if(this.state.currentProduct)
                this.props.updateTotalAmount(this.state.currentQuantity,this.state.currentProduct.price.total);
        }
    }

    render() {
        let currentProduct = this.state.currentProduct;
        if(currentProduct){
          
        }
        return (
            <tr>
                <th scope="row">
                    <a href="#"><span>{this.props.index + 1}</span></a>
                </th>

                <td>
                    <select class="form-select form-control" onChange={this.handleProductDropdown} data-search="on">
                        <option value={-1}>Select Item</option>

                        {
                            this.props.productsList ?
                                this.props.productsList.map((item, key) => {
                                    return <option key={key} value={key} className="ccap" >{item.name}</option>;
                                })
                                : null
                        }
                    </select>
                </td>
                <td>{currentProduct ? currentProduct.sku : 'N/A'}</td>
                <td className="ccap">{currentProduct ? currentProduct.brand : 'N/A'}</td>
                <td><input type="number" min={1} maxLength={7} value={this.state.currentQuantity} onChange={this.handleInputQuantity} class="form-control" id="quantity" placeholder="Quantity" /></td>
                <td>{currentProduct ? currentProduct.price.total : 'N/A'}</td>
                <td>{currentProduct ? currentProduct.uom : 'N/A'}</td>
                <td>{currentProduct ? (Number(currentProduct.price.total) * Number(this.state.currentQuantity)): 'N/A'}</td>                
                <td class="tb-tnx-action">
                    <div class="dropdown">
                        <a class="text-soft dropdown-toggle btn btn-icon btn-trigger" data-toggle="dropdown"><em class="icon ni ni-more-h"></em></a>
                        <div class="dropdown-menu dropdown-menu-right dropdown-menu-xs">
                            <ul class="link-list-plain">
                                <li><a onClick={() => {this.props.remove(this.props.item.key)}}>Remove</a></li>
                            </ul>
                        </div>
                    </div>
                </td>

            </tr>

            // <tr class="tb-tnx-item" >
            //     <th scope="row" class="tb-tnx-id">
            //         <a href="#"><span>{this.props.index + 1}</span></a>
            //     </th>
            //     <td >
            //         <select class="form-select form-control form-control-md" data-search="on">
            //             <option value="19 Ltr Bottle">19 Ltr Bottle</option>
            //             <option value="1 Ltr Bottle">1 Ltr Bottle</option>
            //             <option value="6 Ltr Bottle">6 Ltr Bottle</option>
            //         </select>
            //     </td>
            //     <td>

            //         <input type="text" class="form-control" id="quantity" placeholder="quantity" />
            //     </td>
            //     <td>
            //         <div class="form-group">
            //             <div class="form-control-wrap">
            //                 <input type="text" class="form-control" id="rate" placeholder="rate" disabled value="120" />
            //             </div>
            //         </div>
            //     </td>
            //     <td class="tb-tnx-amount is-alt">
            //         <span class="amount">1440.00</span>
            //     </td>
            //     <td class="tb-tnx-action">
            //         <div class="dropdown">
            //             <a class="text-soft dropdown-toggle btn btn-icon btn-trigger" data-toggle="dropdown"><em class="icon ni ni-more-h"></em></a>
            //             <div class="dropdown-menu dropdown-menu-right dropdown-menu-xs">
            //                 <ul class="link-list-plain">
            //                     {/* <li><a href="#">View</a></li> */}
            //                     <li><a href="#">Edit</a></li>
            //                     <li><a onClick={() => { console.log("Remove Called", this.props.index); this.props.remove(this.props.item.key) }}>Remove</a></li>
            //                 </ul>
            //             </div>
            //         </div>
            //     </td>
            // </tr>
        )
    }
}


export default Itemsreturn