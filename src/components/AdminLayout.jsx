import { Link, useNavigate } from "react-router-dom";
import {
  FiGrid,
  FiPlusCircle,
  FiShoppingBag,
  FiPackage,
  FiHome,
  FiLogOut,
} from "react-icons/fi";
import toast from "react-hot-toast";

function AdminLayout({ children }) {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.success("Logged out successfully");
    navigate("/login");
  };

  if (!user || user.role !== "admin") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#080808] px-6 text-white">
        <div className="max-w-md rounded-[2rem] border border-white/10 bg-white/5 p-8 text-center">
          <h1 className="text-3xl font-black text-red-500">Access Denied</h1>
          <p className="mt-3 text-white/60">
            You are not allowed to access the admin panel.
          </p>
          <Link
            to="/"
            className="mt-6 inline-block rounded-full bg-red-500 px-6 py-3 font-bold hover:bg-red-600"
          >
            Go Home
          </Link>
        </div>
      </div>
    );
  }

  const links = [
    {
      name: "Dashboard",
      path: "/admin",
      icon: <FiGrid />,
    },
    {
      name: "Add Restaurant",
      path: "/admin/add-restaurant",
      icon: <FiPlusCircle />,
    },
    {
      name: "Add Food",
      path: "/admin/add-food",
      icon: <FiShoppingBag />,
    },
    {
      name: "Manage Foods",
      path: "/admin/manage-foods",
      icon: <FiPackage />,
    },
    {
      name: "Orders",
      path: "/admin/orders",
      icon: <FiPackage />,
    },
  ];

  return (
    <div className="min-h-screen bg-[#080808] text-white">
      <aside className="fixed left-0 top-0 z-40 hidden h-full w-72 border-r border-white/10 bg-black/70 p-6 backdrop-blur-xl lg:block">
        <Link to="/" className="text-3xl font-black leading-tight">
          Dilreen's <span className="text-red-500"> Zaika</span>
        </Link>

        <p className="mt-2 text-sm text-white/40">Admin Panel</p>

        <nav className="mt-10 space-y-3">
          {links.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="flex items-center gap-3 rounded-2xl px-4 py-3 text-white/70 transition hover:bg-red-500 hover:text-white"
            >
              {link.icon}
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="absolute bottom-6 left-6 right-6 space-y-3">
          <Link
            to="/"
            className="flex items-center gap-3 rounded-2xl bg-white/5 px-4 py-3 text-white/70 hover:bg-white/10"
          >
            <FiHome />
            Website
          </Link>

          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-2xl bg-red-500 px-4 py-3 font-semibold hover:bg-red-600"
          >
            <FiLogOut />
            Logout
          </button>
        </div>
      </aside>

      <main className="min-h-screen px-6 py-8 lg:ml-72">
        <div className="mb-8 flex items-center justify-between rounded-[2rem] border border-white/10 bg-white/5 p-5 lg:hidden">
          <Link to="/" className="text-2xl font-black">
            Dilreen's<span className="text-red-500"> Zaika</span>
          </Link>

          <Link
            to="/"
            className="rounded-full bg-red-500 px-4 py-2 text-sm font-bold"
          >
            Home
          </Link>
        </div>

        {children}
      </main>
    </div>
  );
}

export default AdminLayout;