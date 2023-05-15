import { Routes } from '@angular/router';
import { authGuard } from './guards/auth/auth.guard';

export const privateRoutes: Routes = [
  {
    canActivate: [authGuard],
    path: '',
    loadComponent: () =>
      import('./private.layout').then((m) => m.PrivateLayout),
    children: [
      {
        path: 'home',
        loadChildren: () =>
          import('./home/home.routes').then((r) => r.homeRoutes),
      },
    ],
  },
];
