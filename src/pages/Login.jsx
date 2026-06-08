import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import API from "../api/axios";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const res = await API.post("/auth/login", formData);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      toast.success("Login successful");

      window.location.href = "/";
    } catch (error) {
      console.log("LOGIN ERROR:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#080808] px-4 text-white">
      <div className="absolute bottom-[-100px] left-[-100px] h-96 w-96 rounded-full bg-red-500/20 blur-3xl"></div>
      <div className="absolute right-[-100px] top-[-100px] h-96 w-96 rounded-full bg-orange-500/20 blur-3xl"></div>

      <motion.form
        initial={{ y: 40, opacity: 0, scale: 0.96 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        onSubmit={handleLogin}
        className="relative w-full max-w-md rounded-[2rem] border border-white/10 bg-white/10 p-8 shadow-2xl backdrop-blur-xl"
      >
        <Link
          to="/"
          className="mb-8 inline-block text-2xl font-black tracking-tight"
        >
          Dilreen's
          <span className="text-red-500 font-black leading-tight">
            {" "}
            Zaika
          </span>
        </Link>

        <h1 className="text-4xl font-black">
          Welcome <span className="text-red-500">Back</span>
        </h1>

        <p className="mt-3 text-sm leading-6 text-white/50">
          Login to continue ordering food from your favorite restaurants.
        </p>

        <div className="mt-8 space-y-5">
          <div>
            <label className="mb-2 block text-sm text-white/70">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full rounded-2xl border border-white/10 bg-black/40 px-5 py-4 text-white outline-none transition focus:border-red-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-white/70">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full rounded-2xl border border-white/10 bg-black/40 px-5 py-4 text-white outline-none transition focus:border-red-500"
            />
          </div>
        </div>

        <button
          disabled={loading}
          className="mt-8 w-full rounded-2xl bg-red-500 py-4 font-bold transition hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="mt-6 text-center text-sm text-white/60">
          Don’t have an account?{" "}
          <Link to="/register" className="font-semibold text-red-400">
            Register
          </Link>
        </p>
      </motion.form>
    </div>
  );
}

export default Login;