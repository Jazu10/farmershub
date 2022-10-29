const Payout = require("../models/payout");

const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");

exports.newPayout = catchAsyncErrors(async (req, res, next) => {
    let payout = await Payout.findOne({
        $and: [{ order: req.body.order }, { user: req.body.user }],
    });

    if (payout.length > 0) {
        return next(new ErrorHandler("Payout already requested", 404));
    }

    payout = await Payout.create(req.body);

    res.status(201).json({
        success: true,
        payout,
    });
});

exports.allPayouts = catchAsyncErrors(async (req, res, next) => {
    const payouts = await Payout.find();

    res.status(200).json({
        success: true,
        payouts,
    });
});

exports.updatePayout = catchAsyncErrors(async (req, res, next) => {
    const payout = await Payout.findOne({
        $and: [{ order: req.body.order }, { user: req.body.user }],
    });

    if (payout.length === 0) {
        return next(new ErrorHandler("No Payout found", 404));
    }
    payout.status = "Paid";

    await payout.save({ validateBeforeSave: false });

    res.status(200).json({
        success: true,
    });
});

exports.sellerPayouts = catchAsyncErrors(async (req, res, next) => {
    const payouts = await Payout.find({ user: req.params.id });

    res.status(200).json({
        success: true,
        payouts,
    });
});
