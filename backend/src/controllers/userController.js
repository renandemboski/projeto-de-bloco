import { register, login, getUserById, updateUser, deleteUser } from "../services/UserService.js";

export async function registrarHandle(req, res) {
  try {
    const { nome, email, senha } = req.body;
    const resposta = await register(nome, email, senha);
    res.json(resposta);
  } catch (erro) {
    res.status(400).json({ error: erro.message });
  }
}

export async function loginHandle(req, res) {
  try {
    const { email, senha } = req.body;
    const resposta = await login(email, senha);
    res.json(resposta);
  } catch (erro) {
    res.status(400).json({ error: erro.message });
  }
}

export async function getUserByIdHandle(req, res) {
  try {
    const { id } = req.params;
    const user = await getUserById(id);
    res.json(user);
  } catch (erro) {
    res.status(404).json({ error: erro.message });
  }
}

export async function updateUserHandle(req, res) {
  try {
    const { id } = req.params;
    const updates = req.body;
    const user = await updateUser(id, updates);
    res.json({ ok: true, message: "Usuário atualizado com sucesso!", user });
  } catch (erro) {
    res.status(400).json({ error: erro.message });
  }
}

export async function deleteUserHandle(req, res) {
  try {
    const { id } = req.params;
    const resposta = await deleteUser(id);
    res.json(resposta);
  } catch (erro) {
    res.status(404).json({ error: erro.message });
  }
}
