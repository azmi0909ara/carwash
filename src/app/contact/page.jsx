"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { db } from "../lib/firebaseConfig";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addDoc(collection(db, "messages"), {
        ...form,
        createdAt: serverTimestamp(),
      });
      setSuccess(true);
      setForm({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Error saving message:", error);
    }
    setLoading(false);
  };

  return (
    <div className="bg-gray-900 min-h-screen text-white">
      {/* Hero */}
      <section className="relative h-[40vh] flex items-center justify-center">
        <img
          src="/hero2.jpg"
          alt="Contact Hero"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 text-center px-6">
          <motion.h2
            className="text-3xl md:text-5xl font-extrabold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Hubungi Kami
          </motion.h2>
          <motion.p
            className="text-gray-300 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Kami siap membantu Anda untuk layanan cuci mobil terbaik. 
            Hubungi kami melalui form atau informasi kontak di bawah ini.
          </motion.p>
        </div>
      </section>

      {/* Info + Form */}
      <section className="px-6 py-12 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Info */}
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h3 className="text-2xl font-bold mb-6">Informasi Kontak</h3>
          <div className="flex items-center gap-4">
            <MapPin className="text-blue-400" />
            <p>Jl. Merdeka No. 123, Jakarta</p>
          </div>
          <div className="flex items-center gap-4">
            <Phone className="text-blue-400" />
            <p>+62 812 3456 7890</p>
          </div>
          <div className="flex items-center gap-4">
            <Mail className="text-blue-400" />
            <p>support@carwash.com</p>
          </div>
          <div className="flex items-center gap-4">
            <Clock className="text-blue-400" />
            <p>Senin - Minggu: 08.00 - 20.00</p>
          </div>
        </motion.div>

        {/* Form */}
        <motion.div
          className="bg-gray-800 p-6 rounded-xl shadow-lg"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h3 className="text-xl font-semibold mb-4">Kirim Pesan</h3>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Nama Anda"
              className="w-full p-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email Anda"
              className="w-full p-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Pesan Anda"
              className="w-full p-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="5"
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-semibold"
            >
              {loading ? "Mengirim..." : "Kirim"}
            </button>
          </form>
          {success && (
            <p className="mt-4 text-green-400 font-medium">
              ✅ Pesan berhasil dikirim!
            </p>
          )}
        </motion.div>
      </section>

      {/* Maps */}
      <section className="px-6 pb-12 max-w-5xl mx-auto">
        <h3 className="text-2xl font-bold mb-4 text-center">Lokasi Kami</h3>
        <div className="rounded-xl overflow-hidden shadow-lg h-[300px]">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.889034982967!2d106.82715361529676!3d-6.175392995525154!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f5c5e8a9bb6f%3A0x4030bfbcaf6fb80!2sMonas!5e0!3m2!1sid!2sid!4v1676543212345"
            width="100%"
            height="100%"
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </section>
    </div>
  );
}
