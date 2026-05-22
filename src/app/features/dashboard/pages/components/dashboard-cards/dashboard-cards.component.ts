import { Component, effect, inject, input, OnInit } from '@angular/core';
import { DashboardService } from '../../../services/dashboard.service';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-dashboard-cards',
  standalone: true,
  imports: [
    MatCardModule,
    MatIconModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './dashboard-cards.component.html',
  styleUrl: './dashboard-cards.component.scss'
})
export class DashboardCardsComponent implements OnInit {
  private readonly dashboardService = inject(DashboardService);

  reload = input<boolean>(false);

  totalPatients = 0;
  totalProfessionals = 0;
  totalAppointmentsToday = 0;
  isLoading = true;

  constructor() {
    effect(() => {
      const _ = this.reload();
      this.loadCards();
    });
  }

  ngOnInit(): void {
    this.loadCards();
  }

  loadCards(): void {
    this.isLoading = true;
    this.dashboardService.getTotalPatients().subscribe(total => {
      this.totalPatients = total;
    });
    this.dashboardService.getTotalProfessionals().subscribe(total => {
      this.totalProfessionals = total;
    });
    this.dashboardService.getTotalAppointmentsToday().subscribe(total => {
      this.totalAppointmentsToday = total;
      this.isLoading = false;
    });
  }
}