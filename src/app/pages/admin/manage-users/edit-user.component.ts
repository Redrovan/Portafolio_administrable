import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../../../services/users.service';

@Component({
  selector: 'app-edit-user',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent {

  user: any = null;
  uid = '';

  constructor(
    private route: ActivatedRoute,
    private usersService: UsersService,
    private router: Router
  ) {}

  ngOnInit() {
    this.uid = this.route.snapshot.params['uid'];

    this.usersService.getUserById(this.uid).subscribe(data => {
      this.user = data;
    });
  }

  save() {
    this.usersService.updateUser(this.uid, this.user)
      .then(() => this.router.navigate(['/admin/users']));
  }
}
