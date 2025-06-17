import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgIf } from '@angular/common';
 import { NgxSmartPermissionsModule, PermissionService, HasRoleDirective } from 'ngx-smart-permissions';
import { AuthService } from './core/services/auth.service';

@Component({
    selector: 'app-root',
    imports: [RouterModule, NgIf, NgxSmartPermissionsModule, HasRoleDirective],
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  role = '';

  constructor(
    private authService: AuthService,
    private permissionService: PermissionService
  ) { }

  ngOnInit() {
    this.authService.role$.subscribe((role: string) => {
      this.role = role;
    });


    // ✅ تحميل صلاحيات في حال تم تحديث الصفحة
    if (this.authService.isLoggedIn()) {
      const user = this.authService.getUser();
      const permissions = user?.permissions || [];
      const role = user?.role || '';
      this.permissionService.switchPermissions(permissions, role === 'admin', role);
    }
  }

  logout() {
    this.authService.logout();
    location.reload();
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }
}
