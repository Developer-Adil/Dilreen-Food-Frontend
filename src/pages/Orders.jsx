import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiPackage } from "react-icons/fi";
import Navbar from "../components/Navbar";
import API from "../api/axios";

function Orders() {
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      const res = await API.get("/orders/my-orders");
      setOrders(res.data.orders);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#080808] px-6 pt-32 text-white">
        <section className="mx-auto max-w-7xl">
          <div className="mb-10">
            <p className="mb-3 inline-block rounded-full border border-red-500/30 bg-red-500/10 px-4 py-2 text-sm text-red-300">
              Order history
            </p>

            <h1 className="text-4xl font-black md:text-6xl">
              My <span className="text-red-500">Orders</span>
            </h1>

            <p className="mt-4 text-white/50">
              Track your previous and current orders.
            </p>
          </div>

          {loading ? (
            <p className="text-white/60">Loading orders...</p>
          ) : orders.length === 0 ? (
            <div className="rounded-[2rem] border border-white/10 bg-white/5 p-10 text-center">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-red-500/10 text-4xl text-red-400">
                <FiPackage />
              </div>

              <h2 className="mt-6 text-3xl font-black">No orders yet</h2>

              <p className="mx-auto mt-3 max-w-md text-white/50">
                You have not placed any order yet. Add some food and place your first order.
              </p>

              <Link
                to="/foods"
                className="mt-8 inline-block rounded-full bg-red-500 px-8 py-4 font-bold hover:bg-red-600"
              >
                Order Food
              </Link>
            </div>
          ) : (
            <div className="space-y-5">
              {orders.map((order) => (
                <Link
                  key={order._id}
                  to={`/orders/${order._id}`}
                  className="block rounded-[2rem] border border-white/10 bg-white/5 p-6 transition hover:bg-white/10"
                >
                  <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                    <div>
                      <p className="text-sm text-white/40">
                        Order ID: {order._id}
                      </p>

                      <h3 className="mt-2 text-2xl font-black">
                        {order.orderItems.length} item
                        {order.orderItems.length > 1 ? "s" : ""} • ₹
                        {order.totalPrice}
                      </h3>

                      <p className="mt-2 text-white/50">
                        {new Date(order.createdAt).toLocaleString()}
                      </p>
                    </div>

                    <div className="flex items-center gap-4">
                      <span className="rounded-full bg-red-500/10 px-5 py-3 text-sm font-bold text-red-300">
                        {order.status}
                      </span>

                      <span className="text-sm text-white/50">
                        View Details →
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>
      </main>
    </>
  );
}

export default Orders;