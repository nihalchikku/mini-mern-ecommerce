import React from 'react';
import { useNavigate } from "react-router-dom";

const Products = () =>{
    const navigate = useNavigate();

    return(
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Products</h1>
            <button onClick={()=> navigate("/add-product")}
            className="bg-green-500 text-white p-2 rounded">+ Add Product</button>
        </div>
    );
};

export default Products;