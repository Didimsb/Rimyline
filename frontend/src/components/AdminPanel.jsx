import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductForm from './ProductForm';
import { authUtils } from '../utils/auth';
import { API } from '../utils/api';

const AdminPanel = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await API.get("/products");
      setProducts(response.data);
      setError(null);
    } catch (err) {
      setError('Erreur lors du chargement des produits');
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddProduct = async (productData) => {
    try {
      const response = await API.post("/products", productData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setProducts([...products, response.data]);
      setShowForm(false);
      setError(null);
    } catch (err) {
      setError('Erreur lors de l\'ajout du produit');
      console.error('Error adding product:', err);
    }
  };

  const handleEditProduct = async (productData) => {
    try {
      const response = await API.put(`/products/${editingProduct._id || editingProduct.id}`, productData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setProducts(products.map(p => (p._id || p.id) === (editingProduct._id || editingProduct.id) ? response.data : p));
      setEditingProduct(null);
      setShowForm(false);
      setError(null);
    } catch (err) {
      setError('Erreur lors de la modification du produit');
      console.error('Error updating product:', err);
    }
  };

  const handleDeleteProduct = async (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) {
      try {
        await API.delete(`/products/${id}`);
        setProducts(products.filter(p => (p._id || p.id) !== id));
        setError(null);
      } catch (err) {
        setError('Erreur lors de la suppression du produit');
        console.error('Error deleting product:', err);
      }
    }
  };

  const startEdit = (product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const cancelEdit = () => {
    setEditingProduct(null);
    setShowForm(false);
  };

  const handleLogout = () => {
    if (window.confirm('Êtes-vous sûr de vouloir vous déconnecter ?')) {
      authUtils.logout();
      navigate("/login");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Panneau d'administration</h1>
              <p className="text-gray-600 mt-1">Connecté en tant que <span className="font-semibold text-blue-600">Vetia</span></p>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowForm(true)}
                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors duration-200"
              >
                + Ajouter un produit
              </button>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors duration-200"
              >
                <svg className="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Déconnexion
              </button>
            </div>
          </div>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          {showForm && (
            <div className="mb-6">
              <ProductForm
                product={editingProduct}
                onSubmit={editingProduct ? handleEditProduct : handleAddProduct}
                onCancel={cancelEdit}
                isEditing={!!editingProduct}
              />
            </div>
          )}

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Image
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Nom
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Prix
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Catégorie
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {products.map((product) => (
                  <tr key={product._id || product.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-12 w-12 rounded-lg object-cover"
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/48x48?text=IMG';
                        }}
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{product.name}</div>
                      <div className="text-sm text-gray-500 truncate max-w-xs">{product.description}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {product.price} €
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">
                        {product.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => startEdit(product)}
                          className="text-blue-600 hover:text-blue-900 transition-colors duration-200"
                        >
                          Modifier
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(product._id || product.id)}
                          className="text-red-600 hover:text-red-900 transition-colors duration-200"
                        >
                          Supprimer
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {products.length === 0 && (
            <div className="text-center py-8">
              <div className="text-gray-500 text-lg mb-2">Aucun produit</div>
              <p className="text-gray-400">Commencez par ajouter votre premier produit.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
