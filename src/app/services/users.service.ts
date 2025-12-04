import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  query,
  where,
  doc,
  setDoc,
  deleteDoc,
  docData,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UsersService {

  constructor(private firestore: Firestore) {}

//listar programadores
  getProgrammers(): Observable<any[]> {
    const ref = collection(this.firestore, 'users');
    const q = query(ref, where('role', '==', 'programmer'));
    return collectionData(q, { idField: 'uid' }) as Observable<any[]>;
  }

//listar usuarios
  getUsers(): Observable<any[]> {
    const ref = collection(this.firestore, 'users');
    const q = query(ref, where('role', '==', 'user'));
    return collectionData(q, { idField: 'uid' }) as Observable<any[]>;
  }

//crear programador
  createProgrammer(data: any) {
    const cleanUid = data.email.replace(/[@.]/g, '_');
    const ref = doc(this.firestore, 'users', cleanUid);

    return setDoc(ref, {
      ...data,
      uid: cleanUid,
      role: 'programmer'
    });
  }

//obtener usuario por id
  getUserById(uid: string) {
    const ref = doc(this.firestore, 'users', uid);
    return docData(ref, { idField: 'uid' }) as Observable<any>;
  }

//actualizar usuario
  updateUser(uid: string, data: any) {
    const ref = doc(this.firestore, 'users', uid);
    return setDoc(ref, data, { merge: true });
  }

//eliminar usuario
  deleteUser(uid: string) {
    const ref = doc(this.firestore, 'users', uid);
    return deleteDoc(ref);
  }

//cambiar rol
  setRole(uid: string, role: 'user' | 'programmer' | 'admin') {
    const ref = doc(this.firestore, 'users', uid);
    return setDoc(ref, { role }, { merge: true });
  }
}
