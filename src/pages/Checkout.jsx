import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";
import API from "../api/axios";
import { useCart } from "../context/CartContext";

function Checkout() {
  const navigate = useNavigate();

  const { cartItems, cartTotal, clearCart } = useCart();

  const deliveryFee = cartTotal > 0 ? 39 : 0;
  const platformFee = cartTotal > 0 ? 9 : 0;
  const grandTotal = cartTotal + deliveryFee + platformFee;

  const savedUser = JSON.parse(localStorage.getItem("user"));

  const [formData, setFormData] = useState({
    fullName: savedUser?.name || "",
    phone: "",
    address: "",
    city: "Lucknow",
    pincode: "",
    paymentMethod: "Cash on Delivery",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const placeOrder = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("Please login first");
      navigate("/login");
      return;
    }

    if (cartItems.length === 0) {
      toast.error("Your cart is empty");
      navigate("/foods");
      return;
    }

    if (
      !formData.fullName ||
      !formData.phone ||
      !formData.address ||
      !formData.city ||
      !formData.pincode
    ) {
      toast.error("Please fill all address fields");
      return;
    }

    try {
      setLoading(true);

      const orderItems = cartItems.map((item) => ({
        food: item._id,
        name: item.name,
        image: item.image,
        price: item.price,
        quantity: item.quantity,
      }));

      const orderData = {
        orderItems,
        shippingAddress: {
          fullName: formData.fullName,
          phone: formData.phone,
          address: formData.address,
          city: formData.city,
          pincode: formData.pincode,
        },
        paymentMethod: formData.paymentMethod,
        itemsPrice: cartTotal,
        deliveryFee,
        platformFee,
        totalPrice: grandTotal,
      };

      const res = await API.post("/orders", orderData);

      clearCart();

      toast.success("Order placed successfully");
      navigate(`/orders/${res.data.order._id}`);
    } catch (error) {
      toast.error(error.response?.data?.message || "Order failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#080808] px-6 pt-32 text-white">
        <section className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_420px]">
          <motion.form
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            onSubmit={placeOrder}
            className="rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl"
          >
            <p className="mb-3 inline-block rounded-full border border-red-500/30 bg-red-500/10 px-4 py-2 text-sm text-red-300">
              Checkout
            </p>

            <h1 className="text-4xl font-black">
              Delivery <span className="text-red-500">Details</span>
            </h1>

            <div className="mt-8 grid gap-5 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm text-white/70">
                  Full Name
                </label>
                <input
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-white/10 bg-black/40 px-5 py-4 outline-none focus:border-red-500"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-white/70">
                  Phone Number
                </label>
                <input
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-white/10 bg-black/40 px-5 py-4 outline-none focus:border-red-500"
                  placeholder="10 digit mobile number"
                />
              </div>

              <div className="md:col-span-2">
                <label className="mb-2 block text-sm text-white/70">
                  Full Address
                </label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  rows="4"
                  className="w-full resize-none rounded-2xl border border-white/10 bg-black/40 px-5 py-4 outline-none focus:border-red-500"
                  placeholder="House no, street, area, landmark"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-white/70">
                  City
                </label>
                <input
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-white/10 bg-black/40 px-5 py-4 outline-none focus:border-red-500"
                  placeholder="City"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-white/70">
                  Pincode
                </label>
                <input
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-white/10 bg-black/40 px-5 py-4 outline-none focus:border-red-500"
                  placeholder="226001"
                />
              </div>

              <div className="md:col-span-2">
                <label className="mb-2 block text-sm text-white/70">
                  Payment Method
                </label>

                <select
                  name="paymentMethod"
                  value={formData.paymentMethod}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-white/10 bg-black/40 px-5 py-4 outline-none focus:border-red-500"
                >
                  <option className="bg-black" value="Cash on Delivery">
                    Cash on Delivery
                  </option>
                  <option className="bg-black" value="Online Payment">
                    Online Payment
                  </option>
                </select>
              </div>
            </div>

            <button
              disabled={loading}
              className="mt-8 w-full rounded-2xl bg-red-500 py-4 font-bold hover:bg-red-600 disabled:opacity-60"
            >
              {loading ? "Placing Order..." : "Place Order"}
            </button>
          </motion.form>

          <div className="h-fit rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
            <h2 className="text-2xl font-black">Order Summary</h2>

            <div className="mt-6 max-h-[320px] space-y-4 overflow-y-auto pr-2">
              {cartItems.length === 0 ? (
                <p className="text-white/50">Cart is empty.</p>
              ) : (
                cartItems.map((item) => (
                  <div
                    key={item._id}
                    className="flex gap-4 rounded-2xl bg-black/30 p-3"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-16 w-16 rounded-xl object-cover"
                    />

                    <div className="flex-1">
                      <h3 className="font-bold">{item.name}</h3>
                      <p className="text-sm text-white/50">
                        Qty: {item.quantity}
                      </p>
                    </div>

                    <p className="font-bold text-red-400">
                      ₹{item.price * item.quantity}
                    </p>
                  </div>
                ))
              )}
            </div>

            <div className="mt-6 space-y-4 border-t border-white/10 pt-6 text-white/70">
              <div className="flex justify-between">
                <span>Item Total</span>
                <span>₹{cartTotal}</span>
              </div>

              <div className="flex justify-between">
                <span>Delivery Fee</span>
                <span>₹{deliveryFee}</span>
              </div>

              <div className="flex justify-between">
                <span>Platform Fee</span>
                <span>₹{platformFee}</span>
              </div>

              <div className="flex justify-between text-xl font-black text-white">
                <span>Total</span>
                <span>₹{grandTotal}</span>
              </div>
            </div>

            <Link
              to="/cart"
              className="mt-5 block text-center text-sm font-semibold text-red-300"
            >
              Back to cart
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}

export default Checkout;