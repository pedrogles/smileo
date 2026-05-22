import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';

import { CommonModule } from '@angular/common';

import {
  MAT_DIALOG_DATA,
  MatDialogModule,
} from '@angular/material/dialog';

import { MatButtonModule } from '@angular/material/button';

import {
  IAppointment,
} from '../../../../../../core/interfaces/appointment.interface';

import {
  AppointmentStatus,
} from '../../../../../../core/types/appointment.type';

@Component({
  selector: 'app-appointment-view-dialog',

  standalone: true,

  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
  ],

  templateUrl:
    './appointment-view-dialog.component.html',

  styleUrls: [
    './appointment-view-dialog.component.scss',
  ],

  changeDetection:
    ChangeDetectionStrategy.OnPush,
})
export class AppointmentViewDialogComponent {

  protected readonly appointment =
    inject<IAppointment>(
      MAT_DIALOG_DATA,
    );

  private readonly statusMap:
    Record<AppointmentStatus, string> = {

      scheduled:
        'Agendado',

      in_progress:
        'Em atendimento',

      completed:
        'Concluído',

      canceled:
        'Cancelado',
    };

  protected readonly statusLabel =
    computed(() =>
      this.statusMap[
        this.appointment.status
      ],
    );
}