import { Routes } from '@angular/router';

export const routes: Routes = [
    {
    path: '',
    redirectTo: 'app/dashboard',
    pathMatch: 'full'
  },
  {
    path: 'app',
    loadComponent: () =>
      import('./core/layouts/app-layout/app-layout.component').then(m => m.AppLayoutComponent),
    children: [
      {
        path: 'pacientes',
        loadChildren: () =>
          import('./features/patient/patient.routes').then(m => m.PATIENT_ROUTES)
      },
      {
        path: 'servicos',
        loadChildren: () =>
          import('./features/service/service.routes').then(m => m.SERVICE_ROUTES)
      },
      {
        path: 'gestao',
        loadChildren: () =>
          import('./features/management/management.routes').then(m => m.MANAGEMENT_ROUTES)
      },
      {
        path: 'profissionais',
        loadChildren: () =>
          import('./features/professional/professional.routes').then(m => m.PROFESSIONAL_ROUTES)
      },
      {
        path: 'agendamentos',
        loadChildren: () =>
          import('./features/appointment/appointment.routes').then(m => m.APPOINTMENT_ROUTES)
      },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./features/dashboard/dashboard.routes').then(m => m.DASHBOARD_ROUTES)
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'app/pacientes/novo'
  }
];