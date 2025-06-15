import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  templateUrl: './admin-dashboard.component.html',
    imports: [CommonModule]
  
})
export class AdminDashboardComponent {
  permissions = ['admin-dashboard', 'view-dashboard', 'edit-users'];
}
