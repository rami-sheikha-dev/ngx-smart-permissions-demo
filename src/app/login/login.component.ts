import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../core/services/auth.service';
import { PermissionService } from 'ngx-smart-permissions';

@Component({
    selector: 'app-login',
    imports: [CommonModule, FormsModule],
    templateUrl: './login.component.html'
})
export class LoginComponent {
  username = '';
  password = '';
  error = '';

  constructor(
    private authService: AuthService,
    private permissionService: PermissionService,
    private router: Router
  ) {}

  onLogin() {
    this.authService.login(this.username, this.password).subscribe({
      next: ({ user, permissions, role }) => {
        this.permissionService.switchPermissions(permissions, role === 'admin', role);
        this.router.navigate(['/']);
      },
      error: err => {
        this.error = err.message;
      }
    });
  }
}
