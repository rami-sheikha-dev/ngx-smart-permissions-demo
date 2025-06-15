import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgIf } from '@angular/common';
import { AuthService } from '../core/services/auth.service';
import { NgxSmartPermissionsModule, PermissionService, HasRoleDirective } from 'ngx-smart-permissions';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, NgIf, NgxSmartPermissionsModule, HasRoleDirective],
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private permissionService: PermissionService
  ) {}

  ngOnInit() {
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
