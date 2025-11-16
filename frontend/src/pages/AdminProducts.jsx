import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API } from "../utils/api";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await API.get("/products");
      setProducts(res.data);
      setError(null);
    } catch (err) {
      setError('Erreur lors du chargement des produits');
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (id) => {
    if (window.confirm("Confirmer la suppression ?")) {
      try {
        await API.delete(`/products/${id}`);
        fetchProducts();
      } catch (err) {
        setError('Erreur lors de la suppression');
        console.error('Error deleting product:', err);
      }
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800">Gestion des Produits</h1>
            <Link
              to="/admin/add"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-semibold"
            >
              + Ajouter un produit
            </Link>
          </div>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          {products.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg mb-4">Aucun produit trouvé</p>
              <Link
                to="/admin/add"
                className="text-blue-600 hover:text-blue-800 font-semibold"
              >
                Ajouter votre premier produit
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border rounded-lg bg-white shadow-lg">
                <thead>
                  <tr className="bg-gray-100 text-left">
                    <th className="p-3 font-semibold text-gray-700">Image</th>
                    <th className="p-3 font-semibold text-gray-700">Nom</th>
                    <th className="p-3 font-semibold text-gray-700">Catégorie</th>
                    <th className="p-3 font-semibold text-gray-700">Prix</th>
                    <th className="p-3 font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {products.map((p) => (
                    <tr key={p._id} className="border-t hover:bg-gray-50 transition-colors duration-150">
                      <td className="p-3">
                        <img 
                          src={p.image} 
                          alt={p.name} 
                          className="w-20 h-20 object-cover rounded shadow-sm"
                          onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/80x80?text=IMG';
                          }}
                        />
                      </td>
                      <td className="p-3 font-medium text-gray-900">{p.name}</td>
                      <td className="p-3">
                        <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-purple-100 text-purple-800">
                          {p.category || 'Non catégorisé'}
                        </span>
                      </td>
                      <td className="p-3 font-semibold text-gray-900">{p.price} MRU</td>

                      <td className="p-3">
                        <div className="flex gap-3">
                          <Link
                            to={`/admin/edit/${p._id}`}
                            className="text-yellow-600 hover:text-yellow-800 font-medium transition-colors duration-200"
                          >
                            ✏ Modifier
                          </Link>

                          <button
                            className="text-red-600 hover:text-red-800 font-medium transition-colors duration-200"
                            onClick={() => deleteProduct(p._id)}
                          >
                            🗑 Supprimer
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminProducts;

