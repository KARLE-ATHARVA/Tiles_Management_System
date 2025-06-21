import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { LayoutGrid } from "lucide-react";

const LandingPage = () => {
  return (
    <div className="bg-cream text-dark font-sans overflow-x-hidden">
      {/* Hero Section */}
      <section
        className="w-full h-screen flex items-center justify-center text-center relative overflow-hidden"
        style={{
          backgroundImage: "url('/main_main.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute inset-0 bg-black opacity-30 z-0" />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 bg-white/80 backdrop-blur-sm px-6 py-10 sm:px-10 rounded-3xl shadow-gold max-w-2xl mx-4 sm:mx-auto"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-yeseva text-brand mb-4">
            From Classic to Contemporary
          </h1>
          <p className="text-base sm:text-lg text-gray-700 mb-6">
            Discover Your Perfect Tile Collection with{" "}
            <span className="font-bold">Stile.it</span>
          </p>
          <Link
            to="/viewer/dashboard/products"
            className="inline-flex items-center bg-brand text-white px-5 py-3 rounded-md text-base sm:text-lg hover:bg-[#a68f61] transition gap-2"
          >
            Explore Products <LayoutGrid size={20} />
          </Link>
        </motion.div>
      </section>

      {/* Collections */}
      <section className="py-16 px-4 sm:px-8 max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-2xl sm:text-3xl font-yeseva text-center text-brand mb-12"
        >
          Explore Our Collections
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">
          {[
            { title: "Best Sellers", img: "/best_seller.jpg" },
            { title: "Patterned Art", img: "/patterned_art.jpg" },
            { title: "Modern Textures", img: "/modern_texture.jpg" },
            { title: "All Collections", img: "/all_collection.jpg" },
          ].map((col, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.03 }}
              className="bg-white rounded-xl overflow-hidden shadow-md cursor-pointer transition-all"
            >
              <img
                src={col.img}
                alt={col.title}
                className="w-full h-48 sm:h-56 object-cover"
              />
              <div className="p-4 text-center">
                <h3 className="text-base sm:text-lg font-semibold text-gray-800">
                  {col.title}
                </h3>
                <Link
                  to="/viewer/dashboard/products"
                  className="text-brand text-sm hover:underline"
                >
                  View Now
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Color Palette */}
      <section className="bg-gradient-to-b from-white to-[#f5f0e6] py-16 px-4 sm:px-6">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-2xl sm:text-3xl font-yeseva text-center text-brand mb-4"
        >
          Find Your Favorite Color
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-center text-gray-500 max-w-xl mx-auto mb-10 text-sm sm:text-base"
        >
          Choose from a variety of shades and hues to perfectly match your
          interior aesthetic.
        </motion.p>

        <div className="flex justify-center flex-wrap gap-4 sm:gap-6 px-2">
          {[
            "#1a1a1a",
            "#e63946",
            "#b59d73",
            "#f4a261",
            "#ff6b6b",
            "#457b9d",
          ].map((color, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
              viewport={{ once: true }}
              className="w-16 sm:w-20 h-16 sm:h-20 rounded-lg shadow-md border transition-transform"
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
      </section>

      {/* Marketplaces */}
      <section className="py-16 px-4 sm:px-6 bg-[#f5f0e6] border-t border-[#ddd]">
        <motion.h2
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-xl sm:text-2xl font-yeseva text-center text-brand mb-10"
        >
          Available On Marketplaces
        </motion.h2>

        <div className="flex justify-center gap-8 sm:gap-10 flex-wrap">
          {["amazon", "wayfair", "houzz", "homedepot"].map((brand, idx) => (
            <motion.img
              key={idx}
              src={`https://logo.clearbit.com/${brand}.com`}
              alt={brand}
              className="h-10 sm:h-12 grayscale opacity-70 hover:opacity-100 transition duration-300"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              viewport={{ once: true }}
            />
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark text-light py-10 px-4 sm:px-6 mt-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-center md:text-left">
          <p>
            &copy; {new Date().getFullYear()}{" "}
            <span className="font-semibold text-brand">Stile.it</span>. All
            rights reserved.
          </p>
          <div className="flex flex-wrap gap-4 justify-center md:justify-end">
            <Link to="/viewer/dashboard/products" className="hover:underline">
              Products
            </Link>
            <Link to="/viewer/dashboard/category" className="hover:underline">
              Categories
            </Link>
            <Link
              to="/viewer/dashboard/application"
              className="hover:underline"
            >
              Applications
            </Link>
            <a href="mailto:support@stile.it" className="hover:underline">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
