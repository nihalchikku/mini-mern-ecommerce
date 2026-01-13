import React from 'react';
import { useEffect, useState, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { ProductsContext } from '../context/ProductsContext';

const Products = () =>{
    const navigate = useNavigate();

    const [products, setProducts] = useState([]);

    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");

    const [category, setCategory] = useState("All");

    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 6;

    const [sortPrice, setSortPrice] = useState("default");

    useEffect(() => {
      setCurrentPage(1);
    },[search, sortPrice]);

    const filteredProducts = 
    
        products.filter((p)=> {
          const matchSearch =
          p.name.toLowerCase().includes(search.toLowerCase()) ||
          p.category.toLowerCase().includes(search.toLowerCase());

          const matchCategory = 
          category === "All" || p.category === category;

          return matchSearch && matchCategory;
        })
        .map((p) => ({
          ...p,
          price: Number(p.price),
        }))
        .sort((a, b) => {
          if(sortPrice === "low") return a.price - b.price;
          if(sortPrice === "high") return b.price - a.price;
          return 0;
        });
        
   

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

    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

    const currentProducts = 
    filteredProducts.slice(
      indexOfFirstProduct,
      indexOfLastProduct
    );


    return(
        <div className="p-4">
            <div className="flex justify-between items-center px-4 py-2">
                <h1 className="text-2xl font-bold">Products</h1>
                <input
                    type="text"
                    placeholder='Search product...'
                    value={search}
                    onChange={(e)=> 
                        setSearch(e.target.value)}
                        style={{padding:"8px",marginBottom:"20px",width:"300px"}}
                        />
                        <select
                          value={sortPrice}
                          onChange={(e) =>
                            setSortPrice(e.target.value)}
                            style={{padding:"8px", marginLeft: "10px"}}
                            >
                              <option value="default">Default</option>
                              <option value="low">Price: Low to High</option>
                              <option value="high">Price: High to Low</option>
                            </select>
                        <select 
                          value={category}
                          onChange={(e) =>
                            setCategory(e.target.value)}
                            style={{padding:"8px",
                               marginLeft:"10px",width:"30%",
                              borderRadius: "5px",border:"1px solid #ccc",}}
                              >
                                <option value="All">All</option>
                                <option value="Electronics">Electronics</option>
                                <option value="Fashion">Fashion</option>
                                <option value="Books">Books</option>
                              </select>
                
            </div>
            

            {loading && <p>Loading products...</p>}

          

            <div className="grid grid-cols-3 gap-6">
                {currentProducts.map((product)=> (
                    <div
                    key={product._id}
                    onClick={() => navigate(`/products/${product._id}`)}
                    className="cursor-pointer border shadow-lg rounded-xl p-4 hover:scale-105">
                        <img 
                        src={product.image}
                        alt={product.name}
                        style={{
                          width:"100%",
                          height:"180px",
                          objectFit:"cover",
                          display:"block",
                          margin:"auto",
                        }}
                        />
                        <h2 className="font-semibold">{product.name}</h2>
                        <p className="text-gray-600">Rs{product.price}</p>
                        <p className="text-sm text-gray-500">{product.category}</p>
                    </div>
                ))}
                
            </div>
            {!loading && products.length === 0 && (
                <p>No product found </p>
            )}

            <div
              style={{display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "20px",
                marginTop: "30px",
              }}
              >
                <button
                  onClick={() => setCurrentPage((p) => 
                  Math.max(p - 1, 1))}
                  style={{
                    padding:"10px 18px",
                    background:"#b39ddb",
                    color:"#fff",
                    border:"none",
                    borderRadius:"6px",
                    cursor:"pointer",
                    opacity: currentPage === 1 ? 0.6 : 1,
                  }}
                  >
                    Prev
                  </button>

                  <span style={{fontSize: "16px", fontWeight: "500"}}>
                    Page {currentPage} of {totalPages}
                  </span>

                  <button 
                    onClick={() =>
                      setCurrentPage((p) => Math.min(p
                        +1, totalPages))
                    }disabled={currentPage === totalPages}
                    style={{
                      padding:"10px 18px",
                      background: "#b39ddb",
                      color:"#fff",
                      borderRadius: "6px",
                      cursor:"pointer",
                      opacity: currentPage === totalPages ? 0.6 : 1,
                    }}
                    >
                      Next
                    </button>
              </div>

            
        </div>
    );
};

export default Products;