"use client";
// src/app/orders/page.tsx
import { useState } from 'react';
import Image from 'next/image';
import { Dialog } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { XMarkIcon } from '@heroicons/react/24/outline';
import Header from '../_components/Header';
import { SessionProvider } from 'next-auth/react';


const orders = [
  {
    id: '123456',
    date: '2024-09-14',
    amount: 1500,
    status: 'Delivered',
    products: [
      { name: 'Ashwagandha Supplement', quantity: 2, subtotal: 1000, image: '/ashwagandha.png' },
      { name: 'Triphala Powder', quantity: 1, subtotal: 500, image: '/triphala.png' },
    ],
  },
  {
    id: '123457',
    date: '2024-09-15',
    amount: 3000,
    status: 'Payment Pending',
    products: [
      { name: 'Yoga Mat', quantity: 1, subtotal: 3000, image: '/yoga-mat.png' },
    ],
  },
];

const OrdersPage = () => {
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);

  const handleExpand = (id: string) => {
    setExpandedOrderId(expandedOrderId === id ? null : id);
  };


  return (
    <div><SessionProvider><Header /></SessionProvider>
    <div className="min-h-screen p-6 mt-16">
        
      <h1 className="text-2xl font-bold mb-6">My Orders</h1>

      {orders.map((order) => (
        <div key={order.id} className="mb-4">
          <div className="bg-white shadow-md rounded-lg p-4 flex items-start space-x-4">
            <div className="flex-shrink-0">
              {order.products.slice(0, 3).map((product, index) => (
                <div key={index} className={`relative -ml-${index * 4}`}>
                  <Image src={product.image} alt={product.name} width={50} height={50} className="rounded-md" />
                </div>
              ))}
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-center">
                <span className="font-semibold">Order ID: {order.id}</span>
                <span className="font-semibold">₹{order.amount}</span>
              </div>
              <div className="flex items-center space-x-2 mt-2">
                <div className={`w-3 h-3 rounded-full ${order.status === 'Delivered' ? 'bg-green-500' : 'bg-orange-500'}`} />
                <span className="text-sm">{order.status}</span>
              </div>
              <button
                onClick={() => handleExpand(order.id)}
                className="mt-4 text-blue-600 flex items-center space-x-2"
              >
                <span>{expandedOrderId === order.id ? 'Collapse' : 'Expand'}</span>
                <ChevronDownIcon className={`w-5 h-5 ${expandedOrderId === order.id ? 'rotate-180' : ''}`} />
              </button>
            </div>
          </div>

          {expandedOrderId === order.id && (
            <Dialog open={expandedOrderId === order.id} onClose={() => handleExpand('')}>
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
               
                <div className="relative bg-white p-6 rounded-lg shadow-md max-w-lg w-full">
                <Dialog.Title className="text-lg font-semibold mb-4 flex justify-between items-center">
  Order Details
  <button
    onClick={() => handleExpand('')}
    className="text-gray-600 hover:text-gray-900"
    aria-label="Close"
  >
    <XMarkIcon className="w-6 h-6" />
  </button>
</Dialog.Title>

                  <div className="overflow-y-auto max-h-80">
                    {order.products.map((product, index) => (
                      <div key={index} className="flex items-center mb-4">
                        <Image src={product.image} alt={product.name} width={60} height={60} className="rounded-md" />
                        <div className="ml-4">
                          <p className="font-semibold">{product.name}</p>
                          <p className="text-sm">Quantity: {product.quantity}</p>
                          <p className="text-sm">Subtotal: ₹{product.subtotal}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Dialog>
          )}
        </div>
      ))}
    </div></div>
  );
};

export default OrdersPage;
