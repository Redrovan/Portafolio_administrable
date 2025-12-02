// src/app/pages/user/schedule-appointment/schedule-appointment.component.ts

import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AvailabilityService } from '../../../services/availability.service';
import { AppointmentsService } from '../../../services/appointments.service';
import { AuthService } from '../../../services/auth.service';
import { UsersService } from '../../../services/users.service';

@Component({
  selector: 'app-schedule-appointment',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './schedule-appointment.component.html',
  styleUrls: ['./schedule-appointment.component.scss']
})
export class ScheduleAppointmentComponent {

  programmerId = '';
  programmer: any = null;
  user: any = null;
  availability: any[] = [];

  appointment = {
    date: '',
    time: '',
    reason: ''
  };

  constructor(
    private route: ActivatedRoute,
    private usersService: UsersService,
    private availabilityService: AvailabilityService,
    private appointmentsService: AppointmentsService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.programmerId = this.route.snapshot.params['uid'];

    this.authService.user$.subscribe(u => this.user = u);

    this.usersService.getProgrammers().subscribe(list => {
      this.programmer = list.find(p => p.uid === this.programmerId);
    });

    this.availabilityService.getAll(this.programmerId)
      .subscribe(a => this.availability = a);
  }

  send() {
    const a = {
      programmerId: this.programmerId,
      userId: this.user.uid,
      date: this.appointment.date,
      time: this.appointment.time,
      reason: this.appointment.reason,
      status: 'pendiente' as 'pendiente' | 'aprobada' | 'rechazada',
      createdAt: Date.now()
    };

    this.appointmentsService.addAppointment(a)
      .then(() => this.router.navigate(['/']));
  }
}
