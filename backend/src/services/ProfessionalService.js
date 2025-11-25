import fs from "fs";
import path from "path";

const PROFESSIONALS_FILE = path.resolve("src/data/profissionais.json");

function readProfessionals() {
  if (!fs.existsSync(PROFESSIONALS_FILE)) {
    return [];
  }
  const data = fs.readFileSync(PROFESSIONALS_FILE, "utf-8");
  return JSON.parse(data);
}

export async function getAllProfessionals() {
  return readProfessionals();
}

export async function getProfessionalById(id) {
  const professionals = readProfessionals();
  const professional = professionals.find(p => p.id === parseInt(id));

  if (!professional) {
    throw new Error("Profissional não encontrado.");
  }

  return professional;
}
