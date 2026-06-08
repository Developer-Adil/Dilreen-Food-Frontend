import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiShoppingCart, FiUser, FiLogOut, FiMenu, FiX } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import { useCart } from "../context/CartContext";

function Navbar() {
  const navigate = useNavigate();
  const { cartCount } = useCart();

  const [menuOpen, setMenuOpen] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    toast.success("Logged out successfully");

    setMenuOpen(false);
    navigate("/login");
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Restaurants", path: "/restaurants" },
    { name: "Foods", path: "/foods" },
  ];

  if (user) {
    navLinks.push({ name: "Orders", path: "/orders" });
    navLinks.push({ name: "Profile", path: "/profile" });
  }
  if (user?.role === "admin") {
    navLinks.push({ name: "Admin", path: "/admin" });
  }

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="fixed left-0 top-0 z-50 w-full border-b border-white/10 bg-black/70 backdrop-blur-xl"
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link to="/" className="text-2xl font-black tracking-tight">
            Dilreen's<span className="text-red-500"> Zaika</span>
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                className={`text-sm hover:text-red-400 ${
                  link.name === "Admin" ? "text-red-400" : "text-white/80"
                }`}
                to={link.path}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/cart"
              className="relative rounded-full border border-white/10 bg-white/5 p-3 hover:bg-red-500"
            >
              <FiShoppingCart />

              {cartCount > 0 && (
                <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
                  {cartCount}
                </span>
              )}
            </Link>

            {user ? (
              <div className="hidden items-center gap-3 md:flex">
                <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm">
                  Hi,{" "}
                  <span className="font-semibold text-red-400">
                    {user.name}
                  </span>
                </div>

                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 rounded-full bg-red-500 px-4 py-3 text-sm font-semibold hover:bg-red-600"
                >
                  <FiLogOut />
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="hidden items-center gap-2 rounded-full bg-red-500 px-5 py-3 text-sm font-semibold hover:bg-red-600 md:flex"
              >
                <FiUser />
                Login
              </Link>
            )}

            <button
              onClick={() => setMenuOpen((prev) => !prev)}
              className="rounded-full border border-white/10 bg-white/5 p-3 md:hidden"
            >
              {menuOpen ? <FiX /> : <FiMenu />}
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            className="fixed left-0 top-[73px] z-40 w-full border-b border-white/10 bg-black/95 px-6 py-6 text-white backdrop-blur-xl md:hidden"
          >
            <div className="space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  onClick={() => setMenuOpen(false)}
                  to={link.path}
                  className={`block rounded-2xl px-4 py-3 ${
                    link.name === "Admin"
                      ? "bg-red-500/10 text-red-300"
                      : "bg-white/5 text-white/80"
                  }`}
                >
                  {link.name}
                </Link>
              ))}

              {user ? (
                <>
                  <div className="rounded-2xl bg-white/5 px-4 py-3 text-sm">
                    Logged in as{" "}
                    <span className="font-bold text-red-400">{user.name}</span>
                  </div>

                  <button
                    onClick={handleLogout}
                    className="block w-full rounded-2xl bg-red-500 px-4 py-3 text-left font-bold"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  onClick={() => setMenuOpen(false)}
                  to="/login"
                  className="block rounded-2xl bg-red-500 px-4 py-3 font-bold"
                >
                  Login
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Navbar;
