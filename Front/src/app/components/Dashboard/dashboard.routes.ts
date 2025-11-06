import { Routes } from '@angular/router';

export default [
  {
    path: '',
    loadComponent: () =>
      import('./dashboard/dashboard.component').then((m) => m.DashboardComponent),
    children: [
      {
        path: '',
        redirectTo: 'tasks',
        pathMatch: 'full'
      },
      {
        path: 'tasks',
        loadComponent: () =>
          import('./table/table.component').then((m) => m.TableComponent)
      },
      {
        path: 'tasks/new',
        loadComponent: () =>
          import('./form-task/form-task.component').then((m) => m.FormTaskComponent)
      },
      {
        path: 'tasks/:id',
        loadComponent: () =>
          import('./form-task/form-task.component').then((m) => m.FormTaskComponent)
      }
    ]
  }
] as Routes;
