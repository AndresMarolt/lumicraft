import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, tap, throwError } from 'rxjs';
import { LoginRequest } from 'src/app/models/auth/loginRequest';
import { environment } from 'src/environments/environment.development';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private httpClient: HttpClient) {}

  login(credentials: LoginRequest): Observable<any> {
    return this.httpClient
      .post<any>(`${environment.ApiURL}/auth/login`, credentials, httpOptions)
      .pipe(
        tap((response) => {
          console.log(response);

          // const expirationDate = new Date().getTime() + 86400000;
          // localStorage.setItem('token', response.token);
          // localStorage.setItem('token_expiration', expirationDate.toString());
        })
      );
  }

  public isLoggedIn(): boolean {
    const token = localStorage.getItem('token_lumicraft');
    const expiration = localStorage.getItem('token_lumicraft_expiration');
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
