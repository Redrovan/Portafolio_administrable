// src/app/services/appointments.service.ts

import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, updateDoc, deleteDoc, doc, query, where } from '@angular/fire/firestore';
import { Appointment } from '../models/appointment.model';
import { collectionData } from 'rxfire/firestore';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AppointmentsService {
  private ref;

  constructor(private db: Firestore) {
    this.ref = collection(this.db, 'appointments');
  }

  getAppointmentsByProgrammer(programmerId: string): Observable<Appointment[]> {
    const q = query(this.ref, where('programmerId', '==', programmerId));
    return collectionData(q, { idField: 'id' }) as Observable<Appointment[]>;
  }

  getAppointmentsByUser(userId: string): Observable<Appointment[]> {
    const q = query(this.ref, where('userId', '==', userId));
    return collectionData(q, { idField: 'id' }) as Observable<Appointment[]>;
  }

  addAppointment(a: Appointment) {
    return addDoc(this.ref, a);
  }

  updateAppointment(id: string, data: Partial<Appointment>) {
    return updateDoc(doc(this.db, 'appointments', id), data);
  }

  deleteAppointment(id: string) {
    return deleteDoc(doc(this.db, 'appointments', id));
  }
}
