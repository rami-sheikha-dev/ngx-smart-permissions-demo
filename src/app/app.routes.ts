import { Routes } from '@angular/router';
import { permissionGuard } from 'ngx-smart-permissions';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AccessDeniedComponent } from './access-denied/access-denied.component';

export const appRoutes: Routes = [
  {
    path: '',
    
    children: [
      { path: '', component: HomeComponent },
      {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [permissionGuard],
        data: { permission: 'view-dashboard' }
      }
    ]
  },
  {
    path: 'unauthorized',
    component: AccessDeniedComponent
  }
];
