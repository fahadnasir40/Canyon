const mongoose = require("mongoose");

const transactionSchema = mongoose.Schema({
    transaction_date: {
        type: Date,
        required: true
    },
    addedBy: {
        type: String,
        required: true,
    },
    primary_quantity: {
        type: Number,
        required: true,
        default: 0
    },
    transaction_source: {
        type: String,
        required: true
    },
    transaction_type: {
        type: String,
        required: true
    },
    transaction_action: {
        type: String,
        required: true
    },
    transaction_action_id: {
        type: String,
    },
    transaction_value_id: {
        type: String,
        required: true
    },
    transaction_value: {
        type: String,
        required: true
    },
    rate: {
        type: Number
    },
    comments: {
        type: String
    },
    from_item: {
        type: String
    },
    to_item: {
        type: String
    },
    ritem: {
        type: String
    },
    category: {
        type: String,
        default: 'External'
    },
    status: {
        type: String,
        default: 'active'
    }
}, { timestamps: true })

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = { Transaction }