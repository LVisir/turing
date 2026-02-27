export interface ApiResponse<T> {
  success: boolean;
  body: T | null;
  error: ApiError | null;
}

export interface ApiError {
  message: string;
  status: number;
}

export interface UserLoginDTO {
  id: number;
  username: string;
}

export interface LoginResponse {
  jwt: string;
  user: UserLoginDTO;
}

export interface PersonaTableDTO {
  id: number;
  nome: string;
  cognome: string;
  telefono: string;
}

export interface PersonaRequestDTO {
  nome: string;
  cognome: string;
  telefono: string;
  indirizzo: string;
  eta: number;
}

export interface Persona {
  id: number;
  nome: string;
  cognome: string;
  telefono: string;
  indirizzo: string;
  eta: number;
}
