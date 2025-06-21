import React, { useState } from "react";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import { LayoutGrid, Layers, PackageSearch, LogOut, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
const ViewerDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    toast.success("Logged out successfully!");
    navigate("/login");
  };

  const navLinks = [
    { name: "Products", path: "/viewer/dashboard/products", icon: <PackageSearch size={18} /> },
    { name: "Category", path: "/viewer/dashboard/category", icon: <LayoutGrid size={18} /> },
    { name: "Application", path: "/viewer/dashboard/application", icon: <Layers size={18} /> },
  ];

  return (
    <div className="bg-cream min-h-screen font-sans text-[#1a1a1a] overflow-x-hidden relative">
      {/* Responsive background */}
      <div className="fixed inset-0 -z-10">
        <img
          src="/main_main.jpg"
          alt="desktop"
          className="hidden md:block w-full h-full object-cover"
        />
        <img
          src="/mobile_main.jpg"
          alt="mobile"
          className="block md:hidden w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black opacity-20" />
      </div>

      {/* Top Navbar */}
      <nav className="sticky top-0 z-50 backdrop-blur-lg bg-white/80 shadow-sm border-b border-[#dac6a0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          {/* Mobile menu icon + brand */}
          <div className="flex items-center gap-4 md:hidden">
            <button onClick={() => setMenuOpen(true)}>
              <Menu size={24} className="text-brand" />
            </button>
            <div
              onClick={() => navigate("/viewer/dashboard")}
              className="text-xl font-yeseva text-brand cursor-pointer"
            >
              <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-xl sm:text-2xl md:text-3xl font-yeseva tracking-wide text-center text-brand"
          >
            Stile<span className="text-black">.it</span>– Style <span className="text-black">your Tiles</span>
          </motion.h1>
            </div>
          </div>

          {/* Desktop Brand */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            onClick={() => navigate("/viewer/dashboard")}
            className="hidden md:block text-2xl font-yeseva text-brand cursor-pointer tracking-wider"
          >
            Stile<span className="text-black">.it</span>
          </motion.div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`flex items-center gap-2 text-base font-medium transition duration-200 ${
                  location.pathname.includes(link.path.split("/").pop())
                    ? "text-brand border-b-2 border-brand"
                    : "text-gray-600 hover:text-brand"
                }`}
              >
                {link.icon}
                {link.name}
              </Link>
            ))}
          </div>

          {/* Logout button (desktop) */}
          <div className="hidden md:block">
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white text-sm px-4 py-2 rounded-md transition"
            >
              <LogOut size={16} /> Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-0 left-0 w-64 h-full bg-white shadow-xl z-50 px-6 py-8 flex flex-col space-y-6"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="text-xl font-yeseva text-brand cursor-pointer">
                Stile<span className="text-black">.it</span>
              </div>
              <button onClick={() => setMenuOpen(false)}>
                <X size={22} className="text-gray-600 hover:text-black" />
              </button>
            </div>

            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setMenuOpen(false)}
                className={`flex items-center gap-3 text-base py-2 rounded hover:bg-cream px-2 transition ${
                  location.pathname.includes(link.path.split("/").pop())
                    ? "text-brand font-semibold"
                    : "text-gray-700"
                }`}
              >
                {link.icon}
                {link.name}
              </Link>
            ))}

            <button
              onClick={() => {
                setMenuOpen(false);
                handleLogout();
              }}
              className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition mt-6"
            >
              <LogOut size={16} /> Logout
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Page Content */}
      <main className="relative z-10 px-4 sm:px-6 py-6">
        <Outlet />
      </main>
    </div>
  );
};

export default ViewerDashboard;
