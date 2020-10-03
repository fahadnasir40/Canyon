const mongoose = require("mongoose");

const customerSchema = mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true
    },
    addedBy:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        trim: true
    },
    phone:{
        type: String,
        trim: true
    },
    address:[{
        name:{
            type: String
        }
    }],
    flatRate:{
        type: Boolean,
        default: false
    },
    customerLimit:{
        type: Number,
        default: 0
    },
    customerBottles:{
        type: Number,
        default: 0
    },
    salePrice:[{
        _id:{
            type: String
        },
        rate:{
            type: String
        }
    }],
    status: {
        type: String,
        default: 'active'
    }
},{timestamps:true})

const Customer = mongoose.model('Customer',customerSchema);

module.exports = { Customer }