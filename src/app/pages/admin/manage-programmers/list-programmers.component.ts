import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersService } from '../../../services/users.service';
import { Router, RouterModule } from '@angular/router';

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
      this.programmers = users;
    });
  }

  gotoCreate() {
    this.router.navigate(['/admin/programmers/new']);
  }

  delete(uid: string) {
    if (confirm("¿Eliminar programador?")) {
      this.usersService.deleteUser(uid);
    }
  }
}
