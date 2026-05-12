import { Component } from '@angular/core';
import { PatientRegistrationFormComponent } from './forms/patient-registration-form/patient-registration-form.component';
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';

@Component({
  selector: 'app-patient-registration',
  standalone: true,
  imports: [
    PatientRegistrationFormComponent,
    PageHeaderComponent
  ],
  templateUrl: './patient-registration.component.html',
  styleUrl: './patient-registration.component.scss'
})
export class PatientRegistrationComponent {

}
