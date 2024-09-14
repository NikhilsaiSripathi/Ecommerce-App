import React, { useState, useEffect } from 'react';
import { getProducts, removeCartItem } from '../api/productApi'; // Import API
import ProductList from '../components/ProductList';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      const fetchedProducts = await getProducts();
      setProducts(fetchedProducts);
    };
    fetchProducts();
  }, []);

  const handleDeleteProduct = async (id) => {
    await removeCartItem(id);
    setProducts(products.filter(product => product.id !== id));
  };

  const handleEditProduct = (product) => {
    const newName = prompt('Enter new name:', product.name);
    const newPrice = prompt('Enter new price:', product.price);
    const newCategory = prompt('Enter new category:', product.category);
    
    setProducts(products.map(p => 
      p.id === product.id ? { ...p, name: newName, price: newPrice, category: newCategory } : p
    ));
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h2>Welcome to the E-Commerce Platform</h2>
      <input
        type="text" 
        className="search-bar"
        placeholder="Search products..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <ProductList
        products={filteredProducts}
        onDelete={handleDeleteProduct}
        onEdit={handleEditProduct}
      />
    </div>
  );
};

export default Home;