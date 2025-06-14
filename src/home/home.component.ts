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
  constructor(private permissionService: PermissionService) { }

  loginAsAdmin() {
    this.permissionService.switchPermissions([], true);
  }

  loginAsUser() {

    this.permissionService.switchPermissions([
     ]);

  }

  logout() {
    this.loading = true
    this.permissionService.switchPermissions([]);
    setTimeout(() => {
      this.loading = false
    }, 100);
  }
}
