import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 border border-purple-100">
      <div className="aspect-w-16 aspect-h-12 relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-64 object-cover transition-transform duration-500 hover:scale-110"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/400x500?text=Image+non+disponible';
          }}
        />
        <div className="absolute top-4 right-4">
          <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
            {product.category}
          </span>
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2">
          {product.name}
        </h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {product.description}
        </p>
        <div className="flex justify-between items-center mb-4">
          <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            {product.price} MRU
          </span>
        </div>
        <div className="mt-4">
          <Link
            to={`/product/${product.id}`}
            className="block w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white text-center py-3 rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            Voir les détails
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
