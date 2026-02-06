import React from "react";
import { Link } from "react-router-dom";
import {
  FiClock,
  FiMapPin,
  FiPhone,
  FiMail,
  FiFacebook,
  FiTwitter,
  FiInstagram,
  FiYoutube,
} from "react-icons/fi";

export default function Footer() {
  return (
    <footer className="bg-dark-primary py-16 text-beige/70 border-t border-beige/10">
      <div className="max-w-7xl mx-auto px-6">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 gap-8 mb-12">
          {/* Brand Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-amber-500 to-orange-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">Q</span>
              </div>
              <h3 className="text-2xl font-bold text-gold">QuickEats</h3>
            </div>
            <p className="text-beige/60 leading-relaxed text-lg">
              Delivering fresh, chef-prepared meals from the best local restaurants straight to
              your door.
            </p>

            {/* Business Hours */}
            <div className="space-y-3 pt-4">
              <h4 className="text-lg font-semibold text-beige flex items-center gap-2">
                <FiClock className="text-amber-500" />
                Business Hours
              </h4>
              <div className="space-y-2 text-beige/60">
                <div className="flex justify-between">
                  <span>Monday - Friday</span>
                  <span className="text-gold">9:00 AM - 10:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday - Sunday</span>
                  <span className="text-gold">10:00 AM - 11:00 PM</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-xl font-semibold text-beige">Quick Links</h4>
            <div className="flex flex-col gap-4 text-lg">
              <Link
                to="/menu"
                className="hover:text-gold transition-colors duration-200 hover:translate-x-2 transform"
              >
                Menu
              </Link>
              <Link
                to="/about"
                className="hover:text-gold transition-colors duration-200 hover:translate-x-2 transform"
              >
                About Us
              </Link>
              <Link
                to="/contact"
                className="hover:text-gold transition-colors duration-200 hover:translate-x-2 transform"
              >
                Contact
              </Link>
              <Link
                to="/profile"
                className="hover:text-gold transition-colors duration-200 hover:translate-x-2 transform"
              >
                My Account
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h4 className="text-xl font-semibold text-beige">Contact Us</h4>
            <div className="space-y-4 text-beige/60 text-lg">
              <div className="flex items-center gap-3">
                <FiMapPin className="text-amber-500 text-xl" />
                <span>Cairo, Egypt</span>
              </div>
              <div className="flex items-center gap-3">
                <FiPhone className="text-amber-500 text-xl" />
                <span>+20 123 456 7890</span>
              </div>
              <div className="flex items-center gap-3">
                <FiMail className="text-amber-500 text-xl" />
                <span>hello@quickeats.com</span>
              </div>
            </div>
          </div>

          {/* Social Links & Newsletter */}
          <div className="space-y-6">
            <h4 className="text-xl font-semibold text-beige">Follow Us</h4>

            <div className="flex gap-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-12 h-12 bg-dark-elev rounded-full flex items-center justify-center hover:bg-amber-500 hover:text-white transition-all duration-300 hover:scale-110"
              >
                <FiFacebook className="text-xl" />
              </a>

              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="w-12 h-12 bg-dark-elev rounded-full flex items-center justify-center hover:bg-amber-500 hover:text-white transition-all duration-300 hover:scale-110"
              >
                <FiTwitter className="text-xl" />
              </a>

              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-12 h-12 bg-dark-elev rounded-full flex items-center justify-center hover:bg-amber-500 hover:text-white transition-all duration-300 hover:scale-110"
              >
                <FiInstagram className="text-xl" />
              </a>

              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="w-12 h-12 bg-dark-elev rounded-full flex items-center justify-center hover:bg-amber-500 hover:text-white transition-all duration-300 hover:scale-110"
              >
                <FiYoutube className="text-xl" />
              </a>
            </div>

            {/* Quick Info Cards */}
            <div className="space-y-4 pt-4">
              <div className="bg-dark-elev/50 rounded-xl p-4 border border-beige/10 text-center">
                <div className="text-amber-500 font-semibold text-lg mb-1">
                  Quick Response
                </div>
                <div className="text-beige/60 text-sm">We reply within 24 hours</div>
              </div>
              <div className="bg-dark-elev/50 rounded-xl p-4 border border-beige/10 text-center">
                <div className="text-amber-500 font-semibold text-lg mb-1">24/7 Support</div>
                <div className="text-beige/60 text-sm">Customer service available</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-beige/20 flex flex-col lg:flex-row justify-between items-center">
          <div className="text-beige/60 text-lg">
            © {new Date().getFullYear()} QuickEats. All rights reserved.
          </div>

          <div className="flex gap-8 mt-4 lg:mt-0 text-beige/60 text-lg">
            <Link to="/privacy-policy" className="hover:text-gold transition-colors duration-200">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-gold transition-colors duration-200">
              Terms of Service
            </Link>
            <Link to="/cookie-policy" className="hover:text-gold transition-colors duration-200">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
