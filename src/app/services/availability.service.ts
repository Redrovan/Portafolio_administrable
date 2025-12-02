// src/app/services/availability.service.ts

import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, updateDoc, deleteDoc, doc, query, where } from '@angular/fire/firestore';
import { Availability } from '../models/availability.model';
import { collectionData } from 'rxfire/firestore';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AvailabilityService {
  private ref;

  constructor(private db: Firestore) {
    this.ref = collection(this.db, 'availability');
  }

  getAll(programmerId: string): Observable<Availability[]> {
    const q = query(this.ref, where('programmerId', '==', programmerId));
    return collectionData(q, { idField: 'id' }) as Observable<Availability[]>;
  }

  add(a: Availability) {
    return addDoc(this.ref, a);
  }

  update(id: string, data: Partial<Availability>) {
    return updateDoc(doc(this.db, 'availability', id), data);
  }

  delete(id: string) {
    return deleteDoc(doc(this.db, 'availability', id));
  }
}
