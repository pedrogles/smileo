import { Routes } from "@angular/router";
import { PatientManagementComponent } from "./pages/patient-management/patient-management.component";
import { ProfessionalManagementComponent } from "./pages/professional-management/professional-management.component";
import { ServiceManagementComponent } from "./pages/service-management/service-management.component";

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
        path: 'profissionais', 
        component: ProfessionalManagementComponent, 
    },
    { 
        path: 'servicos', 
        component: ServiceManagementComponent, 
    },
    {
        path: '**',
        redirectTo: 'pacientes'
    }
];