import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import Navbar from "./components/common/Navbar";
import CartDrawer from "./components/cart/CartDrawer";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import BudgetMeal from "./pages/BudgetMeal";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Checkout from "./pages/Checkout";
import Orders from "./pages/Orders";
import Profile from "./pages/Profile";
import ProtectedRoute from "./components/common/ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Navbar />
          <CartDrawer />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/budget" element={<BudgetMeal />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
            <Route path="/orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          </Routes>
          <Toaster
            position="bottom-right"
            toastOptions={{
              style: {
                background: "#1a1a1a",
                color: "#f5f5f5",
                border: "1px solid #2e2e2e",
                borderRadius: "12px",
                fontFamily: "Poppins, sans-serif",
                fontSize: "0.875rem",
              },
              success: { iconTheme: { primary: "#06d6a0", secondary: "#1a1a1a" } },
              error: { iconTheme: { primary: "#ef476f", secondary: "#1a1a1a" } },
            }}
          />
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
