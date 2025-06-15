import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly API_URL = 'http://localhost:3000/users';
  private readonly TOKEN_KEY = 'token';
  private readonly USER_KEY = 'user';

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<{ user: any, permissions: string[], role: string }> {
    return this.http.get<any[]>(`${this.API_URL}?username=${username}&password=${password}`).pipe(
      map(users => {
        if (users.length === 0) throw new Error('Invalid credentials');

        const user = users[0];
        const permissions = user.permissions || [];
        const role = user.role || '';

        localStorage.setItem(this.TOKEN_KEY, 'fake-jwt-token');
        localStorage.setItem(this.USER_KEY, JSON.stringify(user));

        return { user, permissions, role };
      })
    );
  }

  getUser() {
    return JSON.parse(localStorage.getItem(this.USER_KEY) || 'null');
  }

  getPermissions(): string[] {
    const user = this.getUser();
    return user?.permissions || [];
  }

  getRole(): string {
    const user = this.getUser();
    return user?.role || '';
  }

  isSuperAdmin(): boolean {
    return this.getRole() === 'admin';
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem(this.TOKEN_KEY);
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
  }
}
