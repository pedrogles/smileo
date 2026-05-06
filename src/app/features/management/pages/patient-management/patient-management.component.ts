import { Component } from '@angular/core';
import { PatientManagementTableComponent } from './components/patient-management-table/patient-management-table.component';

@Component({
  selector: 'app-patient-management',
  standalone: true,
  imports: [PatientManagementTableComponent],
  templateUrl: './patient-management.component.html',
  styleUrl: './patient-management.component.scss'
})
export class PatientManagementComponent {

}
