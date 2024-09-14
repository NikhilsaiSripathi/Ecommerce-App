import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';  // Access authentication context

const Navbar = () => {
  const { authState, setAuthState } = useAuth();  // Get auth state and setter

  // Function to handle logout
  const handleLogout = () => {
    setAuthState({
      isAuthenticated: false,
      user: null,
    });
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">My Ecommerce App</Link>
      </div>
      <ul className="navbar-links">
        {/* Links for all users */}
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/cart">Cart</Link>
        </li>
        <li>
          <Link to="/checkout">Checkout</Link>
        </li>

        {/* Conditional rendering for admin users */}
        {authState.isAuthenticated && authState.user?.role === 'admin' && (
          <li>
            <Link to="/admin">Admin</Link>
          </li>
        )}

        {/* Conditional rendering for login/logout */}
        <li>
          {authState.isAuthenticated ? (
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;