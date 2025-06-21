import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { toast } from "react-toastify";

const RegisterPage = () => {
  const [form, setForm] = useState({ username: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5058/api/auth/signup", {
        ...form,
        role: "Client",
      });

      const loginRes = await axios.post("http://localhost:5058/api/auth/login", {
        username: form.username,
        password: form.password,
      });

      const { token, role } = loginRes.data;
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);

      toast.success("Registration successful!");
      setTimeout(() => navigate("/viewer/dashboard"), 1000);
    } catch (err) {
      toast.error("Registration failed: " + (err.response?.data || err.message));
    }
  };

  return (
    <div className="min-h-screen bg-[#f2eadd] flex items-center justify-center px-4">
      <div className="flex w-full max-w-5xl rounded-3xl border-4 border-[#d4b278] shadow-[0_4px_30px_rgba(181,157,115,0.3)] bg-white overflow-hidden flex-col md:flex-row">
        {/* Left Panel */}
        <div className="hidden md:flex w-1/2 bg-[#f5f0e6] p-6 flex-col justify-center">
          <div className="flex-1 flex items-center justify-center">
            <img src="/capture.avif" alt="Tile Design" className="rounded-xl shadow-md object-cover h-96" />
          </div>
          <div className="mt-6 text-center">
            <h2 className="text-2xl font-serif font-semibold text-[#1a1a1a]">
              Style begins where the tiles lay.
            </h2>
            <p className="mt-2 text-sm text-gray-600 px-4">Let’s build beautiful.</p>
          </div>
        </div>

        {/* Right Panel */}
        <div className="w-full md:w-1/2 bg-white p-8 sm:p-10 flex flex-col justify-center">
          <div className="text-center mb-6">
            <p className="text-2xl font-bold text-gray-800">Join</p>
            <h1 className="text-4xl sm:text-5xl font-yeseva text-[#b59d73] tracking-wide">
              Stile<span className="text-black">.it</span>
            </h1>
            <p className="text-sm text-gray-500 mt-2">Let your walls and floors speak of style.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700">Username</label>
              <input
                name="username"
                onChange={handleChange}
                value={form.username}
                required
                placeholder="Username"
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#dac6a0]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <div className="relative">
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  onChange={handleChange}
                  value={form.password}
                  required
                  placeholder="Password"
                  className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md pr-10 focus:outline-none focus:ring-2 focus:ring-[#dac6a0]"
                />
                <div
                  className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-500"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeSlashIcon className="h-5 w-5" />
                  ) : (
                    <EyeIcon className="h-5 w-5" />
                  )}
                </div>
              </div>
            </div>
            <button type="submit" className="w-full bg-[#b59d73] hover:bg-[#a68f61] text-white py-2 rounded-md transition duration-200">
              Register
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            Already have an account?{" "}
            <Link to="/login" className="text-[#b59d73] hover:underline">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
