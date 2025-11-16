import React, { useEffect, useState } from "react";
import { API } from "../utils/api";
import NavBar from "../components/NavBar";
import ProductList from "../components/ProductList";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const res = await API.get("/products");
      setProducts(res.data);
    } catch (err) {
      console.error("Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen">

      {/* NAVBAR */}
      <NavBar />

      {/* HERO SECTION */}
      <section className="relative h-[70vh] flex items-center justify-center bg-cover bg-center mt-16"
        style={{ backgroundImage: "url('/port.jpg')" }}>

        <div className="absolute inset-0 bg-black/40"></div>

        <div className="relative text-center text-white px-6 z-10">
          <h1 className="text-5xl font-bold mb-4">
            Élevez Votre Style avec RimyLine
          </h1>
          <p className="text-lg opacity-90 mb-6">
            Collections premium • Élégance moderne • Tissus de qualité
          </p>
          <a href="#products"
            className="bg-white text-black px-6 py-3 rounded-full shadow-md hover:bg-gray-200 transition inline-block">
            Découvrir nos produits →
          </a>
        </div>
      </section>

      {/* SECTION PRODUITS */}
      <section id="products" className="max-w-7xl mx-auto px-6 py-16">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
          </div>
        ) : (
          <>
            <h2 className="text-3xl font-bold mb-10 text-gray-900 text-center">
              Nos Collections
            </h2>

            <ProductList products={products} />
          </>
        )}
      </section>

      {/* FOOTER */}
      <footer className="bg-black text-white py-10 mt-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-2xl font-bold">
            Rimy<span className="text-purple-500">Line</span>
          </h2>
          <p className="text-gray-400 mt-2">
            Boutique de mode élégante et moderne
          </p>
          <p className="text-gray-600 text-sm mt-4">
            © {new Date().getFullYear()} RimyLine — Tous droits réservés.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
