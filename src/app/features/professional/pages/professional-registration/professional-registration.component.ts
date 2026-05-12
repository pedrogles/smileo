import { Component } from '@angular/core';
import { ProfessionalRegistrationFormComponent } from './forms/professional-registration-form/professional-registration-form.component';
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';

@Component({
  selector: 'app-professional-registration',
  standalone: true,
  imports: [
    ProfessionalRegistrationFormComponent, PageHeaderComponent
  ],
  templateUrl: './professional-registration.component.html',
  styleUrl: './professional-registration.component.scss'
})
export class ProfessionalRegistrationComponent {

}
