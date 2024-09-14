import React, { useState, useEffect } from 'react';
import { getCartItems, placeOrder } from '../api/productApi';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const [cartItems, setCartItems] = useState([]);  // State for cart items
  const [totalPrice, setTotalPrice] = useState(0);  // State for total price
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCartItems = async () => {
      const items = await getCartItems();  // Fetch the cart items
      console.log('Cart Items:', items);  // Debug: Log the cart items

      setCartItems(items);

      // Calculate total price
      const total = items.reduce((sum, item) => {
        const itemPrice = item.price || 0;
        const itemQuantity = item.quantity || 1;
        console.log(`Item: ₹{item.name}, Price: ₹{itemPrice}, Quantity: ₹{itemQuantity}`);  // Debug: Log each item
        return sum + (itemPrice * itemQuantity);
      }, 0);
      setTotalPrice(total);  // Set the total price
      console.log('Total Price:', total);  // Debug: Log the calculated total
    };
    fetchCartItems();
  }, []);

  const handlePlaceOrder = async () => {
    try {
      const order = {
        items: cartItems,  // Send cart items as the order
        total: totalPrice,  // Include the total price
        date: new Date().toISOString()  // Include a timestamp
      };
      await placeOrder(order);  // Place the order using the placeOrder function
      alert('Order placed successfully!');
      navigate('/');  // Redirect to home page after placing order
    } catch (error) {
      console.error('Failed to place order:', error);
    }
  };

  return (
    <div>
      <h2>Checkout</h2>
      <ul>
        {cartItems.map(item => (
          <li key={item.id}>
            {item.name} - ₹{item.price} x {item.quantity}
          </li>
        ))}
      </ul>
      <h3>Total Price: ₹{totalPrice}</h3>  {/* Display total price */}
      <button onClick={handlePlaceOrder}>Place Order</button>
    </div>
  );
};

export default Checkout;