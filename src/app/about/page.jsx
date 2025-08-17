"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function About() {
  const services = [
    {
      id: 1,
      title: "Exterior Wash",
      desc: "Pencucian bagian luar mobil secara cepat dan menyeluruh menggunakan peralatan modern untuk hasil maksimal.",
      img: "/exterior.jpg",
    },
    {
      id: 2,
      title: "Full Detailing",
      desc: "Perawatan menyeluruh dari eksterior hingga interior, memastikan mobil Anda kembali bersih dan mengkilap seperti baru.",
      img: "/detailing.jpg",
    },
    {
      id: 3,
      title: "Waxing Car",
      desc: "Layanan waxing untuk melindungi cat mobil Anda, memberikan lapisan pelindung serta kilau tahan lama.",
      img: "/waxing.jpg",
    },
    {
      id: 4,
      title: "Interior Cleaning",
      desc: "Pembersihan mendalam untuk seluruh bagian interior mobil: jok, dashboard, karpet, hingga ventilasi udara.",
      img: "/interior.png",
    },
  ];

  return (
    <div className="bg-gray-900 min-h-screen text-white">
      {/* Hero */}
      <section className="relative h-[40vh] flex items-center justify-center">
        <Image
          src="/hero2.jpg"
          alt="About CarWash"
          fill
          className="object-cover opacity-40"
        />
        <div className="relative z-10 text-center px-6">
          <motion.h2
            className="text-3xl md:text-5xl font-extrabold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Tentang Kami
          </motion.h2>
          <motion.p
            className="text-gray-200 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            CarWash berdiri dengan komitmen memberikan pelayanan
            terbaik, mengutamakan kepuasan pelanggan, dan menjaga kualitas
            kebersihan kendaraan Anda.
          </motion.p>
        </div>
      </section>

      {/* Services Detail */}
      <section className="px-6 py-12 max-w-6xl mx-auto">
        <h3 className="text-2xl font-bold mb-8 text-center">
          Layanan Kami
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service) => (
            <motion.div
              key={service.id}
              className="bg-gray-800 rounded-xl shadow-lg overflow-hidden flex flex-col md:flex-row"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Image
                src={service.img}
                alt={service.title}
                width={400}
                height={250}
                className="object-cover w-full md:w-1/3 h-48"
              />
              <div className="p-4 flex flex-col justify-center">
                <h4 className="font-semibold text-lg mb-2">
                  {service.title}
                </h4>
                <p className="text-gray-400 text-sm">{service.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Commitment Section */}
      <section className="bg-gray-800 px-6 py-12 text-center">
        <h3 className="text-2xl font-bold mb-4">Komitmen Kami</h3>
        <p className="text-gray-300 max-w-3xl mx-auto">
          Kami percaya bahwa mobil bukan hanya sekedar alat transportasi,
          tetapi juga bagian penting dari kehidupan Anda. Oleh karena itu,
          kami selalu menggunakan bahan pembersih ramah lingkungan, alat
          modern, dan tenaga kerja profesional untuk memberikan hasil terbaik.
        </p>
      </section>
    </div>
  );
}
