import "./Professional.css";
import Card from "../../components/Card";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const About = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (location.state?.user) {
      setUser(location.state.user);
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [location.state]);

  return (
    <div className="about-container">
      <Header />
      <main className="about-main">
        {loading ? (
          <p>Carregando...</p>
        ) : user ? (
          <Card
            title={user.name}
            description={`Email: ${user.email}\nTelefone: ${user.phone}\n`}
            price={`R$ ${Math.floor(Math.random() * 100 + 50)},00`}
            imageSrc={`https://i.pravatar.cc/150?img=${user.id}`}
            buttonText="Voltar para Home"
            onButtonClick={() => navigate("/")}
          />
        ) : (
          <p>Nenhum usuário selecionado.</p>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default About;
