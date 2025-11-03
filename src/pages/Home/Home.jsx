import "./Home.css";
import Button from "../../components/ui/Button/Button";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { Menu } from "lucide-react";
const Home = () => {
  return (
    <>
      <div className="home-container">
        <Header />
        <main className="home-main">
          <Button asLink href="/about">
            Go to the about
          </Button>
        </main>
          <Footer />
      </div>
    </>
  );
};
export default Home;
