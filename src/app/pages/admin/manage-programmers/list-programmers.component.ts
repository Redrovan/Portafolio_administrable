// src/app/pages/admin/manage-programmers/list-programmers.component.ts

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersService } from '../../../services/users.service';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-list-programmers',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './list-programmers.component.html',
  styleUrls: ['./list-programmers.component.scss']
})
export class ListProgrammersComponent {

  programmers: any[] = [];

  constructor(
    private usersService: UsersService,
    private router: Router
  ) {}

  ngOnInit() {
    this.usersService.getProgrammers().subscribe(users => {
      this.programmers = users.filter(u => u.role === 'programmer');
    });
  }

  gotoCreate() {
    this.router.navigate(['/admin/programmers/new']);
  }
}
