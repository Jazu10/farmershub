const express = require("express");
const router = express.Router();

const {
    processPayment,
    sendApiKey,
    verify,
} = require("../controllers/paymentController");

const { isAuthenticatedUser } = require("../middlewares/auth");

router.route("/payment/process").post(isAuthenticatedUser, processPayment);
router.route("/razorpayapi").get(isAuthenticatedUser, sendApiKey);
router.route("/payment/verify").post(isAuthenticatedUser, verify);

module.exports = router;
