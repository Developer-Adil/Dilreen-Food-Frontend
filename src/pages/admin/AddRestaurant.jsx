import { useState } from "react";
import toast from "react-hot-toast";
import AdminLayout from "../../components/AdminLayout";
import API from "../../api/axios";

function AddRestaurant() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: "",
    location: "",
    rating: 4.5,
    deliveryTime: "30-40 min",
    cuisine: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await API.post("/admin/restaurants", formData);

      toast.success("Restaurant added successfully");

      setFormData({
        name: "",
        description: "",
        image: "",
        location: "",
        rating: 4.5,
        deliveryTime: "30-40 min",
        cuisine: "",
      });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add restaurant");
    }
  };

  return (
    <AdminLayout>
      <div>
        <h1 className="text-4xl font-black">
          Add <span className="text-red-500">Restaurant</span>
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
              placeholder="Restaurant name"
              className="rounded-2xl border border-white/10 bg-black/40 px-5 py-4 outline-none focus:border-red-500"
            />

            <input
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Location"
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
              name="cuisine"
              value={formData.cuisine}
              onChange={handleChange}
              placeholder="Cuisine e.g. Biryani, Mughlai"
              className="rounded-2xl border border-white/10 bg-black/40 px-5 py-4 outline-none focus:border-red-500"
            />

            <input
              name="deliveryTime"
              value={formData.deliveryTime}
              onChange={handleChange}
              placeholder="Delivery Time"
              className="rounded-2xl border border-white/10 bg-black/40 px-5 py-4 outline-none focus:border-red-500"
            />

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
            Add Restaurant
          </button>
        </form>
      </div>
    </AdminLayout>
  );
}

export default AddRestaurant;