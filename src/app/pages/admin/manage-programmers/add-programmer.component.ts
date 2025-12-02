// src/app/pages/admin/manage-programmers/add-programmer.component.ts

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UsersService } from '../../../services/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-programmer',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-programmer.component.html',
  styleUrls: ['./add-programmer.component.scss']
})
export class AddProgrammerComponent {

  programmer: any = {
    displayName: '',
    email: '',
    speciality: '',
    bio: '',
    photoURL: '',
    socialLinks: {
      github: '',
      linkedin: '',
      portfolio: ''
    }
  };

  constructor(
    private usersService: UsersService,
    private router: Router
  ) {}

  save() {
    this.usersService.createProgrammer(this.programmer)
      .then(() => this.router.navigate(['/admin/programmers']));
  }
}
