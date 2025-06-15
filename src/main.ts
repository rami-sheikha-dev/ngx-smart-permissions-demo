import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app/app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideNgxSmartPermissions, PermissionService } from 'ngx-smart-permissions';
// import { AuthService } from './core/services/auth.service';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideRouter(appRoutes),
    provideNgxSmartPermissions({ redirectTo: '/unauthorized' }),
  ]
})
// .then(appRef => {
//   const injector = appRef.injector;
//   const authService = injector.get(AuthService);
//   const permissionService = injector.get(PermissionService);

 //   if (authService.isLoggedIn()) {
//     const perms = authService.getPermissions();
//     const isSuper = authService.getRole() === 'admin';
//     permissionService.switchPermissions(perms, isSuper);
//   }
// });
