import { Routes } from "@angular/router";
import { AppointmentRegistrationComponent } from "./pages/appointment-registration/appointment-registration.component";

export const APPOINTMENT_ROUTES: Routes = [
    {
        path: '',
        redirectTo: 'novo',
        pathMatch: 'full'
    },
    { 
        path: 'novo', 
        component: AppointmentRegistrationComponent, 
    },
    {
        path: '**',
        redirectTo: 'novo'
    }
];