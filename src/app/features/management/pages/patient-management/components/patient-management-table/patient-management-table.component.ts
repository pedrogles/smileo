import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  signal,
} from '@angular/core';

import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import {
  filter,
  switchMap,
} from 'rxjs';

import { DataTableComponent } from '../../../../../../shared/components/data-table/data-table.component';

import { TableQuery } from '../../../../../../shared/components/data-table/interfaces/tableQuery.interface';

import { TableAction } from '../../../../../../shared/components/data-table/interfaces/tableAction.interface';

import { IPatient } from '../../../../../../core/interfaces/patient.interface';

import { PatientManagementService } from '../../../../services/patient/patient-management.service';

import { PATIENT_TABLE_COLUMNS } from '../../../../../../core/constants/patient-management.constant';

import { PATIENT_TABLE_ACTIONS } from '../../../../../../core/actions/patient-table.action';

import { ConfirmationDialogComponent } from '../../../../../../shared/components/dialog/confirmation-dialog/confirmation-dialog.component';

import { PatientViewDialogComponent } from '../patient-view-dialog/patient-view-dialog.component';

import { PatientFormDialogComponent } from '../patient-form-dialog/patient-form-dialog.component';
import { DialogService } from '../../../../../../shared/components/dialog/service/dialog.service';

@Component({
  selector: 'app-patient-management-table',

  standalone: true,

  imports: [
    DataTableComponent,
  ],

  templateUrl: './patient-management-table.component.html',

  styleUrls: ['./patient-management-table.component.scss'],

  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PatientManagementTableComponent {

  private readonly patientService =
    inject(PatientManagementService);

  private readonly dialogService =
    inject(DialogService);

  private readonly destroyRef =
    inject(DestroyRef);

  protected readonly loading =
    signal(false);

  protected readonly patients =
    signal<IPatient[]>([]);

  protected readonly total =
    signal(0);

  protected readonly columns =
    PATIENT_TABLE_COLUMNS;

  protected readonly actions =
    PATIENT_TABLE_ACTIONS;

  private currentQuery: TableQuery = {
    pageIndex: 0,
    pageSize: 10,
  };

  constructor() {

    this.loadPatients(this.currentQuery);
  }

  protected onQueryChange(
    query: TableQuery,
  ): void {

    this.currentQuery = query;

    this.loadPatients(query);
  }

  protected onActionClick(
    event: {
      action: TableAction<IPatient>;
      row: IPatient;
    },
  ): void {

    switch (event.action.id) {

      case 'view':
        this.viewPatient(event.row);
        break;

      case 'edit':
        this.editPatient(event.row);
        break;

      case 'delete':
        this.deletePatient(event.row);
        break;
    }
  }

  private loadPatients(
    query: TableQuery,
  ): void {

    this.loading.set(true);

    this.patientService
      .findAll(query)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe({
        next: response => {

          this.patients.set(response.data);

          this.total.set(response.total);
        },

        complete: () => {
          this.loading.set(false);
        },
      });
  }

  private viewPatient(
    patient: IPatient,
  ): void {

    this.dialogService.open(
      PatientViewDialogComponent,
      patient,
    );
  }

  private editPatient(
  patient: IPatient,
): void {

  this.dialogService
    .open<
      PatientFormDialogComponent,
      IPatient,
      IPatient
    >(
      PatientFormDialogComponent,
      patient,
    )
    .afterClosed()
    .pipe(
      filter(
        (
          updatedPatient,
        ): updatedPatient is IPatient =>
          !!updatedPatient,
      ),

      switchMap(updatedPatient =>
        this.patientService.update(
          updatedPatient,
        ),
      ),

      takeUntilDestroyed(this.destroyRef),
    )
    .subscribe(updatedPatient => {

      this.patients.update(patients =>
        patients.map(patientItem =>

          patientItem.id ===
          updatedPatient.id

            ? updatedPatient

            : patientItem,
        ),
      );
    });
}

  private deletePatient(
    patient: IPatient,
  ): void {

    this.dialogService
      .open(
        ConfirmationDialogComponent,
        {
          title: 'Excluir paciente',

          description:
            `Deseja realmente excluir ${patient.name}?`,

          confirmText: 'Excluir',
        },
      )
      .afterClosed()
      .pipe(
        filter(Boolean),

        switchMap(() =>
          this.patientService.delete(
            patient.id,
          ),
        ),

        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe(() => {

        this.patients.update(patients =>
          patients.filter(
            patientItem =>
              patientItem.id !== patient.id,
          ),
        );

        this.total.update(
          total => total - 1,
        );
      });
  }
}