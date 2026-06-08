import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FiClock, FiMapPin, FiPlus, FiStar } from "react-icons/fi";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import API from "../api/axios";
import { useCart } from "../context/CartContext";
import Footer from "../components/Footer";

function FoodDetails() {
  const { id } = useParams();
  const { addToCart } = useCart();

  const [food, setFood] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchFood = async () => {
    try {
      const res = await API.get(`/foods/${id}`);
      setFood(res.data.food);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFood();
  }, [id]);

  if (loading) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-[#080808] px-6 pt-32 text-white">
          <p className="mx-auto max-w-7xl text-white/60">Loading food...</p>
        </main>
      </>
    );
  }

  if (!food) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-[#080808] px-6 pt-32 text-white">
          <div className="mx-auto max-w-7xl rounded-[2rem] border border-white/10 bg-white/5 p-8">
            Food not found.
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#080808] px-6 pt-32 text-white">
        <section className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2">
          <motion.div
            initial={{ scale: 0.96, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="overflow-hidden rounded-[3rem] border border-white/10 bg-white/5 p-4"
          >
            <img
              src={food.image}
              alt={food.name}
              className="h-[520px] w-full rounded-[2.5rem] object-cover"
            />
          </motion.div>

          <div className="flex flex-col justify-center">
            <p className="mb-4 inline-block w-fit rounded-full border border-red-500/30 bg-red-500/10 px-4 py-2 text-sm text-red-300">
              {food.isVeg ? "Veg Food" : "Non-Veg Food"}
            </p>

            <h1 className="text-5xl font-black leading-tight md:text-7xl">
              {food.name}
            </h1>

            <p className="mt-5 max-w-xl text-lg leading-8 text-white/60">
              {food.description}
            </p>

            <div className="mt-6 flex flex-wrap gap-4">
              <span className="flex items-center gap-2 rounded-full bg-white/5 px-5 py-3 text-white/70">
                <FiStar className="text-yellow-400" />
                {food.rating}
              </span>

              <span className="rounded-full bg-red-500/10 px-5 py-3 text-red-300">
                {food.category}
              </span>

              <span className="rounded-full bg-white/5 px-5 py-3 text-white/70">
                ₹{food.price}
              </span>
            </div>

            {food.restaurant && (
              <Link
                to={`/restaurants/${food.restaurant._id}`}
                className="mt-8 rounded-[2rem] border border-white/10 bg-white/5 p-5 transition hover:bg-white/10"
              >
                <h3 className="text-2xl font-black">{food.restaurant.name}</h3>

                <div className="mt-3 flex flex-wrap gap-4 text-sm text-white/60">
                  <span className="flex items-center gap-1">
                    <FiMapPin className="text-red-400" />
                    {food.restaurant.location}
                  </span>

                  <span className="flex items-center gap-1">
                    <FiClock className="text-red-400" />
                    {food.restaurant.deliveryTime}
                  </span>
                </div>
              </Link>
            )}

            <div className="mt-8 flex flex-wrap gap-4">
              <button
                onClick={() => addToCart(food)}
                className="flex items-center gap-2 rounded-2xl bg-red-500 px-8 py-4 font-bold hover:bg-red-600"
              >
                <FiPlus />
                Add to Cart
              </button>

              <Link
                to="/cart"
                className="rounded-2xl border border-white/10 bg-white/5 px-8 py-4 font-bold hover:bg-white/10"
              >
                Go to Cart
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default FoodDetails;