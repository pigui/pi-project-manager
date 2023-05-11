import { Routes } from '@angular/router';

export const publicRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./public.layout').then((m) => m.PublicLayout),
    children: [
      {
        path: '',
        redirectTo: 'sign-up',
        pathMatch: 'full',
      },
      {
        path: 'sign-up',
        loadComponent: () =>
          import('./sign-up/sign-up.component').then((m) => m.SignUpComponent),
      },
    ],
  },
];
