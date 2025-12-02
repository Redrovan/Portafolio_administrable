// src/app/pages/admin/dashboard-admin/dashboard-admin.component.ts

import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard-admin',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.scss']
})
export class DashboardAdminComponent {

  constructor(private router: Router) {}

  go(path: string) {
    this.router.navigate([path]);
  }
}
