import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../../../services/users.service';

@Component({
  selector: 'app-edit-programmer',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-programmer.component.html',
  styleUrls: ['./edit-programmer.component.scss']
})
export class EditProgrammerComponent {

  programmer: any = null;
  uid = '';

  constructor(
    private route: ActivatedRoute,
    private usersService: UsersService,
    private router: Router
  ) {}

  ngOnInit() {
    this.uid = this.route.snapshot.params['uid'];

    this.usersService.getUserById(this.uid).subscribe(data => {
      this.programmer = data;
    });
  }

  save() {
    this.usersService.updateUser(this.uid, this.programmer)
      .then(() => this.router.navigate(['/admin/programmers']));
  }
}
