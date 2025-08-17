"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Home() {
  const services = [
    {
      id: 1,
      title: "Exterior Wash",
      desc: "Quick and efficient exterior cleaning",
      img: "/exterior.jpg",
    },
    {
      id: 2,
      title: "Full Detailing",
      desc: "Comprehensive cleaning inside and out",
      img: "/detailing.jpg",
    },
    {
      id: 3,
      title: "Waxing Car",
      desc: "Protective waxing for shiny finish",
      img: "/waxing.jpg",
    },
    {
      id: 4,
      title: "Interior Cleaning",
      desc: "Deep cleaning of interior surfaces",
      img: "/interior.png",
    },
  ];

  return (
    <div className="bg-gray-900 min-h-screen text-white">
      {/* Hero Section */}
<section className="relative h-[70vh] w-full overflow-hidden">
  {/* Video Background */}
  <video
    autoPlay
    loop
    muted
    playsInline
    className="absolute inset-0 w-full h-full object-cover"
  >
    <source src="/hero.mp4" type="video/mp4" />
    Your browser does not support the video tag.
  </video>

  {/* Overlay */}
  <div className="absolute inset-0 bg-black/60" />

  {/* Content */}
  <div className="relative z-10 flex flex-col justify-center items-center h-full text-center px-6">
    <motion.h1
      className="text-4xl md:text-6xl font-extrabold mb-4"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      Premium Car Wash Services
    </motion.h1>
    <motion.p
      className="text-gray-300 text-lg md:text-xl max-w-2xl mb-6"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.8 }}
    >
      Clean, shine, and protect your car with our professional services.
    </motion.p>
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.8 }}
    >
      <Link
        href="/booking"
        className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-6 py-3 rounded-lg text-lg"
      >
        Book Now
      </Link>
    </motion.div>
  </div>
</section>


      <div className="px-6 py-10">
        {/* Featured Services */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl font-bold mb-6">Featured Services</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                className="bg-gray-800 rounded-xl overflow-hidden shadow-lg group"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                whileHover={{ scale: 1.03 }}
              >
                <img
                  src={service.img}
                  alt={service.title}
                  className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="p-4">
                  <h3 className="font-semibold text-lg">{service.title}</h3>
                  <p className="text-sm text-gray-400">{service.desc}</p>
                  <Link
                    href="/about"
                    className="inline-block mt-3 text-sm text-blue-400 hover:text-blue-300 font-medium"
                  >
                    More →
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Promotions */}
        <motion.section
          className="mt-12"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <h2 className="text-2xl font-bold mb-6">Promotions</h2>
          <motion.div
            className="bg-gray-800 rounded-xl overflow-hidden shadow-lg flex flex-col sm:flex-row"
            whileHover={{ scale: 1.02 }}
          >
            <img
              src="/detailing.jpg"
              alt="Promo"
              className="w-full sm:w-40 h-40 object-cover"
            />
            <div className="p-4 flex flex-col justify-between">
              <div>
                <h3 className="font-semibold text-lg">Summer Special</h3>
                <p className="text-sm text-gray-400">
                  Get 20% off on all detailing services this month.
                </p>
              </div>
              <button className="mt-4 bg-blue-500 hover:bg-blue-600 text-white text-sm px-4 py-2 rounded-lg w-fit">
                Book Now
              </button>
            </div>
          </motion.div>
        </motion.section>
      </div>
    </div>
  );
}
