const mongoose = require("mongoose");

const documentSchema = mongoose.Schema({
    title:{
        type: String,
        required: true,
    },
    ownerId:{
        type: String,
        required: true,
    },
    formdata:{
        type: String,
        default: 'N/A'
    },
    type:{
        type: String,
        default: 'N/A'
    },
    invites:[{
        type: String
    }],
    ownerName:{
        type: String
    }
},{timestamps:true})

const Document = mongoose.model('Document',documentSchema);

module.exports = { Document }