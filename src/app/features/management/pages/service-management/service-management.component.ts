import { Component } from '@angular/core';
import { ServiceManagementTableComponent } from './components/patient-management-table/service-management-table.component';
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';

@Component({
  selector: 'app-service-management',
  standalone: true,
  imports: [
    ServiceManagementTableComponent, 
    PageHeaderComponent
  ],
  templateUrl: './service-management.component.html',
  styleUrl: './service-management.component.scss'
})
export class ServiceManagementComponent {

}
