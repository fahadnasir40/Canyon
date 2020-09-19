import React, { useState } from 'react';
// import logo from './logo.svg';
// import './App.css';
import { Tabs, Tab } from 'react-bootstrap';
import SaleDetailsProduct from '../Sales/Add/SaleDetailsProduct'
import SaleDetailsTransaction from '../Sales/Add/SaleDetailsTransaction'
import SaleDetailsPayment from '../Sales/Add/SaleDetailsPayment'

function Salestab() {
    const [key, setKey] = useState('home');

    return (
        <div className="Product">


            <Tabs
                id="controlled-tab-example"
                activeKey={key}
                onSelect={(k) => setKey(k)}
            >

                <Tab eventKey="Product" title="Product Detail">
                    <SaleDetailsProduct />
                </Tab>
                <Tab eventKey="Transaction" title="Transaction">
                    <SaleDetailsTransaction />
                </Tab>
                <Tab eventKey="Payment" title="Payment">
                    <SaleDetailsPayment />
                </Tab>

            </Tabs>

        </div>
    );
}

export default Salestab;