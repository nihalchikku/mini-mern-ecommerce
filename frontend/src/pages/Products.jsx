import React from 'react';
import { useEffect, useState, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { ProductsContext } from '../context/ProductsContext';

const Products = () =>{
    const navigate = useNavigate();

    const [products, setProducts] = useState([]);

    const [loading, setLoading] = useState(true);

    const { product, deleteProduct } = useContext(ProductsContext);

    const handleDelete = (id) => {
        if(window.confirm("Are you sure?")) {
            deleteProduct(id);
        }
    };

    const [editProduct, setEditProduct] = useState(null);

    const [search, setSearch] = useState("");

    const filteredProducts = 
        products.filter((p)=>
        p.name.toLowerCase().includes(search.toLowerCase()) || 
        p.category.toLowerCase().includes(search.toLowerCase())
    );

    const handleUpdate = async (e) => {
        e.preventDefault();

        await fetch(
            `http://localhost:5000/products/${editProduct._id}`,
            {
                method: "PUT",
                headers: {"Content-Type":"application/json"},
                body:
                JSON.stringify(editProduct),
            }
        );

        setProducts((prev)=>
        prev.map((p) =>
        p._id === editProduct._id ? 
    editProduct : p 
            )
        );
        setEditProduct(null);
    }

    useEffect(()=> {
        fetch("http://localhost:5000/products")
        .then((res) => res.json())
        .then((data) => {
            setProducts(data);
            setLoading(false);       
        })
        
        .catch((err) => {
            console.log("Error fetching products:",err);
            setLoading(false);
        });
    },[]);


    return(
        <div className="p-4">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Products</h1>
                <input
                    type="text"
                    placeholder='Search product...'
                    value={search}
                    onChange={(e)=> 
                        setSearch(e.target.value)}
                        style={{padding:"8px",marginBottom:"20px",width:"300px"}}
                        />
                <button 
                    onClick={() => navigate("/add-product")}
                    className="bg-green-500 text-white px-4 py-2 rounded">
                        + Add Product </button>
                
            </div>
            

            {loading && <p>Loading products...</p>}

            {editProduct && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded-lg w-[350px]">
      <h2 className="text-xl font-bold mb-4">Edit Product</h2>

      <form onSubmit={handleUpdate}>
        <input
          type="text"
          placeholder="Name"
          value={editProduct.name}
          onChange={(e) =>
            setEditProduct({ ...editProduct, name: e.target.value })
          }
          className="border p-2 w-full mb-2 rounded"
        />

        <input
          type="number"
          placeholder="Price"
          value={editProduct.price}
          onChange={(e) =>
            setEditProduct({ ...editProduct, price: e.target.value })
          }
          className="border p-2 w-full mb-2 rounded"
        />

        <input
          type="text"
          placeholder="Category"
          value={editProduct.category}
          onChange={(e) =>
            setEditProduct({ ...editProduct, category: e.target.value })
          }
          className="border p-2 w-full mb-2 rounded"
        />

        <input
          type="text"
          placeholder="Image URL"
          value={editProduct.image}
          onChange={(e) =>
            setEditProduct({ ...editProduct, image: e.target.value })
          }
          className="border p-2 w-full mb-3 rounded"
        />

        <div className="flex justify-between">
          <button
            type="button"
            onClick={() => setEditProduct(null)}
            className="bg-gray-400 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  </div>
)}

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {filteredProducts.map((product)=> (
                    <div
                    key={product._id}
                    className="border rounded p-3 shadow">
                        <img 
                        src={product.image}
                        alt={product.name}
                        className="h-40 w-full object-cover mb-2"
                        />
                        <h2 className="font-semibold">{product.name}</h2>
                        <p className="text-gray-600">Rs{product.price}</p>
                        <p className="text-sm text-gray-500">{product.category}</p>
                        
                        <button
                        onClick={()=>
                            handleDelete(product._id)}
                            style={{
                                marginBottom:"10px",
                                background: "red",
                                color: "white",
                                border: "none",
                                padding: "5px 10px",
                                cursor: "pointer",
                            }}
                            >Delete</button>
                        <button 
                        onClick={()=>
                            setEditProduct(product)}
                            className='bg-blue-500 text-white px-3 py-1 rounded ml-1'>
                                Edit
                            </button>
                    </div>
                ))}
                
            </div>
            {!loading && products.length === 0 && (
                <p>No product found </p>
            )}

            
        </div>
    );
};

export default Products;