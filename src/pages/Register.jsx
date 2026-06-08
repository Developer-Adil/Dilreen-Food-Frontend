import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import API from "../api/axios";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
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

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.password) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const res = await API.post("/auth/register", formData);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      toast.success("Account created successfully");
      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#080808] px-4 text-white">
      <div className="absolute left-[-100px] top-[-100px] h-96 w-96 rounded-full bg-red-500/20 blur-3xl"></div>
      <div className="absolute bottom-[-100px] right-[-100px] h-96 w-96 rounded-full bg-orange-500/20 blur-3xl"></div>

      <motion.form
        initial={{ y: 40, opacity: 0, scale: 0.96 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        onSubmit={handleRegister}
        className="relative w-full max-w-md rounded-[2rem] border border-white/10 bg-white/10 p-8 shadow-2xl backdrop-blur-xl"
      >
        <Link
          to="/"
          className="mb-8 inline-block text-2xl font-black tracking-tight"
        >
          Dilreen's<span className="text-red-500 font-black leading-tight"> Zaika</span>
        </Link>

        <h1 className="text-4xl font-black">
          Create <span className="text-red-500">Account</span>
        </h1>

        <p className="mt-3 text-sm leading-6 text-white/50">
          Register now and start ordering your favorite food with a premium food delivery experience.
        </p>

        <div className="mt-8 space-y-5">
          <div>
            <label className="mb-2 block text-sm text-white/70">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              className="w-full rounded-2xl border border-white/10 bg-black/40 px-5 py-4 text-white outline-none transition focus:border-red-500"
            />
          </div>

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
              placeholder="Minimum 6 characters"
              className="w-full rounded-2xl border border-white/10 bg-black/40 px-5 py-4 text-white outline-none transition focus:border-red-500"
            />
          </div>
        </div>

        <button
          disabled={loading}
          className="mt-8 w-full rounded-2xl bg-red-500 py-4 font-bold transition hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Creating Account..." : "Register"}
        </button>

        <p className="mt-6 text-center text-sm text-white/60">
          Already have an account?{" "}
          <Link to="/login" className="font-semibold text-red-400">
            Login
          </Link>
        </p>
      </motion.form>
    </div>
  );
}

export default Register;