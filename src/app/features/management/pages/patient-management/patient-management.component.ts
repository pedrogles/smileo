import { Component } from '@angular/core';
import { PatientManagementTableComponent } from './components/patient-management-table/patient-management-table.component';
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';

@Component({
  selector: 'app-patient-management',
  standalone: true,
  imports: [
    PatientManagementTableComponent,
    PageHeaderComponent
  ],
  templateUrl: './patient-management.component.html',
  styleUrl: './patient-management.component.scss'
})
export class PatientManagementComponent {

}
