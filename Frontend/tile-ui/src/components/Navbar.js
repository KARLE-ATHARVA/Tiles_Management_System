// src/components/Navbar.js
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FiClock } from 'react-icons/fi';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate('/login');
  };

  const isActive = (path) => location.pathname.includes(path);

  return (
    <nav className="w-full flex items-center justify-between px-8 py-4 bg-gray-900 text-white shadow">
      {/* Brand Name */}
      <div className="text-2xl font-bold">TileManager</div>

      {/* Navigation Links */}
      <div className="flex gap-8">
        <Link
          to="/admin/dashboard/products"
          className={`hover:underline ${isActive('/products') ? 'text-blue-400' : ''}`}
        >
          Products
        </Link>
        <Link
          to="/admin/dashboard/category"
          className={`hover:underline ${isActive('/category') ? 'text-blue-400' : ''}`}
        >
          Category
        </Link>
        
         <Link
          to="/admin/dashboard/history"
          className={`hover:underline ${isActive('/history') ? 'text-blue-400' : ''}`}
        >
          History
        </Link>
      </div>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="bg-red-500 px-4 py-2 rounded hover:bg-red-600"
      >
        Logout
      </button>
    </nav>
  );
};

export default Navbar;
