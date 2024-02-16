import BlogSection from "../components/BlogSection";
import Footer from "../components/Footer";
import MainSection from "../components/MainSection";
import Navbar from "../components/Navbar";

const Home = () => {
  return (
    <div>
      <Navbar />
      <MainSection />
      <BlogSection />
      <Footer/>
    </div>
  );
};

export default Home;
