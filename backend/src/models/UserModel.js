import fs from "fs";
import path from "path";
import bcrypt from "bcryptjs";

const CAMINHO_ARQUIVO = path.resolve("src/models/users.txt");

export async function register(nome, email, senha) {
  if (!nome || !email || !senha) {
    throw new Error("Nome, email e senha são obrigatórios.");
  }

  const salt = bcrypt.genSaltSync(10);
  const senhaHash = bcrypt.hashSync(senha, salt);

  const linha = `${email};${senhaHash};${nome}\n`;

  if (fs.existsSync(CAMINHO_ARQUIVO)) {
    fs.appendFileSync(CAMINHO_ARQUIVO, linha);
  } else {
    fs.writeFileSync(CAMINHO_ARQUIVO, linha);
  }

  return { ok: true, message: "Usuário cadastrado com sucesso!" };
}

export async function login(email, senha) {
  if (!email || !senha) {
    throw new Error("Email e senha são obrigatórios.");
  }

  if (!fs.existsSync(CAMINHO_ARQUIVO)) {
    throw new Error("Nenhum usuário cadastrado.");
  }

  const conteudo = fs.readFileSync(CAMINHO_ARQUIVO, "utf-8");
  const linhas = conteudo.split("\n").filter((l) => l.trim() !== "");

  let usuarioEncontrado = null;

  for (const linha of linhas) {
    const partes = linha.split(";");
    const emailSalvo = partes[0];
    const senhaHash = partes[1];
    const nome = partes[2];

    if (emailSalvo === email) {
      usuarioEncontrado = { email: emailSalvo, senhaHash, nome };
      break;
    }
  }

  if (!usuarioEncontrado) {
    throw new Error("Usuário não encontrado.");
  }

  const senhaConfere = bcrypt.compareSync(senha, usuarioEncontrado.senhaHash);

  if (!senhaConfere) {
    throw new Error("Senha incorreta.");
  }

  return {
    ok: true,
    message: "Login efetuado com sucesso!",
    user: {
      nome: usuarioEncontrado.nome,
      email: usuarioEncontrado.email,
    },
  };
}
