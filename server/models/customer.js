const mongoose = require("mongoose");

const supplierSchema = mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    addedBy:{
        type: String,
        required: true,
    },
    email:{
        type: String,
    },
    phone:{
        type: String,
    },
    address:[{
        name:{
            type: String
        }
    }],
    status: {
        type: String,
        default: 'active'
    }
},{timestamps:true})

const Customer = mongoose.model('Customer',supplierSchema);

module.exports = { Customer }