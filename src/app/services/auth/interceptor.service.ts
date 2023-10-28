import { Injectable, inject } from '@angular/core';
import { AuthService } from './auth.service';
import {
  HTTP_INTERCEPTORS,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InterceptorService implements HttpInterceptor {
  private authService = inject(AuthService);

  intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const token = this.authService.getToken();

    if (token) {
      const cloned = req.clone({
        headers: req.headers
          .set('Authorization', `Bearer ${token}`)
          .set('Content-Type', 'application/json; charset=utf-8')
          .set('Accept', 'application/json; charset=utf-8'),
      });
      return next.handle(cloned);
    }
    return next.handle(req);
  }
}
export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true },
];
