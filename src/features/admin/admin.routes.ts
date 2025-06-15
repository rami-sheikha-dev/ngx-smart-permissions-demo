import { Routes } from '@angular/router';
 import { permissionGuard } from 'ngx-smart-permissions';
import { AdminDashboardComponent } from './dashboard.component';

export const ADMIN_ROUTES: Routes = [
  {
    path: '',
    component: AdminDashboardComponent,
    canActivate: [permissionGuard],
    data: { permission: 'admin-dashboard' }
  }
];
