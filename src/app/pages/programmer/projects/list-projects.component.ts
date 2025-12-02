// src/app/pages/programmer/projects/list-projects.component.ts

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectsService } from '../../../services/projects.service';
import { AuthService } from '../../../services/auth.service';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-list-projects',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './list-projects.component.html',
  styleUrls: ['./list-projects.component.scss']
})
export class ListProjectsComponent {

  user: any = null;
  projects: any[] = [];

  constructor(
    private projectsService: ProjectsService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.authService.user$.subscribe(u => {
      this.user = u;
      if (u) {
        this.projectsService.getProjectsByProgrammer(u.uid).subscribe(list => {
          this.projects = list;
        });
      }
    });
  }

  newProject() {
    this.router.navigate(['/programmer/projects/new']);
  }
}
