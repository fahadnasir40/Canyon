import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import ReactPaginate from 'react-paginate'
import $ from 'jquery'

class CustomersContent extends Component {


    state = {
        customersList: '',
        offset: 0,
        perPage: 8,
        currentPage: 0,
    }



    componentDidMount() {
        this.setState({
            customersList: this.props.customersList,
            pageCount: Math.ceil(this.props.customersList.length / this.state.perPage)
        })
    }

    componentWillUpdate(nextProps, nextState) {
        if (this.props != nextProps) {
            if (this.props.customersList.length < nextProps.customersList) {
                nextState = {
                    customersList: nextProps.customersList
                }
            }
        }
    }

    handlePageClick = (e) => {
        const selectedPage = e.selected;
        const offset = selectedPage * this.state.perPage;

        this.setState({
            currentPage: selectedPage,
            offset: offset
        }, () => {
            // this.receivedData()
        });
    };

    handleChange = (e) => {
        // Variable to hold the original version of the list
        let currentList = [];
        // Variable to hold the filtered list before putting into state
        let newList = [];

        // If the search bar isn't empty
        if (e.target.value !== "") {
            // Assign the original list to currentList
            currentList = this.props.customersList;

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
            newList = this.props.customersList;
        }
        // Set the filtered state based on what our rules added to newList
        this.setState({
            customersList: newList
        });
    }


    getInitials = (name) => {
        var initials = name.match(/\b\w/g) || [];
        initials = ((initials.shift() || '') + (initials.pop() || '')).toUpperCase();
        return initials;
    }

    bg = ["bg-primary", "bg-warning", "bg-info", "bg-secondary", "bg-danger", "bg-dark"];

    count = 0;

    getCustomBg = () => {
        if (this.count > this.bg.length) {
            this.count = 0;
        }
        return (this.bg[this.count++]);
    }


    getColText = (value) => {
        if (value && value.length < 25)
            return (<span className="tb-text">{value}</span>)
        else if (value && value.length >= 25) {
            return (<span className="tb-text">{value + ' ...'}</span>)
        }

        return (<span className="tb-text ff-italic text-muted">Not added yet</span>)
    }

