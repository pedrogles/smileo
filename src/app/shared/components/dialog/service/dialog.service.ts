import {
  Injectable,
  inject,
  Type,
} from '@angular/core';

import {
  MatDialog,
  MatDialogConfig,
  MatDialogRef,
} from '@angular/material/dialog';

@Injectable({
  providedIn: 'root',
})
export class DialogService {

  private readonly dialog = inject(MatDialog);

  public open<TComponent, TData = unknown, TResult = unknown>(
    component: Type<TComponent>,
    data?: TData,
    config?: MatDialogConfig<TData>,
  ): MatDialogRef<TComponent, TResult> {

    return this.dialog.open(component, {
      width: '720px',

      maxWidth: '95vw',

      autoFocus: false,

      restoreFocus: false,

      data,

      ...config,
    });
  }
}