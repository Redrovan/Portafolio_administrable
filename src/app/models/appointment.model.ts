// src/app/models/appointment.model.ts

export type AppointmentStatus = 'pendiente' | 'aprobada' | 'rechazada';

export interface Appointment {
  id?: string;                 // ID en Firestore
  programmerId: string;        // A quién le agendan
  userId: string;              // Quién la solicita (usuario normal)

  date: string;                // Fecha YYYY-MM-DD
  time: string;                // Hora HH:mm
  reason?: string;             // Comentario opcional del usuario

  status: AppointmentStatus;   // pendiente | aprobada | rechazada
  responseMessage?: string;    // Mensaje del programador

  createdAt: number;           // timestamp
}
