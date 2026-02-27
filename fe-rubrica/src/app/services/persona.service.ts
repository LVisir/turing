import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  ApiResponse,
  Persona,
  PersonaRequestDTO,
  PersonaTableDTO,
} from '../interfaces/api.response';
import { API_ENDPOINTS } from '../configs/api-endpoints';

@Injectable({
  providedIn: 'root',
})
export class PersonaService {
  constructor(private http: HttpClient) {}

  getRubrica(): Observable<ApiResponse<Array<PersonaTableDTO>>> {
    return this.http.get<ApiResponse<Array<PersonaTableDTO>>>(
      API_ENDPOINTS.PERSONA.RUBRICA,
    );
  }

  addPersona(p: PersonaRequestDTO): Observable<ApiResponse<PersonaTableDTO>> {
    return this.http.post<ApiResponse<PersonaTableDTO>>(
      API_ENDPOINTS.PERSONA.ADD,
      p,
    );
  }

  updatePersona(p: Persona): Observable<ApiResponse<PersonaTableDTO>> {
    return this.http.put<ApiResponse<PersonaTableDTO>>(
      API_ENDPOINTS.PERSONA.RUBRICA + `/${p.id}`,
      p,
    );
  }

  deletePersona(id: number): Observable<ApiResponse<Boolean>> {
    return this.http.delete<ApiResponse<Boolean>>(
      API_ENDPOINTS.PERSONA.RUBRICA + `/${id}`,
    );
  }

  getPersonaById(
    idPersona: number,
  ): Observable<ApiResponse<PersonaRequestDTO>> {
    return this.http.get<ApiResponse<PersonaRequestDTO>>(
      API_ENDPOINTS.PERSONA.RUBRICA + `/${idPersona}`,
    );
  }
}
