import {
  ChangeDetectionStrategy,
  Component,
  inject,
} from '@angular/core';

import { CommonModule } from '@angular/common';

import {
  MAT_DIALOG_DATA,
  MatDialogModule,
} from '@angular/material/dialog';

import { MatButtonModule } from '@angular/material/button';

import { IPatient } from '../../../../../../core/interfaces/patient.interface';

@Component({
  selector: 'app-patient-view-dialog',

  standalone: true,

  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
  ],

  templateUrl: './patient-view-dialog.component.html',

  styleUrls: ['./patient-view-dialog.component.scss'],

  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PatientViewDialogComponent {

  protected readonly patient =
    inject<IPatient>(MAT_DIALOG_DATA);
}