import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import API from "../api/axios";

function OrderDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchOrder = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      const res = await API.get(`/orders/${id}`);
      setOrder(res.data.order);
    } catch (error) {
      console.log(error);
      navigate("/orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrder();
  }, [id]);

  if (loading) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-[#080808] px-6 pt-32 text-white">
          <p className="mx-auto max-w-7xl text-white/60">Loading order...</p>
        </main>
      </>
    );
  }

  if (!order) {
    return null;
  }

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#080808] px-6 pt-32 text-white">
        <section className="mx-auto max-w-7xl">
          <div className="mb-10">
            <p className="mb-3 inline-block rounded-full border border-red-500/30 bg-red-500/10 px-4 py-2 text-sm text-red-300">
              Order details
            </p>

            <h1 className="text-4xl font-black md:text-6xl">
              Order <span className="text-red-500">Placed</span>
            </h1>

            <p className="mt-4 break-all text-white/50">
              Order ID: {order._id}
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-[1fr_420px]">
            <div className="space-y-5">
              {order.orderItems.map((item) => (
                <div
                  key={item._id}
                  className="grid gap-5 rounded-[2rem] border border-white/10 bg-white/5 p-5 md:grid-cols-[130px_1fr]"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-32 w-full rounded-[1.5rem] object-cover"
                  />

                  <div className="flex flex-col justify-between gap-4">
                    <div>
                      <h3 className="text-2xl font-black">{item.name}</h3>
                      <p className="mt-2 text-white/50">
                        Quantity: {item.quantity}
                      </p>
                    </div>

                    <p className="text-2xl font-black text-red-400">
                      ₹{item.price * item.quantity}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="h-fit space-y-6">
              <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6">
                <h2 className="text-2xl font-black">Status</h2>

                <p className="mt-4 inline-block rounded-full bg-red-500/10 px-5 py-3 font-bold text-red-300">
                  {order.status}
                </p>

                <p className="mt-4 text-white/50">
                  Placed on {new Date(order.createdAt).toLocaleString()}
                </p>
              </div>

              <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6">
                <h2 className="text-2xl font-black">Delivery Address</h2>

                <div className="mt-4 space-y-2 text-white/60">
                  <p>{order.shippingAddress.fullName}</p>
                  <p>{order.shippingAddress.phone}</p>
                  <p>{order.shippingAddress.address}</p>
                  <p>
                    {order.shippingAddress.city} -{" "}
                    {order.shippingAddress.pincode}
                  </p>
                </div>
              </div>

              <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6">
                <h2 className="text-2xl font-black">Bill Summary</h2>

                <div className="mt-6 space-y-4 text-white/70">
                  <div className="flex justify-between">
                    <span>Item Total</span>
                    <span>₹{order.itemsPrice}</span>
                  </div>

                  <div className="flex justify-between">
                    <span>Delivery Fee</span>
                    <span>₹{order.deliveryFee}</span>
                  </div>

                  <div className="flex justify-between">
                    <span>Platform Fee</span>
                    <span>₹{order.platformFee}</span>
                  </div>

                  <div className="flex justify-between border-t border-white/10 pt-4 text-xl font-black text-white">
                    <span>Total</span>
                    <span>₹{order.totalPrice}</span>
                  </div>
                </div>

                <p className="mt-5 text-sm text-white/50">
                  Payment: {order.paymentMethod}
                </p>
              </div>

              <Link
                to="/orders"
                className="block rounded-2xl bg-red-500 py-4 text-center font-bold hover:bg-red-600"
              >
                Back to Orders
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default OrderDetails;