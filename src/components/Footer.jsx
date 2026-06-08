import { Link } from "react-router-dom";
import { FiGithub, FiInstagram, FiLinkedin } from "react-icons/fi";

function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black px-6 py-12 text-white">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-4">
        <div>
          <Link to="/" className="text-3xl font-black">
            Dilreen's<span className="text-red-500"> Zaika</span>
          </Link>

          <p className="mt-4 text-sm leading-6 text-white/50">
            A full-stack MERN food delivery platform with modern UI, cart,
            orders, admin panel and MongoDB backend.
          </p>
        </div>

        <div>
          <h3 className="font-bold">Explore</h3>

          <div className="mt-4 space-y-3 text-sm text-white/50">
            <Link to="/" className="block hover:text-red-400">
              Home
            </Link>
            <Link to="/restaurants" className="block hover:text-red-400">
              Restaurants
            </Link>
            <Link to="/foods" className="block hover:text-red-400">
              Foods
            </Link>
            <Link to="/cart" className="block hover:text-red-400">
              Cart
            </Link>
          </div>
        </div>

        <div>
          <h3 className="font-bold">Project Features</h3>

          <div className="mt-4 space-y-3 text-sm text-white/50">
            <p>JWT Authentication</p>
            <p>MongoDB Orders</p>
            <p>Admin Dashboard</p>
            <p>Responsive UI</p>
          </div>
        </div>

        <div>
          <h3 className="font-bold">Developer</h3>

          <p className="mt-4 text-sm text-white/50">
            Built by Adil Khan as a portfolio-ready MERN project.
          </p>

          <div className="mt-5 flex gap-3">
            <span className="rounded-full bg-white/5 p-3 text-white/70">
              <FiGithub />
            </span>
            <span className="rounded-full bg-white/5 p-3 text-white/70">
              <FiLinkedin />
            </span>
            <span className="rounded-full bg-white/5 p-3 text-white/70">
              <FiInstagram />
            </span>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-10 max-w-7xl border-t border-white/10 pt-6 text-center text-sm text-white/40">
        © {new Date().getFullYear()} Dilreen's Zaika. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;