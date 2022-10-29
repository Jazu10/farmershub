const express = require("express");
const router = express.Router();

const {
    newPayout,
    allPayouts,
    updatePayout,
    sellerPayouts,
} = require("../controllers/payoutController");

const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");

router
    .route("/payouts")
    .post(isAuthenticatedUser, authorizeRoles("seller"), newPayout);

router
    .route("/payouts/:id")
    .get(isAuthenticatedUser, authorizeRoles("seller"), sellerPayouts);

router
    .route("/payouts")
    .get(isAuthenticatedUser, authorizeRoles("admin"), allPayouts);

router
    .route("/payouts/update")
    .put(isAuthenticatedUser, authorizeRoles("admin"), updatePayout);

module.exports = router;
