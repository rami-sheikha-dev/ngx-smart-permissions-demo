import { Routes } from '@angular/router';
import { AdminDashboardComponent } from './dashboard/admin-dashboard.component';
import { authGuard } from '../../core/guards/auth.guard';

export const ADMIN_ROUTES: Routes = [
  {
    path: '',
    component: AdminDashboardComponent,
    data: { permission: 'admin-dashboard' }
  },
  {
  path: 'manage',
  loadComponent: () => import('../admin/manage/admin-manage.component').then(m => m.AdminManageComponent),
  canActivate: [authGuard],
  data: { permission: 'manage-roles' }
}

];
