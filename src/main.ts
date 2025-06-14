import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { provideNgxSmartPermissions } from 'ngx-smart-permissions';
import { appRoutes } from './app/app.routes';

bootstrapApplication(AppComponent, {
  providers: [
    provideNgxSmartPermissions({ redirectTo: '/unauthorized' }),
    provideRouter(appRoutes)
  ]
});
