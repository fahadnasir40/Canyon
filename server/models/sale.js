const mongoose = require("mongoose");
const shortid = require('shortid');


const productSchema = mongoose.Schema({
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
        pqty: {
            type: Number
        },
        pprice: {
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
    paidAmount: {
        type: Number,
        required: true
    }
}, { timestamps: true })

const Sale = mongoose.model('Sale', productSchema);

module.exports = { Sale }