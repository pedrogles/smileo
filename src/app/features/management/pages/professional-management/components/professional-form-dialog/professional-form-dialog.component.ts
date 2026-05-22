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

import { MatCheckboxModule } from '@angular/material/checkbox';

import { MatFormFieldModule } from '@angular/material/form-field';

import { IProfessional } from '../../../../../../core/interfaces/professional.interface';

@Component({
  selector: 'app-professional-form-dialog',

  standalone: true,

  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
  ],

  templateUrl:
    './professional-form-dialog.component.html',

  styleUrls: [
    './professional-form-dialog.component.scss',
  ],

  changeDetection:
    ChangeDetectionStrategy.OnPush,
})
export class ProfessionalFormDialogComponent {

  private readonly fb =
    inject(FormBuilder);

  private readonly dialogRef =
    inject(
      MatDialogRef<
        ProfessionalFormDialogComponent
      >,
    );

  protected readonly professional =
    inject<IProfessional>(
      MAT_DIALOG_DATA,
    );

  protected readonly form =
    this.fb.nonNullable.group({
      name: [
        this.professional.name,
        Validators.required,
      ],

      phone: [
        this.professional.phone,
        Validators.required,
      ],

      email: [
        this.professional.email,
        [
          Validators.required,
          Validators.email,
        ],
      ],

      specialty: [
        this.professional.specialty,
        Validators.required,
      ],

      cro_number: [
        this.professional.cro_number,
        Validators.required,
      ],

      cro_state: [
        this.professional.cro_state,
        Validators.required,
      ],

      is_active: [
        this.professional.is_active,
      ],
    });

  protected onSubmit(): void {

    if (this.form.invalid) {
      return;
    }

    this.dialogRef.close({
      ...this.professional,

      ...this.form.getRawValue(),
    });
  }
}