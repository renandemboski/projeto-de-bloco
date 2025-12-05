import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Button from "../../components/ui/Button/Button";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mensagem, setMensagem] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (!userData) {
      navigate("/login");
      return;
    }

    const parsedUser = JSON.parse(userData);
    setUser(parsedUser);
    setNome(parsedUser.nome);
    setEmail(parsedUser.email);
  }, [navigate]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const updates = { nome, email };
      if (senha) {
        updates.senha = senha;
      }

      const resposta = await fetch(`http://localhost:3000/user/${user.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      });

      const data = await resposta.json();

      if (!resposta.ok) {
        setMensagem(data.error || "Erro ao atualizar");
        return;
      }

      localStorage.setItem("user", JSON.stringify(data.user));
      setUser(data.user);
      setNome(data.user.nome);
      setEmail(data.user.email);
      setSenha("");
      setIsEditing(false);
      setMensagem("Perfil atualizado com sucesso!");
    } catch (err) {
      setMensagem("Erro ao conectar com o servidor");
    }
  };

  const handleDelete = async () => {
    console.log("handleDelete called");
    if (
      !window.confirm(
        "Tem certeza que deseja excluir sua conta? Esta ação não pode ser desfeita."
      )
    ) {
      console.log("User cancelled deletion");
      return;
    }

    console.log("User confirmed deletion, sending request...");
    try {
      const resposta = await fetch(`http://localhost:3000/user/${user.id}`, {
        method: "DELETE",
      });

      console.log("Response status:", resposta.status);
      const data = await resposta.json();
      console.log("Response data:", data);

      if (!resposta.ok) {
        console.error("Delete failed:", data.error);
        setMensagem(data.error || "Erro ao excluir conta");
        return;
      }

      console.log(
        "Delete successful, clearing local storage and navigating..."
      );
      localStorage.removeItem("user");
      navigate("/");
    } catch (err) {
      console.error("Delete error:", err);
      setMensagem("Erro ao conectar com o servidor");
    }
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
      marginBottom: "2rem",
      color: "var(--text-color)",
      textAlign: "center",
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
      padding: "12px",
      backgroundColor: "var(--background-color)",
      borderRadius: "5px",
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
    buttonContainer: {
      display: "flex",
      gap: "1rem",
      marginTop: "2rem",
      flexWrap: "wrap",
    },
    message: {
      textAlign: "center",
      marginTop: "1rem",
      color: mensagem.includes("sucesso")
        ? "var(--success-color)"
        : "var(--error-color)",
      fontWeight: "bold",
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
          <div style={styles.card}>
            <h1 style={styles.title}>Meu Perfil</h1>

            {!isEditing ? (
              <>
                <div style={styles.infoSection}>
                  <span style={styles.label}>Nome</span>
                  <div style={styles.text}>{user.nome}</div>
                </div>

                <div style={styles.infoSection}>
                  <span style={styles.label}>Email</span>
                  <div style={styles.text}>{user.email}</div>
                </div>

                <div style={styles.buttonContainer}>
                  <Button onClick={() => setIsEditing(true)} fullWidth>
                    Editar Perfil
                  </Button>
                  <Button variant="secondary" onClick={handleDelete} fullWidth>
                    Excluir Conta
                  </Button>
                </div>
              </>
            ) : (
              <form onSubmit={handleUpdate}>
                <div style={styles.infoSection}>
                  <span style={styles.label}>Nome</span>
                  <input
                    type="text"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    required
                    style={styles.input}
                  />
                </div>

                <div style={styles.infoSection}>
                  <span style={styles.label}>Email</span>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    style={styles.input}
                  />
                </div>

                <div style={styles.infoSection}>
                  <span style={styles.label}>Nova Senha (opcional)</span>
                  <input
                    type="password"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    placeholder="Deixe em branco para manter a atual"
                    style={styles.input}
                  />
                </div>

                <div style={styles.buttonContainer}>
                  <Button type="submit" fullWidth>
                    Salvar Alterações
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={() => {
                      setIsEditing(false);
                      setNome(user.nome);
                      setEmail(user.email);
                      setSenha("");
                      setMensagem("");
                    }}
                    fullWidth
                  >
                    Cancelar
                  </Button>
                </div>
              </form>
            )}

            {mensagem && <p style={styles.message}>{mensagem}</p>}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Profile;
