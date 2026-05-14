import Navbar from "@/modules/public/components/Navbar";
import Hero from "@/modules/public/components/Hero";
import Features from "@/modules/public/components/Features";
import Process from "@/modules/public/components/Process";
import CTA from "@/modules/public/components/CTA";
import Footer from "@/modules/public/components/Footer";

export default function Landing() {
  return (
    <div className="min-h-screen w-full overflow-hidden">
      <Navbar />
      <Hero />
      <Features />
      <Process />
      <CTA />
      <Footer />
    </div>
  );
}
