import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Button from "../../components/ui/Button/Button";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const Professional = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [professional, setProfessional] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (location.state?.professional) {
      setProfessional(location.state.professional);
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [location.state]);

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
      maxWidth: "800px",
      width: "100%",
      margin: "0 auto",
    },
    card: {
      backgroundColor: "var(--card-background)",
      borderRadius: "10px",
      boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
      overflow: "hidden",
      padding: "4px",
    },
    imageContainer: {
      width: "100%",
      height: "300px",
      overflow: "hidden",
    },
    image: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      borderRadius: "8px",
    },
    content: {
      padding: "2rem",
    },
    title: {
      fontSize: "28px",
      fontWeight: "bold",
      marginBottom: "1rem",
      color: "var(--text-color)",
    },
    infoSection: {
      marginBottom: "1.5rem",
    },
    label: {
      fontSize: "14px",
      fontWeight: "bold",
      color: "var(--primary-color)",
      marginBottom: "0.5rem",
      display: "block",
    },
    text: {
      fontSize: "16px",
      color: "var(--text-color)",
      lineHeight: "1.6",
    },
    price: {
      fontSize: "24px",
      fontWeight: "bold",
      color: "var(--primary-color)",
      marginBottom: "1.5rem",
    },
    buttonContainer: {
      display: "flex",
      gap: "1rem",
      marginTop: "2rem",
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

  if (loading) {
    return (
      <div style={styles.container}>
        <Header />
        <main style={styles.main}>
          <p style={styles.loading}>Carregando...</p>
        </main>
        <Footer />
      </div>
    );
  }

  if (!professional) {
    return (
      <div style={styles.container}>
        <Header />
        <main style={styles.main}>
          <p style={styles.error}>Nenhum profissional selecionado.</p>
          <Button onClick={() => navigate("/")} fullWidth>
            Voltar para Home
          </Button>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <Header />
      <main style={styles.main}>
        <div style={styles.card}>
          <div style={styles.imageContainer}>
            <img
              src={professional.image}
              alt={professional.name}
              style={styles.image}
            />
          </div>

          <div style={styles.content}>
            <h1 style={styles.title}>{professional.name}</h1>

            <div style={styles.infoSection}>
              <span style={styles.label}>Especialidade</span>
              <p style={styles.text}>{professional.description}</p>
            </div>

            <div style={styles.infoSection}>
              <span style={styles.label}>Email</span>
              <p style={styles.text}>{professional.email}</p>
            </div>

            <div style={styles.infoSection}>
              <span style={styles.label}>Telefone</span>
              <p style={styles.text}>{professional.phone}</p>
            </div>

            <div style={styles.infoSection}>
              <span style={styles.label}>Valor da Consulta</span>
              <p style={styles.price}>{professional.price}</p>
            </div>

            <div style={styles.buttonContainer}>
              <Button onClick={() => navigate("/")} fullWidth>
                Voltar
              </Button>
              <Button
                onClick={() =>
                  navigate("/schedule", { state: { professional } })
                }
                fullWidth
              >
                Agendar Consulta
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Professional;
