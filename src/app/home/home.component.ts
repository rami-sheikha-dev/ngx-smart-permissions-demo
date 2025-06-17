import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PermissionService, HasPermissionDirective } from 'ngx-smart-permissions';

@Component({
    selector: 'app-home',
    imports: [
        RouterModule,
        HasPermissionDirective // ✅ لازم لإظهار *ngxHasPermission
    ],
    templateUrl: './home.component.html'
})
export class HomeComponent {
   constructor(private permissionService: PermissionService) { }

 

  logout() {
     this.permissionService.switchPermissions([]);
 
  }
}
