import React from "react";
import { FiClock, FiStar, FiHeart } from "react-icons/fi";
import Navbar from "../components/Navbar";

export default function About() {
  return (
    <>
      <Navbar />
      <section className="min-h-screen bg-gradient-to-b from-dark-primary to-dark-elev py-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-gold mb-6">About QuickEats</h1>
            <p className="text-beige/70 text-xl max-w-3xl mx-auto leading-relaxed">
              Delivering culinary excellence straight to your doorstep. Our passion for food
              and commitment to quality make every meal an unforgettable experience.
            </p>
          </div>

          {/* Main Content */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
            {/* Text Content */}
            <div className="space-y-8">
              <div>
                <h2 className="text-4xl font-bold text-gold mb-6 leading-tight">
                  We Cook with Passion
                </h2>
                <p className="text-beige/90 text-lg leading-relaxed mb-6">
                  At QuickEats, we believe great meals start with great care — from sourcing
                  the freshest ingredients to our team of expert chefs who pour their heart
                  into every dish.
                </p>
                <p className="text-beige/80 leading-relaxed">
                  Founded with a simple mission: to bring restaurant-quality meals to your home
                  with the convenience of fast delivery. Every recipe is crafted with love,
                  every ingredient is carefully selected, and every dish tells a story.
                </p>
              </div>

              {/* Features List */}
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-dark-elev/50 rounded-xl border border-beige/10">
                  <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center">
                    <FiStar className="text-white text-xl" />
                  </div>
                  <div>
                    <h3 className="text-beige font-semibold text-lg">
                      Curated Local Restaurants
                    </h3>
                    <p className="text-beige/60">
                      Partnering with the best chefs in your area
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-dark-elev/50 rounded-xl border border-beige/10">
                  <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center">
                    <FiClock className="text-white text-xl" />
                  </div>
                  <div>
                    <h3 className="text-beige font-semibold text-lg">
                      Fast, Reliable Delivery
                    </h3>
                    <p className="text-beige/60">
                      Hot meals delivered in 30 minutes or less
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-dark-elev/50 rounded-xl border border-beige/10">
                  <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center">
                    <FiHeart className="text-white text-xl" />
                  </div>
                  <div>
                    <h3 className="text-beige font-semibold text-lg">
                      Premium Quality Ingredients
                    </h3>
                    <p className="text-beige/60">
                      Only the freshest, highest quality ingredients
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Image */}
            <div className="relative">
              <img
                src="/images/chef.jpg"
                alt="Professional chef preparing food"
                className="rounded-2xl shadow-2xl w-full h-[600px] object-cover"
              />
              <div className="absolute -bottom-6 -left-6 bg-gradient-to-r from-amber-500 to-orange-500 text-white p-6 rounded-2xl shadow-lg">
                <div className="text-3xl font-bold">5+</div>
                <div className="text-sm">Years of Excellence</div>
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
            <div className="text-center">
              <div className="text-4xl font-bold text-gold mb-2">50K+</div>
              <div className="text-beige/60">Happy Customers</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-gold mb-2">100+</div>
              <div className="text-beige/60">Partner Restaurants</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-gold mb-2">15min</div>
              <div className="text-beige/60">Avg. Delivery Time</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-gold mb-2">4.9</div>
              <div className="text-beige/60">Customer Rating</div>
            </div>
          </div>

          {/* Mission Section */}
          <div className="bg-dark-elev rounded-2xl p-8 md:p-12 text-center border border-beige/10">
            <h2 className="text-3xl font-bold text-gold mb-6">Our Mission</h2>
            <p className="text-beige/80 text-lg leading-relaxed max-w-4xl mx-auto">
              To revolutionize food delivery by connecting people with the best local culinary
              experiences. We're committed to supporting local businesses while providing
              our customers with convenient access to delicious, high-quality meals that
              nourish both body and soul.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
