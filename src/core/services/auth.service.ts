import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, map, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { PermissionService } from 'ngx-smart-permissions';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly API_URL = 'http://localhost:3000/users';
  private readonly TOKEN_KEY = 'token';
  private readonly USER_KEY = 'user';

  constructor(
    private http: HttpClient,
    private router: Router,
    private permissionService: PermissionService
  ) {}

  login(username: string, password: string) {
    return this.http.get<any[]>(`${this.API_URL}?username=${username}&password=${password}`).pipe(
      map(users => {
        if (users.length === 0) throw new Error('Invalid credentials');

        const user = users[0];

        // حفظ البيانات في localStorage
        localStorage.setItem(this.TOKEN_KEY, 'fake-jwt-token');
        localStorage.setItem(this.USER_KEY, JSON.stringify(user));
        localStorage.setItem('permissions', JSON.stringify(user.permissions || []));

        // تفعيل الصلاحيات لايف
        this.permissionService.switchPermissions(user.permissions || []);

        return true;
      })
    );
  }

  getUser() {
    return JSON.parse(localStorage.getItem(this.USER_KEY) || 'null');
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  getPermissions(): string[] {
    const raw = localStorage.getItem('permissions');
    return raw ? JSON.parse(raw) : [];
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
    localStorage.removeItem('permissions');

    // تفريغ الصلاحيات من السيستم
    this.permissionService.switchPermissions([]);

    this.router.navigate(['/login']);
  }
}
