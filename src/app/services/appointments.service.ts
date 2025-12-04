import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, query, where, doc, updateDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AppointmentsService {

  constructor(private firestore: Firestore) {}

  // Usuario crea asesoría
  addAppointment(data: any) {
    const ref = collection(this.firestore, 'appointments');
    return addDoc(ref, data);
  }

  // Programador revisa sus citas
  getAppointmentsByProgrammer(programmerId: string): Observable<any[]> {
    const ref = collection(this.firestore, 'appointments');
    const q = query(ref, where('programmerId', '==', programmerId));
    return collectionData(q, { idField: 'id' }) as Observable<any[]>;
  }

  // Programador actualiza el estado (aprobada/rechazada)
  updateAppointment(id: string, data: any) {
    const ref = doc(this.firestore, 'appointments', id);
    return updateDoc(ref, data);
  }
}
