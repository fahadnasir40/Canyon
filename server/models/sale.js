const mongoose = require("mongoose");
const shortid = require('shortid');


const saleSchema = mongoose.Schema({
    _id: {
        type: String,
        default: shortid.generate()
    },
    addedBy: {
        type: String,
        required: true,
    },
    customerId: {
        type: String,
        required: true,
    },
    customerName: {
        type: String,
        required: true,
    },
    customerAddress: {
        _id: String,
        name: String
    },
    description: {
        type: String,
        trim: true
    },
    saleDate: {
        type: Date,
        required: true
    },
    productDetails: [{
        pname: {
            type: String,
            trim: true
        },
        _id: { type: String },
        puom: {
            type: String
        },
        rqty: {
            type: Number
        },
        dqty: {
            type: Number
        },
        disc: {
            type: Number
        },
        pmethod: {
            type: String
        },
        pprice: {
            type: Number
        },
        secpaid: {
            type: Number
        },
        ptotal: {
            type: Number
        },
    }],
    totalAmount: {
        type: Number,
        required: true
    },
    secAmount: {
        type: Number
    },
    paidAmount: {
        type: Number,
        required: true
    }
}, { timestamps: true })

const Sale = mongoose.model('Sale', saleSchema);

module.exports = { Sale }