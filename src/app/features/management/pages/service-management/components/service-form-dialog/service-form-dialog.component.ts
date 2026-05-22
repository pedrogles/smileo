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

import { IService } from '../../../../../../core/interfaces/service.interface';

@Component({
  selector: 'app-service-form-dialog',

  standalone: true,

  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
  ],

  templateUrl:
    './service-form-dialog.component.html',

  styleUrls: [
    './service-form-dialog.component.scss',
  ],

  changeDetection:
    ChangeDetectionStrategy.OnPush,
})
export class ServiceFormDialogComponent {

  private readonly fb =
    inject(FormBuilder);

  private readonly dialogRef =
    inject(
      MatDialogRef<
        ServiceFormDialogComponent
      >,
    );

  protected readonly service =
    inject<IService>(
      MAT_DIALOG_DATA,
    );

  protected readonly form =
    this.fb.nonNullable.group({
      name: [
        this.service.name,
        Validators.required,
      ],

      description: [
        this.service.description,
      ],

      duration_minutes: [
        this.service.duration_minutes,
        Validators.required,
      ],

      price: [
        this.service.price,
        Validators.required,
      ],
    });

  protected onSubmit(): void {

    if (this.form.invalid) {
      return;
    }

    this.dialogRef.close({
      ...this.service,

      ...this.form.getRawValue(),
    });
  }
}