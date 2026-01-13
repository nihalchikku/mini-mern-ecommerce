const express = require("express");
const router = express.Router();
const { addProduct, getProducts, deleteProduct,updateProduct } = require("../controllers/productController");
const upload = require("../middleware/upload");
const Product = require("../models/Product");

//Add new product
// router.post("/",addProduct);

//Get all Products
router.get("/",getProducts);

//Delete product by id
router.delete("/:id",deleteProduct);

router.post(
    "/",
    upload.single("image"), async (req, res) => {
        try{
            console.log("Body:",req.body);
            console.log("File:",req.file);

            if(!req.file) {
                return res.status(400).json({message: "Image not uploaded"});
            }
            const product = new Product({
                name: req.body.name,
                price: req.body.price,
                category: req.body.category,
                image: req.file.path,
                //Cloudinary URL
            });

            await product.save();
            res.status(201).json(product);
        } catch (err) {
            console.error(err);
            res.status(500).json({message: err.message});
        }
    }
);

// //Update product
// router.put("/:id",updateProduct);

module.exports = router;