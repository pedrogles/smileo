import { Component } from '@angular/core';
import { AppointmentRegistrationFormComponent } from './forms/appointment-registration-form/appointment-registration-form.component';
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';

@Component({
  selector: 'app-appointment-registration',
  standalone: true,
  imports: [
    AppointmentRegistrationFormComponent,
    PageHeaderComponent
  ],
  templateUrl: './appointment-registration.component.html',
  styleUrl: './appointment-registration.component.scss'
})
export class AppointmentRegistrationComponent {

}
