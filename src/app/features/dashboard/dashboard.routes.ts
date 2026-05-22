import { Routes } from "@angular/router";
import { DashboardComponent } from "./pages/dashboard.component";

export const DASHBOARD_ROUTES: Routes = [
  {
        path: '',
        redirectTo: '',
        pathMatch: 'full'
    },
      {
        path: '',
        component: DashboardComponent
      },
    {
        path: '**',
        redirectTo: ''
    }
];