import { Injectable, inject, signal } from '@angular/core';
import { Theme } from '../enums/theme';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  document = inject(DOCUMENT);
  theme = signal<Theme>(Theme.DARK);

  constructor() {
    this.theme.set((localStorage.getItem('theme') as Theme) || Theme.DARK);
    this.document.body.classList.add(this.theme());
  }

  switchTheme() {
    this.document.body.classList.remove(this.theme());
    this.theme.set(this.theme() === Theme.DARK ? Theme.LIGHT : Theme.DARK);
    this.document.body.classList.add(this.theme());
    localStorage.setItem('theme', this.theme());
  }
}
