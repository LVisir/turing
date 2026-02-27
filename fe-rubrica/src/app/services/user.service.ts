import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse, LoginResponse } from '../interfaces/api.response';
import { API_ENDPOINTS } from '../configs/api-endpoints';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  login(credentials: {
    username: string;
    password: string;
  }): Observable<ApiResponse<LoginResponse>> {
    return this.http.post<ApiResponse<LoginResponse>>(
      API_ENDPOINTS.LOGIN,
      credentials,
    );
  }
}
