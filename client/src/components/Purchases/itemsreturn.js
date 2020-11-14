import React, { Component } from 'react'
class Itemsreturn extends Component {

    state = {
        currentProduct: '',
        currentQuantity: ''
    }

    handleProductDropdown = (event) => {

        if (this.props.productsList) {
            if (event.target.value == -1 && this.state.currentProduct) {
                this.setState({ currentProduct: '', currentQuantity: '' });
                this.props.removeSelectedItem(this.props.index);
            }
            else {
                this.setState({
                    currentProduct: this.props.productsList[event.target.value],
                    currentQuantity: 1
                })
                if (this.state.currentProduct)
                    this.props.removeSelectedItem(this.props.index);
                this.props.addSelectedItem(this.props.productsList[event.target.value], this.props.index);
                this.props.updateTotalAmount(this.props.index, 1, this.props.productsList[event.target.value]);
            }
        }
    }

    handleInputQuantity = (event) => {
        if (event.target.value <= 100000 && event.target.value > 0) {
            if (this.state.currentProduct) {
                this.setState({
                    currentQuantity: Number(event.target.value)
                })
                this.props.updateTotalAmount(this.props.index, event.target.value, this.state.currentProduct);
            }
        }
    }

    render() {
        let currentProduct = this.state.currentProduct;
        return (
            <tr>
                <th scope="row">
                    <span className="text-primary">{this.props.index + 1}</span>
                </th>
                <td>
                    <div className="form-control-wrap">
                        <div className="form-control-select">
                            <select className="form-control" onChange={this.handleProductDropdown} data-search="on">
                                <option value={-1}>Select Item</option>
                                {
                                    this.props.productsList ?
                                        this.props.productsList.map((item, key) => {
                                            return <option key={key} value={key} className="ccap" >{item.name}</option>;
                                        })
                                        : null
                                }
                            </select>
                        </div>
                    </div>
                </td>
                <td>{currentProduct ? currentProduct.sku : 'N/A'}</td>
                <td className="ccap">{currentProduct ? currentProduct.brand : 'N/A'}</td>
                <td><input type="number" min={1} maxLength={7} value={this.state.currentQuantity} onChange={this.handleInputQuantity} className="form-control" id="quantity" placeholder="Quantity" /></td>
                <td>{currentProduct ? currentProduct.uom : 'N/A'}</td>
                <td>{currentProduct ? currentProduct.price.total : 'N/A'}</td>
                <td>{currentProduct ? (Number(currentProduct.price.total) * Number(this.state.currentQuantity)) : 'N/A'} </td>
                {/* <td className="tb-tnx-action">
                    <div className="dropdown">
                        <a className="text-soft dropdown-toggle btn btn-icon btn-trigger" data-toggle="dropdown"><em className="icon ni ni-more-h"></em></a>
                        <div className="dropdown-menu dropdown-menu-right dropdown-menu-xs">
                            <ul className="link-list-plain">
                                <li><a onClick={() => { this.props.remove(this.props.key) }}>Remove</a></li>
                            </ul>
                        </div>
                    </div>
                </td> */}
            </tr>
        )
    }
}


export default Itemsreturn