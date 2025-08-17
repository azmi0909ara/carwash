"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../lib/firebaseConfig";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/adminWash/dashboard"); // redirect ke dashboard
    } catch (err) {
      setError("Login gagal: " + err.message);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover"
      >
        <source src="/hero2.mp4" type="video/mp4" />
      </video>

      {/* Overlay gelap */}
      <div className="absolute inset-0 bg-gray bg-opacity-60"></div>

      {/* Card Login */}
      <div className="relative z-10 bg-gray-900/70 backdrop-blur-lg p-8 rounded-2xl shadow-2xl w-full max-w-md">
        <h1 className="text-3xl font-extrabold mb-6 text-center text-white">
          🔑 Admin Login
        </h1>
        {error && (
          <p className="text-red-400 text-sm mb-4 text-center">{error}</p>
        )}
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <input
              type="email"
              placeholder="Email Admin"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-gray-800/80 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              required
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-gray-800/80 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 py-3 rounded-lg font-semibold transition transform hover:scale-[1.02]"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
