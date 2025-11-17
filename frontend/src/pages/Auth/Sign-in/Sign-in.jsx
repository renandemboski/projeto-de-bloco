import Button from "../../../components/ui/Button/Button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Sign-in.css";

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
      setEmail("");
      setSenha("");
      navigate("/");
    } catch (err) {
      setMensagem("Erro ao conectar com o servidor");
    }
  }

  return (
    <div className="login-container">
      <main>
        <h1>Login</h1>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(event) => setSenha(event.target.value)}
            required
          />
          <Button type="submit">Entrar</Button>
        </form>
        <p>{mensagem}</p>
      </main>
    </div>
  );
};

export default Login;
