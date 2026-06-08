import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import Navbar from "../components/Navbar";
import FoodCard from "../components/FoodCard";
import API from "../api/axios";
import SkeletonCard from "../components/SkeletonCard";
import Footer from "../components/Footer";

const categories = [
  "All",
  "Biryani",
  "Pizza",
  "Burger",
  "North Indian",
  "South Indian",
];

function Foods() {
  const [searchParams, setSearchParams] = useSearchParams();

  const searchFromUrl = searchParams.get("search") || "";

  const [foods, setFoods] = useState([]);
  const [search, setSearch] = useState(searchFromUrl);
  const [category, setCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  const fetchFoods = async () => {
    try {
      setLoading(true);

      const res = await API.get("/foods", {
        params: {
          search,
          category,
        },
      });

      setFoods(res.data.foods);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setSearch(searchFromUrl);
  }, [searchFromUrl]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchFoods();

      const params = {};
      if (search.trim()) params.search = search.trim();
      if (category !== "All") params.category = category;

      setSearchParams(params);
    }, 400);

    return () => clearTimeout(timer);
  }, [search, category]);

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#080808] px-6 pt-32 text-white">
        <section className="mx-auto max-w-7xl">
          <div className="mb-10">
            <p className="mb-3 inline-block rounded-full border border-red-500/30 bg-red-500/10 px-4 py-2 text-sm text-red-300">
              Fresh food menu
            </p>

            <h1 className="text-4xl font-black md:text-6xl">
              Order Your <span className="text-red-500">Favorite Food</span>
            </h1>

            <p className="mt-4 max-w-2xl text-white/50">
              Search, filter and choose from delicious food items available near
              you.
            </p>
          </div>

          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex w-full items-center rounded-2xl border border-white/10 bg-white/5 px-4 md:max-w-md">
              <FiSearch className="text-white/40" />

              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search pizza, biryani, burger..."
                className="w-full bg-transparent px-4 py-4 text-white outline-none placeholder:text-white/30"
              />
            </div>

            <div className="flex gap-3 overflow-x-auto pb-2">
              {categories.map((item) => (
                <button
                  key={item}
                  onClick={() => setCategory(item)}
                  className={`whitespace-nowrap rounded-full px-5 py-3 text-sm font-semibold transition ${
                    category === item
                      ? "bg-red-500 text-white"
                      : "bg-white/5 text-white/60 hover:bg-white/10"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {loading ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <SkeletonCard key={item} />
              ))}
            </div>
          ) : foods.length === 0 ? (
            <p className="rounded-2xl border border-white/10 bg-white/5 p-8 text-white/60">
              No food items found for "{search}".
            </p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {foods.map((food, index) => (
                <FoodCard key={food._id} food={food} index={index} />
              ))}
            </div>
          )}
        </section>
      </main>
    </>
  );
}

export default Foods;
