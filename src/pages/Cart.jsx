import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiMinus, FiPlus, FiTrash2, FiShoppingBag } from "react-icons/fi";
import Navbar from "../components/Navbar";
import { useCart } from "../context/CartContext";

function Cart() {
  const {
    cartItems,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
    cartTotal,
  } = useCart();

  const deliveryFee = cartTotal > 0 ? 39 : 0;
  const platformFee = cartTotal > 0 ? 9 : 0;
  const grandTotal = cartTotal + deliveryFee + platformFee;

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#080808] px-6 pt-32 text-white">
        <section className="mx-auto max-w-7xl">
          <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <p className="mb-3 inline-block rounded-full border border-red-500/30 bg-red-500/10 px-4 py-2 text-sm text-red-300">
                Your food cart
              </p>

              <h1 className="text-4xl font-black md:text-6xl">
                Review Your <span className="text-red-500">Order</span>
              </h1>

              <p className="mt-4 max-w-2xl text-white/50">
                Manage your selected food items before placing the order.
              </p>
            </div>

            {cartItems.length > 0 && (
              <button
                onClick={clearCart}
                className="rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white/70 hover:bg-red-500 hover:text-white"
              >
                Clear Cart
              </button>
            )}
          </div>

          {cartItems.length === 0 ? (
            <div className="rounded-[2rem] border border-white/10 bg-white/5 p-10 text-center">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-red-500/10 text-4xl text-red-400">
                <FiShoppingBag />
              </div>

              <h2 className="mt-6 text-3xl font-black">Your cart is empty</h2>

              <p className="mx-auto mt-3 max-w-md text-white/50">
                Looks like you have not added anything yet. Explore foods and
                add your favorite items.
              </p>

              <Link
                to="/foods"
                className="mt-8 inline-block rounded-full bg-red-500 px-8 py-4 font-bold hover:bg-red-600"
              >
                Explore Foods
              </Link>
            </div>
          ) : (
            <div className="grid gap-8 lg:grid-cols-[1fr_420px]">
              <div className="space-y-5">
                {cartItems.map((item, index) => (
                  <motion.div
                    key={item._id}
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: index * 0.06 }}
                    className="grid gap-5 rounded-[2rem] border border-white/10 bg-white/5 p-5 backdrop-blur-xl md:grid-cols-[140px_1fr]"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-36 w-full rounded-[1.5rem] object-cover"
                    />

                    <div className="flex flex-col justify-between gap-5">
                      <div className="flex flex-col justify-between gap-3 md:flex-row">
                        <div>
                          <h3 className="text-2xl font-black">{item.name}</h3>
                          <p className="mt-1 text-sm text-red-300">
                            {item.category}
                          </p>
                          <p className="mt-2 text-sm text-white/50">
                            {item.restaurant}
                          </p>
                        </div>

                        <button
                          onClick={() => removeFromCart(item._id)}
                          className="h-fit rounded-full border border-white/10 bg-white/5 p-3 text-white/60 hover:bg-red-500 hover:text-white"
                        >
                          <FiTrash2 />
                        </button>
                      </div>

                      <div className="flex flex-wrap items-center justify-between gap-4">
                        <div className="flex items-center rounded-full border border-white/10 bg-black/40 p-1">
                          <button
                            onClick={() => decreaseQuantity(item._id)}
                            className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-white/10"
                          >
                            <FiMinus />
                          </button>

                          <span className="w-10 text-center font-bold">
                            {item.quantity}
                          </span>

                          <button
                            onClick={() => increaseQuantity(item._id)}
                            className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-white/10"
                          >
                            <FiPlus />
                          </button>
                        </div>

                        <div className="text-right">
                          <p className="text-sm text-white/40">Item Total</p>
                          <p className="text-2xl font-black text-red-400">
                            ₹{item.price * item.quantity}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="h-fit rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
                <h2 className="text-2xl font-black">Bill Summary</h2>

                <div className="mt-6 space-y-4 text-white/70">
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

                  <div className="border-t border-white/10 pt-4">
                    <div className="flex justify-between text-xl font-black text-white">
                      <span>Grand Total</span>
                      <span>₹{grandTotal}</span>
                    </div>
                  </div>
                </div>

                <Link
                  to="/checkout"
                  className="mt-8 block w-full rounded-2xl bg-red-500 py-4 text-center font-bold hover:bg-red-600"
                >
                  Proceed to Checkout
                </Link>

                <Link
                  to="/foods"
                  className="mt-4 block text-center text-sm font-semibold text-red-300 hover:text-red-400"
                >
                  Add more items
                </Link>
              </div>
            </div>
          )}
        </section>
      </main>
    </>
  );
}

export default Cart;
