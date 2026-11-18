import AboutPage from "@/components/ui/Home/about";
import FeaturedServices from "@/components/ui/Home/FeatureSection";
import Footer from "@/components/ui/Home/Footer";
import Hero from "@/components/ui/Home/Hero";
import HowItWorks from "@/components/ui/Home/HowitWorks";
import Navbar from "@/components/ui/Home/Navbar";


export default function Home() {
  return (
    <div>
      <Navbar></Navbar>
      <Hero></Hero>
      <FeaturedServices></FeaturedServices>
      <HowItWorks></HowItWorks>
      <Footer></Footer>
    </div>
  );
}
