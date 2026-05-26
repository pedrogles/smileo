import { Component } from '@angular/core';
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';
import { AppointmentManagementTableComponent } from './components/appointment-management-table/appointment-management-table.component';

@Component({
  selector: 'app-appointment-management',
  standalone: true,
  imports: [
    PageHeaderComponent,
    AppointmentManagementTableComponent
  ],
  templateUrl: './appointment-management.component.html',
  styleUrl: './appointment-management.component.scss'
})
export class AppointmentManagementComponent {

}
