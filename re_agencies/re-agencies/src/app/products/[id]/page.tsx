"use client";

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Header from '../../_components/Header';
import { placeholderProducts } from '../../_components/ProductSection';
import { SessionProvider } from 'next-auth/react';

const ProductPage = () => {
  const params = useParams();
  const id = params?.id as string | undefined;

  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

  useEffect(() => {
    const fetchProduct = () => {
      if (id) {
        const selectedProduct = placeholderProducts.find((product) => product.id === parseInt(id));
        setProduct(selectedProduct || null);
        if (selectedProduct?.images.length) {
          setCurrentImageIndex(0); // Ensure to set the initial image index if images are available
        }
      } else {
        setProduct(null);
      }
      setLoading(false);
    };

    fetchProduct();
  }, [id]);

  const handlePrevImage = () => {
    if (product?.images?.length) {
      setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? product.images.length - 1 : prevIndex - 1));
    }
  };

  const handleNextImage = () => {
    if (product?.images?.length) {
      setCurrentImageIndex((prevIndex) => (prevIndex === product.images.length - 1 ? 0 : prevIndex + 1));
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!product) {
    return <p>Product not found</p>;
  }

  return (
    <div className="min-h-screen">
      <SessionProvider><Header /></SessionProvider>
      <main className="container mx-auto p-6 mt-24">
        <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/2 relative">
            {product.images && product.images.length > 0 ? (
              <div className="relative h-80 w-full rounded-lg overflow-hidden">
                <Image
                  src={product.images[currentImageIndex]}
                  alt={product.name}
                  layout="fill"
                  objectFit="contain"
                  className="rounded-lg"
                />
                <button
                  className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-r-lg"
                  onClick={handlePrevImage}
                >
                  &lt;
                </button>
                <button
                  className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-l-lg"
                  onClick={handleNextImage}
                >
                  &gt;
                </button>
              </div>
            ) : (
              <p>No images available</p>
            )}
          </div>
          <div className="md:w-1/2 md:pl-8">
            <p className="text-xl font-semibold mb-4">₹{product.price}</p>
            <p className="text-gray-700 mb-6">{product.description}</p>
            <div className="flex items-center space-x-4">
              <input
                type="number"
                min="1"
                defaultValue="1"
                className="border border-gray-300 p-2 rounded-md"
              />
              <button className="bg-indigo-600 text-white px-4 py-2 rounded-md">Add to Cart</button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductPage;
