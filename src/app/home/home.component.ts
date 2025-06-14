import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PermissionService, HasPermissionDirective } from 'ngx-smart-permissions';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterModule,
    HasPermissionDirective // ✅ لازم لإظهار *ngxHasPermission
  ],
  templateUrl: './home.component.html'
})
export class HomeComponent {
  loading = false;
  constructor(private permissionService: PermissionService) {}

  loginAsAdmin() {
    this.loading = true
    this.permissionService.switchPermissions([
      'access-app',
      'view-dashboard',
      'edit-users'
    ], true);
    setTimeout(() => {
       this.loading = false
    }, 100);
  }

  loginAsUser() {
    this.loading = true

    this.permissionService.switchPermissions([
      'access-app',
      'view-dashboard'
    ]);
    setTimeout(() => {
       this.loading = false
    }, 100);
  }

  logout() {
 this.loading = true
    this.permissionService.switchPermissions([]);
     setTimeout(() => {
       this.loading = false
    }, 100);
  }
}
