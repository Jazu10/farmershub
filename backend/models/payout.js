const mongoose = require("mongoose");

const payout = new mongoose.Schema({
    order: {
        type: mongoose.Schema.ObjectId,
        ref: "Order",
        required: true,
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
    },
    amount: {
        type: Number,
        required: [true, "Please enter amount"],
    },
    status: {
        type: String,
        default: "Not Paid",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Payout", payout);
