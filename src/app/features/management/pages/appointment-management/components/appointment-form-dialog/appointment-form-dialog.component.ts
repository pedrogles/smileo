import {
  ChangeDetectionStrategy,
  Component,
  inject,
} from '@angular/core';

import { CommonModule } from '@angular/common';

import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';

import { MatInputModule } from '@angular/material/input';

import { MatButtonModule } from '@angular/material/button';

import { MatFormFieldModule } from '@angular/material/form-field';

import { MatSelectModule } from '@angular/material/select';

import { IAppointment } from '../../../../../../core/interfaces/appointment.interface';

@Component({
  selector: 'app-appointment-form-dialog',

  standalone: true,

  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
  ],

  templateUrl:
    './appointment-form-dialog.component.html',

  styleUrls: [
    './appointment-form-dialog.component.scss',
  ],

  changeDetection:
    ChangeDetectionStrategy.OnPush,
})
export class AppointmentFormDialogComponent {

  private readonly fb =
    inject(FormBuilder);

  private readonly dialogRef =
    inject(
      MatDialogRef<
        AppointmentFormDialogComponent
      >,
    );

  protected readonly appointment =
    inject<IAppointment>(
      MAT_DIALOG_DATA,
    );

  protected readonly statusOptions = [
    {
      value: 'scheduled',
      label: 'Agendado',
    },

    {
      value: 'in_progress',
      label: 'Em atendimento',
    },

    {
      value: 'completed',
      label: 'Concluído',
    },

    {
      value: 'canceled',
      label: 'Cancelado',
    },
  ];

  protected readonly form =
    this.fb.nonNullable.group({
      start_datetime: [
        this.formatDate(
          this.appointment.start_datetime,
        ),
        Validators.required,
      ],

      status: [
        this.appointment.status,
        Validators.required,
      ],

      notes: [
        this.appointment.notes ?? '',
      ],
    });

  protected onSubmit(): void {

    if (this.form.invalid) {
      return;
    }

    this.dialogRef.close({
      ...this.appointment,

      ...this.form.getRawValue(),
    });
  }

  private formatDate(
    value: string,
  ): string {

    return value.slice(0, 16);
  }
}