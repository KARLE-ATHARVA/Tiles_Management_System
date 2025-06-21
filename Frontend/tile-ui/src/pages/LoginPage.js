import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { toast } from "react-toastify";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://tile-management-backend.onrender.com/api/auth/login", {
        username,
        password,
      });

      const { token, role } = res.data;
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);

      toast.success("Login successful!");

      setTimeout(() => {
        if (role === "Admin") {
          navigate("/admin/dashboard");
        } else if (role === "Client") {
          navigate("/viewer/dashboard");
        } else {
          toast.error("Unauthorized role");
        }
      }, 1000);
    } catch (err) {
      toast.error("Login failed. Check credentials.");
    }
  };

  return (
    <div className="min-h-screen bg-[#f2eadd] flex items-center justify-center px-4">
      <div className="flex w-full max-w-5xl rounded-3xl border-4 border-[#d4b278] shadow-[0_10px_30px_rgba(181,157,115,0.25)] bg-white overflow-hidden flex-col md:flex-row">
        {/* Left Panel */}
        <div className="hidden md:flex w-1/2 bg-[#f5f0e6] p-6 flex-col justify-center">
          <div className="flex-1 flex items-center justify-center">
            <img src="/capture.avif" alt="Tile" className="rounded-2xl shadow-md object-cover h-96" />
          </div>
          <div className="mt-6 text-center">
            <h2 className="text-3xl font-serif font-semibold text-[#1a1a1a]">Style your Tiles</h2>
            <p className="mt-2 text-sm text-gray-600 px-4">Discover tiles that transform walls into art.</p>
          </div>
        </div>

        {/* Right Panel */}
        <div className="w-full md:w-1/2 bg-white p-8 sm:p-10 flex flex-col justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Welcome Back to</h1>
            <h1 className="text-4xl sm:text-5xl font-yeseva text-[#b59d73] tracking-wide">Stile<span className="text-black">.it</span></h1>
            <p className="text-sm text-gray-500 mb-6 mt-2">Enter your credentials to continue</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                placeholder="Username"
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#dac6a0]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Password"
                  className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#dac6a0] pr-10"
                />
                <div className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-500" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="form-checkbox" />
                <span className="text-sm text-gray-600">Remember me</span>
              </label>
              <a href="#" className="text-sm text-[#b59d73] hover:underline">
                Forgot Password?
              </a>
            </div>
            <button type="submit" className="w-full bg-[#b59d73] hover:bg-[#a68f61] text-white py-2 rounded-md transition duration-200">
              Sign In
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            Don’t have an account?{" "}
            <Link to="/register" className="text-[#b59d73] hover:underline">Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
