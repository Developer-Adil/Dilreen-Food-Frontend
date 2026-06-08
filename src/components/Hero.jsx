import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiSearch } from "react-icons/fi";

function Hero() {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();

    if (!searchText.trim()) {
      navigate("/foods");
      return;
    }

    navigate(`/foods?search=${encodeURIComponent(searchText.trim())}`);
  };

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden px-6 pt-24">
      <div className="absolute -left-40 top-20 h-96 w-96 rounded-full bg-red-600/30 blur-3xl"></div>
      <div className="absolute -right-40 bottom-20 h-96 w-96 rounded-full bg-orange-500/20 blur-3xl"></div>

      <div className="mx-auto grid max-w-7xl items-center gap-12 md:grid-cols-2">
        <div>
          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="mb-4 inline-block rounded-full border border-red-500/30 bg-red-500/10 px-4 py-2 text-sm text-red-300"
          >
            Fast Delivery • Fresh Food • Best Restaurants
          </motion.p>

          <motion.h1
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-5xl font-black leading-tight md:text-7xl"
          >
            Delicious food, delivered at your{" "}
            <span className="text-red-500">doorstep.</span>
          </motion.h1>

          <motion.p
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-6 max-w-xl text-lg leading-8 text-white/60"
          >
            Discover restaurants, order your favorite meals, track orders, and enjoy a premium food delivery experience.
          </motion.p>

          <motion.form
            onSubmit={handleSearch}
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-8 flex max-w-xl items-center rounded-2xl border border-white/10 bg-white/10 p-2 backdrop-blur-xl"
          >
            <FiSearch className="mx-4 text-xl text-white/50" />

            <input
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="flex-1 bg-transparent px-2 py-4 text-white outline-none placeholder:text-white/40"
              placeholder="Search for biryani, pizza, burger..."
            />

            <button
              type="submit"
              className="rounded-xl bg-red-500 px-6 py-4 font-semibold hover:bg-red-600"
            >
              Search
            </button>
          </motion.form>
        </div>

        <motion.div
          initial={{ scale: 0.8, opacity: 0, rotate: -8 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <div className="rounded-[3rem] border border-white/10 bg-white/10 p-6 shadow-2xl backdrop-blur-xl">
            <img
              src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=1200&auto=format&fit=crop"
              alt="Food"
              className="h-[480px] w-full rounded-[2.5rem] object-cover"
            />
          </div>

          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{ repeat: Infinity, duration: 3 }}
            className="absolute -bottom-6 left-8 rounded-3xl border border-white/10 bg-black/80 p-5 shadow-2xl backdrop-blur-xl"
          >
            <p className="text-sm text-white/50">Today’s Offer</p>
            <h3 className="text-2xl font-bold">50% OFF</h3>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;