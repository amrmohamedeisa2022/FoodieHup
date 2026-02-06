import React from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { FiCreditCard, FiUser, FiPhone, FiMapPin, FiShoppingBag, FiArrowLeft, FiCheck } from "react-icons/fi";
import Navbar from "../components/Navbar";

export default function Checkout() {
  const { items, total, clearCart } = useCart();
  const navigate = useNavigate();

  function submit(e) {
    e.preventDefault();
    // mock submit
    alert("Order placed successfully! 🎉\nYour delicious food is on the way!");
    clearCart();
    navigate("/");
  }

  const handleBackToCart = () => {
    navigate("/cart");
  };

  const cartTotal = total();
  const deliveryFee = 25.00;
  const tax = cartTotal * 0.14;
  const finalTotal = cartTotal + deliveryFee + tax;

  return (
    <>
      <Navbar />
      <section className="min-h-screen bg-gradient-to-b from-dark-primary to-dark-elev py-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gold mb-4 flex items-center justify-center gap-3">
              <FiCreditCard className="text-amber-500" />
              Checkout
            </h1>
            <p className="text-beige/70 text-lg">
              Complete your order and get ready for delicious food!
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left Column - Form */}
            <div className="space-y-6">
              <div className="bg-dark-elev rounded-2xl p-6 border border-beige/10">
                <h2 className="text-2xl font-bold text-beige mb-6 flex items-center gap-3">
                  <FiUser className="text-amber-500" />
                  Personal Information
                </h2>
                
                <form onSubmit={submit} className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-beige font-medium flex items-center gap-2">
                        <FiUser className="text-amber-500 text-sm" />
                        Full Name
                      </label>
                      <input 
                        required 
                        className="w-full px-4 py-3 bg-dark-primary border border-beige/20 rounded-xl text-beige placeholder-beige/60 focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent transition-all"
                        placeholder="Enter your full name" 
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-beige font-medium flex items-center gap-2">
                          <FiPhone className="text-amber-500 text-sm" />
                          Phone Number
                        </label>
                        <input 
                          required 
                          className="w-full px-4 py-3 bg-dark-primary border border-beige/20 rounded-xl text-beige placeholder-beige/60 focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent transition-all"
                          placeholder="+20 123 456 7890" 
                          type="tel"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-beige font-medium flex items-center gap-2">
                          <FiMapPin className="text-amber-500 text-sm" />
                          Address
                        </label>
                        <input 
                          required 
                          className="w-full px-4 py-3 bg-dark-primary border border-beige/20 rounded-xl text-beige placeholder-beige/60 focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent transition-all"
                          placeholder="Your delivery address" 
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-beige font-medium">Delivery Instructions (Optional)</label>
                      <textarea 
                        className="w-full px-4 py-3 bg-dark-primary border border-beige/20 rounded-xl text-beige placeholder-beige/60 focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent transition-all resize-none h-20"
                        placeholder="Any special instructions for delivery..."
                      />
                    </div>
                  </div>

                  {/* Payment Method */}
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-beige">Payment Method</h3>
                    <div className="space-y-3">
                      <label className="flex items-center gap-3 p-4 bg-dark-primary rounded-xl border border-beige/20 cursor-pointer hover:border-amber-500/30 transition-all">
                        <input type="radio" name="payment" defaultChecked className="text-amber-500" />
                        <span className="text-beige">Cash on Delivery</span>
                      </label>
                      <label className="flex items-center gap-3 p-4 bg-dark-primary rounded-xl border border-beige/20 cursor-pointer hover:border-amber-500/30 transition-all">
                        <input type="radio" name="payment" className="text-amber-500" />
                        <span className="text-beige">Credit/Debit Card</span>
                      </label>
                    </div>
                  </div>

                  <button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white py-4 rounded-xl font-bold text-lg hover:shadow-lg hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2"
                  >
                    <FiCheck className="text-lg" />
                    Place Order
                  </button>
                </form>
              </div>

              {/* Back to Cart Button */}
              <button 
                onClick={handleBackToCart}
                className="w-full bg-dark-primary border border-beige/20 text-beige py-3 rounded-xl font-medium hover:border-gold hover:text-gold transition-all duration-200 flex items-center justify-center gap-2"
              >
                <FiArrowLeft className="text-lg" />
                Back to Cart
              </button>
            </div>

            {/* Right Column - Order Summary */}
            <div className="space-y-6">
              <div className="bg-dark-elev rounded-2xl p-6 border border-beige/10 sticky top-6">
                <h2 className="text-2xl font-bold text-beige mb-6 flex items-center gap-3">
                  <FiShoppingBag className="text-amber-500" />
                  Order Summary
                </h2>

                {/* Order Items */}
                <div className="space-y-4 mb-6">
                  <h3 className="text-lg font-semibold text-beige">Items ({items.length})</h3>
                  <div className="space-y-3 max-h-60 overflow-auto">
                    {items.map(item => (
                      <div key={item.id} className="flex items-center gap-3 p-3 bg-dark-primary/50 rounded-xl">
                        <img 
                          src={item.image} 
                          alt={item.name}
                          className="w-12 h-12 object-cover rounded-lg"
                          onError={(e) => {
                            e.target.src = "/api/placeholder/50/50";
                          }}
                        />
                        <div className="flex-1 min-w-0">
                          <div className="text-beige font-medium text-sm truncate">{item.name}</div>
                          <div className="text-gold text-sm">{(parseFloat(item.price) || 0).toFixed(2)} EGP × {item.qty || 1}</div>
                        </div>
                        <div className="text-gold font-bold text-sm">
                          {((parseFloat(item.price) || 0) * (item.qty || 1)).toFixed(2)} EGP
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Price Breakdown */}
                <div className="space-y-3 border-t border-beige/20 pt-4">
                  <div className="flex justify-between text-beige/60">
                    <span>Subtotal</span>
                    <span>{cartTotal.toFixed(2)} EGP</span>
                  </div>
                  <div className="flex justify-between text-beige/60">
                    <span>Delivery Fee</span>
                    <span>{deliveryFee.toFixed(2)} EGP</span>
                  </div>
                  <div className="flex justify-between text-beige/60">
                    <span>Tax (14%)</span>
                    <span>{tax.toFixed(2)} EGP</span>
                  </div>
                  <div className="border-t border-beige/20 pt-3">
                    <div className="flex justify-between text-xl font-bold text-gold">
                      <span>Total</span>
                      <span>{finalTotal.toFixed(2)} EGP</span>
                    </div>
                  </div>
                </div>

                {/* Delivery Info */}
                <div className="mt-6 p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl">
                  <div className="flex items-center gap-2 text-amber-500 font-semibold mb-2">
                    <FiMapPin className="text-sm" />
                    Estimated Delivery
                  </div>
                  <div className="text-beige/80 text-sm">25-35 minutes</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}