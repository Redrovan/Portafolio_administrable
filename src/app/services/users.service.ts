// src/app/services/users.service.ts

import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, updateDoc, deleteDoc, doc } from '@angular/fire/firestore';
import { collectionData } from 'rxfire/firestore';
import { AppUser } from '../models/user.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UsersService {
  private ref;

  constructor(private db: Firestore) {
    this.ref = collection(this.db, 'users');
  }

  getAllUsers(): Observable<AppUser[]> {
    return collectionData(this.ref, { idField: 'uid' }) as Observable<AppUser[]>;
  }

  getProgrammers(): Observable<AppUser[]> {
    return collectionData(this.ref, { idField: 'uid' }) as Observable<AppUser[]>; // filtro se hará en componente
  }

  createProgrammer(data: Partial<AppUser>) {
    return addDoc(this.ref, { ...data, role: 'programmer' });
  }

  updateUser(id: string, data: Partial<AppUser>) {
    return updateDoc(doc(this.db, 'users', id), data);
  }

  deleteUser(id: string) {
    return deleteDoc(doc(this.db, 'users', id));
  }
}
