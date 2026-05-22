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

import { IProfessional } from '../../../../../../core/interfaces/professional.interface';

import { ConfirmationDialogComponent } from '../../../../../../shared/components/dialog/confirmation-dialog/confirmation-dialog.component';

import { ProfessionalViewDialogComponent } from '../professional-view-dialog/professional-view-dialog.component';

import { ProfessionalFormDialogComponent } from '../professional-form-dialog/professional-form-dialog.component';
import { ProfessionalManagementService } from '../../../../services/professional/professional-management.service';
import { DialogService } from '../../../../../../shared/components/dialog/service/dialog.service';
import { PROFESSIONAL_TABLE_COLUMNS } from '../../../../../../core/constants/professional-management.constants';
import { PROFESSIONAL_TABLE_ACTIONS } from '../../../../../../core/actions/professional-table.actions';

@Component({
  selector: 'app-professional-management-table',

  standalone: true,

  imports: [
    DataTableComponent,
  ],

  templateUrl:
    './professional-management-table.component.html',

  styleUrls: [
    './professional-management-table.component.scss',
  ],

  changeDetection:
    ChangeDetectionStrategy.OnPush,
})
export class ProfessionalManagementTableComponent {

  private readonly professionalService =
    inject(ProfessionalManagementService);

  private readonly dialogService =
    inject(DialogService);

  private readonly destroyRef =
    inject(DestroyRef);

  protected readonly loading =
    signal(false);

  protected readonly professionals =
    signal<IProfessional[]>([]);

  protected readonly total =
    signal(0);

  protected readonly columns =
    PROFESSIONAL_TABLE_COLUMNS;

  protected readonly actions =
    PROFESSIONAL_TABLE_ACTIONS;

  private currentQuery: TableQuery = {
    pageIndex: 0,
    pageSize: 10,
  };

  constructor() {

    this.loadProfessionals(this.currentQuery);
  }

  protected onQueryChange(
    query: TableQuery,
  ): void {

    this.currentQuery = query;

    this.loadProfessionals(query);
  }

  protected onActionClick(
    event: {
      action: TableAction<IProfessional>;
      row: IProfessional;
    },
  ): void {

    switch (event.action.id) {

      case 'view':
        this.viewProfessional(event.row);
        break;

      case 'edit':
        this.editProfessional(event.row);
        break;

      case 'delete':
        this.deleteProfessional(event.row);
        break;
    }
  }

  private loadProfessionals(
    query: TableQuery,
  ): void {

    this.loading.set(true);

    this.professionalService
      .findAll(query)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe({
        next: response => {

          this.professionals.set(response.data);

          this.total.set(response.total);
        },

        complete: () => {
          this.loading.set(false);
        },
      });
  }

  private viewProfessional(
    professional: IProfessional,
  ): void {

    this.dialogService.open(
      ProfessionalViewDialogComponent,
      professional,
    );
  }

  private editProfessional(
    professional: IProfessional,
  ): void {

    this.dialogService
      .open<
        ProfessionalFormDialogComponent,
        IProfessional,
        IProfessional
      >(
        ProfessionalFormDialogComponent,
        professional,
      )
      .afterClosed()
      .pipe(
        filter(
          (
            updatedProfessional,
          ): updatedProfessional is IProfessional =>
            !!updatedProfessional,
        ),

        switchMap(updatedProfessional =>
          this.professionalService.update(
            updatedProfessional,
          ),
        ),

        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe(updatedProfessional => {

        this.professionals.update(professionals =>
          professionals.map(professionalItem =>

            professionalItem.id ===
            updatedProfessional.id

              ? updatedProfessional

              : professionalItem,
          ),
        );
      });
  }

  private deleteProfessional(
    professional: IProfessional,
  ): void {

    this.dialogService
      .open(
        ConfirmationDialogComponent,
        {
          title: 'Excluir profissional',

          description:
            `Deseja realmente excluir ${professional.name}?`,

          confirmText: 'Excluir',
        },
      )
      .afterClosed()
      .pipe(
        filter(Boolean),

        switchMap(() =>
          this.professionalService.delete(
            professional.id,
          ),
        ),

        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe(() => {

        this.professionals.update(professionals =>
          professionals.filter(
            professionalItem =>
              professionalItem.id !== professional.id,
          ),
        );

        this.total.update(
          total => total - 1,
        );
      });
  }
}