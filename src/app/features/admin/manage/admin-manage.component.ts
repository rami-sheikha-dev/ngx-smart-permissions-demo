// src/app/features/admin/admin-manage.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-admin-manage',
    imports: [CommonModule, FormsModule],
    template: `
    <div class="container mt-4">
      <h2>Manage Roles & Permissions</h2>

      <div class="mb-3">
        <label class="form-label">New Role</label>
        <input class="form-control" [(ngModel)]="newRole" placeholder="Enter role name" />
        <button class="btn btn-primary mt-2" (click)="addRole()">Add Role</button>
      </div>

      <div class="mb-4">
        <label class="form-label">New Permission</label>
        <input class="form-control" [(ngModel)]="newPermission" placeholder="Enter permission" />
        <button class="btn btn-success mt-2" (click)="addPermission()">Add Permission</button>
      </div>

      <div class="row">
        <div class="col-md-6">
          <h5>Roles</h5>
          <ul class="list-group">
            <li class="list-group-item" *ngFor="let role of roles">
              {{ role }}
              <button class="btn btn-sm btn-danger float-end" (click)="removeRole(role)">Delete</button>
            </li>
          </ul>
        </div>
        <div class="col-md-6">
          <h5>Permissions</h5>
          <ul class="list-group">
            <li class="list-group-item" *ngFor="let perm of permissions">
              {{ perm }}
              <button class="btn btn-sm btn-danger float-end" (click)="removePermission(perm)">Delete</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  `
})
export class AdminManageComponent {
  roles: string[] = ['admin', 'user'];
  permissions: string[] = ['view-dashboard', 'edit-profile'];

  newRole = '';
  newPermission = '';

  addRole() {
    if (this.newRole && !this.roles.includes(this.newRole)) {
      this.roles.push(this.newRole.trim());
      this.newRole = '';
    }
  }

  removeRole(role: string) {
    this.roles = this.roles.filter(r => r !== role);
  }

  addPermission() {
    if (this.newPermission && !this.permissions.includes(this.newPermission)) {
      this.permissions.push(this.newPermission.trim());
      this.newPermission = '';
    }
  }

  removePermission(perm: string) {
    this.permissions = this.permissions.filter(p => p !== perm);
  }
}
