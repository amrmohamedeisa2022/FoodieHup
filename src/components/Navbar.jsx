import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  FiShoppingCart,
  FiMenu,
  FiX,
  FiHeart,
  FiUser,
  FiSearch,
  FiChevronDown,
} from "react-icons/fi";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [openMobile, setOpenMobile] = useState(false);
  const [activeLink, setActiveLink] = useState("/");
  const [showUserMenu, setShowUserMenu] = useState(false);

  
  const auth = useAuth();
  const { user, isAuthenticated, logout } = auth || {};
  
  const { items } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function handleLogout() {
    if (logout) logout();
    localStorage.removeItem("quickeats_user");
    alert("تم تسجيل الخروج بنجاح");
    navigate("/");
    setShowUserMenu(false);
  }

  
  const totalItems = items?.reduce((total, item) => total + (item.qty || 1), 0) || 0;

  
  if (!auth) {
    return (
      <header className="bg-dark-primary w-full h-16 flex items-center justify-center">
        <div className="text-gold font-bold">QuickEats</div>
      </header>
    );
  }

  return (
    <>
     
      <header
        className={`fixed w-full z-50 transition-all duration-300 ${
          scrolled
            ? "bg-dark-primary/95 backdrop-blur-md shadow-lg border-b border-beige/10"
            : "bg-dark-primary"
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 h-16">
         
          <Link
            to="/"
            className="flex items-center gap-2 text-xl font-bold text-gold hover:text-gold/80 transition-colors"
          >
            <div className="w-8 h-8 bg-gradient-to-r from-amber-500 to-orange-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">Q</span>
            </div>
            QuickEats
          </Link>

          
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-beige/60" />
              <input
                type="text"
                placeholder="Search for restaurants or dishes..."
                className="w-full pl-10 pr-4 py-2 rounded-full border border-beige/20 focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent bg-dark-primary text-beige placeholder-beige/60"
              />
            </div>
          </div>

          
          <nav className="hidden lg:flex gap-6 text-beige/90 font-medium">
            <Link
              to="/"
              className={`nav-link flex items-center gap-1 transition-colors ${
                activeLink === "/"
                  ? "text-gold font-semibold"
                  : "hover:text-gold"
              }`}
            >
              Home
            </Link>

            <Link
              to="/restaurants"
              className={`nav-link flex items-center gap-1 transition-colors ${
                activeLink === "/restaurants"
                  ? "text-gold font-semibold"
                  : "hover:text-gold"
              }`}
            >
              Restaurants
            </Link>

            <Link
              to="/menu"
              className={`nav-link flex items-center gap-1 transition-colors ${
                activeLink === "/menu"
                  ? "text-gold font-semibold"
                  : "hover:text-gold"
              }`}
            >
              Menu
            </Link>

            <Link
              to="/about"
              className={`nav-link flex items-center gap-1 transition-colors ${
                activeLink === "/about"
                  ? "text-gold font-semibold"
                  : "hover:text-gold"
              }`}
            >
              About
            </Link>

            <Link
              to="/contact"
              className={`nav-link flex items-center gap-1 transition-colors ${
                activeLink === "/contact"
                  ? "text-gold font-semibold"
                  : "hover:text-gold"
              }`}
            >
              Contact
            </Link>
          </nav>

          {/* 🎯 Right Section */}
          <div className="flex items-center gap-4">
            {/* 🔍 Search Button - Mobile */}
            <button className="md:hidden p-2 text-beige/90 hover:text-gold transition-colors">
              <FiSearch className="text-xl" />
            </button>

            {/* Favorites */}
            <Link
              to="/favorites"
              className="hidden md:flex items-center gap-1 text-beige/90 hover:text-gold transition-colors p-2 rounded-lg hover:bg-gold/10"
            >
              <FiHeart className="text-lg" />
            </Link>

            {/* Auth Buttons - Desktop */}
            {!isAuthenticated ? (
              <div className="hidden md:flex items-center gap-2">
                <Link
                  to="/login"
                  className="px-4 py-2 text-beige/90 hover:text-gold font-medium transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-full font-medium hover:shadow-lg transition-all"
                >
                  Sign Up
                </Link>
              </div>
            ) : (
              <div className="hidden md:flex items-center gap-2 relative">
                {/* User Menu */}
                <button
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-gold/10 transition-colors"
                  onClick={() => setShowUserMenu(!showUserMenu)}
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center text-white font-medium text-sm">
                    {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
                  </div>
                  <span className="text-beige/90 font-medium max-w-24 truncate">
                    Hi, {user?.name || "User"}
                  </span>
                  <FiChevronDown
                    className={`text-beige/60 transition-transform ${
                      showUserMenu ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* User Dropdown */}
                {showUserMenu && (
                  <div className="absolute top-full right-0 mt-2 w-48 bg-dark-primary rounded-xl shadow-lg border border-beige/20 py-2 z-10">
                    <Link
                      to="/profile"
                      className="flex items-center gap-2 px-4 py-2 text-beige/90 hover:bg-gold/10 hover:text-gold transition-colors"
                      onClick={() => setShowUserMenu(false)}
                    >
                      <FiUser className="text-beige/60" />
                      Profile
                    </Link>

                    <Link
                      to="/favorites"
                      className="flex items-center gap-2 px-4 py-2 text-beige/90 hover:bg-gold/10 hover:text-gold transition-colors"
                      onClick={() => setShowUserMenu(false)}
                    >
                      <FiHeart className="text-beige/60" />
                      Favorites
                    </Link>

                    <div className="border-t border-beige/20 my-1"></div>

                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-red-400 hover:bg-red-500/10 transition-colors"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* 🛒 Cart */}
            <div className="relative">
              <Link
                to="/cart"
                className="flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 py-2 rounded-full font-medium hover:shadow-lg transition-all"
              >
                <FiShoppingCart className="text-lg" />
                <span className="hidden sm:inline">Cart</span>

                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-white text-orange-600 px-1.5 py-0.5 text-xs font-bold rounded-full min-w-5 h-5 flex items-center justify-center border border-orange-200">
                    {totalItems}
                  </span>
                )}
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 text-beige/90 hover:text-gold transition-colors"
              onClick={() => setOpenMobile(true)}
            >
              <FiMenu className="text-xl" />
            </button>
          </div>
        </div>
      </header>

      {/* 📱 Mobile Menu Overlay */}
      {openMobile && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm">
          <div className="absolute right-0 top-0 w-80 h-full bg-dark-primary p-6 shadow-2xl overflow-y-auto border-l border-beige/10">
            {/* Header */}
            <div className="flex justify-between items-center mb-8 pb-4 border-b border-beige/20">
              <div className="flex items-center gap-2 text-xl font-bold text-gold">
                <div className="w-8 h-8 bg-gradient-to-r from-amber-500 to-orange-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">Q</span>
                </div>
                QuickEats
              </div>

              <button
                onClick={() => setOpenMobile(false)}
                className="p-2 text-beige/60 hover:text-gold transition-colors rounded-lg hover:bg-gold/10"
              >
                <FiX className="text-2xl" />
              </button>
            </div>

            {/* Search Bar - Mobile */}
            <div className="mb-6">
              <div className="relative">
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-beige/60" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-beige/20 focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent bg-dark-primary text-beige placeholder-beige/60"
                />
              </div>
            </div>

            {/* Navigation */}
            <nav className="flex flex-col mb-6">
              {[
                { to: "/", label: "Home", icon: "🏠" },
                { to: "/restaurants", label: "Restaurants", icon: "🏪" },
                { to: "/menu", label: "Menu", icon: "📋" },
                { to: "/about", label: "About", icon: "ℹ️" },
                { to: "/contact", label: "Contact", icon: "📞" },
                { to: "/favorites", label: "Favorites", icon: "❤️" },
                { to: "/profile", label: "Profile", icon: "👤" },
              ].map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setOpenMobile(false)}
                  className={`flex items-center gap-3 py-4 px-2 text-lg transition-colors border-b border-beige/10 ${
                    activeLink === link.to
                      ? "text-gold font-semibold bg-gold/10 rounded-lg"
                      : "text-beige/90 hover:text-gold hover:bg-gold/5 rounded-lg"
                  }`}
                >
                  <span className="text-xl">{link.icon}</span>
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Auth Section */}
            <div className="pt-4 border-t border-beige/20">
              {!isAuthenticated ? (
                <div className="flex flex-col gap-3">
                  <Link
                    to="/login"
                    onClick={() => setOpenMobile(false)}
                    className="text-center py-3 px-4 text-beige/90 font-medium rounded-xl border border-beige/20 hover:border-gold hover:text-gold transition-colors"
                  >
                    Login
                  </Link>

                  <Link
                    to="/signup"
                    onClick={() => setOpenMobile(false)}
                    className="text-center py-3 px-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-medium rounded-xl hover:shadow-lg transition-all"
                  >
                    Sign up
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-gold/10 rounded-xl">
                    <div className="w-10 h-10 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center text-white font-medium">
                      {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
                    </div>

                    <div>
                      <div className="font-medium text-beige">
                        {user?.name || "User"}
                      </div>
                      <div className="text-sm text-beige/60">
                        {user?.email || ""}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      handleLogout();
                      setOpenMobile(false);
                    }}
                    className="w-full py-3 px-4 text-red-400 font-medium rounded-xl border border-red-400/20 hover:bg-red-400/10 transition-colors"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>

            {/* Footer Info */}
            <div className="mt-8 pt-4 border-t border-beige/20 text-xs text-beige/60">
              <div className="flex flex-wrap gap-4 mb-2">
                <span className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  Free delivery
                </span>
                <span className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  Secure payments
                </span>
                <span className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  Real-time tracking
                </span>
              </div>

              <p>© 2026 QuickEats. All rights reserved.</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}