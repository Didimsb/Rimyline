import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { API } from '../utils/api';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const response = await API.get(`/products/${id}`);
      setProduct(response.data);
      setError(null);
    } catch (err) {
      setError('Produit non trouvé');
      console.error('Error fetching product:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
        <div className="text-center">
          <div className="text-red-500 text-lg mb-4">{error}</div>
          <Link
            to="/"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-200"
          >
            Retour à l'accueil
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <Link
              to="/"
              className="text-blue-500 hover:text-blue-600 transition-colors duration-200"
            >
              ← Retour à l'accueil
            </Link>
           
          </div>
        </div>
      </header>

      {/* Product Details */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="md:flex">
            {/* Product Image */}
            <div className="md:w-1/2">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-96 md:h-full object-cover"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/600x400?text=Image+non+disponible';
                }}
              />
            </div>

            {/* Product Info */}
            <div className="md:w-1/2 p-8">
              <div className="mb-4">
                <span className="inline-flex px-3 py-1 text-sm font-semibold rounded-full bg-blue-100 text-blue-800">
                  {product.category}
                </span>
              </div>

              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {product.name}
              </h1>

              <div className="text-4xl font-bold text-blue-600 mb-6">
                {product.price} MRU
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
                <p className="text-gray-600 leading-relaxed">
                  {product.description || 'Aucune description disponible pour ce produit.'}
                </p>
              </div>

              <div className="space-y-4">
                <a 
                  href="https://wa.me/34663309508"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-green-500 text-white py-3 px-6 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors duration-200 text-lg font-semibold flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                  </svg>
                  Contacter le vendeur
                </a>
                
                <a 
                  href="tel:+22224230000"
                  className="w-full bg-blue-500 text-white py-3 px-6 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200 flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  Appeler RimyLine
                </a>
              </div>

              {/* Product Details */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Détails du produit</h3>
                <dl className="grid grid-cols-1 gap-4">
                  <div>
                    <dt className="text-sm font-medium text-gray-500">ID du produit</dt>
                    <dd className="text-sm text-gray-900">#{product._id || product.id}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Catégorie</dt>
                    <dd className="text-sm text-gray-900">{product.category}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Prix</dt>
                    <dd className="text-sm text-gray-900">{product.price} MRU</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>

        
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-purple-900 via-pink-900 to-purple-900 text-white py-12 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">
                <span className="text-purple-300">Rimy</span>
                <span className="text-white">Line</span>
                <span className="text-yellow-400 ml-1">✨</span>
              </h3>
              <p className="text-gray-300 mb-4">
                Boutique de mode élégante et sophistiquée, où chaque pièce raconte une histoire d'élégance et de style.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Nos Collections</h4>
              <ul className="space-y-2 text-gray-300">
                <li>Dress</li>
                <li>Tops</li>
                <li>Melhfa</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact</h4>
              <div className="space-y-2 text-gray-300">
                <p>📞 +22224230000</p>
                <p>📱 WhatsApp: +34 663 30 95 08</p>
                <p>📍 Boutique RimyLine</p>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Localisation</h4>
              <div className="bg-white/10 rounded-lg p-2">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3856.1234567890!2d-15.1234567!3d18.1234567!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTjCsDA3JzI0LjQiTiAxNcKwMDcnMjQuNCJX!5e0!3m2!1sfr!2smr!4v1234567890123!5m2!1sfr!2smr"
                  width="100%"
                  height="200"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Localisation Boutique RimyLine"
                  className="rounded-lg"
                ></iframe>
                <p className="text-sm text-gray-300 mt-2 text-center">
                  <a 
                    href="https://maps.app.goo.gl/e2fFvY2eZUuzxzPN8" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-purple-300 hover:text-purple-200 transition-colors duration-200"
                  >
                    📍 Voir sur Google Maps
                  </a>
                </p>
              </div>
            </div>
          </div>
          <div className="border-t border-purple-700 mt-8 pt-8 text-center">
            <p className="text-gray-400">© 2024 RimyLine - Boutique de mode élégante. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ProductDetails;
