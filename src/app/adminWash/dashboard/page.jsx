"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  addDoc,
} from "firebase/firestore";
import { db, auth } from "../../lib/firebaseConfig";
import { onAuthStateChanged, signOut } from "firebase/auth";

export default function AdminDashboard() {
  const [bookings, setBookings] = useState([]);
  const [messages, setMessages] = useState([]);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("bookings"); // filter tab
  const [searchTerm, setSearchTerm] = useState(""); // 🔍 state pencarian
  const router = useRouter();

  // cek login admin
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push("/admin"); // jika belum login
      }
    });
    return () => unsubscribe();
  }, [router]);

  // ambil data booking
  const fetchBookings = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "bookings"));
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setBookings(data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };

  // ambil data messages
  const fetchMessages = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "messages"));
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMessages(data);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  // ambil data history
  const fetchHistory = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "history"));
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setHistory(data);
    } catch (error) {
      console.error("Error fetching history:", error);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await fetchBookings();
      await fetchMessages();
      await fetchHistory();
      setLoading(false);
    };
    loadData();
  }, []);

  const handleDeleteBooking = async (id) => {
    if (confirm("Apakah Anda yakin ingin menghapus booking ini?")) {
      await deleteDoc(doc(db, "bookings", id));
      fetchBookings();
    }
  };

  const handleDeleteMessage = async (id) => {
    if (confirm("Apakah Anda yakin ingin menghapus pesan ini?")) {
      await deleteDoc(doc(db, "messages", id));
      fetchMessages();
    }
  };

  const handleDeleteHistory = async (id) => {
    if (confirm("Apakah Anda yakin ingin menghapus data history ini?")) {
      await deleteDoc(doc(db, "history", id));
      fetchHistory();
    }
  };

  // tombol selesai → pindah ke history
  const handleFinishBooking = async (booking) => {
    if (confirm("Tandai booking ini selesai?")) {
      try {
        // pindahkan data ke history
        await addDoc(collection(db, "history"), {
          ...booking,
          status: "selesai",
          finishedAt: new Date().toISOString(),
        });

        // hapus dari bookings
        await deleteDoc(doc(db, "bookings", booking.id));

        fetchBookings();
        fetchHistory();
      } catch (error) {
        console.error("Error finishing booking:", error);
      }
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/admin");
  };

  // 🔎 filter data booking
  const filteredBookings = bookings.filter(
    (b) =>
      b.nama?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.telepon?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.mobil?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.layanan?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 🔎 filter data pesan
  const filteredMessages = messages.filter(
    (m) =>
      m.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.message?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 🔎 filter data history
  const filteredHistory = history.filter(
    (h) =>
      h.nama?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      h.telepon?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      h.mobil?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      h.layanan?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-gray-900 min-h-screen text-white p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">📊 Admin Dashboard</h1>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-500 hover:bg-red-600 rounded"
        >
          Logout
        </button>
      </div>

      {/* Statistik */}
      {loading ? (
        <p className="text-center">Memuat data...</p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-blue-600 rounded-lg p-6 shadow-md">
              <h2 className="text-lg font-semibold">Total Booking</h2>
              <p className="text-4xl font-bold mt-2">{bookings.length}</p>
            </div>
            <div className="bg-green-600 rounded-lg p-6 shadow-md">
              <h2 className="text-lg font-semibold">Total Pesan</h2>
              <p className="text-4xl font-bold mt-2">{messages.length}</p>
            </div>
            <div className="bg-purple-600 rounded-lg p-6 shadow-md">
              <h2 className="text-lg font-semibold">Total History</h2>
              <p className="text-4xl font-bold mt-2">{history.length}</p>
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="flex justify-center mb-6 space-x-4">
            <button
              onClick={() => setActiveTab("bookings")}
              className={`px-4 py-2 rounded font-semibold transition ${
                activeTab === "bookings"
                  ? "bg-blue-600"
                  : "bg-gray-700 hover:bg-gray-600"
              }`}
            >
              📅 Booking
            </button>
            <button
              onClick={() => setActiveTab("messages")}
              className={`px-4 py-2 rounded font-semibold transition ${
                activeTab === "messages"
                  ? "bg-green-600"
                  : "bg-gray-700 hover:bg-gray-600"
              }`}
            >
              💬 Pesan
            </button>
            <button
              onClick={() => setActiveTab("history")}
              className={`px-4 py-2 rounded font-semibold transition ${
                activeTab === "history"
                  ? "bg-purple-600"
                  : "bg-gray-700 hover:bg-gray-600"
              }`}
            >
              📜 History
            </button>
          </div>

          {/* 🔍 Search Input */}
          <div className="flex justify-center mb-6">
            <input
              type="text"
              placeholder={`Cari ${
                activeTab === "bookings"
                  ? "Booking"
                  : activeTab === "messages"
                  ? "Pesan"
                  : "History"
              }...`}
              className="w-full max-w-md border border-white px-4 py-2 rounded-lg text-white placeholder-gray-400 bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Konten Berdasarkan Filter */}
          {activeTab === "bookings" ? (
            <>
              <h2 className="text-2xl font-semibold mb-4">Daftar Booking</h2>
              {filteredBookings.length === 0 ? (
                <p className="text-center text-gray-400">
                  Tidak ada data cocok
                </p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border border-gray-700 rounded-lg overflow-hidden">
                    <thead className="bg-gray-800 text-gray-200">
                      <tr>
                        <th className="px-4 py-2">Nama</th>
                        <th className="px-4 py-2">Telepon</th>
                        <th className="px-4 py-2">Mobil</th>
                        <th className="px-4 py-2">Layanan</th>
                        <th className="px-4 py-2">Tanggal</th>
                        <th className="px-4 py-2">Waktu</th>
                        <th className="px-4 py-2 text-center">Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredBookings.map((b) => (
                        <tr key={b.id} className="border-t border-gray-700">
                          <td className="px-4 py-2">{b.nama}</td>
                          <td className="px-4 py-2">{b.telepon}</td>
                          <td className="px-4 py-2">{b.mobil}</td>
                          <td className="px-4 py-2">{b.layanan}</td>
                          <td className="px-4 py-2">{b.tanggal}</td>
                          <td className="px-4 py-2">{b.waktu}</td>
                          <td className="px-4 py-2 text-center space-x-2">
                            <button
                              onClick={() => handleFinishBooking(b)}
                              className="px-3 py-1 bg-green-500 hover:bg-green-600 rounded text-white text-sm"
                            >
                              Selesai
                            </button>
                            <button
                              onClick={() => handleDeleteBooking(b.id)}
                              className="px-3 py-1 bg-red-500 hover:bg-red-600 rounded text-white text-sm"
                            >
                              Hapus
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </>
          ) : activeTab === "messages" ? (
            <>
              <h2 className="text-2xl font-semibold mb-4">Daftar Pesan</h2>
              {filteredMessages.length === 0 ? (
                <p className="text-center text-gray-400">
                  Tidak ada data cocok
                </p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border border-gray-700 rounded-lg overflow-hidden">
                    <thead className="bg-gray-800 text-gray-200">
                      <tr>
                        <th className="px-4 py-2">Nama</th>
                        <th className="px-4 py-2">Email</th>
                        <th className="px-4 py-2">Pesan</th>
                        <th className="px-4 py-2 text-center">Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredMessages.map((m) => (
                        <tr key={m.id} className="border-t border-gray-700">
                          <td className="px-4 py-2">{m.name}</td>
                          <td className="px-4 py-2">{m.email}</td>
                          <td className="px-4 py-2">{m.message}</td>
                          <td className="px-4 py-2 text-center">
                            <button
                              onClick={() => handleDeleteMessage(m.id)}
                              className="px-3 py-1 bg-red-500 hover:bg-red-600 rounded text-white text-sm"
                            >
                              Hapus
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </>
          ) : (
            <>
              <h2 className="text-2xl font-semibold mb-4">Daftar History</h2>
              {filteredHistory.length === 0 ? (
                <p className="text-center text-gray-400">
                  Tidak ada data history
                </p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border border-gray-700 rounded-lg overflow-hidden">
                    <thead className="bg-gray-800 text-gray-200">
                      <tr>
                        <th className="px-4 py-2">Nama</th>
                        <th className="px-4 py-2">Telepon</th>
                        <th className="px-4 py-2">Mobil</th>
                        <th className="px-4 py-2">Layanan</th>
                        <th className="px-4 py-2">Tanggal</th>
                        <th className="px-4 py-2">Waktu</th>
                        <th className="px-4 py-2">Selesai</th>
                        <th className="px-4 py-2 text-center">Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredHistory.map((h) => (
                        <tr key={h.id} className="border-t border-gray-700">
                          <td className="px-4 py-2">{h.nama}</td>
                          <td className="px-4 py-2">{h.telepon}</td>
                          <td className="px-4 py-2">{h.mobil}</td>
                          <td className="px-4 py-2">{h.layanan}</td>
                          <td className="px-4 py-2">{h.tanggal}</td>
                          <td className="px-4 py-2">{h.waktu}</td>
                          <td className="px-4 py-2">
                            {new Date(h.finishedAt).toLocaleString("id-ID")}
                          </td>
                          <td className="px-4 py-2 text-center">
                            <button
                              onClick={() => handleDeleteHistory(h.id)}
                              className="px-3 py-1 bg-red-500 hover:bg-red-600 rounded text-white text-sm"
                            >
                              Hapus
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}
