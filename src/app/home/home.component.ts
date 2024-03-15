import { Component, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { TrieService } from '../shared/services/trie.service';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { tap } from 'rxjs';
import { TitleCasePipe } from '@angular/common';
import { SnackbarService } from '../shared/services/snackbar.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatButtonModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    FormsModule,
    TitleCasePipe,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  trieService = inject(TrieService);
  snackbarService = inject(SnackbarService);

  options = signal<string[]>([]);

  name = new FormControl('');

  constructor() {
    this.name.valueChanges
      .pipe(
        takeUntilDestroyed(),
        tap((name) => {
          if (name) {
            this.options.set(
              this.trieService.nameTrie().autoComplete(name.toLowerCase())
            );
          } else {
            this.options.set([]);
          }
        })
      )
      .subscribe();
  }

  onSubmit() {
    if (!this.name.value) {
      return;
    }
    this.trieService.nameTrie().addWord(this.name.value);
    this.snackbarService.open(
      `Thanks ${this.name.value}! We will spam your email soon.`
    );
    this.name.setValue('');
  }
}
