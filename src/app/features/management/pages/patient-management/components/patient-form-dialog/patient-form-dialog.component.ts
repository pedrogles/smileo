
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

import { MatButtonModule } from '@angular/material/button';

import { MatFormFieldModule } from '@angular/material/form-field';

import { MatInputModule } from '@angular/material/input';

import { MatCheckboxModule } from '@angular/material/checkbox';

import { IPatient } from '../../../../../../core/interfaces/patient.interface';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-patient-form-dialog',

  standalone: true,

  imports: [
    CommonModule,

    ReactiveFormsModule,

    MatDialogModule,
    MatButtonModule,

    MatFormFieldModule,
    MatInputModule,

    MatCheckboxModule,
  ],

  templateUrl: './patient-form-dialog.component.html',

  styleUrls: ['./patient-form-dialog.component.scss'],

  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PatientFormDialogComponent {
  private readonly fb = inject(FormBuilder);

  private readonly dialogRef =
    inject(
      MatDialogRef<PatientFormDialogComponent>,
    );

  protected readonly patient =
    inject<IPatient>(MAT_DIALOG_DATA);

  protected readonly form = this.fb.nonNullable.group({
    name: [
      this.patient.name,
      Validators.required,
    ],

    phone: [
      this.patient.phone,
      Validators.required,
    ],

    email: [
      this.patient.email,
      [
        Validators.required,
        Validators.email,
      ],
    ],

    has_allergies: [
      this.patient.has_allergies,
    ],

    allergies_notes: [
      this.patient.allergies_notes,
    ],

    has_medical_conditions: [
      this.patient.has_medical_conditions,
    ],

    medical_conditions_notes: [
      this.patient.medical_conditions_notes,
    ],
  });

  protected onSubmit(): void {

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.dialogRef.close({
      ...this.patient,
      ...this.form.getRawValue(),
    });
  }
}