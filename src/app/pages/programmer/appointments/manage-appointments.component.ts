// src/app/pages/programmer/appointments/manage-appointments.component.ts

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppointmentsService } from '../../../services/appointments.service';
import { AuthService } from '../../../services/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-manage-appointments',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './manage-appointments.component.html',
  styleUrls: ['./manage-appointments.component.scss']
})
export class ManageAppointmentsComponent {

  user: any = null;
  appointments: any[] = [];

  constructor(
    private authService: AuthService,
    private appointmentsService: AppointmentsService
  ) {}

  ngOnInit() {
    this.authService.user$.subscribe(u => {
      this.user = u;
      if (u) {
        this.appointmentsService.getAppointmentsByProgrammer(u.uid)
          .subscribe(list => this.appointments = list);
      }
    });
  }

updateStatus(a: any, status: 'pendiente' | 'aprobada' | 'rechazada') {
    const msg = status === 'aprobada'
      ? 'Tu asesoría ha sido APROBADA'
      : 'Tu asesoría ha sido RECHAZADA';

    this.appointmentsService.updateAppointment(a.id, {
status: status as 'pendiente' | 'aprobada' | 'rechazada',
      responseMessage: msg
    });
  }
}
