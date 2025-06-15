import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  templateUrl: './user-dashboard.component.html',
  imports: [CommonModule]
})
export class UserDashboardComponent {
  permissions = ['user-dashboard', 'view-profile'];
}
