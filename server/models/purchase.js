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
    poNumber: {
        type: Number
    },
    supplierId: {
        type: String,
        required: true,
    },
    supplierName: {
        type: String,
        required: true,
    },
    supplierAddress: {
        _id: String,
        name: String
    },
    description: {
        type: String,
        trim: true
    },
    purchaseDate: {
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
        returnQty: {
            type: Number,
            default: 0
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
    },
    status: {
        type: String
    }
}, { timestamps: true })

const Purchase = mongoose.model('Purchase', productSchema);

module.exports = { Purchase }