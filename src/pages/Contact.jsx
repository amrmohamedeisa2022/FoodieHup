import React, { useState } from "react";
import { FiSend, FiMail, FiPhone, FiMapPin, FiUser, FiMessageCircle } from "react-icons/fi";
import Navbar from "../components/Navbar";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    alert("Message sent! We'll get back to you soon.");
    setForm({ name: "", email: "", message: "" });
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Navbar />
      <section className="min-h-screen bg-gradient-to-b from-dark-primary to-dark-elev py-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-gold mb-6">Contact Us</h1>
            <p className="text-beige/70 text-xl max-w-2xl mx-auto leading-relaxed">
              Have questions or feedback? We'd love to hear from you. Get in touch with our team.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-dark-elev rounded-2xl p-6 border border-beige/10">
                <h3 className="text-2xl font-bold text-gold mb-6">Get in Touch</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 bg-dark-primary/50 rounded-xl">
                    <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center">
                      <FiPhone className="text-white text-lg" />
                    </div>
                    <div>
                      <h4 className="text-beige font-semibold">Phone</h4>
                      <p className="text-beige/60">+1 (555) 123-4567</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-4 bg-dark-primary/50 rounded-xl">
                    <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center">
                      <FiMail className="text-white text-lg" />
                    </div>
                    <div>
                      <h4 className="text-beige font-semibold">Email</h4>
                      <p className="text-beige/60">support@quickeats.com</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-4 bg-dark-primary/50 rounded-xl">
                    <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center">
                      <FiMapPin className="text-white text-lg" />
                    </div>
                    <div>
                      <h4 className="text-beige font-semibold">Address</h4>
                      <p className="text-beige/60">123 Food Street, City, State 12345</p>
                    </div>
                  </div>
                </div>

                
                <div className="mt-8 pt-6 border-t border-beige/20">
                  <h4 className="text-beige font-semibold mb-3">Business Hours</h4>
                  <div className="space-y-2 text-sm text-beige/60">
                    <div className="flex justify-between">
                      <span>Monday - Friday</span>
                      <span>9:00 AM - 10:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Saturday - Sunday</span>
                      <span>10:00 AM - 11:00 PM</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            
            <div className="lg:col-span-2">
              <div className="bg-dark-elev rounded-2xl p-8 border border-beige/10">
                <h3 className="text-2xl font-bold text-gold mb-2">Send us a Message</h3>
                <p className="text-beige/60 mb-8">We typically respond within 24 hours</p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-beige font-medium flex items-center gap-2">
                        <FiUser className="text-amber-500" />
                        Your Name
                      </label>
                      <input 
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-dark-primary border border-beige/20 rounded-xl text-beige placeholder-beige/60 focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent transition-all"
                        placeholder="Enter your full name"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-beige font-medium flex items-center gap-2">
                        <FiMail className="text-amber-500" />
                        Email Address
                      </label>
                      <input 
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-dark-primary border border-beige/20 rounded-xl text-beige placeholder-beige/60 focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent transition-all"
                        placeholder="Enter your email address"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-beige font-medium flex items-center gap-2">
                      <FiMessageCircle className="text-amber-500" />
                      Your Message
                    </label>
                    <textarea 
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-dark-primary border border-beige/20 rounded-xl text-beige placeholder-beige/60 focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent transition-all resize-none h-40"
                      placeholder="Tell us how we can help you..."
                      required
                    />
                  </div>
                  
                  <button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white py-4 rounded-xl font-semibold text-lg flex items-center justify-center gap-3 hover:shadow-lg hover:scale-105 transition-all duration-200"
                  >
                    <FiSend className="text-lg" />
                    Send Message
                  </button>
                </form>
              </div>

              
              <div className="mt-6 grid md:grid-cols-2 gap-4 text-sm text-beige/60">
                <div className="text-center p-4 bg-dark-elev/50 rounded-xl border border-beige/10">
                  <div className="text-amber-500 font-semibold mb-1">Quick Response</div>
                  <div>We reply within 24 hours</div>
                </div>
                <div className="text-center p-4 bg-dark-elev/50 rounded-xl border border-beige/10">
                  <div className="text-amber-500 font-semibold mb-1">24/7 Support</div>
                  <div>Customer service available</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}