import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './routes/ProtectedRoute';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import Admin from './pages/Admin';
import Home from './pages/Home';
import './styles.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <div className="container">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Home />} />
            <Route
              path="/cart"
              element={<ProtectedRoute component={Cart} roles={['user', 'admin']} />}
            />
            <Route
              path="/checkout"
              element={<ProtectedRoute component={Checkout} roles={['user', 'admin']} />}
            />
            <Route
              path="/admin"
              element={<ProtectedRoute component={Admin} roles={['admin']} />}
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;