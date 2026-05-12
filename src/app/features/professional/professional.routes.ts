import { Routes } from "@angular/router";
import { ProfessionalRegistrationComponent } from "./pages/professional-registration/professional-registration.component";

export const PROFESSIONAL_ROUTES: Routes = [
    {
        path: '',
        redirectTo: 'novo',
        pathMatch: 'full'
    },
    { 
        path: 'novo', 
        component: ProfessionalRegistrationComponent, 
    },
    {
        path: '**',
        redirectTo: 'novo'
    }

];