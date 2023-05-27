import { Routes } from '@angular/router';

export const projectRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./project.component').then((c) => c.ProjectComponent),
  },
];
