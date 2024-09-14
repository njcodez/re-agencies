"use client";

import { useState } from 'react';
import { useSession, SessionProvider } from 'next-auth/react';
import Header from '../_components/Header'; // Adjust the path according to your file structure

const ProfilePageContent = () => {
  const { data: session } = useSession();

  // State for the form fields
  const [name, setName] = useState(session?.user?.name || '');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  // State to control the snackbar visibility
  const [showSnackbar, setShowSnackbar] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate saving data (e.g., send to API)
    setTimeout(() => {
      // Show snackbar after saving
      setShowSnackbar(true);

      // Hide snackbar after 3 seconds
      setTimeout(() => setShowSnackbar(false), 3000);
    }, 500);
  };

  return (
    <div className="min-h-screen">
      {/* Render the header */}
      <Header />

      {/* Main content */}
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold text-center mb-6">User Profile</h1>

        {session ? (
          <form 
            onSubmit={handleSubmit} 
            className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg space-y-6"
          >
            {/* Gmail Address (non-editable) */}
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700">Gmail Address</label>
              <input
                type="text"
                value={session.user?.email || ''}
                disabled
                className="w-full mt-2 p-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-600"
              />
            </div>

            {/* Name */}
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full mt-2 p-3 border border-gray-300 rounded-lg"
                placeholder="Enter your name"
              />
            </div>

            {/* Address */}
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700">Address</label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full mt-2 p-3 border border-gray-300 rounded-lg"
                placeholder="Enter your address"
              />
            </div>

            {/* Phone Number */}
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700">Phone Number</label>
              <input
                type="text"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full mt-2 p-3 border border-gray-300 rounded-lg"
                placeholder="Enter your phone number"
              />
            </div>

            {/* Notice */}
            <p className="text-xs text-gray-500">
              This information will be used for delivery.
            </p>

            {/* Submit Button */}
            <div className="text-center">
              <button 
                type="submit" 
                className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
              >
                Save Changes
              </button>
            </div>
          </form>
        ) : (
          <p className="text-center text-gray-500">Please sign in to view your profile.</p>
        )}
      </div>

      {/* Snackbar (toast) */}
      {showSnackbar && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-2 rounded-lg shadow-md">
          Saved Successfully!
        </div>
      )}
    </div>
  );
};

const ProfilePage = () => {
  return (
    <SessionProvider>
      <ProfilePageContent />
    </SessionProvider>
  );
};

export default ProfilePage;
