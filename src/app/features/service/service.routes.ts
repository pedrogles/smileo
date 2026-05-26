import { Routes } from "@angular/router";
import { ServiceRegistrationComponent } from "./pages/service-registration/service-registration.component";

export const SERVICE_ROUTES: Routes = [
    {
        path: '',
        redirectTo: 'novo',
        pathMatch: 'full'
    },
    { 
        path: 'novo', 
        component: ServiceRegistrationComponent, 
    },
    {
        path: '**',
        redirectTo: 'novo'
    }

];