    renderCustomersList = () => {

        let customersList = this.state.customersList;

        if (customersList) {

            const slice = customersList.slice(this.state.offset, this.state.offset + this.state.perPage)

            return slice.map((customer, i) => {
                return (
                    <div className="nk-tb-item" key={i}>
                        <div className="nk-tb-col nk-tb-col-check">
                            <div className="custom-control custom-control-sm custom-checkbox notext">
                                <input type="checkbox" className="custom-control-input" id={"uid-" + i} />
                                <label className="custom-control-label" htmlFor={"uid-" + i}></label>
                            </div>
                        </div>
                        <div className="nk-tb-col">
                            <Link to={{
                                pathname: "/customerInfo",
                                state: {
                                    customerInfo: customer
                                }
                            }}
                            >
                                <div className="user-card">
                                    <div className={"user-avatar " + this.getCustomBg()}>
                                        <span>{this.getInitials(customer.name)}</span>
                                    </div>
                                    <div className="user-info">
                                        <span className="tb-lead">{customer.name}
                                            {
                                                customer.status === "active" ?
                                                    <span className="dot dot-success d-md-none ml-1"></span>
                                                    :
                                                    <span className="dot dot-danger d-md-none ml-1"></span>
                                            } </span>

                                    </div>
                                </div>
                            </Link>
                        </div>
                        <div className="nk-tb-col tb-col-mb">
                            {this.getColText(customer.email)}
                        </div>
                        <div className="nk-tb-col tb-col-md">
                            {this.getColText(customer.phone)}
                        </div>
                        <div className="nk-tb-col tb-col-lg">
                            {this.getColText(customer.address[0].name)}
                        </div>
                        <div className="nk-tb-col tb-col-md">
                            {
                                customer.status === 'active' ?
                                    <span className="tb-status text-success ccap">{customer.status}</span>
                                    : <span className="tb-status text-danger ccap">{customer.status}</span>
                            }

                        </div>
                        <div className="nk-tb-col nk-tb-col-tools">
                            <ul className="nk-tb-actions gx-1">
                                {
                                    customer.email ?
                                        <li className="nk-tb-action-hidden">
                                            <a href={"mailto:" + customer.email} className="btn btn-trigger btn-icon" data-toggle="tooltip" data-placement="top" title="Send Email">
                                                <em className="icon ni ni-mail-fill"></em>
                                            </a>
                                        </li>

                                        : null
                                }


                                <li>
                                    <div className="drodown">
                                        <a href="#" className="dropdown-toggle btn btn-icon btn-trigger" data-toggle="dropdown"><em className="icon ni ni-more-h"></em></a>
                                        <div className="dropdown-menu dropdown-menu-right">
                                            <ul className="link-list-opt no-bdr">
                                                <li>    <Link to={{
                                                    pathname: "/customerInfo",
                                                    state: {
                                                        customerInfo: customer
                                                    }
                                                }}
                                                ><em className="icon ni ni-eye"></em><span>View Details</span></Link></li>
                                                <li className="divider"></li>
                                                {
                                                    this.props.user.login.role !== 'worker' ?
                                                        <li> <Link to={{
                                                            pathname: "/editCustomer",
                                                            state: {
                                                                customerInfo: customer
                                                            }
                                                        }}>
                                                            <em className="icon ni ni-pen"></em><span>Edit details</span></Link></li>
                                                        : null
                                                }{
                                                    this.props.user.login.role !== 'worker' ?
                                                        customer.status === "active" ?
                                                            <li><a onClick={() => { this.props.changeStatus(customer) }}>
                                                                <em className="icon ni ni-na"></em><span style={{ cursor: "pointer" }} className="text-warning">Suspend</span>
                                                            </a></li>
                                                            :
                                                            <li><a onClick={() => { this.props.changeStatus(customer) }}>
                                                                <em className="icon ni ni-user-check"></em><span style={{ cursor: "pointer" }} className="text-info">Active Customer</span>
                                                            </a></li>
                                                        : null
                                                }

                                                {/* <li><a onClick={() => { this.props.deleteCustomer(customer) }}><em className="icon ni ni-trash"></em><span style={{ cursor: "pointer" }} className="text-danger ">Remove Customer</span></a></li> */}

                                            </ul>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                )
            })
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.customersList !== this.props.customersList) {
            this.setState({ customersList: this.props.customersList });
        }
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
            <div className="nk-content ml-md-5">
                <div className="container-fluid">
                    <div className="nk-content-inner">
                        <div className="nk-content-body">
                            <div className="nk-block-head nk-block-head-sm">
                                <div className="nk-block-between">
                                    <div className="nk-block-head-content">
                                        <h3 className="nk-block-title page-title">Customers</h3>
                                    </div>
                                    <div className="nk-block-head-content">
                                        <div className="toggle-wrap nk-block-tools-toggle">
                                            <a onClick={this.showBar} id="showButton" className="btn btn-icon btn-trigger toggle-expand mr-n1" data-target="more-options"><em className="icon ni ni-more-v"></em></a>
                                            <div className="toggle-expand-content" id="expandBar" data-content="more-options">
                                                <ul className="nk-block-tools g-3">
                                                    <li>
                                                        <div className="form-control-wrap">
                                                            <div className="form-icon form-icon-right">
                                                                <em className="icon ni ni-search"></em>
                                                            </div>
                                                            <input type="text" onChange={this.handleChange} className="form-control" id="default-04" placeholder="Search by name" />
                                                        </div>
                                                    </li>
                                                    {
                                                        this.props.user.login.role !== 'worker' ?
                                                            <li className="nk-block-tools-opt">
                                                                <Link to={"/addCustomer"} className="toggle btn btn-icon btn-primary d-md-none mr-4"><em className="icon ni ni-plus"></em></Link>
                                                                <Link to={"/addCustomer"}><button className="toggle btn btn-primary d-none d-md-inline-flex"><em className="icon ni ni-plus"></em><span>Add Customer</span></button></Link>
                                                            </li>
                                                            : null
                                                    }

                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="nk-block">
                                <div className="nk-tb-list is-separate mb-3">
                                    <div className="nk-tb-item nk-tb-head">
                                        <div className="nk-tb-col " />

                                        <div className="nk-tb-col"><span className="sub-text">Name</span></div>
                                        <div className="nk-tb-col tb-col-mb"><span className="sub-text">Email</span></div>
                                        <div className="nk-tb-col tb-col-md"><span className="sub-text">Phone</span></div>
                                        <div className="nk-tb-col tb-col-lg"><span className="sub-text">Address</span></div>
                                        <div className="nk-tb-col tb-col-md"><span className="sub-text">Status</span></div>
                                        <div className="nk-tb-col"><span className="sub-text">Action</span></div>
                                    </div>
                                    {this.renderCustomersList()}
                                </div>
                                <div className="card">
                                    <div className="card-inner">
                                        <div className="nk-block-between-md g-3">
                                            <div className="g">
                                                <ReactPaginate
                                                    previousLabel={"prev"}
                                                    nextLabel={"next"}
                                                    breakLabel={"..."}
                                                    breakClassName={"page-item"}
                                                    breakLinkClassName={"page-link"}
                                                    pageClassName={"page-item"}
                                                    pageLinkClassName={"page-link"}

                                                    pageCount={this.state.pageCount}
                                                    marginPagesDisplayed={2}
                                                    pageRangeDisplayed={5}
                                                    onPageChange={this.handlePageClick}
                                                    containerClassName={"pagination-goto pagination-sm d-flex justify-content-center justify-content-md-start gx-1 "}
                                                    previousClassName={"page-item"}
                                                    nextClassName={"page-item"}
                                                    activeClassName={"active"}
                                                    disabledClassName={"disabled"} />
                                                {/* <ul className="pagination jpagination">
                                                    <li className="page-item"><a className="page-link" href="#"><em className="icon ni ni-chevrons-left"></em></a></li>
                                                    <li className="page-item"><a className="page-link" href="#">1</a></li>
                                                    <li className="page-item"><span className="page-link"><em className="icon ni ni-more-h"></em></span></li>
                                                    <li className="page-item"><a className="page-link" href="#"><em className="icon ni ni-chevrons-right"></em></a></li>
                                                </ul> */}
                                            </div>
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

export default CustomersContent;