import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Menu from "./Menu";
import About from "./About";
import Contact from "./Contact";
import Footer from "../components/Footer";
import CartDrawer from "../components/CartDrawer";
import Toast from "../components/Toast";
import ScrollTop from "../components/ScrollTop";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <main className="pt-6 space-y-20">
        <Menu hideNavbar={true} />
        <About />
        <Contact />
      </main>
      <Footer />
      <CartDrawer />
      <Toast />
      <ScrollTop />
    </>
  );
}
