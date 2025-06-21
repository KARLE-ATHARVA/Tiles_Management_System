import React, { useEffect, useState } from "react";
import axios from "axios";

const ViewerProductsPage = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.get("http://localhost:5058/api/Product", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to load products. Please login again.");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Available Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white p-4 shadow-md rounded-lg space-y-2"
          >
            {product.imagePath && (
              <img
                 src={`http://localhost:5058/uploads/${product.imagePath.replace(/^\/?uploads\//, '')}`}
                alt={product.name}
                className="w-full h-40 object-cover rounded"
              />
            )}
            <h3 className="text-lg font-semibold">{product.name}</h3>
            <p className="text-sm text-gray-700">{product.description}</p>
            <p className="text-sm font-medium">₹ {product.price}</p>
            <p className="text-sm">
              <strong>Category:</strong> {product.category?.name || "N/A"}
            </p>
            <p className="text-sm">
              <strong>Application:</strong> {product.application?.name || "N/A"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewerProductsPage;
