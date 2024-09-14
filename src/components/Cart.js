import React, { useState, useEffect } from 'react';
import { getCartItems, removeCartItem } from '../api/productApi';  // Import API functions
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);  // State for cart items
  const [totalPrice, setTotalPrice] = useState(0);  // State for total price
  const navigate = useNavigate();  // Hook for navigation

  // Fetch the cart items when the component mounts
  useEffect(() => {
    const fetchCartItems = async () => {
      const items = await getCartItems();  // Get cart items from the API
      setCartItems(items);  // Set cart items to state

      // Calculate the total price
      const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      setTotalPrice(total);  // Set total price to state
    };
    fetchCartItems();
  }, []);

  // Function to handle the removal of an item from the cart
  const handleRemove = async (id) => {
    try {
      await removeCartItem(id);  // Remove the item using the API

      // Update the cart after removal by filtering out the removed item
      const updatedCartItems = cartItems.filter(item => item.id !== id);
      setCartItems(updatedCartItems);

      // Recalculate the total price after removing the item
      const total = updatedCartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      setTotalPrice(total);
    } catch (error) {
      console.error('Failed to remove item from cart:', error);  // Log any errors
    }
  };

  // Function to proceed to checkout
  const handleCheckout = () => {
    navigate('/checkout');  // Navigate to the checkout page
  };

  // Helper function to format price with commas
  const formatPrice = (price) => {
    return price.toLocaleString();  // Format price with commas
  };

  return (
    <div>
      <h2>Your Cart</h2>

      {/* Display the list of cart items */}
      <ul>
        {cartItems.length > 0 ? (
          cartItems.map(item => (
            <li key={item.id}>
              <div>
                <strong>{item.name}</strong> - ₹{formatPrice(item.price)} x {item.quantity}
                <button onClick={() => handleRemove(item.id)}>Remove</button>
              </div>
            </li>
          ))
        ) : (
          <p>Your cart is empty.</p>  // Display if the cart is empty
        )}
      </ul>

      {/* Display the total price */}
      <h3>Total Price: ₹{formatPrice(totalPrice)}</h3>

      {/* Button to proceed to checkout */}
      {cartItems.length > 0 && (
        <button onClick={handleCheckout}>Proceed to Checkout</button>
      )}
    </div>
  );
};

export default Cart;
