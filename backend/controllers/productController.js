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

const deleteProduct = async (req, res) => {
    try{
        const product = await 
        Product.findByIdAndDelete(req.params.id);

        if(!product){
            return res.status(404).json({message:"Product not found"});
        }
        res.json({message:"Product deleted successfully"});
    } catch (error) {
        res.status(500).json({message:error.message});
    }
};

// const updateProduct = async (req, res) => {
//     try{
//         const updateProduct = await
//         Product.findByIdAndUpdate(
//             req.params.id,
//             req.body,
//             {new: true}
//         );
//         res.json(updateProduct);
//     } catch (err) {
//         res.status(500).json({message: "Update failed"});
//     }
// };


module.exports = { addProduct, getProducts, deleteProduct };