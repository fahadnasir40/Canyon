import React, { Component } from 'react'
import Sidebar from '../Sidebar/sidebar'
import Header from '../Header/header'
import Footer from '../Footer/footer'
import Content from './Content/content'
import OrderDetails from './Auth/add'

// import React, { Component } from 'react'
// import Sidebar from '../Sidebar/sidebar'
// import Header from '../Header/header'
// import Footer from '../Footer/footer'
// import PropTypes from 'prop-types'
// import WizardFormFirstPage from './Wizards/WizardFormFirstPage'
// import WizardFormSecondPage from './Wizards/WizardFormSecondPage'
// import OrderDetails from './Wizards/OrderDetails'
// import WizardFormThirdPage from './Wizards/WizardFormThirdPage'


// import WizardFormThirdPage from './WizardFormThirdPage'
// import Content from './Content/content'

class Purchases extends Component {
  constructor(props) {
    super(props)
    this.nextPage = this.nextPage.bind(this)
    this.previousPage = this.previousPage.bind(this)
    this.state = {
      page: 1
    }
  }
  nextPage() {
      console.log("Next Page Called");
    this.setState({ page: this.state.page + 1 })
  }

  previousPage() {
    this.setState({ page: this.state.page - 1 })
  }

  render() {
    const { onSubmit } = this.props
    const { page } = this.state

    console.log("State",this.state)
    return (
      
        <div className="nk-body bg-lighter npc-default has-sidebar ">
        <div className="nk-app-root">
            <div className="nk-main"></div>
            <Sidebar/>         
            <div className="wrap container-fluid">
                <Header user = {this.props.user}/>   
                <div className="custom-dashboard mt-5">
                    <Content userList={this.props.userList}/>
                    {/* <div>
                        {page === 1 &&   <WizardFormFirstPage  onSubmit={this.nextPage} />}
                        {/* {page === 2 && ( <WizardFormSecondPage previousPage={this.previousPage} onSubmit={this.nextPage}/>)} */}
                        {/* {page === 2 && ( <OrderDetails previousPage={this.previousPage} onSubmit={this.nextPage}/>)} */}
                        {/* {page === 3 && ( <WizardFormThirdPage  previousPage={this.previousPage} onSubmit={onSubmit}/>)} */}
                    {/* </div> */}
                    <Footer/>
                </div>
            </div>
         </div>
    </div>
    )
  }
}

export default Purchases