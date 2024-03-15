import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import {
  MAT_SNACK_BAR_DATA,
  MatSnackBarModule,
  MatSnackBarRef,
} from '@angular/material/snack-bar';
import { SnackbarIcon } from '../../enums/snackbar';
import { SnackbarData } from '../../models/snackbar';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-snackbar',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, MatSnackBarModule],
  templateUrl: './snackbar.component.html',
  styleUrl: './snackbar.component.scss',
})
export class SnackbarComponent {
  data: SnackbarData = inject(MAT_SNACK_BAR_DATA);
  snackbarRef = inject(MatSnackBarRef);

  get icon() {
    return SnackbarIcon[this.data.type];
  }
}
