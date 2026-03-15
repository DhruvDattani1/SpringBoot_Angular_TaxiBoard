import { Routes } from '@angular/router';
import { Trips } from './components/trips/trips';
import { Analytics } from './components/analytics/analytics';

export const routes: Routes = [
  { path: '', redirectTo: 'trips', pathMatch: 'full'},
  { path: 'trips', component: Trips},
  { path: 'trips', component: Analytics},


];
