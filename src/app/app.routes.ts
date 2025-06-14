import { authGuard } from '../core/guards/auth.guard';
import { Routes } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { AccessDeniedComponent } from '../access-denied/access-denied.component';
 
export const appRoutes: Routes = [
  {
    path: '',
    canActivate: [authGuard],
     children: [
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [authGuard],
        data: { permission: 'view-dashboard' }
      }
    ]
  },
  {
    path: 'login',
    loadComponent: () =>
      import('../login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'unauthorized',
    component: AccessDeniedComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];
