import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Button from "../../components/ui/Button/Button";

const Appointments = () => {
  const [agendamentos, setAgendamentos] = useState([]);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (!userData) {
      navigate("/login");
      return;
    }

    const parsedUser = JSON.parse(userData);
    setUser(parsedUser);

    const allAgendamentos = JSON.parse(
      localStorage.getItem("agendamentos") || "[]"
    );
    const userAgendamentos = allAgendamentos.filter(
      (ag) => ag.userId === parsedUser.id
    );
    setAgendamentos(userAgendamentos);
  }, [navigate]);

  const handleCancelAppointment = (id) => {
    if (!window.confirm("Tem certeza que deseja cancelar este agendamento?")) {
      return;
    }

    const allAgendamentos = JSON.parse(
      localStorage.getItem("agendamentos") || "[]"
    );
    const updatedAgendamentos = allAgendamentos.filter((ag) => ag.id !== id);
    localStorage.setItem("agendamentos", JSON.stringify(updatedAgendamentos));

    setAgendamentos(agendamentos.filter((ag) => ag.id !== id));
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString + "T00:00:00");
    return date.toLocaleDateString("pt-BR");
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
      fontSize: "28px",
      fontWeight: "bold",
      marginBottom: "2rem",
      color: "var(--text-color)",
      textAlign: "center",
    },
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
      gap: "1.5rem",
    },
    card: {
      backgroundColor: "var(--card-background)",
      borderRadius: "10px",
      boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
      padding: "1.5rem",
      display: "flex",
      flexDirection: "column",
      gap: "1rem",
    },
    header: {
      display: "flex",
      alignItems: "center",
      gap: "1rem",
      paddingBottom: "1rem",
      borderBottom: "1px solid var(--border-color)",
    },
    image: {
      width: "60px",
      height: "60px",
      borderRadius: "50%",
      objectFit: "cover",
    },
    professionalName: {
      fontSize: "18px",
      fontWeight: "bold",
      color: "var(--text-color)",
    },
    infoRow: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    label: {
      fontSize: "14px",
      color: "#999",
    },
    value: {
      fontSize: "16px",
      fontWeight: "bold",
      color: "var(--text-color)",
    },
    status: {
      display: "inline-block",
      padding: "4px 12px",
      borderRadius: "20px",
      fontSize: "14px",
      fontWeight: "bold",
      backgroundColor: "var(--primary-color)",
      color: "#fff",
    },
    observacoes: {
      fontSize: "14px",
      color: "var(--text-color)",
      fontStyle: "italic",
      padding: "0.5rem",
      backgroundColor: "var(--background-color)",
      borderRadius: "5px",
    },
    buttonContainer: {
      display: "flex",
      gap: "0.5rem",
      marginTop: "0.5rem",
    },
    emptyState: {
      textAlign: "center",
      padding: "3rem",
      color: "var(--text-color)",
    },
    emptyText: {
      fontSize: "18px",
      marginBottom: "1.5rem",
    },
  };

  if (!user) {
    return (
      <div style={styles.container}>
        <Header />
        <main style={styles.main}>
          <p style={{ color: "var(--text-color)" }}>Carregando...</p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <Header />
      <main style={styles.main}>
        <div style={styles.content}>
          <h1 style={styles.title}>Meus Agendamentos</h1>

          {agendamentos.length === 0 ? (
            <div style={styles.emptyState}>
              <p style={styles.emptyText}>Você ainda não tem agendamentos.</p>
              <Button onClick={() => navigate("/")}>
                Buscar Profissionais
              </Button>
            </div>
          ) : (
            <div style={styles.grid}>
              {agendamentos.map((agendamento) => (
                <div key={agendamento.id} style={styles.card}>
                  <div style={styles.header}>
                    <img
                      src={agendamento.professionalImage}
                      alt={agendamento.professionalName}
                      style={styles.image}
                    />
                    <div>
                      <div style={styles.professionalName}>
                        {agendamento.professionalName}
                      </div>
                      <span style={styles.status}>{agendamento.status}</span>
                    </div>
                  </div>

                  <div style={styles.infoRow}>
                    <span style={styles.label}>Data:</span>
                    <span style={styles.value}>
                      {formatDate(agendamento.data)}
                    </span>
                  </div>

                  <div style={styles.infoRow}>
                    <span style={styles.label}>Horário:</span>
                    <span style={styles.value}>{agendamento.horario}</span>
                  </div>

                  {agendamento.observacoes && (
                    <div>
                      <span style={styles.label}>Observações:</span>
                      <div style={styles.observacoes}>
                        {agendamento.observacoes}
                      </div>
                    </div>
                  )}

                  <div style={styles.buttonContainer}>
                    <Button
                      variant="secondary"
                      onClick={() => handleCancelAppointment(agendamento.id)}
                      fullWidth
                    >
                      Cancelar Agendamento
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Appointments;
