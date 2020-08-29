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
    brand:{
        type: String,
        required: true
    },
    status: {
        type: String,
        default: 'active'
    }
},{timestamps:true})

const Supplier = mongoose.model('Supplier',supplierSchema);

module.exports = { Supplier }