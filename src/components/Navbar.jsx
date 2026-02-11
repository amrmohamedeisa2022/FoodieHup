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
  FiLogOut,
  FiTrash2,
} from "react-icons/fi";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {

  const [scrolled, setScrolled] = useState(false);
  const [openMobile, setOpenMobile] = useState(false);
  const [activeLink, setActiveLink] = useState("/");
  const [showUserMenu, setShowUserMenu] = useState(false);

  // NEW
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

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
    localStorage.clear();
    navigate("/login");
    setShowUserMenu(false);
  }

  async function handleDeleteAccount() {
    try {
      const token = localStorage.getItem("quickeats_token");

      const res = await fetch(
        "http://localhost:8080/api/users/deleteProfile",
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!res.ok) throw new Error();

      localStorage.clear();
      navigate("/signup");
      setShowUserMenu(false);
      setOpenMobile(false);

    } catch {
      alert("Failed to delete account");
    }
  }

  const totalItems =
    items?.reduce((total, item) => total + (item.qty || 1), 0) || 0;

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

          <nav className="hidden lg:flex gap-6 text-beige/90 font-medium">
            <Link to="/" className="hover:text-gold">Home</Link>
            <Link to="/restaurants" className="hover:text-gold">Restaurants</Link>
            <Link to="/menu" className="hover:text-gold">Menu</Link>
            <Link to="/about" className="hover:text-gold">About</Link>
            <Link to="/contact" className="hover:text-gold">Contact</Link>
          </nav>

          <div className="flex items-center gap-4">

            <Link
              to="/favorites"
              className="hidden md:flex items-center gap-1 text-beige/90 hover:text-gold transition-colors p-2 rounded-lg hover:bg-gold/10"
            >
              <FiHeart className="text-lg" />
            </Link>

            {!isAuthenticated ? (
              <Link to="/login" className="text-beige/90">Login</Link>
            ) : (
              <div className="hidden md:flex items-center gap-2 relative">

                <button
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-gold/10"
                  onClick={() => setShowUserMenu(!showUserMenu)}
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center text-white font-medium text-sm">
                    {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
                  </div>
                  <span className="text-beige/90 font-medium">
                    Hi, {user?.name || "User"}
                  </span>
                  <FiChevronDown />
                </button>

                {showUserMenu && (
                  <div className="absolute top-full right-0 mt-2 w-48 bg-dark-primary rounded-xl shadow-lg border border-beige/20 py-2 z-10">

                    <Link
                      to="/profile"
                      className="flex items-center gap-2 px-4 py-2 hover:bg-gold/10"
                    >
                      <FiUser /> Profile
                    </Link>

                    <Link
                      to="/favorites"
                      className="flex items-center gap-2 px-4 py-2 hover:bg-gold/10"
                    >
                      <FiHeart /> Favorites
                    </Link>

                    <button
                      onClick={() => setShowDeleteModal(true)}
                      className="w-full text-left px-4 py-2 text-red-400 flex items-center gap-2"
                    >
                      <FiTrash2 /> Delete Account
                    </button>

                    <button
                      onClick={() => setShowLogoutModal(true)}
                      className="w-full text-left px-4 py-2 text-red-400 flex items-center gap-2"
                    >
                      <FiLogOut /> Logout
                    </button>

                  </div>
                )}
              </div>
            )}

            <Link
              to="/cart"
              className="flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 py-2 rounded-full"
            >
              <FiShoppingCart />
              Cart
              {totalItems > 0 && (
                <span className="ml-2 text-xs bg-white text-orange-600 px-2 rounded-full">
                  {totalItems}
                </span>
              )}
            </Link>

          </div>
        </div>
      </header>

      {/* DELETE MODAL */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[999]">
          <div className="bg-dark-primary p-8 rounded-2xl text-center">
            <h3 className="text-lg text-beige mb-4">Delete Account?</h3>
            <div className="flex gap-3 justify-center">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 border rounded-xl"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  handleDeleteAccount();
                  setShowDeleteModal(false);
                }}
                className="px-4 py-2 bg-red-500 text-white rounded-xl"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* LOGOUT MODAL */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[999]">
          <div className="bg-dark-primary p-8 rounded-2xl text-center">
            <h3 className="text-lg text-beige mb-4">Logout?</h3>
            <div className="flex gap-3 justify-center">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="px-4 py-2 border rounded-xl"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  handleLogout();
                  setShowLogoutModal(false);
                }}
                className="px-4 py-2 bg-orange-500 text-white rounded-xl"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}

    </>
  );
}
