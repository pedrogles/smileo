import { Component } from '@angular/core';
import { ServiceRegistrationFormComponent } from './forms/service-registration-form/service-registration-form.component';
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';

@Component({
  selector: 'app-service-registration',
  standalone: true,
  imports: [
    ServiceRegistrationFormComponent,
    PageHeaderComponent
  ],
  templateUrl: './service-registration.component.html',
  styleUrl: './service-registration.component.scss'
})
export class ServiceRegistrationComponent {

}
