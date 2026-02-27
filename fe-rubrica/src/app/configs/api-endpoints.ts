const baseUrl = 'http://localhost:8091';

export const API_ENDPOINTS = {
  LOGIN: `${baseUrl}/utente/login`,
  REGISTRATION: `${baseUrl}/utente/register`,
  PERSONA: {
    RUBRICA: `${baseUrl}/rubrica`,
    ADD: `${baseUrl}/rubrica/add`,
  },
} as const;
