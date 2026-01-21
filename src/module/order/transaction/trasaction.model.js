const mongoose = require('mongoose');
const { Payment_Method, Payment_Status } = require('../../../config/constant.config');


const TransactionSchema = new mongoose.Schema({
    order: {
        type: mongoose.Types.ObjectId,
        ref: "Order",
        required: true
    },
    transactionCode: {
        type: String,
        required: true,
        unique: true
    },
    amount: {
        type: Number,
        required: true,
        min: 100     //Rs.1 at least
    },
    paymentMethod: {
        type: String,
        enum: Object.values(Payment_Method),
        default: Payment_Method.COD

    },
    status: {
        type: String,
        enum: Object.values(Payment_Status),
        default: Payment_Status.PENDIND
    },
    response: String
}, {
    timestamps: true,
    autoCreate: true,
    autoIndex: true
})


const transactionModel = mongoose.model("Transaction", TransactionSchema);
module.exports = transactionModel;