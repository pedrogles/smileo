import { Routes } from "@angular/router";
import { PatientRegistrationComponent } from "./pages/patient-registration/patient-registration.component";

export const PATIENT_ROUTES: Routes = [
    {
        path: '',
        redirectTo: 'novo',
        pathMatch: 'full'
    },
    { 
        path: 'novo', 
        component: PatientRegistrationComponent, 
    },
    {
        path: '**',
        redirectTo: 'novo'
    }

];