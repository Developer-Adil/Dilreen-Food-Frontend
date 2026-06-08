import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import RestaurantCard from "../components/RestaurantCard";
import API from "../api/axios";
import SkeletonCard from "../components/SkeletonCard";
import Footer from "../components/Footer";

function Restaurants() {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRestaurants = async () => {
    try {
      const res = await API.get("/restaurants");
      setRestaurants(res.data.restaurants);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRestaurants();
  }, []);

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#080808] px-6 pt-32 text-white">
        <section className="mx-auto max-w-7xl">
          <div className="mb-10">
            <p className="mb-3 inline-block rounded-full border border-red-500/30 bg-red-500/10 px-4 py-2 text-sm text-red-300">
              Top restaurants near you
            </p>

            <h1 className="text-4xl font-black md:text-6xl">
              Discover Best <span className="text-red-500">Restaurants</span>
            </h1>

            <p className="mt-4 max-w-2xl text-white/50">
              Explore premium restaurants, fast delivery, amazing ratings and
              delicious food options.
            </p>
          </div>

          {loading ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <SkeletonCard key={item} />
              ))}
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {restaurants.map((restaurant, index) => (
                <RestaurantCard
                  key={restaurant._id}
                  restaurant={restaurant}
                  index={index}
                />
              ))}
            </div>
          )}
        </section>
      </main>
    </>
  );
}

export default Restaurants;
