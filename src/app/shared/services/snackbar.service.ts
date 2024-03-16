import { Injectable, inject } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { SnackbarComponent } from '../ui/snackbar/snackbar.component';
import { SnackbarType } from '../enums/snackbar';

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  private snackbar = inject(MatSnackBar);

  private options: MatSnackBarConfig = {
    duration: 4500,
    horizontalPosition: 'right',
    verticalPosition: 'top',
  };

  open(message: string, type: SnackbarType = SnackbarType.INFO) {
    this.snackbar.openFromComponent(SnackbarComponent, {
      ...this.options,
      data: { message, type },
    });
  }
}
