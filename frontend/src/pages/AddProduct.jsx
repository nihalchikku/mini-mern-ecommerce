import { useState, useContext } from "react";
import { ProductsContext } from "../context/ProductsContext";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
    const {addProduct} =
    useContext(ProductsContext);
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory]=useState("");
    const [image, setImage] = useState("");
    
    const handleSubmit = (e) => {
        e.preventDefault();
        addProduct({name, price, category, image});
        navigate("/products");
    };

    return(
        <form onSubmit={handleSubmit}
        className="max-w-md mx-auto p-4">
            <input placeholder="Name"
            value={name} onChange={e =>
                setName(e.target.value)}
                className="border p-2 w-full mb-2" />
                 <input placeholder="Price"
            value={price} onChange={e =>
                setPrice(e.target.value)}
                className="border p-2 w-full mb-2" />
                 <input placeholder="Category"
            value={category} onChange={e =>
                setCategory(e.target.value)}
                className="border p-2 w-full mb-2" />
                 <input placeholder="Image URL"
            value={image} onChange={e =>
                setImage(e.target.value)}
                className="border p-2 w-full mb-2" />
                <button type="submit"
                className="bg-blue-500 text-white p2 w-full">Add Product</button>
        </form>
    );
};

export default AddProduct;