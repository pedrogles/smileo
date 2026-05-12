import { Component } from '@angular/core';
import { ServiceRegistrationFormComponent } from './forms/service-registration-form/service-registration-form.component';

@Component({
  selector: 'app-service-registration',
  standalone: true,
  imports: [ServiceRegistrationFormComponent],
  templateUrl: './service-registration.component.html',
  styleUrl: './service-registration.component.scss'
})
export class ServiceRegistrationComponent {

}
