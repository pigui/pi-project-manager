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
        title: 'sign-up',
        path: 'sign-up',
        loadComponent: () =>
          import('./sign-up/sign-up.component').then((m) => m.SignUpComponent),
      },
      {
        title: 'sign-ip',
        path: 'sign-in',
        loadComponent: () =>
          import('./sign-in/sign-in.component').then((m) => m.SignInComponent),
      },
    ],
  },
];
