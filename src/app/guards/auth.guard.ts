import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { catchError, map, of } from 'rxjs';

export const AuthGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const loginService = inject(AuthService);
  const router = inject(Router);

  return loginService.isLoggedIn().pipe(
    map((loggedIn) =>
      loggedIn ? true : router.createUrlTree([router.parseUrl('/login')])
    ),
    catchError((err) => {
      console.log(err);

      router.navigate(['/login']);
      return of(false);
    })
  );
};
