"use client";
import Link from 'next/link';
import { BellIcon, ShoppingCartIcon, UserIcon } from '@heroicons/react/24/outline';
import { useSession, signIn, signOut } from 'next-auth/react';
import { useState } from 'react';
import Image from 'next/image';

const Header = () => {
  const { data: session } = useSession();
  const [isProfileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [isNotificationDropdownOpen, setNotificationDropdownOpen] = useState(false);

  const notifications = [
    { id: 1, message: 'Order #1234 has been shipped.' },
    { id: 2, message: 'You have a new message from Admin.' },
    { id: 3, message: 'Your order #5678 is out for delivery.' },
  ];

  return (
    <header className="fixed top-0 left-0 w-full p-4 bg-white shadow-md z-50 flex items-center justify-between">
      {/* Left Side: Logo */}
      <div className="flex items-center">
        <Image src="/logo.png" alt="RE Agencies" width={48} height={48} className="w-12 h-12" />
        <span className="ml-2 text-xl font-bold font-poppins">RE Agencies</span>
      </div>

      {/* Right Side: Icons and User Menu */}
      <div className="flex items-center space-x-6"> {/* Increased space between elements */}
        {/* Notifications Button with Dropdown */}
        <div className="relative">
          <button className="relative" onClick={() => setNotificationDropdownOpen(!isNotificationDropdownOpen)}>
            <BellIcon className="w-6 h-6 text-gray-700" />
            <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">3</div>
          </button>
          {isNotificationDropdownOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-md z-10">
              <div className="p-4">
                <p className="font-semibold text-gray-700">Notifications</p>
                <ul className="mt-2">
                  {notifications.map((notif) => (
                    <li key={notif.id} className="text-sm text-gray-600 py-1">{notif.message}</li>
                  ))}
                </ul>
                <Link href="/messages" className="block mt-4 text-center text-sm text-indigo-600 hover:text-indigo-500">
                  More
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Shopping Cart */}
        <Link href="/cart">
          <ShoppingCartIcon className="w-6 h-6 text-gray-700" />
        </Link>

        {/* Profile Icon / Sign In Button */}
        <div className="relative">
          {session ? (
            // Logged In: Show Google Avatar and Profile Dropdown
            <div>
              <Image
                src={session.user?.image || '/default-avatar.png'}
                alt="Profile"
                className="w-8 h-8 rounded-full cursor-pointer"
                width={32}
                height={32}
                onClick={() => setProfileDropdownOpen(!isProfileDropdownOpen)}
              />
              {isProfileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md z-10">
                  <div className="p-4">
                    <Link href="/profile" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                      My Profile
                    </Link>
                    <Link href="/orders" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                      My Orders
                    </Link>
                    <button
                      onClick={() => signOut()}
                      className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            // Logged Out: Show "Sign In" Button
            <button
              onClick={() => signIn('google')}
              className="bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 transition-colors"
            >
              Sign In
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
