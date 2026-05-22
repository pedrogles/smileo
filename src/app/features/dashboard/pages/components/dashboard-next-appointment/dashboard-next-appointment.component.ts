import { Component, inject, input, output } from '@angular/core';
import { DashboardAppointmentTableDTO } from '../../../dtos/dashboard-appointment-table.dto';
import { AppointmentStatus } from '../../../../../core/types/appointment.type';
import { DashboardService } from '../../../services/dashboard.service';
import { ToastService } from '../../../../../core/services/toast/toast.service';
import { MatDialog } from '@angular/material/dialog';
import { AppointmentEditDialogComponent } from '../../../dialogs/appointment-edit-dialog/appointment-edit-dialog.component';
import { ConfirmDialogComponent, ConfirmDialogData } from '../../../../../shared/components/confirm-dialog/confirm-dialog.component';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

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
export class DashboardNextAppointmentComponent {
  appointments = input<DashboardAppointmentTableDTO[]>([]);
  appointmentUpdated = output<void>();

  private readonly dashboardService = inject(DashboardService);
  private readonly toast = inject(ToastService);
  private readonly dialog = inject(MatDialog);

  private openConfirmDialog(data: ConfirmDialogData, onConfirm: () => void): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data,
      width: '400px'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) onConfirm();
    });
  }

  updateStatus(appointment: DashboardAppointmentTableDTO, status: AppointmentStatus): void {
    const messages: Partial<Record<AppointmentStatus, ConfirmDialogData>> = {
      completed: {
        title: 'Concluir atendimento',
        message: `Deseja concluir o atendimento de ${appointment.patient_name}?`,
        confirmLabel: 'Concluir',
        confirmColor: 'primary'
      },
      canceled: {
        title: 'Cancelar atendimento',
        message: `Deseja cancelar o atendimento de ${appointment.patient_name}?`,
        confirmLabel: 'Cancelar atendimento',
        confirmColor: 'warn'
      }
    };

    this.openConfirmDialog(messages[status]!, () => {
      this.dashboardService.updateAppointmentStatus(appointment.id, status).subscribe({
        next: () => {
          this.toast.show('Atendimento atualizado com sucesso!', 'success');
          this.appointmentUpdated.emit();
        },
        error: () => {
          this.toast.show('Erro ao atualizar atendimento.', 'error');
        }
      });
    });
  }

  openEditDialog(appointment: DashboardAppointmentTableDTO): void {
    const dialogRef = this.dialog.open(AppointmentEditDialogComponent, {
      data: appointment,
      width: '600px'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) this.appointmentUpdated.emit();
    });
  }
}