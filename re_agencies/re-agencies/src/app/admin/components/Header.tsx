"use client";

import Link from 'next/link';

const Header = () => {
  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">Admin Panel</h1>
      <Link href="/api/admin/logout" className="text-red-500 hover:text-red-700">Logout</Link>
    </header>
  );
};

export default Header;
