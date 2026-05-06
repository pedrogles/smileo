import { Routes } from "@angular/router";
import { PatientManagementComponent } from "./pages/patient-management/patient-management.component";

export const MANAGEMENT_ROUTES: Routes = [
    {
        path: '',
        redirectTo: 'pacientes',
        pathMatch: 'full'
    },
    { 
        path: 'pacientes', 
        component: PatientManagementComponent, 
    },
    {
        path: '**',
        redirectTo: 'pacientes'
    }

];