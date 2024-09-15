"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Header from "../../_components/Header";
import { fetchProductById } from "../../../lib/productService";
import { addToCart } from "../../../lib/cartService";
import { useSession, signIn, SessionProvider } from "next-auth/react";

const ProductPage = () => {
  const params = useParams();
  const id = params?.id as string | undefined;
  const { data: session } = useSession();

  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(1);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Fetch product details
  useEffect(() => {
    const fetchProduct = async () => {
      if (id) {
        try {
          const fetchedProduct = await fetchProductById(parseInt(id));
          setProduct(fetchedProduct ?? null);
          if (fetchedProduct?.images.length) {
            setCurrentImageIndex(0);
          }
        } catch (error) {
          console.error("Error fetching product:", error);
          setProduct(null);
        }
      } else {
        setProduct(null);
      }
      setLoading(false);
    };

    fetchProduct();
  }, [id]);

  // Handle image navigation
  const handlePrevImage = () => {
    if (product?.images?.length) {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === 0 ? product.images.length - 1 : prevIndex - 1,
      );
    }
  };

  const handleNextImage = () => {
    if (product?.images?.length) {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === product.images.length - 1 ? 0 : prevIndex + 1,
      );
    }
  };

  // Handle add to cart action
  const handleAddToCart = async () => {
    if (!session) {
      signIn();
      return;
    }

    if (product && quantity > 0) {
      try {
        setError(null);
        setSuccessMessage(null);
        await addToCart(product.id, quantity, session.user.id);
        setSuccessMessage("Product added to cart!");
      } catch (error) {
        console.error("Error adding to cart:", error);
        setError("Failed to add product to cart. Please try again.");
      }
    } else {
      setError("Please select a valid quantity.");
    }
  };

  // Loading state
  if (loading) {
    return <p className="mt-20 text-center text-dark-green">Loading...</p>;
  }

  // No product found
  if (!product) {
    return (
      <p className="mt-20 text-center text-dark-green">Product not found</p>
    );
  }

  return (
    <div className="min-h-screen bg-white text-dark-green">
      <Header />
      <main className="container mx-auto mt-48 p-6">
        <div className="flex flex-col items-start md:flex-row">
          <div className="relative mx-auto md:w-1/2">
            {product.images && product.images.length > 0 ? (
              <div className="relative h-80 w-full overflow-hidden rounded-lg shadow-lg">
                <Image
                  src={
                    product.images[currentImageIndex] ??
                    "/placeholder-image.png"
                  }
                  alt={product.name}
                  layout="fill"
                  objectFit="contain"
                  className="rounded-lg"
                />
                <button
                  className="hover:bg-dark-green-dark absolute left-2 top-1/2 -translate-y-1/2 transform rounded-full bg-dark-green p-3 text-white shadow-lg transition duration-300"
                  onClick={handlePrevImage}
                >
                  &lt;
                </button>
                <button
                  className="hover:bg-dark-green-dark absolute right-2 top-1/2 -translate-y-1/2 transform rounded-full bg-dark-green p-3 text-white shadow-lg transition duration-300"
                  onClick={handleNextImage}
                >
                  &gt;
                </button>
              </div>
            ) : (
              <p className="text-center text-dark-green">No images available</p>
            )}
          </div>

          <div className="md:w-1/2 md:pl-8">
            <h1 className="mb-4 text-4xl font-bold text-dark-green">
              {product.name}
            </h1>
            <p className="mb-4 text-2xl font-semibold text-dark-green">
              ₹{product.price}
            </p>
            <p className="mb-6 text-gray-700">{product.description}</p>

            <div className="mb-6 flex items-center space-x-4">
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) =>
                  setQuantity(Math.max(1, parseInt(e.target.value)))
                }
                className="w-24 rounded-md border border-dark-green p-3 focus:outline-none focus:ring-2 focus:ring-dark-green"
              />
              <button
                className="hover:bg-dark-green-dark rounded-md bg-dark-green px-6 py-3 text-white shadow-lg transition duration-300"
                onClick={handleAddToCart}
              >
                Add to Cart
              </button>
            </div>

            {error && <p className="mt-4 text-red-500">{error}</p>}
            {successMessage && (
              <p className="mt-4 text-green-500">{successMessage}</p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

const WrappedProductPage = () => (
  <SessionProvider>
    <ProductPage />
  </SessionProvider>
);

export default WrappedProductPage;
