"use client";

import Link from 'next/link';

const Sidebar = () => {
  return (
    <nav className="w-64 h-screen bg-gray-800 text-white">
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
        <ul className="space-y-4">
          <li>
            <Link href="/admin/dashboard" className="block py-2 px-4 rounded hover:bg-gray-700">Dashboard</Link>
          </li>
          <li>
            <Link href="/admin/product-management" className="block py-2 px-4 rounded hover:bg-gray-700">Product Management</Link>
          </li>
          <li>
            <Link href="/admin/order-management" className="block py-2 px-4 rounded hover:bg-gray-700">Order Management</Link>
          </li>
          <li>
            <Link href="/admin/notification-management" className="block py-2 px-4 rounded hover:bg-gray-700">Notification Management</Link>
          </li>
          <li>
            <Link href="/admin/user-management" className="block py-2 px-4 rounded hover:bg-gray-700">User Management</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Sidebar;
