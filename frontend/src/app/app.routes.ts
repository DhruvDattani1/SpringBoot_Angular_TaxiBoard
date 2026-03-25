import { Login } from './components/login/login'
import { Register } from './components/register/register';
import { Routes } from '@angular/router';
import { Trips } from './components/trips/trips';
import { AnalyticsC } from './components/analytics/analytics';

export const routes: Routes = [
  { path: '', redirectTo: 'trips', pathMatch: 'full'},
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'trips', component: Trips},
  { path: 'analytics', component: AnalyticsC},


];
