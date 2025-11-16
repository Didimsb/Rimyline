import React from "react";

const ProductList = ({ products }) => {
  // Numéro WhatsApp de la boutique (format international sans +)
  const whatsappPhone = "22249495667";

  const sendToWhatsApp = (product) => {
    const message = `Bonjour, je suis intéressé par ce produit.

📸 Image : ${product.image}
🛍️ Nom : ${product.name}
💰 Prix : ${product.price} MRU`;

    const url = `https://wa.me/${whatsappPhone}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  if (!products || products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">Aucun produit disponible pour le moment.</p>
      </div>
    );
  }

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">

      {products.map((p) => (
        <div
          key={p._id || p.id}
          onClick={() => sendToWhatsApp(p)}
          className="p-4 bg-white shadow-lg rounded-xl cursor-pointer hover:shadow-2xl transition group"
        >
          <img
            src={p.image}
            alt={p.name}
            className="w-full h-52 object-cover rounded-lg group-hover:opacity-90 transition"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/400x400?text=Image+non+disponible';
            }}
          />

          <div className="mt-3">
            <h3 className="text-lg font-semibold text-gray-800">{p.name}</h3>
            <p className="text-purple-600 font-bold text-xl mt-1">{p.price} MRU</p>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation(); // empêche le clic d'ouvrir la card
              sendToWhatsApp(p);
            }}
            className="w-full mt-4 bg-green-600 text-white py-2 rounded-lg font-medium hover:bg-green-700 transition flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
            </svg>
            Acheter sur WhatsApp
          </button>
        </div>
      ))}

    </div>
  );
};

export default ProductList;

