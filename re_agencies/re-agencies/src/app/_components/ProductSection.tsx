"use client";

import { useState, useEffect } from "react";
import { Slider } from "@mui/material";
import Link from "next/link";
import Image from "next/image";
import type { Product } from "../../types/Product"; // Use import type

const ProductsSection = () => {
  const [priceRange, setPriceRange] = useState<number[]>([100, 1000]);
  const [brandFilters, setBrandFilters] = useState<Record<string, boolean>>({});
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [productSearch, setProductSearch] = useState<string>("");
  const [products, setProducts] = useState<Product[]>([]);
  const [brands, setBrands] = useState<string[]>([]);
  const [brandSearch, setBrandSearch] = useState<string>("");

  // Fetch products from the API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/products");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data: Product[] = await response.json();

        if (Array.isArray(data)) {
          setProducts(data);
          const uniqueBrands = Array.from(
            new Set(data.map((product) => product.brandName)),
          );
          setBrands(uniqueBrands);
          setBrandFilters(
            Object.fromEntries(uniqueBrands.map((brand) => [brand, false])),
          );
        } else {
          console.error("Fetched data is not an array", data);
        }
      } catch (error) {
        console.error("Failed to fetch products", error);
      }
    };

    fetchProducts().catch(console.error); // Ensure promises are handled properly
  }, []);

  // Update selected brands based on brandFilters
  useEffect(() => {
    const updatedBrands = Object.keys(brandFilters).filter(
      (brand) => brandFilters[brand],
    );
    setSelectedBrands(updatedBrands);
  }, [brandFilters]);

  // Filter products based on search, price, and selected brands
  const filteredProducts = (Array.isArray(products) ? products : []).filter(
    (product) =>
      product.name.toLowerCase().includes(productSearch.toLowerCase()) &&
      product.price >= (priceRange[0] ?? 0) &&
      product.price <= (priceRange[1] ?? 1000) &&
      (selectedBrands.length === 0 ??
        selectedBrands.includes(product.brandName)),
  );

  // Handle price range slider change
  const handlePriceChange = (event: Event, newValue: number | number[]) => {
    setPriceRange(newValue as number[]);
  };

  // Handle brand filter change
  const handleBrandFilterChange = (brand: string) => {
    setBrandFilters((prevFilters) => ({
      ...prevFilters,
      [brand]: !prevFilters[brand],
    }));
  };

  // Filter brands based on search input
  const filteredBrands = brands.filter((brand) =>
    brand.toLowerCase().includes(brandSearch.toLowerCase()),
  );

  return (
    <div className="bg-white">
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">
            Our Products
          </h1>
        </div>

        {/* Product search */}
        <div className="mt-6">
          <input
            type="text"
            placeholder="Search products"
            value={productSearch}
            onChange={(e) => setProductSearch(e.target.value)}
            className="w-full rounded-md border border-gray-300 p-4 text-lg font-bold transition-all duration-300 ease-in-out focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <section aria-labelledby="products-heading" className="pb-24 pt-6">
          <h2 id="products-heading" className="sr-only">
            Our Products
          </h2>
          <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
            {/* Filters (Sidebar for larger screens) */}
            <form className="hidden lg:block">
              <div className="mb-6">
                <label
                  htmlFor="brand-search-sidebar"
                  className="block text-sm font-bold text-gray-700"
                >
                  Search Brands
                </label>
                <input
                  type="text"
                  id="brand-search-sidebar"
                  placeholder="Search brands"
                  value={brandSearch}
                  onChange={(e) => setBrandSearch(e.target.value)}
                  className="mt-2 w-full rounded-md border border-gray-300 p-2 text-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
                <ul role="list" className="mt-4 space-y-2">
                  {filteredBrands.map((brand) => (
                    <li key={brand} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`brand-${brand}`}
                        checked={!!brandFilters[brand]}
                        onChange={() => handleBrandFilterChange(brand)}
                        className="mr-2"
                      />
                      <label
                        htmlFor={`brand-${brand}`}
                        className="text-sm capitalize text-gray-900"
                      >
                        {brand}
                      </label>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Price slider */}
              <div className="mb-6">
                <h3 className="text-sm font-bold text-gray-700">Price Range</h3>
                <Slider
                  value={priceRange}
                  onChange={handlePriceChange}
                  valueLabelDisplay="auto"
                  min={100}
                  max={1000}
                  className="mt-4"
                />
                <p className="text-sm text-gray-500">
                  ₹{priceRange[0]} - ₹{priceRange[1]}
                </p>
              </div>
            </form>

            {/* Product grid */}
            <div className="lg:col-span-3">
              <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((product) => (
                    <Link key={product.id} href={`/products/${product.id}`}>
                      <div className="group relative">
                        <div className="aspect-w-1 aspect-h-1 lg:aspect-none w-full overflow-hidden rounded-lg bg-gray-200 lg:h-64">
                          <div className="relative h-full w-full">
                            {/* Image carousel */}
                            {product.images.length > 0 && product.images[0] ? (
                              <Image
                                src={product.images[0]}
                                alt={product.name}
                                width={400}
                                height={400}
                                className="h-full w-full object-contain object-center transition-transform duration-300 ease-in-out hover:scale-105"
                              />
                            ) : (
                              <p>No images available</p>
                            )}
                          </div>
                        </div>
                        <div className="mt-4 flex justify-between">
                          <div>
                            <h3 className="text-lg font-bold capitalize text-gray-700">
                              {product.name}
                            </h3>
                            <p className="text-md mt-1 font-semibold text-gray-900">
                              ₹{product.price}
                            </p>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))
                ) : (
                  <p>No products available</p>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default ProductsSection;
