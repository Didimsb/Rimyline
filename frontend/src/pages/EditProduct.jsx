import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { API } from "../utils/api";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [newImage, setNewImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProduct = async () => {
    try {
      const res = await API.get(`/products/${id}`);
      setProduct(res.data);
      setError(null);
    } catch (err) {
      setError("Erreur lors du chargement du produit");
      console.error("Error fetching product:", err);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!product.name || !product.price) {
      setError("Veuillez remplir tous les champs obligatoires (nom, prix)");
      return;
    }

    try {
      setLoading(true);
      const data = new FormData();
      data.append("name", product.name);
      data.append("price", product.price);
      data.append("category", product.category || "");
      data.append("description", product.description || "");

      if (newImage) {
        data.append("image", newImage);
      }

      await API.put(`/products/${id}`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      navigate("/admin");
    } catch (err) {
      setError("Erreur lors de la modification du produit. Veuillez réessayer.");
      console.error("Error updating product:", err);
    } finally {
      setLoading(false);
    }
  };

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">
            Modifier : {product.name}
          </h1>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* NOM */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nom du produit *
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={product.name}
                onChange={(e) =>
                  setProduct({ ...product, name: e.target.value })
                }
                required
              />
            </div>

            {/* PRIX */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Prix (MRU) *
              </label>
              <input
                type="number"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={product.price}
                onChange={(e) =>
                  setProduct({ ...product, price: e.target.value })
                }
                min="0"
                step="0.01"
                required
              />
            </div>

            {/* CATÉGORIE */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Catégorie
              </label>
              <select
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={product.category || ""}
                onChange={(e) =>
                  setProduct({ ...product, category: e.target.value })
                }
              >
                <option value="">Sélectionner une catégorie</option>
                <option value="Dress">Dress</option>
                <option value="Tops">Tops</option>
                <option value="Melhfa">Melhfa</option>
              </select>
            </div>

            {/* DESCRIPTION */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent h-32 resize-none"
                value={product.description || ""}
                onChange={(e) =>
                  setProduct({ ...product, description: e.target.value })
                }
              />
            </div>

            {/* IMAGE */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Image
              </label>
              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-2">Image actuelle :</p>
                <img
                  src={previewImage || product.image}
                  alt="Preview"
                  className="w-40 h-40 object-cover rounded-lg shadow-md border border-gray-200"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/160x160?text=IMG';
                  }}
                />
              </div>

              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    setNewImage(file);
                    setPreviewImage(URL.createObjectURL(file));
                  }
                }}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Sauvegarde en cours..." : "Sauvegarder les modifications"}
              </button>
              <button
                type="button"
                onClick={() => navigate("/admin")}
                className="flex-1 bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors duration-200 font-semibold"
              >
                Annuler
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
