import { Routes } from "@angular/router";

export default [
    {
    path: 'login',
    loadComponent: () =>
      import('./dashboard/dashboard.component').then((m) => m.DashboardComponent)
  },
] as Routes;
