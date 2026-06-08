import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import AdminLayout from "../../components/AdminLayout";
import API from "../../api/axios";

function ManageFoods() {
  const [foods, setFoods] = useState([]);

  const fetchFoods = async () => {
    try {
      const res = await API.get("/foods");
      setFoods(res.data.foods);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteFood = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this food item?");

    if (!confirmDelete) return;

    try {
      await API.delete(`/admin/foods/${id}`);

      toast.success("Food deleted successfully");

      fetchFoods();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete food");
    }
  };

  useEffect(() => {
    fetchFoods();
  }, []);

  return (
    <AdminLayout>
      <div>
        <h1 className="text-4xl font-black">
          Manage <span className="text-red-500">Foods</span>
        </h1>

        <div className="mt-8 overflow-hidden rounded-[2rem] border border-white/10 bg-white/5">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] text-left">
              <thead className="bg-white/5 text-sm text-white/60">
                <tr>
                  <th className="px-5 py-4">Image</th>
                  <th className="px-5 py-4">Name</th>
                  <th className="px-5 py-4">Category</th>
                  <th className="px-5 py-4">Price</th>
                  <th className="px-5 py-4">Restaurant</th>
                  <th className="px-5 py-4">Action</th>
                </tr>
              </thead>

              <tbody>
                {foods.map((food) => (
                  <tr key={food._id} className="border-t border-white/10">
                    <td className="px-5 py-4">
                      <img
                        src={food.image}
                        alt={food.name}
                        className="h-16 w-20 rounded-xl object-cover"
                      />
                    </td>

                    <td className="px-5 py-4 font-bold">{food.name}</td>
                    <td className="px-5 py-4 text-white/60">{food.category}</td>
                    <td className="px-5 py-4 text-red-400">₹{food.price}</td>
                    <td className="px-5 py-4 text-white/60">
                      {food.restaurant?.name || "N/A"}
                    </td>

                    <td className="px-5 py-4">
                      <button
                        onClick={() => deleteFood(food._id)}
                        className="rounded-full bg-red-500 px-5 py-2 text-sm font-bold hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}

                {foods.length === 0 && (
                  <tr>
                    <td className="px-5 py-8 text-white/50" colSpan="6">
                      No food items found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

export default ManageFoods;