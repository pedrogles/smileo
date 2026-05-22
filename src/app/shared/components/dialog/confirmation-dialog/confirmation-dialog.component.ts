import {
  ChangeDetectionStrategy,
  Component,
  inject,
} from '@angular/core';

import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';

import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';

export interface ConfirmationDialogData {
  title: string;

  description: string;

  confirmText?: string;

  cancelText?: string;
}

@Component({
  selector: 'app-confirmation-dialog',

  standalone: true,

  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
  ],

  templateUrl: './confirmation-dialog.component.html',

  styleUrls: ['./confirmation-dialog.component.scss'],

  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmationDialogComponent {

  protected readonly data =
    inject<ConfirmationDialogData>(MAT_DIALOG_DATA);

  private readonly dialogRef =
    inject(
      MatDialogRef<ConfirmationDialogComponent>,
    );

  protected onConfirm(): void {
    this.dialogRef.close(true);
  }

  protected onCancel(): void {
    this.dialogRef.close(false);
  }
}