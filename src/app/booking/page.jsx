"use client";
import { useState } from "react";
import Image from "next/image";
import { db } from "../lib/firebaseConfig";
import { collection, addDoc, Timestamp } from "firebase/firestore";

export default function Booking() {
  const [form, setForm] = useState({
    nama: "",
    telepon: "",
    mobil: "",
    layanan: "",
    tanggal: "",
    waktu: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const formatTanggal = (tanggal, waktu) => {
    if (!tanggal || !waktu) return "";
    const [year, month, day] = tanggal.split("-");
    const [hour, minute] = waktu.split(":");
    const date = new Date(year, month - 1, day, hour, minute);

    return date.toLocaleString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const validate = () => {
    let newErrors = {};

    if (!form.nama.trim()) newErrors.nama = "Nama lengkap wajib diisi";

    if (!/^[0-9]+$/.test(form.telepon)) {
      newErrors.telepon = "Nomor telepon hanya boleh berisi angka";
    } else if (form.telepon.length < 10) {
      newErrors.telepon = "Nomor telepon minimal 10 digit";
    }

    if (!form.mobil.trim()) newErrors.mobil = "Jenis mobil wajib diisi";

    if (!form.layanan) newErrors.layanan = "Silakan pilih layanan";

    if (!form.tanggal) {
      newErrors.tanggal = "Tanggal wajib diisi";
    } else {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const selectedDate = new Date(form.tanggal);
      if (selectedDate < today) {
        newErrors.tanggal = "Tanggal tidak boleh sebelum hari ini";
      }
    }

    if (!form.waktu) newErrors.waktu = "Waktu wajib diisi";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setLoading(true);

      const [year, month, day] = form.tanggal.split("-");
      const [hour, minute] = form.waktu.split(":");
      const bookingDate = new Date(year, month - 1, day, hour, minute);

      await addDoc(collection(db, "bookings"), {
        ...form,
        createdAt: Timestamp.now(),
        bookingDate: Timestamp.fromDate(bookingDate),
      });

      alert("Booking berhasil dikirim ke Firebase!");
      setForm({
        nama: "",
        telepon: "",
        mobil: "",
        layanan: "",
        tanggal: "",
        waktu: "",
      });
    } catch (err) {
      console.error("Error tambah booking:", err);
      alert("Gagal menyimpan booking, coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-900 min-h-screen text-white">
      {/* Hero Section */}
      <section className="relative text-white py-20 px-6 md:px-12 text-center">
        <div className="max-w-3xl mx-auto relative z-10">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            Booking Layanan CarWash
          </h1>
          <p className="text-lg md:text-xl text-gray-200">
            Nikmati layanan cuci mobil terbaik kami. Isi formulir di bawah untuk
            memilih layanan, jadwal, dan waktu sesuai kebutuhan Anda.
          </p>
        </div>
        <div className="absolute inset-0 opacity-30">
          <Image
            src="/hero2.jpg"
            alt="Car Wash Hero"
            layout="fill"
            objectFit="cover"
            priority
          />
        </div>
      </section>

      {/* Booking Form */}
      <section className="flex justify-center px-4 pb-20 relative z-10">
        <div className="w-full max-w-2xl backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl shadow-xl p-8 text-white">
          <h2 className="text-2xl font-bold text-center mb-6">
            Form Booking CarWash
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Nama */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Nama Lengkap
              </label>
              <input
                type="text"
                name="nama"
                value={form.nama}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg bg-white/20 border border-white/30 placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                placeholder="Masukkan nama lengkap"
              />
              {errors.nama && <p className="text-red-400 text-sm">{errors.nama}</p>}
            </div>

            {/* Telepon */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Nomor Telepon
              </label>
              <input
                type="tel"
                name="telepon"
                value={form.telepon}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg bg-white/20 border border-white/30 placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                placeholder="08xxxxxxxxxx"
              />
              {errors.telepon && <p className="text-red-400 text-sm">{errors.telepon}</p>}
            </div>

            {/* Mobil */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Jenis Mobil + Plat Nomor
              </label>
              <input
                type="text"
                name="mobil"
                value={form.mobil}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg bg-white/20 border border-white/30 placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                placeholder="Contoh: Toyota Avanza"
              />
              {errors.mobil && <p className="text-red-400 text-sm">{errors.mobil}</p>}
            </div>

            {/* Layanan */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Pilih Layanan
              </label>
              <select
                name="layanan"
                value={form.layanan}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg bg-white/20 border border-white/30 text-black focus:outline-none focus:ring-2 focus:ring-yellow-400"
              >
                <option value="">-- Pilih Layanan --</option>
                <option value="cuci-express">Interior Wash</option>
                <option value="cuci-detailing">Cuci Detailing</option>
                <option value="polish">Polish & Wax</option>
                <option value="salon">Exterior Wash</option>
              </select>
              {errors.layanan && <p className="text-red-400 text-sm">{errors.layanan}</p>}
            </div>

            {/* Tanggal */}
            <div>
              <label className="block text-sm font-medium mb-1">Tanggal</label>
              <input
                type="date"
                name="tanggal"
                min={new Date().toISOString().split("T")[0]}
                value={form.tanggal}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg bg-white/20 border border-white/30 text-black focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
              {errors.tanggal && <p className="text-red-400 text-sm">{errors.tanggal}</p>}
            </div>

            {/* Waktu */}
            <div>
              <label className="block text-sm font-medium mb-1">Waktu</label>
              <input
                type="time"
                name="waktu"
                value={form.waktu}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg bg-white/20 border border-white/30 text-black focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
              {errors.waktu && <p className="text-red-400 text-sm">{errors.waktu}</p>}
            </div>

            {/* Preview Jadwal */}
            {form.tanggal && form.waktu && (
              <div className="p-4 bg-yellow-500/20 border border-yellow-500 rounded-lg text-center text-yellow-300 font-semibold">
                Jadwal Booking: {formatTanggal(form.tanggal, form.waktu)}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-purple-400 to-blue-500 text-black font-bold rounded-lg hover:scale-105 transition-transform duration-300 shadow-lg disabled:opacity-50"
            >
              {loading ? "Menyimpan..." : "Konfirmasi Booking"}
            </button>
          </form>

          {/* Ketentuan */}
          <div className="mt-6 text-sm text-gray-200 text-center">
            ⚠️ Ketentuan: Jika keterlambatan melebihi{" "}
            <span className="font-bold">1 jam</span>, maka booking akan{" "}
            <span className="text-red-400 font-bold">dibatalkan otomatis</span>.
          </div>
        </div>
      </section>
    </div>
  );
}
