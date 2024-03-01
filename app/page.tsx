import Slider from "./components/shared/Slider";
import Navbar from "./components/dashboard/navbar/Navbar";
import Footer from "./components/home/Footer";
import IntroSection from "./components/home/IntroSection";
import Banner from "./components/home/banner/Banner";

export default function Home() {
  return (
    <div>
      <Navbar home />
      <div className="">
        <Banner />
        {/* <Slider /> */}
        <div className="mb-24">
          <IntroSection />
        </div>
        <Footer />
      </div>
    </div>
  );
}
