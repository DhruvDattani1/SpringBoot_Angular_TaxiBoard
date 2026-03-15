import { Routes } from '@angular/router';
import { TripsComponent } from './components/trips/trips';
import { AnalyticsComponent } from './components/analytics/analytics';

export const routes: Routes = [
  { path: '', redirectTo: 'trips', pathMatch: 'full'},
  { path: 'trips', component: TripsComponent},
  { path: 'trips', component: AnalyticsComponent},


];
