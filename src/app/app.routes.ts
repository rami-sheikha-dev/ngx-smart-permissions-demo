import { Routes } from '@angular/router';
  import { AccessDeniedComponent } from './access-denied/access-denied.component';
import { roleRedirectGuard } from './core/guards/role-redirect.guard';
import { authGuard } from './core/guards/auth.guard';

export const appRoutes: Routes = [
  {
    path: '',
    canActivate: [roleRedirectGuard],
    loadComponent: () =>
      import('./home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'admin', 
    canActivate: [authGuard],
    loadChildren: () =>
      import('./features/admin/admin.routes').then(m => m.ADMIN_ROUTES),
    data: { role: 'admin' }
  },
  {
    path: 'user',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./features/user/user.routes').then(m => m.USER_ROUTES),
    data: { role: 'user' }
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./login/login.component').then(m => m.LoginComponent)
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
