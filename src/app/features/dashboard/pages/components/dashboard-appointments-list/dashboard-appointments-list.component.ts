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
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-dashboard-appointments-list',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatDialogModule
  ],
  templateUrl: './dashboard-appointments-list.component.html',
  styleUrl: './dashboard-appointments-list.component.scss'
})
export class DashboardAppointmentsListComponent {
  appointments = input.required<DashboardAppointmentTableDTO[]>();
  appointmentUpdated = output<void>();

  private readonly dashboardService = inject(DashboardService);
  private readonly toast = inject(ToastService);
  private readonly dialog = inject(MatDialog);

  readonly statusLabels: Record<string, string> = {
    scheduled: 'Agendado',
    in_progress: 'Em andamento',
    completed: 'Concluído',
    canceled: 'Cancelado'
  };

  readonly statusColors: Record<string, string> = {
    scheduled: 'chip--Agendado',
    in_progress: 'chip--Em-andamento',
    completed: 'chip--Concluido',
    canceled: 'chip--Cancelado'
  };

  readonly statusIcons: Record<string, string> = {
    scheduled: 'schedule',
    in_progress: 'pending',
    completed: 'check_circle',
    canceled: 'close'
  };

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
        title: 'Concluir agendamento',
        message: `Deseja concluir o agendamento de ${appointment.patient_name}?`,
        confirmLabel: 'Concluir',
        confirmColor: 'primary'
      },
      canceled: {
        title: 'Cancelar agendamento',
        message: `Deseja cancelar o agendamento de ${appointment.patient_name}?`,
        confirmLabel: 'Cancelar agendamento',
        confirmColor: 'warn'
      }
    };

    this.openConfirmDialog(messages[status]!, () => {
      this.dashboardService.updateAppointmentStatus(appointment.id, status).subscribe({
        next: () => {
          this.toast.show('Agendamento atualizado com sucesso!', 'success');
          this.appointmentUpdated.emit();
        },
        error: () => {
          this.toast.show('Erro ao atualizar agendamento.', 'error');
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

  deleteAppointment(appointment: DashboardAppointmentTableDTO): void {
    this.openConfirmDialog({
      title: 'Excluir agendamento',
      message: `Deseja excluir permanentemente o agendamento de ${appointment.patient_name}? Esta ação não pode ser desfeita.`,
      confirmLabel: 'Excluir',
      confirmColor: 'warn'
    }, () => {
      this.dashboardService.deleteAppointment(appointment.id).subscribe({
        next: () => {
          this.toast.show('Agendamento excluído com sucesso!', 'success');
          this.appointmentUpdated.emit();
        },
        error: () => {
          this.toast.show('Erro ao excluir agendamento.', 'error');
        }
      });
    });
  }
}