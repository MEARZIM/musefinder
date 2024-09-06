import { LandingNavbar } from "@/components/layouts/LandingPage/Navbar";
import { HeroSection } from "@/components/layouts/LandingPage/HeroSection";
import { Footer } from "@/components/layouts/LandingPage/Footer";
import { ExpandableCard } from "@/components/layouts/LandingPage/ExpandableCard";


export default function Home() {
  return (
    <main className="">
      <LandingNavbar />
      <HeroSection />
      {/* <ExpandableCard /> */}
      <Footer />
    </main>
  );
}