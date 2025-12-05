import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Card from "../../components/Card";

const Home = () => {
  const [profissionais, setProfissionais] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3000/profissionais")
      .then((res) => {
        if (!res.ok) throw new Error("Erro ao carregar profissionais");
        return res.json();
      })
      .then((data) => {
        setProfissionais(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erro:", err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const handleProfessionalClick = (professional) => {
    navigate("/professional", { state: { professional } });
  };

  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      minHeight: "100vh",
      backgroundColor: "var(--background-color)",
    },
    main: {
      flex: 1,
      padding: "2rem 1rem",
      display: "flex",
      justifyContent: "center",
    },
    content: {
      width: "100%",
      maxWidth: "1280px",
    },
    title: {
      textAlign: "center",
      fontSize: "28px",
      color: "var(--text-color)",
      marginBottom: "2rem",
    },
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
      gap: "1.5rem",
      alignItems: "stretch",
    },
    loading: {
      textAlign: "center",
      fontSize: "18px",
      color: "var(--text-color)",
      padding: "2rem",
    },
    error: {
      textAlign: "center",
      fontSize: "18px",
      color: "var(--error-color)",
      padding: "2rem",
    },
  };

  return (
    <div style={styles.container}>
      <Header />
      <main style={styles.main}>
        <div style={styles.content}>
          <h2 style={styles.title}>Nossos Profissionais</h2>

          {loading && <p style={styles.loading}>Carregando profissionais...</p>}

          {error && <p style={styles.error}>{error}</p>}

          {!loading && !error && (
            <div style={styles.grid}>
              {profissionais.map((prof) => (
                <Card
                  key={prof.id}
                  title={prof.name}
                  description={prof.description}
                  price={prof.price}
                  imageSrc={prof.image}
                  buttonText="Ver Detalhes"
                  onButtonClick={() => handleProfessionalClick(prof)}
                />
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Home;

