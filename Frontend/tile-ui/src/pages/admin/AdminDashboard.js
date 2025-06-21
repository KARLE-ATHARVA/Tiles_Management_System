import React, { useState } from "react";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import { Menu, X, LogOut, LayoutGrid, PackageSearch, Layers, Clock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Logged out successfully!");
    navigate("/login");
  };

  const navLinks = [
    { name: "Products", path: "/admin/dashboard/products", icon: <PackageSearch size={18} /> },
    { name: "Category", path: "/admin/dashboard/category", icon: <LayoutGrid size={18} /> },
    { name: "Application", path: "/admin/dashboard/application", icon: <Layers size={18} /> },
    { name: "History", path: "/admin/dashboard/history", icon: <Clock size={18} /> },
  ];

  return (
    <div className="min-h-screen bg-[#f2eadd] text-[#1a1a1a] font-sans relative overflow-x-hidden">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-sm border-b border-[#dac6a0]">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          {/* Mobile Toggle + Brand */}
          <div className="flex items-center gap-4 md:hidden">
            <button onClick={() => setMenuOpen(true)}>
              <Menu size={24} className="text-[#b59d73]" />
            </button>
            <h1
              className="text-xl font-yeseva text-[#b59d73] cursor-pointer"
              onClick={() => navigate("/admin/dashboard/products")}
            >
              Stile<span className="text-black">.it</span> Admin
            </h1>
          </div>

          {/* Desktop Brand */}
          <div
            className="hidden md:block text-2xl font-yeseva text-[#b59d73] cursor-pointer tracking-wide"
            onClick={() => navigate("/admin/dashboard/products")}
          >
            Stile<span className="text-black">.it</span> Admin
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8 text-sm">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`flex items-center gap-2 transition-all duration-200 font-medium ${
                  location.pathname.includes(link.path.split("/").pop())
                    ? "text-[#b59d73] border-b-2 border-[#b59d73]"
                    : "text-gray-600 hover:text-[#b59d73]"
                }`}
              >
                {link.icon}
                {link.name}
              </Link>
            ))}
          </div>

          {/* Logout Button (Desktop) */}
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
              <div className="text-xl font-yeseva text-[#b59d73]">Stile.it Admin</div>
              <button onClick={() => setMenuOpen(false)}>
                <X size={22} className="text-gray-600 hover:text-black" />
              </button>
            </div>

            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setMenuOpen(false)}
                className={`flex items-center gap-3 text-base py-2 rounded hover:bg-[#f2eadd] px-2 transition ${
                  location.pathname.includes(link.path.split("/").pop())
                    ? "text-[#b59d73] font-semibold"
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

export default AdminDashboard;
