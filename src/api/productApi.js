import axios from 'axios';

const API_URL = 'http://localhost:5000';  // Replace this with the correct API URL if needed

// Fetch all products
export const getProducts = async () => {
  const response = await axios.get(`${API_URL}/products`);
  return response.data;
};

// Add a product to the cart
export const addToCart = async (product) => {
  try {
    const response = await axios.post(`${API_URL}/cart`, product);  // Make sure '/cart' exists in db.json
    return response.data;
  } catch (error) {
    console.error('Error adding product to cart:', error);
    throw error;
  }
};

// Get cart items
export const getCartItems = async () => {
  const response = await axios.get(`${API_URL}/cart`);
  return response.data;
};

// Add a product (if necessary)
export const addProduct = async (product) => {
  try {
    const response = await axios.post(`${API_URL}/products`, product);  // POST request to add a product
    return response.data;
  } catch (error) {
    console.error('Error adding product:', error);
    throw error;
  }
};

// Remove an item from the cart
export const removeCartItem = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/cart/${id}`);  // Ensure correct URL and use item ID
    return response.data;
  } catch (error) {
    console.error('Error removing item from cart:', error);
    throw error;
  }
};

// Place an order
export const placeOrder = async (order) => {
  try {
    const response = await axios.post(`${API_URL}/orders`, order);
    return response.data;
  } catch (error) {
    console.error('Error placing order:', error);
    throw error;
  }
};
