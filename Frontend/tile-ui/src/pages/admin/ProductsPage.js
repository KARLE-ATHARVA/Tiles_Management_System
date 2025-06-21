import React, { useEffect, useState } from 'react';
import API from '../../api';
import { toast } from "react-toastify";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    sqCode: '',
    description: '',
    price: '',
    categoryId: '',
    applicationId: '',
    imageFile: null,
  });

  const fetchProducts = async () => {
    try {
      const res = await API.get('/Product');
      setProducts(res.data);
    } catch (err) {
      toast.error('Unauthorized. Please login again.');
    }
  };

  const handleAddProduct = async () => {
    try {
      const payload = {
        name: newProduct.name,
        sqCode: newProduct.sqCode,
        description: newProduct.description,
        price: parseFloat(newProduct.price),
        categoryId: parseInt(newProduct.categoryId),
        applicationId: parseInt(newProduct.applicationId),
        isBlocked: false,
      };

      const res = await API.post('/Product', payload);
      const createdProduct = res.data;

      if (newProduct.imageFile && createdProduct.id) {
        const formData = new FormData();
        formData.append('productId', createdProduct.id);
        formData.append('file', newProduct.imageFile);

        await API.post('/Product/upload', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      }

      toast.success("Product added successfully!");

      setNewProduct({
        name: '',
        sqCode: '',
        description: '',
        price: '',
        categoryId: '',
        applicationId: '',
        imageFile: null,
      });
      setShowForm(false);
      fetchProducts();
    } catch (err) {
      console.error(err);
      toast.error("Error adding product or uploading image.");
    }
  };

  const toggleBlock = async (id) => {
    try {
      await API.patch(`/Product/block/${id}`);
      toast.success("Product status updated.");
      fetchProducts();
    } catch (err) {
      toast.error('Failed to toggle product status.');
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Products</h2>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? 'Cancel' : 'Add Product'}
        </button>
      </div>

      {showForm && (
        <div className="bg-white p-4 rounded shadow-md mb-6 space-y-4">
          <input type="text" placeholder="Product Name" className="border p-2 w-full" value={newProduct.name} onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })} />
          <input type="text" placeholder="SQ Code" className="border p-2 w-full" value={newProduct.sqCode} onChange={(e) => setNewProduct({ ...newProduct, sqCode: e.target.value })} />
          <input type="text" placeholder="Description" className="border p-2 w-full" value={newProduct.description} onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })} />
          <input type="number" placeholder="Price" className="border p-2 w-full" value={newProduct.price} onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })} />
          <input type="number" placeholder="Category ID" className="border p-2 w-full" value={newProduct.categoryId} onChange={(e) => setNewProduct({ ...newProduct, categoryId: e.target.value })} />
          <input type="number" placeholder="Application ID" className="border p-2 w-full" value={newProduct.applicationId} onChange={(e) => setNewProduct({ ...newProduct, applicationId: e.target.value })} />
          <input type="file" accept="image/*" className="border p-2 w-full" onChange={(e) => setNewProduct({ ...newProduct, imageFile: e.target.files[0] })} />
          <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700" onClick={handleAddProduct}>Submit</button>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {products.map((product) => (
          <div key={product.id} className="border p-4 shadow-md rounded-lg bg-white space-y-2">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">{product.name}</h3>
              <button onClick={() => toggleBlock(product.id)} className={`px-3 py-1 text-sm rounded ${product.isBlocked ? 'bg-red-600' : 'bg-green-600'} text-white`}>
                {product.isBlocked ? 'Blocked' : 'Unblocked'}
              </button>
            </div>
            {product.imagePath && (
              <img src={`http://localhost:5058/uploads/${product.imagePath.replace(/^\/?uploads\//, '')}`} alt="Product" className="w-full h-40 object-cover rounded" />
            )}
            <p className="text-sm text-gray-700">{product.description}</p>
            <p className="text-sm"><strong>SQ Code:</strong> {product.sqCode}</p>
            <p className="text-sm"><strong>Price:</strong> ₹{product.price}</p>
            <p className="text-sm"><strong>Category:</strong> {product.category?.name || 'N/A'}</p>
            <p className="text-sm"><strong>Application:</strong> {product.application?.name || 'N/A'}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;
