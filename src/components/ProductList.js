import React, { useState, useEffect } from 'react';
import { addToCart, getCartItems } from '../api/productApi';

const ProductList = ({ products, setCartItems, setTotalPrice }) => {
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = async (product) => {
    try {
      const cartItem = { ...product, quantity: quantity || 1 };  // Set default quantity to 1
      await addToCart(cartItem);  // Add the item to the cart

      // Fetch updated cart items and calculate the new total price
      const updatedCartItems = await getCartItems();
      setCartItems(updatedCartItems);

      // Calculate new total price
      const total = updatedCartItems.reduce((sum, item) => {
        const itemPrice = item.price || 0;
        const itemQuantity = item.quantity || 1;
        return sum + (itemPrice * itemQuantity);
      }, 0);
      setTotalPrice(total);  // Update total price
      alert(`${product.name} added to cart!`);  // Corrected placeholder
    } catch (error) {
      console.error('Failed to add product to cart:', error);
    }
  };

  return (
    <div>
      <ul>
        {products.map(product => (
          <li key={product.id}>
            {product.name} - ₹{product.price}
            <input
              type="number"
              className="quantity-input"  
              value={quantity}
              min="1"
              onChange={(e) => setQuantity(e.target.value)}
            />
            <button className="add-to-cart-btn" onClick={() => handleAddToCart(product)}>Add to Cart</button>  
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
