import { useEffect, useState } from "react";
import { FiDollarSign, FiPackage, FiShoppingBag, FiUsers } from "react-icons/fi";
import AdminLayout from "../../components/AdminLayout";
import API from "../../api/axios";

function AdminDashboard() {
  const [stats, setStats] = useState(null);

  const fetchStats = async () => {
    try {
      const res = await API.get("/admin/stats");
      setStats(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const cards = [
    {
      title: "Total Revenue",
      value: `₹${stats?.totalRevenue || 0}`,
      icon: <FiDollarSign />,
    },
    {
      title: "Total Orders",
      value: stats?.totalOrders || 0,
      icon: <FiPackage />,
    },
    {
      title: "Food Items",
      value: stats?.totalFoods || 0,
      icon: <FiShoppingBag />,
    },
    {
      title: "Users",
      value: stats?.totalUsers || 0,
      icon: <FiUsers />,
    },
  ];

  return (
    <AdminLayout>
      <div>
        <p className="mb-3 inline-block rounded-full border border-red-500/30 bg-red-500/10 px-4 py-2 text-sm text-red-300">
          Admin Overview
        </p>

        <h1 className="text-4xl font-black md:text-6xl">
          Dashboard <span className="text-red-500">Overview</span>
        </h1>

        <p className="mt-4 text-white/50">
          Manage restaurants, food items, orders and revenue.
        </p>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {cards.map((card) => (
            <div
              key={card.title}
              className="rounded-[2rem] border border-white/10 bg-white/5 p-6"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-500 text-2xl">
                {card.icon}
              </div>

              <p className="mt-6 text-sm text-white/50">{card.title}</p>
              <h2 className="mt-2 text-4xl font-black">{card.value}</h2>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}

export default AdminDashboard;