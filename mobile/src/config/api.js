// Configuração da API
// Para desenvolvimento, use o IP da sua máquina na rede local
//http://SEU_IP_IPV4:3000

export const API_BASE_URL = '';

export const API_ENDPOINTS = {
  // Profissionais
  PROFESSIONALS: `${API_BASE_URL}/profissionais`,
  PROFESSIONAL_BY_ID: (id) => `${API_BASE_URL}/profissionais/${id}`,

  // Autenticação
  LOGIN: `${API_BASE_URL}/user/login`,
  REGISTER: `${API_BASE_URL}/user/register`,

  // Usuários
  USERS: `${API_BASE_URL}/user`,
  USER_BY_ID: (id) => `${API_BASE_URL}/user/${id}`,
};
