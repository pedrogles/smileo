import { Component } from '@angular/core';
import { ProfessionalRegistrationFormComponent } from './forms/professional-registration-form/professional-registration-form.component';

@Component({
  selector: 'app-professional-registration',
  standalone: true,
  imports: [ProfessionalRegistrationFormComponent],
  templateUrl: './professional-registration.component.html',
  styleUrl: './professional-registration.component.scss'
})
export class ProfessionalRegistrationComponent {

}
