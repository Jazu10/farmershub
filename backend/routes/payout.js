const express = require("express");
const router = express.Router();

const {
    newPayout,
    allPayouts,
    updatePayout,
    singleSellerPayout,
    sellerPayouts,
} = require("../controllers/payoutController");

const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");

router
    .route("/seller/payout/new")
    .post(isAuthenticatedUser, authorizeRoles("seller"), newPayout);

router
    .route("/seller/payouts/:id")
    .get(isAuthenticatedUser, authorizeRoles("seller"), sellerPayouts);

router
    .route("/seller/payout")
    .post(isAuthenticatedUser, authorizeRoles("seller"), singleSellerPayout);

router
    .route("/admin/payouts")
    .get(isAuthenticatedUser, authorizeRoles("admin"), allPayouts);

router
    .route("/admin/payout/update")
    .put(isAuthenticatedUser, authorizeRoles("admin"), updatePayout);

module.exports = router;
