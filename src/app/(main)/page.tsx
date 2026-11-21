
import FeaturedServices from "@/components/ui/Home/FeatureSection";
import Hero from "@/components/ui/Home/Hero";
import HowItWorks from "@/components/ui/Home/HowitWorks";
import PopularCategories from "@/components/ui/Home/Popularcategories";


export default function Home() {
  return (
    <div>
      
      <Hero></Hero>
      <FeaturedServices></FeaturedServices>
      <HowItWorks></HowItWorks>
      <PopularCategories></PopularCategories>
      
    </div>
  );
}
