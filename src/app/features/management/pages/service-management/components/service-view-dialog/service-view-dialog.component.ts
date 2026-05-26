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

import { IService } from '../../../../../../core/interfaces/service.interface';

@Component({
  selector: 'app-service-view-dialog',

  standalone: true,

  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
  ],

  templateUrl:
    './service-view-dialog.component.html',

  styleUrls: [
    './service-view-dialog.component.scss',
  ],

  changeDetection:
    ChangeDetectionStrategy.OnPush,
})
export class ServiceViewDialogComponent {

  protected readonly service =
    inject<IService>(
      MAT_DIALOG_DATA,
    );
}