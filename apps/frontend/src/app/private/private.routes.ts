import { Routes } from '@angular/router';

export const privateRoutes: Routes = [
  {
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
