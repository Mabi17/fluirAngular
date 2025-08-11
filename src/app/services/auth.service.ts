import { Injectable } from '@angular/core';
import { LoginRequest } from '../interfaces/login-request';
import { Observable, map } from 'rxjs';
import { AuthResponse } from '../interfaces/auth-response';
import { HttpClient } from '@angular/common/http';
import { jwtDecode } from 'jwt-decode';
import { RegisterRequest } from '../interfaces/register-request';
import { UserDetail } from '../interfaces/user-detail';
import { ResetPasswordRequest } from '../interfaces/reset-password-request';
import { ChangePasswordRequest } from '../interfaces/change-password-request';
import { environment } from '../../environments/environment.development';

export interface UserDetailDto {
  id?: string;
  email: string;
  fullName: string;
  phoneNumber: string;
  phoneNumberConfirmed: string;
  password?: string;
  passwordConfirmed?: string;
}

export interface UpdateUserDTO {
  email?: string;
  fullName?: string;
  phoneNumber?: string;
  phoneNumberConfirmed?: boolean;
}

export interface ResetPasswordDTO {
  email: string;
  token: string;
  newPassword: string;
}

@Injectable({
  providedIn: 'root',
})

export class AuthService {
  apiUrl: string = environment.apiUrl;
  private userKey = 'user';

  constructor(private http: HttpClient) {}

  login(data: LoginRequest): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.apiUrl}account/login`, data)
      .pipe(
        map((response) => {
          if (response.isSuccess) {
            localStorage.setItem(this.userKey, JSON.stringify(response));
          }
          return response;
        })
      );
  }

  register(data: RegisterRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}account/register`, data);
  }

  getDetail(): Observable<UserDetail> {
    const authData = localStorage.getItem('user');
    const parsed = authData ? JSON.parse(authData) : '';
    return this.http.get<UserDetail>(`${this.apiUrl}account/detail?idUsuario=${parsed.idUsuario}`);
  }
  
  forgotPassword = (email: string): Observable<AuthResponse> =>
    this.http.post<AuthResponse>(`${this.apiUrl}account/forgot-password`, {
      email,
    });

  changePassword = (data: ChangePasswordRequest): Observable<AuthResponse> =>
    this.http.post<AuthResponse>(`${this.apiUrl}account/change-password`, data);

  getUserDetail = () => {
    const token = this.getToken();
    if (!token) return null;
    const decodedToken: any = jwtDecode(token);
    const userDetail = {
      id: decodedToken.nameid,
      fullName: decodedToken.name,
      email: decodedToken.email
    };

    return userDetail;
  };

  isLoggedIn = (): boolean => {
    const token = this.getToken();
    if (!token) return false;
    return true;
  };

  private isTokenExpired() {
    const token = this.getToken();
    if (!token) return true;
    const decoded = jwtDecode(token);
    const isTokenExpired = Date.now() >= decoded['exp']! * 1000;
    // if (isTokenExpired) this.logout();
    return true;
  }

  getRoles = (): string[] | null => {
    const token = this.getToken();
    if (!token) return null;

    const decodedToken: any = jwtDecode(token);
    return decodedToken.role || null;
  };

  logout = (): void => {
    localStorage.removeItem(this.userKey);
  };

  getAll = (): Observable<UserDetail[]> =>
    this.http.get<UserDetail[]>(`${this.apiUrl}account`);

  refreshToken = (data: {
    email: string;
    token: string;
    refreshToken: string;
  }): Observable<AuthResponse> =>
    this.http.post<AuthResponse>(`${this.apiUrl}account/refresh-token`, data);

  getToken = (): string | null => {
    const user = localStorage.getItem(this.userKey);
    if (!user) return null;
    const userDetail: AuthResponse = JSON.parse(user);
    return userDetail.token;
  };

  getRefreshToken = (): string | null => {
    const user = localStorage.getItem(this.userKey);
    if (!user) return null;
    const userDetail: AuthResponse = JSON.parse(user);
    return userDetail.refreshToken;
  };

  editUser(data: UserDetailDto): Observable<any> {
    return this.http.put(`${this.apiUrl}Account/edit`, data);
  }

  deleteUser(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}Account/${id}`);
  }

  resetPassword(data: ResetPasswordDTO): Observable<any> {
    return this.http.post(`https://localhost:5001/api/auth/reset-password`, data);
  }
}
