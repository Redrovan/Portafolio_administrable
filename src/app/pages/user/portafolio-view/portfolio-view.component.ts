// src/app/pages/user/portfolio-view/portfolio-view.component.ts

import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UsersService } from '../../../services/users.service';
import { ProjectsService } from '../../../services/projects.service';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-portfolio-view',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './portfolio-view.component.html',
  styleUrls: ['./portfolio-view.component.scss']
})
export class PortfolioViewComponent {

  programmerId = '';
  programmer: any = null;
  academicProjects: any[] = [];
  workProjects: any[] = [];
  loggedUser: any = null;

  constructor(
    private route: ActivatedRoute,
    private usersService: UsersService,
    private projectsService: ProjectsService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.programmerId = this.route.snapshot.params['uid'];

    this.authService.user$.subscribe(u => this.loggedUser = u);

    this.usersService.getProgrammers().subscribe(list => {
      this.programmer = list.find(p => p.uid === this.programmerId);
    });

    this.projectsService.getProjectsByProgrammer(this.programmerId)
      .subscribe(projects => {
        this.academicProjects = projects.filter(p => p.type === 'academico');
        this.workProjects     = projects.filter(p => p.type === 'laboral');
      });
  }

  schedule() {
    if (!this.loggedUser) {
      this.router.navigate(['/login']);
      return;
    }

    this.router.navigate(['/schedule', this.programmerId]);
  }
}
