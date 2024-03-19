import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { VisualizeComponent } from './visualize/visualize.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'visualizer', component: VisualizeComponent },
];
