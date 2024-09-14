import React, { useState, useEffect } from 'react';
import { getProducts, addProduct } from '../api/productApi';  // Import API functions

const Admin = ({ authState }) => {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');

  // Fetch products when component loads
  useEffect(() => {
    const fetchProducts = async () => {
      const fetchedProducts = await getProducts();
      setProducts(fetchedProducts);
    };
    fetchProducts();
  }, []);

  // Function to handle adding a new product
  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      const newProduct = {
        name,
        category,
        price: parseFloat(price),
      };
      const addedProduct = await addProduct(newProduct);  // Add the product via API
      setProducts([...products, addedProduct]);  // Update the product list locally
      alert('Product added successfully!');
      // Clear the form after submission
      setName('');
      setCategory('');
      setPrice('');
    } catch (error) {
      console.error('Error adding product:', error);
      alert('Failed to add product.');
    }
  };

  // Ensure only admins can access this page
  if (!authState || authState.user.role !== 'admin') {
    return <p>You do not have permission to access this page.</p>;
  }

  return (
    <div>
      <h1>Admin Panel</h1>

      {/* Form to Add New Product */}
      <h2>Add New Product</h2>
      <form onSubmit={handleAddProduct}>
        <div>
          <label>Product Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Category:</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Price:</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <button type="submit">Add Product</button>
      </form>

      {/* Display Existing Products */}
      <h2>Product List</h2>
      <ul>
        {products.map(product => (
          <li key={product.id}>
            {product.name} - ₹{product.price} (Category: {product.category})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Admin;