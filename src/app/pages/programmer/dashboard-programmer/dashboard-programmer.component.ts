// src/app/pages/programmer/dashboard-programmer/dashboard-programmer.component.ts

import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-dashboard-programmer',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard-programmer.component.html',
  styleUrls: ['./dashboard-programmer.component.scss']
})
export class DashboardProgrammerComponent {

  user: any = null;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.authService.user$.subscribe(u => this.user = u);
  }

  go(path: string) {
    this.router.navigate([path]);
  }
}
