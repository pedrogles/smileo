import {
  ChangeDetectionStrategy,
  Component,
  inject,
} from '@angular/core';

import {
  MAT_DIALOG_DATA,
  MatDialogModule,
} from '@angular/material/dialog';

import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';

import { IProfessional } from '../../../../../../core/interfaces/professional.interface';

@Component({
  selector: 'app-professional-view-dialog',

  standalone: true,

  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
  ],

  templateUrl:
    './professional-view-dialog.component.html',

  styleUrls: [
    './professional-view-dialog.component.scss',
  ],

  changeDetection:
    ChangeDetectionStrategy.OnPush,
})
export class ProfessionalViewDialogComponent {

  protected readonly professional =
    inject<IProfessional>(
      MAT_DIALOG_DATA,
    );
}