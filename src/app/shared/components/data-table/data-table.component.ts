import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
  computed,
  inject,
} from '@angular/core';

import { CommonModule } from '@angular/common';

import {
  FormControl,
  ReactiveFormsModule,
} from '@angular/forms';

import {
  BehaviorSubject,
  combineLatest,
  debounceTime,
  distinctUntilChanged,
  startWith,
} from 'rxjs';

import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import {
  MatTableModule,
} from '@angular/material/table';

import {
  MatPaginator,
  MatPaginatorModule,
  PageEvent,
} from '@angular/material/paginator';

import {
  MatSort,
  MatSortModule,
  Sort,
} from '@angular/material/sort';

import {
  MatMenuModule,
} from '@angular/material/menu';

import {
  MatIconModule,
} from '@angular/material/icon';

import {
  MatTooltipModule,
} from '@angular/material/tooltip';

import {
  MatProgressSpinnerModule,
} from '@angular/material/progress-spinner';

import {
  MatFormFieldModule,
} from '@angular/material/form-field';

import {
  MatInputModule,
} from '@angular/material/input';
import { TableColumn } from './interfaces/tableColumn.interface';
import { TableAction } from './interfaces/tableAction.interface';
import { TableQuery } from './interfaces/tableQuery.interface';

@Component({
  selector: 'app-data-table',

  standalone: true,

  imports: [
    CommonModule,

    ReactiveFormsModule,

    MatTableModule,
    MatPaginatorModule,
    MatSortModule,

    MatMenuModule,
    MatIconModule,
    MatTooltipModule,

    MatProgressSpinnerModule,

    MatFormFieldModule,
    MatInputModule,
  ],

  templateUrl: './data-table.component.html',

  styleUrls: ['./data-table.component.scss'],

  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataTableComponent<T extends object> {

  @Input({ required: true })
  public data: T[] = [];

  @Input({ required: true })
  public columns: TableColumn<T>[] = [];

  @Input()
  public actions: TableAction<T>[] = [];

  @Input()
  public total = 0;

  @Input()
  public loading = false;

  @Input()
  public pageSize = 10;

  @Input()
  public pageIndex = 0;

  @Input()
  public emptyMessage = 'Nenhum registro encontrado';

  @Output()
  public queryChange =
    new EventEmitter<TableQuery>();

  @Output()
  public actionClick =
    new EventEmitter<{
      action: TableAction<T>;
      row: T;
    }>();

  @ViewChild(MatPaginator)
  public paginator!: MatPaginator;

  @ViewChild(MatSort)
  public sort!: MatSort;

  private readonly destroyRef =
    inject(DestroyRef);

  protected readonly searchControl =
    new FormControl(
      '',
      {
        nonNullable: true,
      },
    );

  private readonly pageSubject =
    new BehaviorSubject<PageEvent>({
      pageIndex: this.pageIndex,
      pageSize: this.pageSize,
      length: this.total,
    });

  private readonly sortSubject =
    new BehaviorSubject<Sort>({
      active: '',
      direction: '',
    });

  protected readonly displayedColumns =
    computed(() => {

      const visibleColumns =
        this.columns
          .filter(
            column =>
              column.visible !== false,
          )
          .map(
            column =>
              column.key.toString(),
          );

      if (this.actions.length > 0) {
        visibleColumns.push('actions');
      }

      return visibleColumns;
    });

  constructor() {

    combineLatest([
      this.searchControl.valueChanges.pipe(
        startWith(''),
        debounceTime(400),
        distinctUntilChanged(),
      ),

      this.pageSubject,

      this.sortSubject,
    ])
      .pipe(
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe(([search, page, sort]) => {

        const isSearching =
          search !== undefined &&
          search !== null;

        /*
          reset pagination when searching
        */

        if (
          isSearching &&
          page.pageIndex !== 0
        ) {

          this.pageSubject.next({
            ...page,
            pageIndex: 0,
          });

          return;
        }

        this.queryChange.emit({
          search,

          pageIndex: page.pageIndex,

          pageSize: page.pageSize,

          sortField: sort.active,

          sortDirection: sort.direction,
        });
      });
  }

  protected onPageChange(
    event: PageEvent,
  ): void {

    this.pageSubject.next(event);
  }

  protected onSortChange(
    sort: Sort,
  ): void {

    this.sortSubject.next(sort);
  }

  protected onActionClick(
    action: TableAction<T>,
    row: T,
  ): void {

    this.actionClick.emit({
      action,
      row,
    });

    action.callback?.(row);
  }

  protected trackByColumn(
    _: number,
    column: TableColumn<T>,
  ): string {

    return column.key.toString();
  }

  protected resolveValue(
    column: TableColumn<T>,
    row: T,
  ): unknown {

    if (column.formatter) {
      return column.formatter(row);
    }

    return this.getNestedValue(
      row,
      column.key.toString(),
    );
  }

  private getNestedValue(
    object: T,
    path: string,
  ): unknown {

    return path
      .split('.')
      .reduce(
        (
          accumulator,
          current,
        ) => {

          if (
            accumulator &&
            typeof accumulator === 'object'
          ) {

            return (
              accumulator as Record<
                string,
                unknown
              >
            )[current];
          }

          return undefined;

        },
        object as unknown,
      );
  }
}