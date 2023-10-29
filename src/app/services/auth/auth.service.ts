import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { LoginRequest } from 'src/app/models/auth/loginRequest';
import { LoginResponse } from 'src/app/models/auth/loginResponse';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private httpClient = inject(HttpClient);

  login(credentials: LoginRequest): Observable<LoginResponse> {
    return this.httpClient
      .post<LoginResponse>(`${environment.ApiURL}/auth/login`, credentials)
      .pipe(
        tap((response) => {
          this.saveNewToken(response.token);
        }),
        catchError(this.handleError)
      );
  }

  signup(credentials: LoginRequest): Observable<LoginResponse> {
    return this.httpClient
      .post<LoginResponse>(`${environment.ApiURL}/auth/signup`, credentials)
      .pipe(
        tap((response) => {
          this.saveNewToken(response.token);
        }),
        catchError(this.handleError)
      );
  }

  public getToken(): string | null {
    return localStorage.getItem('lumicraft_token') || null;
  }

  public logout() {
    localStorage.removeItem('lumicraft_token');
    localStorage.removeItem('lumicraft_token_expiration');
  }

  public isLoggedIn(): boolean {
    const token = localStorage.getItem('lumicraft_token');
    const expiration = localStorage.getItem('lumicraft_token_expiration');
    if (token && expiration) {
      const expirationDate = new Date(parseInt(expiration));
      return expirationDate > new Date();
    }
    return false;
  }

  private saveNewToken(token: string) {
    const expirationDate = new Date().getTime() + 3600000 * 24 * 2; // 1 hora * 24 * 2 = Expira luego de 2 días
    localStorage.setItem('lumicraft_token', token);
    localStorage.setItem(
      'lumicraft_token_expiration',
      expirationDate.toString()
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('Se ha producido un error', error.error);
    } else {
      console.error(
        'Backend retornó el código de estado ',
        error.status,
        error.error
      );
    }
    return throwError(
      () => new Error('Algo falló, por favor intente nuevamente')
    );
  }
}
