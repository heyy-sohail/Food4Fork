import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";
import { FiShoppingCart, FiUser, FiLogOut, FiMenu, FiX, FiHome, FiList, FiTarget } from "react-icons/fi";
import "./Navbar.css";

const Navbar = () => {
  const { user, logout } = useAuth();
  const { cartCount, setCartOpen } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [location]);

  const handleLogout = () => {
    logout();
    setDropdownOpen(false);
    navigate("/");
  };

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="nav-inner container">
        <Link to="/" className="nav-logo">
          <span className="logo-icon">🍴</span>
          <span className="logo-text">Food<span className="logo-accent">4</span>Fork</span>
        </Link>

        <div className={`nav-links ${menuOpen ? "open" : ""}`}>
          <Link to="/" className={location.pathname === "/" ? "active" : ""}>
            <FiHome size={16} /> Home
          </Link>
          <Link to="/menu" className={location.pathname === "/menu" ? "active" : ""}>
            <FiList size={16} /> Menu
          </Link>
          <Link to="/budget" className={location.pathname === "/budget" ? "active" : ""}>
            <FiTarget size={16} /> Budget Meals
          </Link>
        </div>

        <div className="nav-actions">
          <button className="cart-btn" onClick={() => setCartOpen(true)}>
            <FiShoppingCart size={20} />
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </button>

          {user ? (
            <div className="user-menu">
              <button className="user-btn" onClick={() => setDropdownOpen(!dropdownOpen)}>
                <div className="user-avatar">{user.name[0].toUpperCase()}</div>
                <span className="user-name">{user.name.split(" ")[0]}</span>
              </button>
              {dropdownOpen && (
                <div className="dropdown">
                  <Link to="/profile" onClick={() => setDropdownOpen(false)}>
                    <FiUser size={15} /> Profile
                  </Link>
                  <Link to="/orders" onClick={() => setDropdownOpen(false)}>
                    <FiList size={15} /> My Orders
                  </Link>
                  <button onClick={handleLogout} className="logout-btn">
                    <FiLogOut size={15} /> Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="auth-btns">
              <Link to="/login" className="btn-outline">Login</Link>
              <Link to="/register" className="btn-primary">Sign Up</Link>
            </div>
          )}

          <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
