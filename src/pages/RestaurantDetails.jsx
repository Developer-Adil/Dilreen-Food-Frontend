import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FiClock, FiMapPin, FiStar } from "react-icons/fi";
import Navbar from "../components/Navbar";
import FoodCard from "../components/FoodCard";
import API from "../api/axios";
import Footer from "../components/Footer";

function RestaurantDetails() {
  const { id } = useParams();

  const [restaurant, setRestaurant] = useState(null);
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRestaurantDetails = async () => {
    try {
      const restaurantRes = await API.get(`/restaurants/${id}`);
      const foodRes = await API.get("/foods");

      setRestaurant(restaurantRes.data.restaurant);

      const restaurantFoods = foodRes.data.foods.filter(
        (food) => food.restaurant?._id === id
      );

      setFoods(restaurantFoods);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRestaurantDetails();
  }, [id]);

  if (loading) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-[#080808] px-6 pt-32 text-white">
          <p className="mx-auto max-w-7xl text-white/60">
            Loading restaurant...
          </p>
        </main>
      </>
    );
  }

  if (!restaurant) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-[#080808] px-6 pt-32 text-white">
          <div className="mx-auto max-w-7xl rounded-[2rem] border border-white/10 bg-white/5 p-8">
            Restaurant not found.
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#080808] px-6 pt-28 text-white">
        <section className="mx-auto max-w-7xl">
          <div className="relative overflow-hidden rounded-[3rem] border border-white/10 bg-white/5">
            <img
              src={restaurant.image}
              alt={restaurant.name}
              className="h-[420px] w-full object-cover opacity-70"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent"></div>

            <div className="absolute bottom-0 left-0 p-8 md:p-12">
              <p className="mb-4 inline-block rounded-full border border-red-500/30 bg-red-500/10 px-4 py-2 text-sm text-red-300 backdrop-blur-xl">
                {restaurant.cuisine}
              </p>

              <h1 className="text-5xl font-black md:text-7xl">
                {restaurant.name}
              </h1>

              <p className="mt-4 max-w-2xl text-white/70">
                {restaurant.description}
              </p>

              <div className="mt-6 flex flex-wrap gap-4">
                <span className="flex items-center gap-2 rounded-full bg-black/60 px-5 py-3 backdrop-blur-xl">
                  <FiStar className="text-yellow-400" />
                  {restaurant.rating}
                </span>

                <span className="flex items-center gap-2 rounded-full bg-black/60 px-5 py-3 backdrop-blur-xl">
                  <FiClock className="text-red-400" />
                  {restaurant.deliveryTime}
                </span>

                <span className="flex items-center gap-2 rounded-full bg-black/60 px-5 py-3 backdrop-blur-xl">
                  <FiMapPin className="text-red-400" />
                  {restaurant.location}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-12">
            <h2 className="text-4xl font-black">
              Menu <span className="text-red-500">Items</span>
            </h2>

            {foods.length === 0 ? (
              <div className="mt-6 rounded-[2rem] border border-white/10 bg-white/5 p-8 text-white/50">
                No food items found for this restaurant.
              </div>
            ) : (
              <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {foods.map((food, index) => (
                  <FoodCard key={food._id} food={food} index={index} />
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
    </>
  );
}

export default RestaurantDetails;