import { register, login } from "../models/UserModel.js";

export async function registrarHandle(req, res) {
  const { nome, email, senha } = req.body;
  const resposta = await register(nome, email, senha);
  res.json(resposta);
}

export async function loginHandle(req, res) {
  const { email, senha } = req.body;

  try {
    const resposta = await login(email, senha);
    res.json(resposta);
  } catch (erro) {
    res.status(400).json({ error: erro.message });
  }
}
