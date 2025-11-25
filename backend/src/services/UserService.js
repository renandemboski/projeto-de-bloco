import fs from "fs";
import path from "path";
import bcrypt from "bcryptjs";

const USERS_FILE = path.resolve("src/data/users.json");

function readUsers() {
  if (!fs.existsSync(USERS_FILE)) {
    return [];
  }
  const data = fs.readFileSync(USERS_FILE, "utf-8");
  return JSON.parse(data);
}

function writeUsers(users) {
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
}

export async function register(nome, email, senha) {
  if (!nome || !email || !senha) {
    throw new Error("Nome, email e senha são obrigatórios.");
  }

  const users = readUsers();

  if (users.find(u => u.email === email)) {
    throw new Error("Email já cadastrado.");
  }

  const salt = bcrypt.genSaltSync(10);
  const senhaHash = bcrypt.hashSync(senha, salt);

  const newUser = {
    id: Date.now().toString(),
    nome,
    email,
    senha: senhaHash,
  };

  users.push(newUser);
  writeUsers(users);

  return {
    ok: true,
    message: "Usuário cadastrado com sucesso!",
    user: { id: newUser.id, nome, email }
  };
}

export async function login(email, senha) {
  if (!email || !senha) {
    throw new Error("Email e senha são obrigatórios.");
  }

  const users = readUsers();
  const user = users.find(u => u.email === email);

  if (!user) {
    throw new Error("Usuário não encontrado.");
  }

  const senhaConfere = bcrypt.compareSync(senha, user.senha);

  if (!senhaConfere) {
    throw new Error("Senha incorreta.");
  }

  return {
    ok: true,
    message: "Login efetuado com sucesso!",
    user: {
      id: user.id,
      nome: user.nome,
      email: user.email,
    },
  };
}

export async function getUserById(id) {
  const users = readUsers();
  const user = users.find(u => u.id === id);

  if (!user) {
    throw new Error("Usuário não encontrado.");
  }

  const { senha, ...userWithoutPassword } = user;
  return userWithoutPassword;
}

export async function updateUser(id, updates) {
  const users = readUsers();
  const index = users.findIndex(u => u.id === id);

  if (index === -1) {
    throw new Error("Usuário não encontrado.");
  }

  if (updates.senha) {
    const salt = bcrypt.genSaltSync(10);
    updates.senha = bcrypt.hashSync(updates.senha, salt);
  }

  users[index] = { ...users[index], ...updates };
  writeUsers(users);

  const { senha, ...userWithoutPassword } = users[index];
  return userWithoutPassword;
}

export async function deleteUser(id) {
  const users = readUsers();
  const filteredUsers = users.filter(u => u.id !== id);

  if (users.length === filteredUsers.length) {
    throw new Error("Usuário não encontrado.");
  }

  writeUsers(filteredUsers);
  return { ok: true, message: "Usuário deletado com sucesso!" };
}
