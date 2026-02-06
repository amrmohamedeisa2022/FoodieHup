import React from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FiUser, FiMail, FiLogOut, FiShield } from "react-icons/fi";

export default function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <>
      <Navbar />
      <section className="min-h-screen bg-gradient-to-b from-dark-primary to-dark-elev py-20 px-4 sm:px-6">
        <div className="max-w-2xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gold mb-4">My Profile</h1>
            <p className="text-beige/70 text-lg">Manage your account information</p>
          </div>

          {/* Profile Card */}
          <div className="bg-dark-elev rounded-2xl shadow-xl border border-beige/10 overflow-hidden">
            {/* Profile Header */}
            <div className="bg-gradient-to-r from-amber-500/20 to-orange-500/20 p-6 border-b border-beige/10">
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-lg">
                  {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                </div>
                <div className="text-left">
                  <h2 className="text-2xl font-bold text-beige">{user?.name || 'User'}</h2>
                  <p className="text-beige/70 flex items-center gap-2 mt-1">
                    <FiShield className="text-green-400" />
                    Verified Account
                  </p>
                </div>
              </div>
            </div>

            {/* Profile Details */}
            <div className="p-6 space-y-6">
              {/* Personal Information */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gold border-b border-beige/20 pb-2 flex items-center gap-2">
                  <FiUser className="text-lg" />
                  Personal Information
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-dark-primary/50 rounded-xl p-4 border border-beige/10">
                    <label className="text-beige/60 text-sm font-medium mb-1 block">Full Name</label>
                    <p className="text-beige text-lg font-medium">{user?.name || 'Not provided'}</p>
                  </div>
                  
                  <div className="bg-dark-primary/50 rounded-xl p-4 border border-beige/10">
                    <label className="text-beige/60 text-sm font-medium mb-1 block flex items-center gap-2">
                      <FiMail className="text-beige/40" />
                      Email Address
                    </label>
                    <p className="text-beige text-lg font-medium">{user?.email || 'Not provided'}</p>
                  </div>
                </div>
              </div>

              {/* Account Stats */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gold border-b border-beige/20 pb-2">
                  Account Statistics
                </h3>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center bg-dark-primary/30 rounded-xl p-4 border border-beige/10">
                    <div className="text-2xl font-bold text-gold mb-1">12</div>
                    <div className="text-beige/60 text-sm">Orders</div>
                  </div>
                  
                  <div className="text-center bg-dark-primary/30 rounded-xl p-4 border border-beige/10">
                    <div className="text-2xl font-bold text-gold mb-1">8</div>
                    <div className="text-beige/60 text-sm">Favorites</div>
                  </div>
                  
                  <div className="text-center bg-dark-primary/30 rounded-xl p-4 border border-beige/10">
                    <div className="text-2xl font-bold text-gold mb-1">2</div>
                    <div className="text-beige/60 text-sm">Reviews</div>
                  </div>
                  
                  <div className="text-center bg-dark-primary/30 rounded-xl p-4 border border-beige/10">
                    <div className="text-2xl font-bold text-gold mb-1">1</div>
                    <div className="text-beige/60 text-sm">Years</div>
                  </div>
                </div>
              </div>

              {/* Logout Button Only */}
              <div className="pt-4">
                <button 
                  className="w-full flex items-center justify-center gap-2 bg-dark-primary border border-red-400/30 text-red-400 py-3 px-6 rounded-xl font-medium hover:bg-red-400/10 transition-all duration-300 hover:scale-105"
                  onClick={handleLogout}
                >
                  <FiLogOut className="text-lg" />
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}