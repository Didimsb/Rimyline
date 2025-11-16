import React, { useState, useRef } from 'react';

const ImageUpload = ({ onImageSelect, currentImage, label = "Image du produit" }) => {
  const [preview, setPreview] = useState(currentImage || '');
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileSelect = (file) => {
    if (file && file.type.startsWith('image/')) {
      // Créer une URL de prévisualisation
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);
      // Passer le fichier directement au parent
      onImageSelect(file);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemoveImage = () => {
    setPreview('');
    onImageSelect('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label} *
      </label>
      
      {/* Zone de drop et prévisualisation */}
      <div
        className={`relative border-2 border-dashed rounded-lg p-6 text-center transition-colors duration-200 cursor-pointer ${
          isDragging
            ? 'border-purple-500 bg-purple-50'
            : preview
            ? 'border-gray-300'
            : 'border-gray-300 hover:border-purple-400 hover:bg-gray-50'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />

        {preview ? (
          <div className="relative">
            <img
              src={preview}
              alt="Aperçu"
              className="mx-auto h-48 w-48 object-cover rounded-lg shadow-md"
            />
            <div className="absolute top-2 right-2 flex space-x-2">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleClick();
                }}
                className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition-colors duration-200 shadow-lg"
                title="Changer l'image"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveImage();
                }}
                className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors duration-200 shadow-lg"
                title="Supprimer l'image"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="mx-auto w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <p className="text-lg font-medium text-gray-700">
                {isDragging ? 'Déposez votre image ici' : 'Cliquez pour sélectionner une image'}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                ou glissez-déposez votre fichier
              </p>
            </div>
            <div className="text-xs text-gray-400">
              Formats supportés: JPG, PNG, GIF (max 5MB)
            </div>
          </div>
        )}
      </div>

      {/* URL alternative */}
      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Ou saisissez une URL d'image
        </label>
        <input
          type="url"
          placeholder="https://example.com/image.jpg"
          value={!preview || preview.startsWith('data:') ? '' : preview}
          onChange={(e) => {
            const url = e.target.value;
            setPreview(url);
            // Si c'est une URL valide, la passer comme string
            if (url && !url.startsWith('data:')) {
              onImageSelect(url);
            }
          }}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        />
      </div>
    </div>
  );
};

export default ImageUpload;
