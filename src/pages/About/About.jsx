import "./About.css";
import Card from "../../components/Card";
import Button from "../../components/ui/Button/Button";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
const About = () => {
  return (
    <>
      <div className="about-container">
          <Header />
        <main className="about-main">
          <Card />
        </main>
          <Footer />
      </div>
    </>
  );
};
export default About;
