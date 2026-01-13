import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const ProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    

    useEffect(() => {
        fetch(`http://localhost:5000/products/${id}`)
        .then(res => res.json())
        .then(data => setProduct(data));
    }, [id]);

    if(!product) {
        return (
            <div className="text-center text-red-500 mt-10">
                Product not found
            </div>
        );
    }
    return (
        <div className="max-w-5xl mx-auto p-6">
            <button 
            onClick={() => navigate(-1)} 
            className="mb-6 text-blue-500 hover:underline">
                Back to Products
            </button>
            <div className="grid md:grid-cols-2 gap-10 bg-white shadow-lg rounded-xl p-6">
                {/* image */}

                <div className="flex justify-center">
                    <img src={product.image}
                    alt={product.name}
                    className="w-full max-w-sm rounded-lg object-cover" />
                </div>

                {/* Details */}
                <div className="flex flex-col justify-center space-y-4">
                    <h1 className="text-3xl font-bold text-gray-800">{product.name}</h1>
                
                    <p className="text-gray-500">Category: 
                        <span className="font-medium">{product.category}</span>
                    </p>
                    <p className="text-2xl font-semibold text-green-600">Rs:{product.price}</p>

                    <button
                     className="mt-4 bg-blue-600 hover: bg-blue-700 text-white py-2 px-4 rounded-lg w-fit">
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;