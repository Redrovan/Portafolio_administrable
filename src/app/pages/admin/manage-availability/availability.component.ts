// src/app/pages/admin/manage-availability/availability.component.ts

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AvailabilityService } from '../../../services/availability.service';
import { UsersService } from '../../../services/users.service';

@Component({
  selector: 'app-availability',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './availability.component.html',
  styleUrls: ['./availability.component.scss']
})
export class AvailabilityComponent {

  programmers: any[] = [];
  selectedProgrammer = '';
  availabilityList: any[] = [];

  newAvailability = {
    dayOfWeek: '',
    startTime: '',
    endTime: ''
  };

  constructor(
    private availabilityService: AvailabilityService,
    private usersService: UsersService
  ) {}

  ngOnInit() {
    this.usersService.getProgrammers().subscribe(list => {
      this.programmers = list.filter(u => u.role === 'programmer');
    });
  }

  loadAvailability() {
    if (!this.selectedProgrammer) return;

    this.availabilityService
      .getAll(this.selectedProgrammer)
      .subscribe(a => this.availabilityList = a);
  }

  saveAvailability() {
    const data = {
      programmerId: this.selectedProgrammer,
      ...this.newAvailability
    };

    this.availabilityService.add(data);
  }

  deleteAvailability(id: string) {
    this.availabilityService.delete(id);
  }
}
