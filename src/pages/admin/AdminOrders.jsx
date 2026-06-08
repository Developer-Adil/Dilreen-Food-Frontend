import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import AdminLayout from "../../components/AdminLayout";
import API from "../../api/axios";

const statuses = [
  "Placed",
  "Preparing",
  "Out for Delivery",
  "Delivered",
  "Cancelled",
];

function AdminOrders() {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const res = await API.get("/admin/orders");
      setOrders(res.data.orders);
    } catch (error) {
      console.log(error);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await API.put(`/admin/orders/${id}/status`, { status });

      toast.success("Order status updated");

      fetchOrders();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update status");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <AdminLayout>
      <div>
        <h1 className="text-4xl font-black">
          Manage <span className="text-red-500">Orders</span>
        </h1>

        <div className="mt-8 space-y-5">
          {orders.map((order) => (
            <div
              key={order._id}
              className="rounded-[2rem] border border-white/10 bg-white/5 p-6"
            >
              <div className="flex flex-col justify-between gap-5 xl:flex-row xl:items-center">
                <div>
                  <p className="break-all text-sm text-white/40">
                    Order ID: {order._id}
                  </p>

                  <h2 className="mt-2 text-2xl font-black">
                    {order.user?.name || "User"} • ₹{order.totalPrice}
                  </h2>

                  <p className="mt-2 text-white/50">
                    {order.user?.email || "No email"}
                  </p>

                  <p className="mt-2 text-white/50">
                    {new Date(order.createdAt).toLocaleString()}
                  </p>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                  <select
                    value={order.status}
                    onChange={(e) => updateStatus(order._id, e.target.value)}
                    className="rounded-2xl border border-white/10 bg-black/40 px-5 py-3 outline-none focus:border-red-500"
                  >
                    {statuses.map((status) => (
                      <option className="bg-black" key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>

                  <span className="rounded-full bg-red-500/10 px-5 py-3 text-sm font-bold text-red-300">
                    {order.status}
                  </span>
                </div>
              </div>

              <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                {order.orderItems.map((item) => (
                  <div
                    key={item._id}
                    className="flex gap-3 rounded-2xl bg-black/30 p-3"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-16 w-16 rounded-xl object-cover"
                    />

                    <div>
                      <h3 className="font-bold">{item.name}</h3>
                      <p className="text-sm text-white/50">
                        Qty: {item.quantity} • ₹{item.price}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-5 rounded-2xl bg-black/30 p-4 text-sm text-white/60">
                <p>
                  <span className="font-bold text-white">Address:</span>{" "}
                  {order.shippingAddress.address}, {order.shippingAddress.city} -{" "}
                  {order.shippingAddress.pincode}
                </p>
                <p className="mt-1">
                  <span className="font-bold text-white">Phone:</span>{" "}
                  {order.shippingAddress.phone}
                </p>
              </div>
            </div>
          ))}

          {orders.length === 0 && (
            <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 text-white/50">
              No orders found.
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}

export default AdminOrders;