import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, catchError, tap, throwError } from 'rxjs';
import { JwtPayload, jwtDecode } from 'jwt-decode';
import { LoginRequest } from 'src/app/models/auth/loginRequest.interface';
import { AuthResponse } from 'src/app/models/auth/authResponse.interface';
import { environment } from 'src/environments/environment.development';
import { User } from 'src/app/models/user.interface';
import { SignupRequest } from 'src/app/models/auth/signupRequest';

interface JwtCustomPayload extends JwtPayload {
  role: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private httpClient = inject(HttpClient);
  private userSubject: BehaviorSubject<User | null> =
    new BehaviorSubject<User | null>(null);
  public user$ = this.userSubject.asObservable();

  public login(credentials: LoginRequest): Observable<AuthResponse> {
    return this.httpClient
      .post<AuthResponse>(`${environment.ApiURL}/auth/login`, credentials)
      .pipe(
        tap((response) => {
          this.handleAuthResponse(response);
        }),
        catchError(this.handleError)
      );
  }

  public signup(newUserData: SignupRequest): Observable<AuthResponse> {
    return this.httpClient
      .post<AuthResponse>(`${environment.ApiURL}/auth/signup`, newUserData)
      .pipe(
        tap((response) => {
          console.log(response);

          this.handleAuthResponse(response);
        }),
        catchError(this.handleError)
      );
  }

  private handleAuthResponse(response: AuthResponse): void {
    const {
      username,
      first_name,
      last_name,
      email,
      address,
      city,
      country,
      phone,
      date_of_birth,
    } = response;
    this.userSubject.next({
      username,
      first_name,
      last_name,
      email,
      address: address ?? '',
      city: city ?? '',
      country: country ?? '',
      phone: phone ?? '',
      date_of_birth: date_of_birth ?? undefined,
    });
    localStorage.setItem(
      'lumicraft_user',
      JSON.stringify({
        username,
        first_name,
        last_name,
        email,
        address: address ?? '',
        city: city ?? '',
        country: country ?? '',
        phone: phone ?? '',
        date_of_birth: date_of_birth ?? '',
      })
    );
    this.saveNewToken(response.token);
  }

  public getToken(): string | null {
    return localStorage.getItem('lumicraft_token') || null;
  }

  public getUser(): User | null {
    return JSON.parse(localStorage.getItem('lumicraft_user')!) || null;
  }

  public logout() {
    localStorage.removeItem('lumicraft_token');
    localStorage.removeItem('lumicraft_token_expiration');
    localStorage.removeItem('lumicraft_user');

    this.userSubject.next(null);
  }

  public isAdmin(): boolean {
    const token = localStorage.getItem('lumicraft_token');
    if (token) {
      const decodedToken: JwtCustomPayload | null = this.decodeToken(token);
      if (decodedToken) {
        return decodedToken.role === 'ADMIN';
      }
    }
    return false;
  }

  private decodeToken(token: string): JwtCustomPayload | null {
    try {
      const decodedToken: JwtCustomPayload = jwtDecode(token);
      return decodedToken;
    } catch (error) {
      console.error('Error al decodificar el token: ', error);
      return null;
    }
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
