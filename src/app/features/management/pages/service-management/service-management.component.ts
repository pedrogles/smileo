import { Component } from '@angular/core';
import { ServiceManagementTableComponent } from './components/patient-management-table/service-management-table.component';

@Component({
  selector: 'app-service-management',
  standalone: true,
  imports: [ServiceManagementTableComponent],
  templateUrl: './service-management.component.html',
  styleUrl: './service-management.component.scss'
})
export class ServiceManagementComponent {

}
