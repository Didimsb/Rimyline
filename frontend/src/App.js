import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Admin from './pages/Admin';
import AdminProducts from './pages/AdminProducts';
import AddProduct from './pages/AddProduct';
import EditProduct from './pages/EditProduct';
import Login from './pages/Login';
import ProductDetails from './pages/ProductDetails';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route 
          path="/admin" 
          element={
            <ProtectedRoute>
              <AdminProducts />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/admin/add" 
          element={
            <ProtectedRoute>
              <AddProduct />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/admin/edit/:id" 
          element={
            <ProtectedRoute>
              <EditProduct />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/admin/old" 
          element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          } 
        />
        <Route path="/product/:id" element={<ProductDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
