const express = require("express");
const router = express.Router();

const {
    getProducts,
    getAdminProducts,
    newProduct,
    getSingleProduct,
    updateProduct,
    activateProduct,
    deleteProduct,
    createProductReview,
    getProductReviews,
    deleteReview,
    getSellerProducts,
    getSellerProductReviews,
} = require("../controllers/productController");

const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");

router.route("/products").get(getProducts);
router.route("/admin/products").get(getAdminProducts);
router.route("/product/:id").get(getSingleProduct);

router
    .route("/admin/product/new")
    .post(isAuthenticatedUser, authorizeRoles("admin"), newProduct);

router
    .route("/admin/product/:id")
    .put(isAuthenticatedUser, authorizeRoles("admin"), updateProduct)
    .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteProduct);

router
    .route("/admin/product/activate")
    .post(isAuthenticatedUser, authorizeRoles("admin"), activateProduct);

router.route("/review").put(isAuthenticatedUser, createProductReview);
router.route("/reviews").get(isAuthenticatedUser, getProductReviews);
router.route("/reviews").delete(isAuthenticatedUser, deleteReview);

router
    .route("/seller/product/new")
    .post(isAuthenticatedUser, authorizeRoles("seller"), newProduct);
router.route("/seller/products/:id").get(getSellerProducts);

router
    .route("/seller/product/:id")
    .put(isAuthenticatedUser, authorizeRoles("seller"), updateProduct)
    .delete(isAuthenticatedUser, authorizeRoles("seller"), deleteProduct);

router
    .route("/seller/reviews")
    .get(isAuthenticatedUser, getSellerProductReviews);

module.exports = router;
