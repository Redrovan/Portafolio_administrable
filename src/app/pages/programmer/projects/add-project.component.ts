// src/app/pages/programmer/projects/add-project.component.ts

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProjectsService } from '../../../services/projects.service';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-project',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.scss']
})
export class AddProjectComponent {

  user: any = null;

  project: any = {
    type: 'academico',
    name: '',
    description: '',
    participation: 'frontend',
    technologies: '',
    repoUrl: '',
    demoUrl: ''
  };

  constructor(
    private authService: AuthService,
    private projectsService: ProjectsService,
    private router: Router
  ) {}

  ngOnInit() {
    this.authService.user$.subscribe(u => this.user = u);
  }

  save() {
    const data = {
      programmerId: this.user.uid,
      ...this.project,
      technologies: this.project.technologies.split(',').map((t: string) => t.trim())
    };

    this.projectsService.addProject(data)
      .then(() => this.router.navigate(['/programmer/projects']));
  }
}
