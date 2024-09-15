"use client"
import { useState } from 'react';
import { TrashIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import Link from 'next/link';
import { Dialog } from '@headlessui/react';
import Header from '../_components/Header';
import { SessionProvider } from 'next-auth/react';

const CartPage = () => {
  // Sample cart items
  const [cartItems, setCartItems] = useState([
    { id: 1, name: 'Ashwagandha Supplement', price: 500, quantity: 2, image: '/ashwagandha.png' },
    { id: 2, name: 'Triphala Powder', price: 300, quantity: 1, image: '/triphala.png' },
  ]);

  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const handleRemove = (id: number) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  // Handle quantity change
  const handleQuantityChange = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return; // Prevent setting quantity less than 1
    setCartItems(cartItems.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
  };

  // Calculate the total price
  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <SessionProvider><Header /></SessionProvider>

      {/* Main Cart Content */}
      <main className="flex-1 mt-24 p-6 flex flex-col lg:flex-row lg:space-x-10 space-y-6 lg:space-y-0">
        {cartItems.length > 0 ? (
          <div className="flex-1 flex flex-col lg:flex-row space-y-6 lg:space-y-0 lg:space-x-10">
            {/* Cart Items List */}
            <div className="w-full lg:w-2/3">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center p-4 bg-white shadow-md rounded-lg mb-6">
                  <Image src={item.image} alt={item.name} width={80} height={80} className="rounded" />
                  <div className="ml-4 w-full">
                    <h2 className="text-lg font-semibold">{item.name}</h2>
                    <p className="text-sm text-gray-500">Price: ₹{item.price}</p>
                    <div className="mt-2 flex items-center">
                      <button onClick={() => handleQuantityChange(item.id, item.quantity - 1)} className="px-2 py-1 bg-gray-200 rounded-l-md">-</button>
                      <input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => handleQuantityChange(item.id, Number(e.target.value))}
                        className="w-16 text-center border-t border-b border-gray-200"
                        min="1"
                      />
                      <button onClick={() => handleQuantityChange(item.id, item.quantity + 1)} className="px-2 py-1 bg-gray-200 rounded-r-md">+</button>
                    </div>
                  </div>
                  <div className="ml-4 text-right">
                    <p className="text-lg font-semibold">₹{item.price * item.quantity}</p>
                    <button onClick={() => handleRemove(item.id)} className="text-red-500 mt-2">
                      <TrashIcon className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Cart Summary */}
            <div className="w-full lg:w-1/3 bg-white p-6 shadow-md rounded-lg flex flex-col justify-between">
              <div className="flex flex-col flex-grow">
                <h2 className="text-xl font-semibold mb-4">Cart Summary</h2>
                <div className="flex-grow"></div>
                <div className="mb-6">
                  <p className="text-2xl font-bold">Total: ₹{totalPrice}</p>
                </div>
              </div>
              <button
                className="w-full py-2 bg-green-600 text-white rounded-md"
                onClick={() => setCheckoutOpen(true)}
              >
                Checkout
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center py-20 flex-1 flex flex-col justify-center">
            <h2 className="text-2xl font-semibold">Your cart is empty</h2>
            <Link href="/products" className="mt-6 inline-block px-6 py-2 bg-blue-600 text-white rounded-md">
              Explore Products
            </Link>
          </div>
        )}
      </main>

      {/* Checkout Pop-Up */}
      <Dialog open={checkoutOpen} onClose={() => setCheckoutOpen(false)} className="fixed z-10 inset-0 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen">
          <div className="relative bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Your order has been placed!</h2>
            <p>Check the status in the "My Orders" page or continue shopping.</p>
            <div className="mt-6 flex space-x-4">
              <Link href="/orders" className="bg-blue-600 text-white px-4 py-2 rounded-md">My Orders</Link>
              <Link href="/" className="bg-gray-300 px-4 py-2 rounded-md">Continue Shopping</Link>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default CartPage;
