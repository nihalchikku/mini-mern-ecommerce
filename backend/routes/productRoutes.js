const express = require("express");
const router = express.Router();
const { getProducts} = require("../controllers/productController");
const upload = require("../middleware/upload");
const Product = require("../models/Product");

//Get all Products
router.get("/",getProducts);


router.post(
    "/",
    upload.single("image"), async (req, res) => {
        try{
            

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

// Get single product by id
router.get("/:id", async (req, res) =>
{
    try {
        const product = await
        Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                message:"Product not found"
            });
        }

        res.json(product);
    } catch (err) {
        res.status(500).json({messaga: err.message});
    }
});



module.exports = router;