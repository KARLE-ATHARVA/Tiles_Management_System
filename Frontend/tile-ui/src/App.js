// src/App.js
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProductsPage from "./pages/admin/ProductsPage";
import CategoryPage from "./pages/admin/CategoriesPage";
import ApplicationPage from "./pages/admin/ApplicationsPage";
import AdminDashboard from "./pages/admin/AdminDashboard";
import HistoryPage from "./pages/admin/HistoryPage";
import ViewerDashboard from "./pages/viewer/ViewerDashboard";
import ViewerProductsPage from "./pages/viewer/ViewerProductsPage";
import ViewerCategoryPage from "./pages/viewer/ViewerCategoryPage";
import ViewerApplicationPage from "./pages/viewer/ViewerApplicationPage";
import LandingPage from "./pages/viewer/LandingPage";
import ProtectedRoute from "./components/ProtectedRoute";

// ✅ Toastify for global alerts
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <Router>
      <>
        <ToastContainer position="top-right" autoClose={3000} pauseOnHover={true} />

        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LoginPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Admin Dashboard */}
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          >
            <Route index element={<ProductsPage />} />
            <Route path="products" element={<ProductsPage />} />
            <Route path="category" element={<CategoryPage />} />
            <Route path="application" element={<ApplicationPage />} />
            <Route path="history" element={<HistoryPage />} />
          </Route>

          {/* Viewer Dashboard */}
          <Route
            path="/viewer/dashboard"
            element={
              <ProtectedRoute>
                <ViewerDashboard />
              </ProtectedRoute>
            }
          >
            <Route index element={<LandingPage />} />
            <Route path="products" element={<ViewerProductsPage />} />
            <Route path="category" element={<ViewerCategoryPage />} />
            <Route path="application" element={<ViewerApplicationPage />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<LoginPage />} />
        </Routes>
      </>
    </Router>
  );
}

export default App;
