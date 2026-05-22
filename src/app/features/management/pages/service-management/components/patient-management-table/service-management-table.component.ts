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

import { IService } from '../../../../../../core/interfaces/service.interface';

import { ServiceManagementService } from '../../../../services/service/service-management.service';

import { DialogService } from '../../../../../../shared/components/dialog/service/dialog.service';

import { ConfirmationDialogComponent } from '../../../../../../shared/components/dialog/confirmation-dialog/confirmation-dialog.component';

import { ServiceViewDialogComponent } from '../service-view-dialog/service-view-dialog.component';

import { ServiceFormDialogComponent } from '../service-form-dialog/service-form-dialog.component';
import { SERVICE_TABLE_COLUMNS } from '../../../../../../core/constants/service-management.constant';
import { SERVICE_TABLE_ACTIONS } from '../../../../../../core/actions/service-table.action';

@Component({
  selector: 'app-service-management-table',

  standalone: true,

  imports: [
    DataTableComponent,
  ],

  templateUrl:
    './service-management-table.component.html',

  styleUrls: [
    './service-management-table.component.scss',
  ],

  changeDetection:
    ChangeDetectionStrategy.OnPush,
})
export class ServiceManagementTableComponent {

  private readonly serviceManagementService =
    inject(ServiceManagementService);

  private readonly dialogService =
    inject(DialogService);

  private readonly destroyRef =
    inject(DestroyRef);

  protected readonly loading =
    signal(false);

  protected readonly services =
    signal<IService[]>([]);

  protected readonly total =
    signal(0);

  protected readonly columns =
    SERVICE_TABLE_COLUMNS;

  protected readonly actions =
    SERVICE_TABLE_ACTIONS;

  private currentQuery: TableQuery = {
    pageIndex: 0,
    pageSize: 10,
  };

  constructor() {

    this.loadServices(
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

    this.loadServices(query);
  }

  protected onActionClick(
    event: {
      action: TableAction<IService>;
      row: IService;
    },
  ): void {

    switch (event.action.id) {

      case 'view':
        this.viewService(event.row);
        break;

      case 'edit':
        this.editService(event.row);
        break;

      case 'delete':
        this.deleteService(event.row);
        break;
    }
  }

  private loadServices(
    query: TableQuery,
  ): void {

    this.loading.set(true);

    this.serviceManagementService
      .findAll(query)
      .pipe(
        takeUntilDestroyed(
          this.destroyRef,
        ),
      )
      .subscribe({
        next: response => {

          this.services.set(
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

  private viewService(
    service: IService,
  ): void {

    this.dialogService.open(
      ServiceViewDialogComponent,
      service,
    );
  }

  private editService(
    service: IService,
  ): void {

    this.dialogService
      .open<
        ServiceFormDialogComponent,
        IService,
        IService
      >(
        ServiceFormDialogComponent,
        service,
      )
      .afterClosed()
      .pipe(
        filter(
          (
            updatedService,
          ): updatedService is IService =>
            !!updatedService,
        ),

        switchMap(
          updatedService =>
            this.serviceManagementService.update(
              updatedService,
            ),
        ),

        takeUntilDestroyed(
          this.destroyRef,
        ),
      )
      .subscribe(updatedService => {

        this.services.update(
          services =>
            services.map(serviceItem =>

              serviceItem.id ===
              updatedService.id

                ? updatedService

                : serviceItem,
            ),
        );
      });
  }

  private deleteService(
    service: IService,
  ): void {

    this.dialogService
      .open(
        ConfirmationDialogComponent,
        {
          title:
            'Excluir serviço',

          description:
            `Deseja realmente excluir ${service.name}?`,

          confirmText:
            'Excluir',
        },
      )
      .afterClosed()
      .pipe(
        filter(Boolean),

        switchMap(() =>
          this.serviceManagementService.delete(
            service.id,
          ),
        ),

        takeUntilDestroyed(
          this.destroyRef,
        ),
      )
      .subscribe(() => {

        this.services.update(
          services =>
            services.filter(
              serviceItem =>
                serviceItem.id !==
                service.id,
            ),
        );

        this.total.update(
          total => total - 1,
        );
      });
  }
}