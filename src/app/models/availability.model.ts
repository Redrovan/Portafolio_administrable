// src/app/models/availability.model.ts

export interface Availability {
  id?: string;                // ID en Firestore
  programmerId: string;       // uid del programador

  dayOfWeek: string;          // Lunes, Martes, Miércoles...
  startTime: string;          // Ej: "14:00"
  endTime: string;            // Ej: "16:00"
}
