import { TemplateRef } from '@angular/core';
import { TableColumnType } from '../enums/tableColumn.enum';

export interface TableColumn<T> {

  key: keyof T | string;

  label: string;

  type?: TableColumnType;

  sortable?: boolean;

  width?: string;

  align?: 'left' | 'center' | 'right';

  visible?: boolean;

  formatter?: (
    row: T,
  ) => string;

  customTemplate?: TemplateRef<unknown>;
}