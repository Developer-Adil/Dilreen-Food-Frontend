import { Link } from "react-router-dom";
import { FiClock, FiShield, FiStar, FiTruck } from "react-icons/fi";
import { motion } from "framer-motion";

function HomeSections() {
  const features = [
    {
      icon: <FiTruck />,
      title: "Fast Delivery",
      text: "Quick food delivery experience with real-time order flow.",
    },
    {
      icon: <FiStar />,
      title: "Top Rated Food",
      text: "Explore best restaurants and high-rated dishes.",
    },
    {
      icon: <FiShield />,
      title: "Secure Login",
      text: "JWT authentication with protected routes.",
    },
    {
      icon: <FiClock />,
      title: "Order Tracking",
      text: "Track order status from placed to delivered.",
    },
  ];

  return (
    <section className="bg-[#080808] px-6 py-20 text-white">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <p className="mb-3 inline-block rounded-full border border-red-500/30 bg-red-500/10 px-4 py-2 text-sm text-red-300">
            Why FoodRush?
          </p>

          <h2 className="text-4xl font-black md:text-6xl">
            Built Like a <span className="text-red-500">Real Product</span>
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-white/50">
            This project is designed to show real MERN full-stack skills,
            including frontend, backend, database, authentication and admin
            features.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.08 }}
              viewport={{ once: true }}
              className="rounded-[2rem] border border-white/10 bg-white/5 p-6"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-500 text-2xl">
                {feature.icon}
              </div>

              <h3 className="mt-6 text-xl font-black">{feature.title}</h3>

              <p className="mt-3 text-sm leading-6 text-white/50">
                {feature.text}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 overflow-hidden rounded-[3rem] border border-white/10 bg-white/5 p-8 md:p-12">
          <div className="grid items-center gap-8 md:grid-cols-2">
            <div>
              <h2 className="text-4xl font-black md:text-5xl">
                Hungry? Start ordering your favorite food.
              </h2>

              <p className="mt-4 text-white/50">
                Browse restaurants, add food to cart and place orders with a
                smooth checkout experience.
              </p>

              <Link
                to="/foods"
                className="mt-8 inline-block rounded-full bg-red-500 px-8 py-4 font-bold hover:bg-red-600"
              >
                Explore Foods
              </Link>
            </div>

            <img
              src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1200&auto=format&fit=crop"
              alt="Food"
              className="h-80 w-full rounded-[2rem] object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default HomeSections;