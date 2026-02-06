import React from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { FiPlus, FiMinus, FiTrash2, FiShoppingBag, FiArrowLeft, FiCreditCard } from "react-icons/fi";
import Navbar from "../components/Navbar";

export default function CartPage(){
  const { items, updateQty, removeItem, total } = useCart();
  const navigate = useNavigate();

  const handleCheckoutClick = () => {
    navigate("/checkout");
  };

  const handleContinueShopping = () => {
    navigate("/menu");
  };

  // دالة لحساب السعر الإجمالي لكل عنصر
  const calculateItemTotal = (price, quantity) => {
    const itemPrice = parseFloat(price) || 0;
    const itemQty = parseInt(quantity) || 0;
    return (itemPrice * itemQty).toFixed(2);
  };

  // دالة للتأكد من أن السعر صحيح
  const getValidPrice = (price) => {
    return parseFloat(price) || 0;
  };

  return (
    <>
      <Navbar />
      <section className="min-h-screen bg-gradient-to-b from-dark-primary to-dark-elev py-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gold mb-4 flex items-center justify-center gap-3">
              <FiShoppingBag className="text-amber-500" />
              Your Cart
            </h1>
            <p className="text-beige/70 text-lg">
              {items.length === 0 
                ? "Your cart is waiting to be filled with delicious meals!" 
                : `You have ${items.length} ${items.length === 1 ? 'item' : 'items'} in your cart`}
            </p>
          </div>

          {items.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gradient-to-r from-amber-500/20 to-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <FiShoppingBag className="text-4xl text-amber-500/60" />
              </div>
              <h3 className="text-2xl font-semibold text-beige mb-3">Your cart is empty</h3>
              <p className="text-beige/60 mb-8 max-w-md mx-auto">
                Discover our delicious menu and add some tasty meals to your cart!
              </p>
              <button 
                onClick={handleContinueShopping}
                className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-8 py-3 rounded-full font-medium hover:shadow-lg transition-all"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                {items.map(it => (
                  <div key={it.id} className="bg-dark-elev rounded-2xl p-6 border border-beige/10 hover:border-amber-500/30 transition-all duration-300">
                    <div className="flex gap-6">
                      {/* Product Image */}
                      <img 
                        src={it.image} 
                        className="w-20 h-20 md:w-24 md:h-24 object-cover rounded-xl flex-shrink-0" 
                        alt={it.name}
                        onError={(e) => {
                          e.target.src = "/api/placeholder/100/100";
                        }}
                      />
                      
                      {/* Product Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-lg font-bold text-beige truncate">{it.name}</h3>
                          <button 
                            onClick={() => removeItem(it.id)} 
                            className="text-red-400 hover:text-red-300 hover:bg-red-400/10 p-2 rounded-lg transition-all duration-200 ml-2"
                          >
                            <FiTrash2 className="text-lg" />
                          </button>
                        </div>
                        
                        <div className="text-gold font-bold text-lg mb-4">
                          {getValidPrice(it.price).toFixed(2)} EGP
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <button 
                              onClick={() => updateQty(it.id, Math.max(1, it.qty - 1))} 
                              className="w-10 h-10 bg-dark-primary border border-beige/20 rounded-lg flex items-center justify-center text-beige hover:bg-amber-500 hover:text-white hover:border-amber-500 transition-all duration-200"
                            >
                              <FiMinus className="text-sm" />
                            </button>
                            <div className="text-beige font-bold text-lg min-w-8 text-center">
                              {it.qty}
                            </div>
                            <button 
                              onClick={() => updateQty(it.id, it.qty + 1)} 
                              className="w-10 h-10 bg-dark-primary border border-beige/20 rounded-lg flex items-center justify-center text-beige hover:bg-amber-500 hover:text-white hover:border-amber-500 transition-all duration-200"
                            >
                              <FiPlus className="text-sm" />
                            </button>
                          </div>
                          
                          <div className="text-right">
                            <div className="text-beige/60 text-sm">Subtotal</div>
                            <div className="text-gold font-bold text-lg">
                              {calculateItemTotal(it.price, it.qty)} EGP
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-dark-elev rounded-2xl p-6 border border-beige/10 sticky top-6">
                  <h3 className="text-xl font-bold text-beige mb-6">Order Summary</h3>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between text-beige/60">
                      <span>Subtotal</span>
                      <span>{typeof total() === 'number' ? total().toFixed(2) : '0.00'} EGP</span>
                    </div>
                    <div className="flex justify-between text-beige/60">
                      <span>Delivery Fee</span>
                      <span>25.00 EGP</span>
                    </div>
                    <div className="flex justify-between text-beige/60">
                      <span>Tax (14%)</span>
                      <span>{(typeof total() === 'number' ? (total() * 0.14) : 0).toFixed(2)} EGP</span>
                    </div>
                    <div className="border-t border-beige/20 pt-4">
                      <div className="flex justify-between text-xl font-bold text-gold">
                        <span>Total</span>
                        <span>
                          {typeof total() === 'number' 
                            ? (total() + 25 + (total() * 0.14)).toFixed(2) 
                            : '0.00'
                          } EGP
                        </span>
                      </div>
                    </div>
                  </div>

                  <button 
                    onClick={handleCheckoutClick}
                    className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white py-4 rounded-xl font-bold text-lg hover:shadow-lg hover:scale-105 transition-all duration-200 mb-4 flex items-center justify-center gap-2"
                  >
                    <FiCreditCard className="text-lg" />
                    Proceed to Checkout
                  </button>

                  <button 
                    onClick={handleContinueShopping}
                    className="w-full bg-dark-primary border border-beige/20 text-beige py-3 rounded-xl font-medium hover:border-gold hover:text-gold transition-all duration-200 flex items-center justify-center gap-2"
                  >
                    <FiArrowLeft className="text-lg" />
                    Continue Shopping
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}