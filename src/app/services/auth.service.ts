// src/app/services/auth.service.ts

import { Injectable } from '@angular/core';
import { Auth, GoogleAuthProvider, signInWithPopup, signOut, user } from '@angular/fire/auth';
import { Firestore, doc, getDoc, setDoc } from '@angular/fire/firestore';
import { AppUser } from '../models/user.model';
import { docData } from 'rxfire/firestore';
import { Observable, of, switchMap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  user$: Observable<AppUser | null>;

  constructor(private auth: Auth, private db: Firestore) {
    this.user$ = user(this.auth).pipe(
      switchMap((u) => {
        if (!u) return of(null);
        const ref = doc(this.db, 'users', u.uid);
        return docData(ref, { idField: 'uid' }) as Observable<AppUser>;
      })
    );
  }

  async loginWithGoogle() {
    const provider = new GoogleAuthProvider();
    const cred = await signInWithPopup(this.auth, provider);
    const u = cred.user;

    const ref = doc(this.db, 'users', u.uid);
    const snap = await getDoc(ref);

    if (!snap.exists()) {
      const newUser: AppUser = {
        uid: u.uid,
        displayName: u.displayName || 'Sin nombre',
        email: u.email || '',
        photoURL: u.photoURL || '',
        role: 'user',
      };

      await setDoc(ref, newUser);
    }
  }

  logout() {
    return signOut(this.auth);
  }
}
