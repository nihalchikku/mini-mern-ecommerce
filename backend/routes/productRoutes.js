const express = require("express");
const router = express.Router();
const { addProduct, getProducts, deleteProduct, updateProduct } = require("../controllers/productController");


//Add new product
router.post("/",addProduct);

//Get all Products
router.get("/",getProducts);

//Delete product by id
router.delete("/:id",deleteProduct);

//Update product
router.put("/:id",updateProduct);

module.exports = router;