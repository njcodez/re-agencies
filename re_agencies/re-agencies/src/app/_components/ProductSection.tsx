// src/app/_components/ProductsSection.tsx
"use client";

import { useState } from 'react';
import { Slider } from '@mui/material';
import Link from 'next/link';
import Image from 'next/image';

// Updated placeholderProducts to include multiple images
export const placeholderProducts = [
  {
    id: 1,
    name: 'Ashwagandha Tablets',
    price: 299.99,
    images: [
      '/assets/ashwagandha.png',
      '/assets/ashwagandha.png',
      '/assets/ashwagandha.png',
    ],
    description: 'Ashwagandha Tablets description',
  },
  {
    id: 2,
    name: 'Brahmi Capsules',
    price: 499.99,
    images: [
      '/assets/brahmi1.png',
      '/assets/brahmi2.png',
    ],
    description: 'Brahmi Capsules description',
  },
  // Other products...
];

const brands = ['Dabur', 'Himalaya', 'Patanjali', 'Zandu', 'Baidyanath'];
const ProductsSection = () => {
    const [priceRange, setPriceRange] = useState<number[]>([100, 1000]);
    const [brandSearch, setBrandSearch] = useState<string>('');
    const [productSearch, setProductSearch] = useState<string>('');
    const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  
    // Filter brands based on the brand search input
    const filteredBrands = brands.filter((brand) =>
      brand.toLowerCase().includes(brandSearch.toLowerCase())
    );
  
    const filteredProducts = placeholderProducts.filter((product) =>
        product.name.toLowerCase().includes(productSearch.toLowerCase()) &&
        product.price !== undefined &&
        product.price >= (priceRange[0] ?? 0) &&
        product.price <= (priceRange[1] ?? 1000)
      );
      
    const handlePriceChange = (event: any, newValue: number | number[]) => {
      setPriceRange(newValue as number[]);
    };
  
    return (
      <div className="bg-white">
        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">Our Products</h1>
          </div>
  
          {/* Product search */}
          <div className="mt-6">
            <input
              type="text"
              placeholder="Search products"
              value={productSearch}
              onChange={(e) => setProductSearch(e.target.value)}
              className="w-full rounded-md border border-gray-300 p-4 text-lg focus:border-indigo-500 focus:ring-indigo-500 transition-all duration-300 ease-in-out"
            />
          </div>
  
          <section aria-labelledby="products-heading" className="pb-24 pt-6">
            <h2 id="products-heading" className="sr-only">Our Products</h2>
            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
              {/* Filters (Sidebar for larger screens) */}
              <form className="hidden lg:block">
                <div className="mb-6">
                  <label htmlFor="brand-search-sidebar" className="block text-sm font-medium text-gray-700">
                    Search Brands
                  </label>
                  <input
                    id="brand-search-sidebar"
                    type="text"
                    placeholder="Search brands"
                    value={brandSearch}
                    onChange={(e) => setBrandSearch(e.target.value)}
                    className="mt-2 w-full rounded-md border border-gray-300 p-2 focus:border-indigo-500 focus:ring-indigo-500"
                  />
                  <ul role="list" className="mt-4 space-y-2">
                    {filteredBrands.slice(0, 5).map((brand) => (
                      <li key={brand} className="text-sm text-gray-900">{brand}</li>
                    ))}
                  </ul>
                </div>
  
                {/* Price slider */}
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-gray-700">Price Range</h3>
                  <Slider
                    value={priceRange}
                    onChange={handlePriceChange}
                    valueLabelDisplay="auto"
                    min={100}
                    max={1000}
                    className="mt-4"
                  />
                  <p className="text-sm text-gray-500">₹{priceRange[0]} - ₹{priceRange[1]}</p>
                </div>
              </form>
  
              {/* Product grid */}
              <div className="lg:col-span-3">
                <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {filteredProducts.map((product) => (
                    <Link key={product.id} href={`/products/${product.id}`}>
                      <div className="group relative">
                        <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 lg:aspect-none lg:h-80">
                          <div className="relative h-full w-full">
                            {/* Image carousel */}
                            {product.images && product.images.length > 0 ? (
                              <>
                                <Image
                                  src={product.images[currentImageIndex] || '/fallback-image.png'}
                                  alt={product.name}
                                  width={400}
                                  height={400}
                                  className="h-full w-full object-contain object-center"
                                />
                                {product.images.length > 1 && (
                                  <div className="absolute inset-0 flex items-center justify-between p-2">
                                    <button
                                      className="bg-gray-800 text-white p-2 rounded-full"
                                      onClick={() => setCurrentImageIndex((prevIndex) =>
                                        prevIndex === 0 ? product.images.length - 1 : prevIndex - 1
                                      )}
                                    >
                                      &lt;
                                    </button>
                                    <button
                                      className="bg-gray-800 text-white p-2 rounded-full"
                                      onClick={() => setCurrentImageIndex((prevIndex) =>
                                        prevIndex === product.images.length - 1 ? 0 : prevIndex + 1
                                      )}
                                    >
                                      &gt;
                                    </button>
                                  </div>
                                )}
                              </>
                            ) : (
                              <p>No images available</p>
                            )}
                          </div>
                        </div>
                        <div className="mt-4 flex justify-between">
                          <div>
                            <h3 className="text-sm text-gray-700">{product.name}</h3>
                            <p className="mt-1 text-sm text-gray-500">₹{product.price}</p>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    );
  };
  
  export default ProductsSection;