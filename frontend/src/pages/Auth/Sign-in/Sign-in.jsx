import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../../components/ui/Button/Button";

const Login = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mensagem, setMensagem] = useState("");
  const navigate = useNavigate();

  async function handleLogin(event) {
    event.preventDefault();

    try {
      const resposta = await fetch("http://localhost:3000/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, senha }),
      });

      const data = await resposta.json();

      if (!resposta.ok) {
        setMensagem(data.error || "Erro desconhecido");
        return;
      }

      localStorage.setItem("user", JSON.stringify(data.user));
      setMensagem("Login bem-sucedido!");
      navigate("/");
    } catch (err) {
      setMensagem("Erro ao conectar com o servidor");
    }
  }

  const styles = {
    container: {
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "var(--background-color)",
    },
    card: {
      width: "100%",
      maxWidth: "400px",
      padding: "40px",
      backgroundColor: "var(--card-background)",
      borderRadius: "10px",
      boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
      margin: "20px",
    },
    title: {
      textAlign: "center",
      marginBottom: "30px",
      color: "var(--text-color)",
      fontSize: "24px",
    },
    form: {
      display: "flex",
      flexDirection: "column",
      gap: "15px",
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
    message: {
      textAlign: "center",
      marginTop: "15px",
      color: mensagem.includes("sucesso")
        ? "var(--success-color)"
        : "var(--error-color)",
      fontWeight: "bold",
    },
    link: {
      textAlign: "center",
      marginTop: "20px",
      color: "var(--primary-color)",
      cursor: "pointer",
      textDecoration: "underline",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Login</h1>
        <form onSubmit={handleLogin} style={styles.form}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={styles.input}
          />
          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
            style={styles.input}
          />
          <Button type="submit" fullWidth>
            Entrar
          </Button>
        </form>
        {mensagem && <p style={styles.message}>{mensagem}</p>}
        <p style={styles.link} onClick={() => navigate("/register")}>
          Não tem conta? Cadastre-se
        </p>
        <p style={styles.link} onClick={() => navigate("/")}>
          Ver profissionais
        </p>
      </div>
    </div>
  );
};

export default Login;
