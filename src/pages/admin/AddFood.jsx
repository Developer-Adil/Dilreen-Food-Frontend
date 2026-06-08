import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import AdminLayout from "../../components/AdminLayout";
import API from "../../api/axios";

function AddFood() {
  const [restaurants, setRestaurants] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
    category: "",
    rating: 4.5,
    isVeg: true,
    restaurant: "",
  });

  const fetchRestaurants = async () => {
    try {
      const res = await API.get("/restaurants");
      setRestaurants(res.data.restaurants);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const handleChange = (e) => {
    const value =
      e.target.name === "isVeg" ? e.target.value === "true" : e.target.value;

    setFormData((prev) => ({
      ...prev,
      [e.target.name]: value,
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await API.post("/admin/foods", formData);

      toast.success("Food item added successfully");

      setFormData({
        name: "",
        description: "",
        price: "",
        image: "",
        category: "",
        rating: 4.5,
        isVeg: true,
        restaurant: "",
      });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add food item");
    }
  };

  return (
    <AdminLayout>
      <div>
        <h1 className="text-4xl font-black">
          Add <span className="text-red-500">Food Item</span>
        </h1>

        <form
          onSubmit={submitHandler}
          className="mt-8 max-w-4xl rounded-[2rem] border border-white/10 bg-white/5 p-6"
        >
          <div className="grid gap-5 md:grid-cols-2">
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Food name"
              className="rounded-2xl border border-white/10 bg-black/40 px-5 py-4 outline-none focus:border-red-500"
            />

            <input
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Price"
              type="number"
              className="rounded-2xl border border-white/10 bg-black/40 px-5 py-4 outline-none focus:border-red-500"
            />

            <input
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="Image URL"
              className="rounded-2xl border border-white/10 bg-black/40 px-5 py-4 outline-none focus:border-red-500 md:col-span-2"
            />

            <input
              name="category"
              value={formData.category}
              onChange={handleChange}
              placeholder="Category e.g. Pizza, Biryani"
              className="rounded-2xl border border-white/10 bg-black/40 px-5 py-4 outline-none focus:border-red-500"
            />

            <select
              name="restaurant"
              value={formData.restaurant}
              onChange={handleChange}
              className="rounded-2xl border border-white/10 bg-black/40 px-5 py-4 outline-none focus:border-red-500"
            >
              <option className="bg-black" value="">
                Select Restaurant
              </option>

              {restaurants.map((restaurant) => (
                <option
                  className="bg-black"
                  key={restaurant._id}
                  value={restaurant._id}
                >
                  {restaurant.name}
                </option>
              ))}
            </select>

            <select
              name="isVeg"
              value={formData.isVeg}
              onChange={handleChange}
              className="rounded-2xl border border-white/10 bg-black/40 px-5 py-4 outline-none focus:border-red-500"
            >
              <option className="bg-black" value="true">
                Veg
              </option>
              <option className="bg-black" value="false">
                Non-Veg
              </option>
            </select>

            <input
              name="rating"
              value={formData.rating}
              onChange={handleChange}
              placeholder="Rating"
              type="number"
              step="0.1"
              className="rounded-2xl border border-white/10 bg-black/40 px-5 py-4 outline-none focus:border-red-500"
            />

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Description"
              rows="5"
              className="resize-none rounded-2xl border border-white/10 bg-black/40 px-5 py-4 outline-none focus:border-red-500 md:col-span-2"
            />
          </div>

          <button className="mt-6 rounded-2xl bg-red-500 px-8 py-4 font-bold hover:bg-red-600">
            Add Food Item
          </button>
        </form>
      </div>
    </AdminLayout>
  );
}

export default AddFood;