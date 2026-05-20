import { Component } from '@angular/core';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { DashboardCardsComponent } from './components/dashboard-cards/dashboard-cards.component';
import { DashboardAppointmentsTableComponent } from './components/dashboard-appointments-table/dashboard-appointments-table.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    PageHeaderComponent,
    DashboardCardsComponent,
    DashboardAppointmentsTableComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

}