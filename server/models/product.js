const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true
    },
    addedBy:{
        type: String,
        required: true,
    },
    sku:{
        type: String,
        required: true,
        unique: 1
    },
    brand:{
        type: String,
        required: true
    },
    price: {
        cost_seal: [ Number ],
        cost_wrapper: [ Number ],
        cost_security: [ Number ],
        cost_flatRate: [ Number],
        cost_others: [Number],
        total: [Number]
    },
    uom:{
        type: String,
        required: true
    },
    stock:{
        type: Number,
        default: 0,
        min: 0
    },
    status: {
        type: String,
        default: 'active'
    }
},{timestamps:true})

const Product = mongoose.model('Product',productSchema);

module.exports = { Product }