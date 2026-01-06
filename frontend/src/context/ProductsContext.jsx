import { createContext, useState } from "react";

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
        fetch("http://locathost:5000/products", {
            method: "POST",
            headers: {"Content-Type":
                "application/json"},
                body: JSON.stringify(product),
        });
    };

    return (
        <ProductsContext.Provider
            value={{ products,
                fetchProducts, addProduct }}
                >
                    {children}
                </ProductsContext.Provider>
    );
};