import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="w-64 bg-slate-900 text-white flex flex-col py-8 px-4">
      <h2 className="text-2xl font-semibold mb-6">Admin Panel</h2>
      <nav className="flex flex-col gap-4">
        <Link to="/admin/floor-tiles" className="hover:text-cyan-400">Floor Tiles</Link>
        <Link to="/admin/wall-tiles" className="hover:text-cyan-400">Wall Tiles</Link>
        <Link to="/admin/categories" className="hover:text-cyan-400">Categories</Link>
      </nav>
    </div>
  );
};

export default Sidebar;
