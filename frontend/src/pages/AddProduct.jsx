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
    const [image, setImage] = useState(null);
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const formData = new FormData();
        formData.append("name", name);
        formData.append("price",price);
        formData.append("category",category);
        formData.append("image",image);
        //image file

        await fetch("http://localhost:5000/products"
            ,{
                method: "POST",
                body: formData,
            });
            
            //Reset fields
            setName("");
            setPrice("");
            setCategory("");
            setImage(null);

            navigate("/products");
    };

    return(
        <form onSubmit={handleSubmit}
        encType="multipart/form-data"
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
                 <input
                 type="file"
                 name="image"
                 onChange={(e)=>
                    setImage(e.target.files[0])}
                className="border p-2 w-full mb-2" />
                <button type="submit"
                className="bg-blue-500 text-white p2 w-full">Add Product</button>
        </form>
    );
};

export default AddProduct;