import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Button from "../../components/ui/Button/Button";

const Schedule = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const professional = location.state?.professional;

  const [data, setData] = useState("");
  const [horario, setHorario] = useState("");
  const [observacoes, setObservacoes] = useState("");
  const [mensagem, setMensagem] = useState("");

  const handleSchedule = (e) => {
    e.preventDefault();

    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      navigate("/login");
      return;
    }

    const agendamento = {
      id: Date.now().toString(),
      userId: user.id,
      userName: user.nome,
      professionalId: professional.id,
      professionalName: professional.name,
      professionalImage: professional.image,
      data,
      horario,
      observacoes,
      status: "Agendado",
      createdAt: new Date().toISOString(),
    };

    const agendamentos = JSON.parse(
      localStorage.getItem("agendamentos") || "[]"
    );
    agendamentos.push(agendamento);
    localStorage.setItem("agendamentos", JSON.stringify(agendamentos));

    setMensagem("Consulta agendada com sucesso!");
    setTimeout(() => navigate("/appointments"), 2000);
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
      maxWidth: "600px",
    },
    card: {
      backgroundColor: "var(--card-background)",
      borderRadius: "10px",
      boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
      padding: "2rem",
    },
    title: {
      fontSize: "28px",
      fontWeight: "bold",
      marginBottom: "1rem",
      color: "var(--text-color)",
      textAlign: "center",
    },
    professionalInfo: {
      display: "flex",
      alignItems: "center",
      gap: "1rem",
      padding: "1rem",
      backgroundColor: "var(--background-color)",
      borderRadius: "8px",
      marginBottom: "2rem",
    },
    professionalImage: {
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
    professionalPrice: {
      fontSize: "16px",
      color: "var(--primary-color)",
    },
    form: {
      display: "flex",
      flexDirection: "column",
      gap: "1.5rem",
    },
    label: {
      fontSize: "14px",
      fontWeight: "bold",
      color: "var(--primary-color)",
      marginBottom: "0.5rem",
      display: "block",
    },
    input: {
      padding: "12px",
      fontSize: "16px",
      border: "1px solid var(--border-color)",
      borderRadius: "5px",
      width: "100%",
      boxSizing: "border-box",
      color: "var(--text-color)",
      backgroundColor: "var(--card-background)",
    },
    textarea: {
      padding: "12px",
      fontSize: "16px",
      border: "1px solid var(--border-color)",
      borderRadius: "5px",
      width: "100%",
      boxSizing: "border-box",
      color: "var(--text-color)",
      backgroundColor: "var(--card-background)",
      minHeight: "100px",
      resize: "vertical",
    },
    buttonContainer: {
      display: "flex",
      gap: "1rem",
      marginTop: "1rem",
    },
    message: {
      textAlign: "center",
      marginTop: "1rem",
      color: "var(--success-color)",
      fontWeight: "bold",
    },
  };

  if (!professional) {
    return (
      <div style={styles.container}>
        <Header />
        <main style={styles.main}>
          <div style={styles.content}>
            <p style={{ color: "var(--error-color)", textAlign: "center" }}>
              Nenhum profissional selecionado.
            </p>
            <Button onClick={() => navigate("/")} fullWidth>
              Voltar para Home
            </Button>
          </div>
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
          <div style={styles.card}>
            <h1 style={styles.title}>Agendar Consulta</h1>

            <div style={styles.professionalInfo}>
              <img
                src={professional.image}
                alt={professional.name}
                style={styles.professionalImage}
              />
              <div>
                <div style={styles.professionalName}>{professional.name}</div>
                <div style={styles.professionalPrice}>{professional.price}</div>
              </div>
            </div>

            <form onSubmit={handleSchedule} style={styles.form}>
              <div>
                <label style={styles.label}>Data da Consulta</label>
                <input
                  type="date"
                  value={data}
                  onChange={(e) => setData(e.target.value)}
                  min={new Date().toISOString().split("T")[0]}
                  required
                  style={styles.input}
                />
              </div>

              <div>
                <label style={styles.label}>Horário</label>
                <input
                  type="time"
                  value={horario}
                  onChange={(e) => setHorario(e.target.value)}
                  required
                  style={styles.input}
                />
              </div>

              <div>
                <label style={styles.label}>Observações (opcional)</label>
                <textarea
                  value={observacoes}
                  onChange={(e) => setObservacoes(e.target.value)}
                  placeholder="Descreva brevemente o motivo da consulta..."
                  style={styles.textarea}
                />
              </div>

              <div style={styles.buttonContainer}>
                <Button type="submit" fullWidth>
                  Confirmar Agendamento
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => navigate(-1)}
                  fullWidth
                >
                  Cancelar
                </Button>
              </div>
            </form>

            {mensagem && <p style={styles.message}>{mensagem}</p>}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Schedule;
