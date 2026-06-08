import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

function NotFound() {
  return (
    <>
      <Navbar />

      <main className="flex min-h-screen items-center justify-center bg-[#080808] px-6 pt-24 text-white">
        <div className="max-w-xl text-center">
          <h1 className="text-8xl font-black text-red-500">404</h1>

          <h2 className="mt-4 text-4xl font-black">Page Not Found</h2>

          <p className="mt-4 text-white/50">
            The page you are looking for does not exist or may have been moved.
          </p>

          <Link
            to="/"
            className="mt-8 inline-block rounded-full bg-red-500 px-8 py-4 font-bold hover:bg-red-600"
          >
            Go Home
          </Link>
        </div>
      </main>
    </>
  );
}

export default NotFound;