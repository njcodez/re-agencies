"use client";

import AdminLayout from "../components/layout";
import { useState, useEffect } from "react";

// Mock data for orders
const mockOrders = [
  {
    id: 1,
    user: { name: "John Doe" },
    totalAmount: 500,
    status: "UNDER_REVIEW",
    products: [
      { id: 1, product: { name: "Product A", price: 100 }, quantity: 2 },
      { id: 2, product: { name: "Product B", price: 150 }, quantity: 1 },
    ],
  },
  {
    id: 2,
    user: { name: "Jane Smith" },
    totalAmount: 700,
    status: "PAYMENT_PENDING",
    products: [
      { id: 3, product: { name: "Product C", price: 200 }, quantity: 2 },
      { id: 4, product: { name: "Product D", price: 100 }, quantity: 3 },
    ],
  },
  // Add more mock data as needed
];

const OrderManagementPage = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<any[]>([]);
  const [orderDetails, setOrderDetails] = useState<any | null>(null);
  const [selectedOrderId, setSelectedOrderId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Simulate fetching orders from an API
    const fetchOrders = async () => {
      // Replace with actual API call if available
      setOrders(mockOrders);
      setFilteredOrders(mockOrders);
    };

    fetchOrders();
  }, []);

  useEffect(() => {
    const filtered = orders.filter(
      (order) =>
        order.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ??
        order.products.some((productOrder: { product: { name: string } }) =>
          productOrder.product.name
            .toLowerCase()
            .includes(searchTerm.toLowerCase()),
        ) ??
        order.id.toString().includes(searchTerm),
    );
    setFilteredOrders(filtered);
  }, [searchTerm, orders]);

  const handleStatusChange = async (orderId: number, status: string) => {
    // Simulate updating status
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId ? { ...order, status } : order,
      ),
    );
  };

  const handleViewDetails = (orderId: number) => {
    const order = orders.find((o) => o.id === orderId);
    setOrderDetails(order ?? null);
    setSelectedOrderId(orderId);
  };

  const handleCloseDetails = () => {
    setOrderDetails(null);
    setSelectedOrderId(null);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <AdminLayout>
      <h1 className="mb-6 text-2xl font-bold">Order Management</h1>

      {/* Search Section */}
      <div className="mb-6 rounded-lg bg-white p-6 shadow">
        <h2 className="mb-4 text-xl font-semibold">Search Orders</h2>
        <div className="flex items-center">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search by user name, product name, or order ID"
            className="w-full rounded-md border border-gray-300 p-2 focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
      </div>

      {/* Orders List Section */}
      <div className="mb-6 rounded-lg bg-white p-6 shadow">
        <h2 className="mb-4 text-xl font-semibold">Orders List</h2>

        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr>
              <th className="border px-4 py-2">Order ID</th>
              <th className="border px-4 py-2">User Name</th>
              <th className="border px-4 py-2">Total Amount</th>
              <th className="border px-4 py-2">Status</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => (
              <tr key={order.id}>
                <td className="border px-4 py-2">{order.id}</td>
                <td className="border px-4 py-2">{order.user.name}</td>
                <td className="border px-4 py-2">₹{order.totalAmount}</td>
                <td className="border px-4 py-2">
                  <select
                    value={order.status}
                    onChange={(e) =>
                      handleStatusChange(order.id, e.target.value)
                    }
                    className="rounded-md border border-gray-300 p-2 focus:border-indigo-500 focus:ring-indigo-500"
                  >
                    <option value="UNDER_REVIEW">Under Review</option>
                    <option value="PAYMENT_PENDING">Payment Pending</option>
                    <option value="OUT_FOR_DELIVERY">Out for Delivery</option>
                    <option value="DELIVERED">Delivered</option>
                  </select>
                </td>
                <td className="border px-4 py-2">
                  <button
                    onClick={() => handleViewDetails(order.id)}
                    className="text-indigo-600 hover:underline"
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Order Details Pop-Up */}
      {orderDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="relative w-full max-w-lg rounded-lg bg-white p-6 shadow-lg">
            <h2 className="mb-4 text-xl font-semibold">Order Details</h2>

            <button
              onClick={handleCloseDetails}
              className="absolute right-2 top-2 text-gray-600 hover:text-gray-900"
            >
              &times;
            </button>

            <div className="mb-4">
              <h3 className="text-lg font-medium">
                Order ID: {orderDetails.id}
              </h3>
              <p className="text-sm text-gray-600">
                User: {orderDetails.user.name}
              </p>
              <p className="text-sm text-gray-600">
                Total Amount: ₹{orderDetails.totalAmount}
              </p>
              <p className="text-sm text-gray-600">
                Status: {orderDetails.status}
              </p>
            </div>

            <h3 className="mb-2 text-lg font-medium">Products</h3>
            <ul>
              {orderDetails.products.map((productOrder: any) => (
                <li key={productOrder.id} className="mb-2">
                  <p className="text-sm font-medium">
                    {productOrder.product.name}
                  </p>
                  <p className="text-sm text-gray-600">
                    Quantity: {productOrder.quantity}
                  </p>
                  <p className="text-sm text-gray-600">
                    Subtotal: ₹
                    {productOrder.quantity * productOrder.product.price}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default OrderManagementPage;
