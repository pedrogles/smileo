import { Component, inject, input, OnChanges, OnDestroy, output, SimpleChanges } from '@angular/core';
import { DashboardAppointmentTableDTO } from '../../../dtos/dashboard-appointment-table.dto';
import { AppointmentStatus } from '../../../../../core/types/appointment.type';
import { DashboardService } from '../../../services/dashboard.service';
import { ToastService } from '../../../../../core/services/toast/toast.service';
import { MatDialog } from '@angular/material/dialog';
import { AppointmentEditDialogComponent } from '../../../dialogs/appointment-edit-dialog/appointment-edit-dialog.component';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { timer, Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard-next-appointment',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule
  ],
  templateUrl: './dashboard-next-appointment.component.html',
  styleUrl: './dashboard-next-appointment.component.scss'
})
export class DashboardNextAppointmentComponent implements OnChanges, OnDestroy {
  appointment = input<DashboardAppointmentTableDTO | null>(null);
  appointmentUpdated = output<void>();

  private readonly dashboardService = inject(DashboardService);
  private readonly toast = inject(ToastService);
  private readonly dialog = inject(MatDialog);

  timerDisplay = '0s';
  showTimer = true;
  private timerSubscription?: Subscription;
  private timerSeconds = 0;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['appointment'] && this.appointment()) {
      this.startTimer();
    }
  }

  ngOnDestroy(): void {
    this.timerSubscription?.unsubscribe();
  }

  private startTimer(): void {
    this.timerSubscription?.unsubscribe();
    const appt = this.appointment();
    if (!appt) return;

    if (appt.status === 'scheduled') {
      this.showTimer = true;
      this.runCountdown(appt.start_datetime);
    } else if (appt.status === 'in_progress') {
      this.showTimer = false;
    }
  }

  private runCountdown(startDatetime: string): void {
    const [datePart, timePart] = startDatetime.split(' - ');
    const [day, month, year] = datePart.split('/');
    const [hour, minute] = timePart.split(':');
    const target = new Date(`${year}-${month}-${day}T${hour}:${minute}:00`).getTime();

    this.timerSubscription = timer(0, 1000).subscribe(() => {
      const diff = Math.max(0, Math.floor((target - Date.now()) / 1000));
      this.timerDisplay = this.formatTime(diff);
      if (diff === 0) this.timerSubscription?.unsubscribe();
    });
  }

  private runStopwatch(): void {
    this.timerSeconds = 0;
    this.timerSubscription = timer(0, 1000).subscribe(() => {
      this.timerDisplay = this.formatTime(this.timerSeconds);
      this.timerSeconds++;
    });
  }

  private formatTime(seconds: number): string {
    const d = Math.floor(seconds / 86400);
    const h = Math.floor((seconds % 86400) / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;

    if (d > 0) return `${d}d ${h}h ${m}min ${s}s`;
    if (h > 0) return `${h}h ${m}min ${s}s`;
    if (m > 0) return `${m}min ${s}s`;
    return `${s}s`;
  }

  updateStatus(status: AppointmentStatus): void {
    const appt = this.appointment();
    if (!appt) return;
    this.dashboardService.updateAppointmentStatus(appt.id, status).subscribe({
      next: () => {
        this.toast.show('Agendamento atualizado com sucesso!', 'success');
        if (status === 'in_progress') {
          this.timerSubscription?.unsubscribe();
          this.timerSeconds = 0;
          this.timerDisplay = '0s';
          this.showTimer = false;
          this.runStopwatch();
        } else {
          this.showTimer = true;
        }
        this.appointmentUpdated.emit();
      },
      error: () => {
        this.toast.show('Erro ao atualizar agendamento.', 'error');
      }
    });
  }

  openEditDialog(): void {
    const appt = this.appointment();
    if (!appt) return;
    const dialogRef = this.dialog.open(AppointmentEditDialogComponent, {
      data: appt,
      width: '600px'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) this.appointmentUpdated.emit();
    });
  }
}