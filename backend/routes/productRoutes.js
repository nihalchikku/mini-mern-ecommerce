const express = require("express");
const Product = require("../models/Product");

const router = express.Router();

//Get products
router.get("/", async (req, res) => {
    const products = await
    Product.find();
    res.json(products);
});

//POST product
router.post("/", async (req, res) => {
    const {name, price, category, image} = req.body;

    const product = new Product({name, price,  category, image});
    await product.save();

    res.status(201).json(product);
});

module.exports = router;