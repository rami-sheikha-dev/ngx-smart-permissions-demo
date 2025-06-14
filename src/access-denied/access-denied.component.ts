import { Component } from '@angular/core';

@Component({
  selector: 'app-access-denied',
  standalone: true,
  template: `
    <div style="text-align:center; margin-top: 50px;">
      <h1>🚫 Access Denied</h1>
      <p>ليس لديك صلاحية للوصول إلى هذه الصفحة</p>
      <a routerLink="/">العودة إلى الصفحة الرئيسية</a>
    </div>
  `
})
export class AccessDeniedComponent {}
