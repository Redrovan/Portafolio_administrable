import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, doc, setDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UsersService {

  constructor(private firestore: Firestore) {}

  // Obtener todos los usuarios
  getUsers(): Observable<any[]> {
    const ref = collection(this.firestore, 'users');
    return collectionData(ref, { idField: 'uid' }) as Observable<any[]>;
  }

  // Obtener programadores
  getProgrammers(): Observable<any[]> {
    const ref = collection(this.firestore, 'users');
    return collectionData(ref, { idField: 'uid' }) as Observable<any[]>;
  }

  // Crear programador
  createProgrammer(data: any) {
    const ref = doc(this.firestore, 'users', data.email);
    return setDoc(ref, {
      ...data,
      uid: data.email,
      role: 'programmer'
    });
  }

  // Asignar rol (admin manual)
  setRole(uid: string, role: string) {
    const ref = doc(this.firestore, 'users', uid);
    return setDoc(ref, { role }, { merge: true });
  }
}
