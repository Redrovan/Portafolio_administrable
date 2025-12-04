import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, query, where, deleteDoc, doc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AvailabilityService {

  constructor(private firestore: Firestore) {}

  // Registrar disponibilidad
  add(data: any) {
    const ref = collection(this.firestore, 'availability');
    return addDoc(ref, data);
  }

  // Obtener disponibilidad del programador
  getAll(programmerId: string): Observable<any[]> {
    const ref = collection(this.firestore, 'availability');
    const q = query(ref, where('programmerId', '==', programmerId));
    return collectionData(q, { idField: 'id' }) as Observable<any[]>;
  }

  // Eliminar horario
  delete(id: string) {
    const ref = doc(this.firestore, 'availability', id);
    return deleteDoc(ref);
  }
}
