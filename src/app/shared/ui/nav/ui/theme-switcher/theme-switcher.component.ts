import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ThemeService } from '../../../../services/theme.service';
import { Theme } from '../../../../enums/theme';

@Component({
  selector: 'app-theme-switcher',
  standalone: true,
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './theme-switcher.component.html',
  styleUrl: './theme-switcher.component.scss',
})
export class ThemeSwitcherComponent {
  themeService = inject(ThemeService);

  readonly Theme = Theme;
}
