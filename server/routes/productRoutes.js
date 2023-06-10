const express = require("express");
const { getAllProduct, updateProduct, deleteProduct, createProduct, singleProduct } = require("../controller/productcontroller");

const singleUpload = require("../middlewares/multer");
const router = express.Router()
// const upload = require("../file/upload")
// const { createProduct } = require("../controller/productcontroller");

//create product route
router.route("/add/product").post(singleUpload,createProduct);
router.route("/products").get(getAllProduct);
router.route("/single/product/:id").get(singleProduct);
router.route("/product/update/:id").put(singleUpload,updateProduct);
router.route("/product/delete/:id").delete(deleteProduct);
module.exports= router;
