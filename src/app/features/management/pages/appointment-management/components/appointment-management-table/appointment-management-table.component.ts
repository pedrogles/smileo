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

import { IAppointment } from '../../../../../../core/interfaces/appointment.interface';

import { AppointmentManagementService } from '../../../../services/appointment/appointment-management.service';

import { DialogService } from '../../../../../../shared/components/dialog/service/dialog.service';

import { ConfirmationDialogComponent } from '../../../../../../shared/components/dialog/confirmation-dialog/confirmation-dialog.component';

import { AppointmentViewDialogComponent } from '../appointment-view-dialog/appointment-view-dialog.component';

import { AppointmentFormDialogComponent } from '../appointment-form-dialog/appointment-form-dialog.component';
import { APPOINTMENT_TABLE_COLUMNS } from '../../../../../../core/constants/appointment-management.constant';
import { APPOINTMENT_TABLE_ACTIONS } from '../../../../../../core/actions/appointment-table.action';

@Component({
  selector:
    'app-appointment-management-table',

  standalone: true,

  imports: [
    DataTableComponent,
  ],

  templateUrl:
    './appointment-management-table.component.html',

  styleUrls: [
    './appointment-management-table.component.scss',
  ],

  changeDetection:
    ChangeDetectionStrategy.OnPush,
})
export class AppointmentManagementTableComponent {

  private readonly appointmentService =
    inject(AppointmentManagementService);

  private readonly dialogService =
    inject(DialogService);

  private readonly destroyRef =
    inject(DestroyRef);

  protected readonly loading =
    signal(false);

  protected readonly appointments =
    signal<IAppointment[]>([]);

  protected readonly total =
    signal(0);

  protected readonly columns =
    APPOINTMENT_TABLE_COLUMNS;

  protected readonly actions =
    APPOINTMENT_TABLE_ACTIONS;

  private currentQuery: TableQuery = {
    pageIndex: 0,
    pageSize: 10,
  };

  constructor() {

    this.loadAppointments(
      this.currentQuery,
    );
  }

  protected onQueryChange(
    query: TableQuery,
  ): void {

    if (
      query.search !==
      this.currentQuery.search
    ) {

      query.pageIndex = 0;
    }

    this.currentQuery = query;

    this.loadAppointments(query);
  }

  protected onActionClick(
    event: {
      action: TableAction<IAppointment>;
      row: IAppointment;
    },
  ): void {

    switch (event.action.id) {

      case 'view':
        this.viewAppointment(
          event.row,
        );
        break;

      case 'edit':
        this.editAppointment(
          event.row,
        );
        break;

      case 'delete':
        this.deleteAppointment(
          event.row,
        );
        break;
    }
  }

  private loadAppointments(
    query: TableQuery,
  ): void {

    this.loading.set(true);

    this.appointmentService
      .findAll(query)
      .pipe(
        takeUntilDestroyed(
          this.destroyRef,
        ),
      )
      .subscribe({
        next: response => {

          this.appointments.set(
            response.data,
          );

          this.total.set(
            response.total,
          );
        },

        complete: () => {
          this.loading.set(false);
        },
      });
  }

  private viewAppointment(
    appointment: IAppointment,
  ): void {

    this.dialogService.open(
      AppointmentViewDialogComponent,
      appointment,
    );
  }

  private editAppointment(
    appointment: IAppointment,
  ): void {

    this.dialogService
      .open<
        AppointmentFormDialogComponent,
        IAppointment,
        IAppointment
      >(
        AppointmentFormDialogComponent,
        appointment,
      )
      .afterClosed()
      .pipe(
        filter(
          (
            updatedAppointment,
          ): updatedAppointment is IAppointment =>
            !!updatedAppointment,
        ),

        switchMap(
          updatedAppointment =>
            this.appointmentService.update(
              updatedAppointment,
            ),
        ),

        takeUntilDestroyed(
          this.destroyRef,
        ),
      )
      .subscribe(updatedAppointment => {

        this.appointments.update(
          appointments =>
            appointments.map(
              appointmentItem =>

                appointmentItem.id ===
                updatedAppointment.id

                  ? updatedAppointment

                  : appointmentItem,
            ),
        );
      });
  }

  private deleteAppointment(
    appointment: IAppointment,
  ): void {

    this.dialogService
      .open(
        ConfirmationDialogComponent,
        {
          title:
            'Excluir agendamento',

          description:
            `Deseja realmente excluir este agendamento?`,

          confirmText:
            'Excluir',
        },
      )
      .afterClosed()
      .pipe(
        filter(Boolean),

        switchMap(() =>
          this.appointmentService.delete(
            appointment.id,
          ),
        ),

        takeUntilDestroyed(
          this.destroyRef,
        ),
      )
      .subscribe(() => {

        this.appointments.update(
          appointments =>
            appointments.filter(
              appointmentItem =>
                appointmentItem.id !==
                appointment.id,
            ),
        );

        this.total.update(
          total => total - 1,
        );
      });
  }
}