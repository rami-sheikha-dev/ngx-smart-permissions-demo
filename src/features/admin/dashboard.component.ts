import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-admin-dashboard',
  imports: [CommonModule],
  template: `
    <h2>🎛️ Admin Dashboard</h2>
    <p>محتوى خاص بالمستخدمين الذين لديهم صلاحية admin-dashboard</p>
  `
})
export class AdminDashboardComponent {}
