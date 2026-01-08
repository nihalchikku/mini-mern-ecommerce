import { createContext, useEffect, useState } from "react";

export const ProductsContext = createContext();

export const ProductsProvider = 
({children}) => {
    const [products, setProducts] = useState([]);

    const fetchProducts = async () => {
        const res = await 
        fetch("http://localhost:5000/products");

        const data = await res.json();
        setProducts(data);
    };

    const addProduct = async (product) => {
        await
        fetch("http://localhost:5000/products", {
            method: "POST",
            headers: {"Content-Type":
                "application/json"},
                body: JSON.stringify(product),
        });
    };

    const deleteProduct = async (id) => {
        await
        fetch(`http://localhost:5000/products/${id}`, {
            method: "DELETE",
        });

        setProducts((prev) =>
            prev.filter((p)=>
        p._id !== id));
    };

    

    return (
        <ProductsContext.Provider
            value={{ products,
                fetchProducts, addProduct,deleteProduct }}
                >
                    {children}
                </ProductsContext.Provider>
    );
};