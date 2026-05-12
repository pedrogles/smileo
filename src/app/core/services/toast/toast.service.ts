import { Injectable, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private readonly snackBar = inject(MatSnackBar);
  
  show(message: string, type: 'success' | 'warning' |'error' | 'info' = 'info', duration = 4000) {
    this.snackBar.open(message, 'Fechar', {
      duration,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: [`toast-${type}`]
    });
  }
}