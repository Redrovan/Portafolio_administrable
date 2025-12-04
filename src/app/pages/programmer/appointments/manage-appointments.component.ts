// src/app/pages/programmer/appointments/manage-appointments.component.ts

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppointmentsService } from '../../../services/appointments.service';
import { AuthService } from '../../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { EmailService } from '../../../services/email.service';

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
    private appointmentsService: AppointmentsService,
    private emailService: EmailService
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

updateStatus(a: any, status: string) {
  const msg =
    status === 'aprobada'
      ? 'Tu asesoría ha sido APROBADA.'
      : 'Tu asesoría ha sido RECHAZADA.';

  // 1) Actualizar en Firestore
  this.appointmentsService.updateAppointment(a.id, {
    status,
    responseMessage: msg
  });

  // 2) Preparar plantillas
  let html = '';
  let whatsappMessage = '';

  if (status === 'aprobada') {
    html = this.buildApprovedEmailHtml(a);
    whatsappMessage = this.buildApprovedWhatsapp(a);
  } else {
    html = this.buildRejectedEmailHtml(a);
    whatsappMessage = this.buildRejectedWhatsapp(a);
  }

  // 3) Enviar correo (si tenemos email)
  if (a.userEmail) {
    this.emailService
      .sendEmail(a.userEmail, 'Actualización de asesoría', html)
      .subscribe({
        next: () => console.log('Correo enviado'),
        error: (err) => console.error('Error al enviar correo', err)
      });
  }

  // 4) Enviar WhatsApp (si tenemos teléfono)
  if (a.userPhone) {
    this.emailService
      .sendWhatsApp(a.userPhone, whatsappMessage)
      .subscribe({
        next: () => console.log('WhatsApp enviado'),
        error: (err) => console.error('Error WhatsApp', err)
      });
  }
}

private buildApprovedEmailHtml(a: any): string {
  return `
  <div style="font-family:Arial;padding:20px;background:#f5f5f5;color:#333;">
    <div style="background:#fff;padding:20px;border-radius:10px;">
      
      <h2 style="color:#4dabf7;">Asesoría Aprobada ✔</h2>

      <p>Hola, tu solicitud de asesoría ha sido
        <strong style="color:#22c55e;">Aprobada</strong>.
      </p>

      <p>
         <strong>Fecha:</strong> ${a.date}<br>
         <strong>Hora:</strong> ${a.time}<br>
         <strong>Programador:</strong> ${this.user?.displayName || 'Programador'}
      </p>

      <p>
        Si necesitas reprogramar, responde a este correo.
      </p>

      <p style="margin-top:25px;color:#555;">
        — Portafolio Servicios
      </p>
    </div>
  </div>
  `;
}

private buildRejectedEmailHtml(a: any): string {
  return `
  <div style="font-family:Arial;padding:20px;background:#f5f5f5;color:#333;">
    <div style="background:#fff;padding:20px;border-radius:10px;">
      
      <h2 style="color:#ef4444;">Asesoría Rechazada </h2>

      <p>Hola, lamentablemente tu asesoría ha sido
        <strong style="color:#ef4444;">rechazada</strong>.
      </p>

      <p>
        Motivo: No disponible en la fecha/hora solicitada.
      </p>

      <p style="color:#555;margin-top:25px;">
        Puedes elegir otro programador desde tu panel.
      </p>

      <p>— Portafolio Servicios</p>
    </div>
  </div>
  `;
}

private buildApprovedWhatsapp(a: any): string {
  return `¡Hola! Tu asesoría ha sido APROBADA 

 Fecha: ${a.date}
 Hora: ${a.time}
 Programador: ${this.user?.displayName || 'Programador'}

¡Nos vemos pronto! `;
}

private buildRejectedWhatsapp(a: any): string {
  return `Hola, tu asesoría ha sido RECHAZADA 

Motivo: No disponible en la fecha/hora solicitada.

Puedes solicitar una nueva asesoría desde la plataforma.`;
}

}


