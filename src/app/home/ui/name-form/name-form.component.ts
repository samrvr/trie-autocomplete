import { Component, inject, signal } from '@angular/core';
import { TrieService } from '../../../shared/services/trie.service';
import { SnackbarService } from '../../../shared/services/snackbar.service';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { tap } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { TitleCasePipe } from '@angular/common';
import { SnackbarType } from '../../../shared/enums/snackbar';

@Component({
  selector: 'app-name-form',
  standalone: true,
  imports: [
    MatButtonModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    FormsModule,
    TitleCasePipe,
  ],
  templateUrl: './name-form.component.html',
  styleUrl: './name-form.component.scss',
})
export class NameFormComponent {
  trieService = inject(TrieService);
  snackbarService = inject(SnackbarService);

  options = signal<string[]>([]);

  name = new FormControl('');

  constructor() {
    this.name.valueChanges
      .pipe(
        takeUntilDestroyed(),
        tap((name) => {
          if (!name) {
            this.options.set([]);
            return;
          }
          if (!name?.match(/^[a-zA-Z]+$/)) {
            this.name.setErrors({ nonLetters: true });
          }
          this.options.set(
            this.trieService.nameTrie().autoComplete(name.toLowerCase())
          );
        })
      )
      .subscribe();
  }

  onSubmit() {
    if (!this.name.value || !this.name.valid) {
      this.snackbarService.open(
        'Please enter a valid name',
        SnackbarType.ERROR
      );
      return;
    }
    this.trieService.addWord(this.name.value);
    this.snackbarService.open(
      `Thanks ${this.name.value}! We will spam your email soon.`
    );
    this.name.setValue('');
  }
}
