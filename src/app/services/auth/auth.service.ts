import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, catchError, of, tap, throwError } from 'rxjs';
import { LoginRequest } from 'src/app/models/auth/loginRequest';
import { LoginResponse } from 'src/app/models/auth/loginResponse';
import { User } from 'src/app/models/user';
import { environment } from 'src/environments/environment.development';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private httpClient: HttpClient) {}

  login(credentials: LoginRequest): Observable<LoginResponse> {
    return this.httpClient
      .post<LoginResponse>(
        `${environment.ApiURL}/auth/login`,
        credentials,
        httpOptions
      )
      .pipe(
        tap((response) => {
          const expirationDate = new Date().getTime() + 86400000;
          localStorage.setItem('lumicraft_token', response.token);
          localStorage.setItem(
            'lumicraft_token_expiration',
            expirationDate.toString()
          );
        }),
        catchError(this.handleError)
      );
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
