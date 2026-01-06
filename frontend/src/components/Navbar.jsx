import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <div className="flex justify-between p-4 bg-gray-800 text-white">
            <h1>Mini Store</h1>
            <Link to="/add-product">+ Add Product</Link>
        </div>
    );
};

export default Navbar;