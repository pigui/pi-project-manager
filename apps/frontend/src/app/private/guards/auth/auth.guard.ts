import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService, RefreshTokenInput } from '@frontend/services';
import { plainToClass } from 'class-transformer';
import { catchError, concatMap, map, of } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);
  // return authService.isLogged() ? true : router.navigate(['sign-in']);
  return authService.refreshToken$.pipe(
    concatMap((refreshToken: string) => {
      if (!refreshToken) {
        router.navigate(['sign-in']);
        return of(false);
      }
      return authService.isLogged$.pipe(
        concatMap((isLogged: boolean) => {
          if (!isLogged) {
            const refreshTokens: RefreshTokenInput = plainToClass(
              RefreshTokenInput,
              refreshToken
            );
            return authService
              .refreshTokens(refreshTokens)
              .pipe(concatMap(() => authService.isLogged$))
              .pipe(map((logged) => logged));
          }
          return of(true);
        })
      );
    }),
    catchError(() => {
      router.navigate(['sign-in']);
      return of(false);
    })
  );
};
