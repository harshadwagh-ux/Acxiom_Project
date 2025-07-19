import { Routes } from '@angular/router';
import { checkaccessGuard } from './checkaccess.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./log-in/log-in.component').then(m => m.LogInComponent)
  },
  {
    path: 'home',
    loadComponent: () => import('./home/home.component').then(m => m.HomeComponent),
    canActivate: [checkaccessGuard]
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];
