import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiPlus, FiStar } from "react-icons/fi";
import { useCart } from "../context/CartContext";

function FoodCard({ food, index }) {
  const { addToCart } = useCart();

  return (
    <motion.div
      initial={{ y: 40, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ delay: index * 0.06 }}
      viewport={{ once: true }}
      className="group overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 shadow-xl backdrop-blur-xl"
    >
      <Link to={`/foods/${food._id}`} className="block">
        <div className="relative h-56 overflow-hidden">
          <img
            src={food.image}
            alt={food.name}
            className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
          />

          <div className="absolute left-4 top-4 rounded-full bg-black/70 px-3 py-2 text-xs font-semibold backdrop-blur-xl">
            {food.isVeg ? (
              <span className="text-green-400">VEG</span>
            ) : (
              <span className="text-red-400">NON-VEG</span>
            )}
          </div>

          <div className="absolute right-4 top-4 flex items-center gap-1 rounded-full bg-black/70 px-3 py-2 text-sm backdrop-blur-xl">
            <FiStar className="text-yellow-400" />
            {food.rating}
          </div>
        </div>
      </Link>

      <div className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <Link to={`/foods/${food._id}`}>
              <h3 className="text-xl font-black hover:text-red-400">
                {food.name}
              </h3>
            </Link>
            <p className="mt-1 text-sm text-red-300">{food.category}</p>
          </div>

          <p className="rounded-full bg-red-500 px-4 py-2 text-sm font-bold">
            ₹{food.price}
          </p>
        </div>

        <p className="mt-4 line-clamp-2 text-sm leading-6 text-white/50">
          {food.description}
        </p>

        <div className="mt-5 flex items-center justify-between">
          <p className="text-sm text-white/50">
            {food.restaurant?.name || "FoodRush"}
          </p>

          <button
            onClick={() => addToCart(food)}
            className="flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-bold text-black transition hover:bg-red-500 hover:text-white"
          >
            <FiPlus />
            Add
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default FoodCard;