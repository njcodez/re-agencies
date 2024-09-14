"use client";

import {trpc} from "@trpc/react-query"
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

const Dashboard = () => {
  const { data: deliveredOrders, isLoading } = trpc.order.getDeliveredOrders.useQuery();
  
  if (isLoading) return <p>Loading...</p>;

  const totalRevenue = deliveredOrders.reduce((acc: any, order: { totalAmount: any; }) => acc + order.totalAmount, 0);

  return (
    <div className="min-h-screen flex">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <main className="p-6">
          <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
          <div className="bg-white p-6 rounded shadow">
            <h2 className="text-xl font-semibold mb-2">Overview</h2>
            <p>Total Delivered Orders: {deliveredOrders.length}</p>
            <p>Total Revenue: ₹{totalRevenue.toFixed(2)}</p>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
