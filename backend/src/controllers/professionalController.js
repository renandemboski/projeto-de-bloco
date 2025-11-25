import { getAllProfessionals, getProfessionalById } from "../services/ProfessionalService.js";

export async function getAllProfessionalsHandle(req, res) {
  try {
    const professionals = await getAllProfessionals();
    res.json(professionals);
  } catch (erro) {
    res.status(500).json({ error: erro.message });
  }
}

export async function getProfessionalByIdHandle(req, res) {
  try {
    const { id } = req.params;
    const professional = await getProfessionalById(id);
    res.json(professional);
  } catch (erro) {
    res.status(404).json({ error: erro.message });
  }
}
