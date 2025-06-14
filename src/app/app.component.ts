import { Component, inject } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { AuthService } from '../core/services/auth.service';
import { PermissionService } from 'ngx-smart-permissions';
import { NgxSmartPermissionsModule } from 'ngx-smart-permissions';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, NgIf, NgxSmartPermissionsModule],
  templateUrl: './app.component.html'
})
export class AppComponent {
  private authService = inject(AuthService);
  private permissionService = inject(PermissionService);
  private router = inject(Router);

  constructor() {
    // تحميل صلاحيات المستخدم إذا مسجل دخول
    if (this.authService.isLoggedIn()) {
      const permissions = this.authService.getPermissions();
      this.permissionService.switchPermissions(permissions);
    } else {
      // إذا مش مسجل دخول، نضمن يرجع للـ login
      this.router.navigate(['/login']);
    }
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  logout() {
    this.authService.logout();
    // ما في داعي لـ switchPermissions([]) لأن logout بيمسحها أصلاً
  }
}
