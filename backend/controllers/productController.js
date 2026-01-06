const Product = require("../models/Product");

const addProduct = async (req, res) => {
    
    console.log("BODY =>",req.body);
    
    try{
        
        const newProduct = new 
        Product(req.body);
        const savedProduct = await
        newProduct.save();

        res.status(201).json(savedProduct);
    } catch(err) {
        res.status(500).json({message:err.message});
    }
};

const getProducts = async (req, res) => {
    try{
        const products = await 
        Product.find();
        res.json(products);
    } catch (err) {
        res.status(500).json({message:
            err.message});
    }
};

module.exports = { addProduct, getProducts };