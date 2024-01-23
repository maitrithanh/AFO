import Slider from "./components/Slider";
import Navbar from "./components/dashboard/navbar/Navbar";
import Footer from "./components/home/Footer";
import IntroSection from "./components/home/IntroSection";
import ProfilePage from "./components/profile/profile";

export default function Home() {
  return (
    <div>
      <Navbar />
      <div className="mt-[4rem]">
        <Slider />
        <IntroSection />
        <Footer />
      </div>
    </div>
  );
}
