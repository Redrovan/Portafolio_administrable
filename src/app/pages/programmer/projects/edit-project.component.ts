import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectsService } from '../../../services/projects.service';
import { Project } from '../../../models/project.model';

@Component({
  selector: 'app-edit-project',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.scss']
})
export class EditProjectComponent {

  project: Project | null = null;
  id = '';

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectsService,
    private router: Router
  ) {}

  ngOnInit() {
  this.id = this.route.snapshot.params['id'];

  this.projectService.getProjectById(this.id)
    .subscribe((p: Project | undefined) => {
      if (!p) return;
      this.project = p;
    });
}


  save() {
    if (!this.project) return;

    const updated: Project = {
      ...this.project,
      technologies: (typeof this.project.technologies === 'string')
        ? (this.project.technologies as any)
            .split(',')
            .map((t: string) => t.trim())
        : this.project.technologies
    };

    this.projectService.updateProject(this.id, updated)
      .then(() => this.router.navigate(['/programmer/projects']));
  }
}
