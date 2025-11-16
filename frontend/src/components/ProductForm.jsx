import React, { useState } from 'react';
import ImageUpload from './ImageUpload';

const ProductForm = ({ product, onSubmit, onCancel, isEditing = false }) => {
  const [formData, setFormData] = useState({
    name: product?.name || '',
    price: product?.price || '',
    image: product?.image || '',
    description: product?.description || '',
    category: product?.category || ''
  });
  const [imageFile, setImageFile] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageSelect = (image) => {
    // Si c'est une URL (string), on garde l'ancien comportement
    if (typeof image === 'string') {
      setFormData(prev => ({ ...prev, image }));
      setImageFile(null);
    } else if (image instanceof File) {
      // Si c'est un fichier, on le stocke
      setImageFile(image);
      // On met aussi l'URL de prévisualisation
      const previewUrl = URL.createObjectURL(image);
      setFormData(prev => ({ ...prev, image: previewUrl }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Créer FormData pour l'upload
    const submitData = new FormData();
    submitData.append("name", formData.name);
    submitData.append("price", formData.price);
    submitData.append("description", formData.description);
    submitData.append("category", formData.category);
    
    // Si on a un fichier, l'ajouter, sinon utiliser l'URL
    if (imageFile) {
      submitData.append("image", imageFile);
    } else if (formData.image && !formData.image.startsWith('data:')) {
      // Si c'est une URL (pas une data URL), on peut l'envoyer comme champ normal
      submitData.append("image", formData.image);
    }
    
    onSubmit(submitData);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        {isEditing ? 'Modifier le produit' : 'Ajouter un nouveau produit'}
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Nom du produit *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Nom du produit"
          />
        </div>

        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
            Prix (MRU) *
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            min="0"
            step="0.01"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="0.00"
          />
        </div>

        <div>
          <ImageUpload
            onImageSelect={handleImageSelect}
            currentImage={product?.image}
            label="Image du produit"
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="3"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Description du produit"
          />
        </div>

        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
            Catégorie
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Sélectionner une catégorie</option>
            <option value="Dress">Dress</option>
            <option value="Tops">Tops</option>
            <option value="Melhfa">Melhfa</option>
          </select>
        </div>

        <div className="flex space-x-3 pt-4">
          <button
            type="submit"
            className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
          >
            {isEditing ? 'Mettre à jour' : 'Ajouter'}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors duration-200"
          >
            Annuler
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
