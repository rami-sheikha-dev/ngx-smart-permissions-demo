import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap, BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly API_URL = 'http://localhost:3000/users';
  private readonly TOKEN_KEY = 'token';
  private readonly USER_KEY = 'user';
  private roleSubject = new BehaviorSubject<string>('');
  role$ = this.roleSubject.asObservable();

  constructor(private http: HttpClient) {
     if (this.isLoggedIn()) {
      const role = this.getRole(); 
      this.roleSubject.next(role);
    }
  }
  login(username: string, password: string) {
    return this.http.get<any[]>(`${this.API_URL}?username=${username}&password=${password}`).pipe(
      tap(users => {
        if (users.length === 0) throw new Error('Invalid credentials');
        const user = users[0];

        localStorage.setItem(this.TOKEN_KEY, 'fake-jwt-token');
        localStorage.setItem(this.USER_KEY, JSON.stringify(user));

        this.roleSubject.next(user.role || '');
      }),
      map(users => {
        const user = users[0];
        return {
          user,
          permissions: user.permissions || [],
          role: user.role || ''
        };
      })
    );
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
    this.roleSubject.next('');
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

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }
}
