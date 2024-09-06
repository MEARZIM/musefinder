import { LandingNavbar } from "@/components/layouts/LandingPage/Navbar";
import { HeroSection } from "@/components/layouts/LandingPage/HeroSection";
import { Footer } from "@/components/layouts/LandingPage/Footer";


export default function Home() {
  return (
    <main className="p-4 bg-black">
      <LandingNavbar />
      <HeroSection />
      <Footer />
    </main>
  );
}