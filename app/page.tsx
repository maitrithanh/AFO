import Slider from "./components/Slider";
import Navbar from "./components/dashboard/navbar/Navbar";
import Footer from "./components/home/Footer";
import IntroSection from "./components/home/IntroSection";
import ProfilePage from "./components/profile/profile";

export default function Home() {
  return (
    <div>
      <Navbar />
      <Slider />
      <IntroSection />
      <Footer />
    </div>
  );
}
