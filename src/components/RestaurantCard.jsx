import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiMapPin, FiStar, FiClock } from "react-icons/fi";

function RestaurantCard({ restaurant, index }) {
  return (
    <motion.div
      initial={{ y: 40, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ delay: index * 0.08 }}
      viewport={{ once: true }}
    >
      <Link
        to={`/restaurants/${restaurant._id}`}
        className="group block overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 shadow-xl backdrop-blur-xl"
      >
        <div className="relative h-56 overflow-hidden">
          <img
            src={restaurant.image}
            alt={restaurant.name}
            className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
          />

          <div className="absolute right-4 top-4 flex items-center gap-1 rounded-full bg-black/70 px-3 py-2 text-sm backdrop-blur-xl">
            <FiStar className="text-yellow-400" />
            {restaurant.rating}
          </div>
        </div>

        <div className="p-5">
          <h3 className="text-xl font-black">{restaurant.name}</h3>

          <p className="mt-2 line-clamp-2 text-sm leading-6 text-white/50">
            {restaurant.description}
          </p>

          <div className="mt-4 flex flex-wrap gap-3 text-sm text-white/60">
            <span className="flex items-center gap-1">
              <FiMapPin className="text-red-400" />
              {restaurant.location}
            </span>

            <span className="flex items-center gap-1">
              <FiClock className="text-red-400" />
              {restaurant.deliveryTime}
            </span>
          </div>

          <p className="mt-4 inline-block rounded-full bg-red-500/10 px-4 py-2 text-sm text-red-300">
            {restaurant.cuisine}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}

export default RestaurantCard;