import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersService } from '../../../services/users.service';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-list-users',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss']
})
export class ListUsersComponent {

  users: any[] = [];

  constructor(
    private usersService: UsersService,
    private router: Router
  ) {}

  ngOnInit() {
    this.usersService.getUsers().subscribe(list => {
      this.users = list;
    });
  }

  edit(uid: string) {
    this.router.navigate(['/admin/users/edit', uid]);
  }

  remove(uid: string) {
    if (confirm("¿Eliminar usuario?")) {
      this.usersService.deleteUser(uid);
    }
  }

  promote(uid: string, type: 'admin' | 'programmer') {
    this.usersService.setRole(uid, type);
  }
}
