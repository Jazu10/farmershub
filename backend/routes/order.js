const express = require("express");
const router = express.Router();

const {
    newOrder,
    getSingleOrder,
    myOrders,
    allOrders,
    updateOrder,
    deleteOrder,
    getSellerOrders,
    sellerOrderDetails,
} = require("../controllers/orderController");

const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");

router.route("/order/new").post(isAuthenticatedUser, newOrder);

router.route("/order/:id").get(isAuthenticatedUser, getSingleOrder);
router.route("/orders/me").get(isAuthenticatedUser, myOrders);

router
    .route("/admin/orders")
    .get(isAuthenticatedUser, authorizeRoles("admin"), allOrders);

router
    .route("/admin/order/:id")
    .put(isAuthenticatedUser, authorizeRoles("admin"), updateOrder)
    .delete(isAuthenticatedUser, deleteOrder);

router
    .route("/seller/orders/:id")
    .get(isAuthenticatedUser, authorizeRoles("seller"), getSellerOrders);

router
    .route("/seller/order")
    .post(isAuthenticatedUser, authorizeRoles("seller"), sellerOrderDetails);

module.exports = router;
