import Navbar from "../components/landing/Navbar";
import Hero from "../components/landing/Hero";
import Features from "../components/landing/Features";
import Process from "../components/landing/Process";
import CTA from "../components/landing/CTA";
import Footer from "../components/landing/Footer";

export default function Landing() {
  return (
    <div className="bg-[#e6efe9] min-h-screen">
      <Navbar />
      <Hero />
      <Features />
      <Process />
      <CTA />
      <Footer />
    </div>
  );
}