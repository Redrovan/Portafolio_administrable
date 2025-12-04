import { Injectable } from '@angular/core';
import { Auth, GoogleAuthProvider, signInWithPopup, signOut } from '@angular/fire/auth';
import { Firestore, doc, setDoc, onSnapshot } from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private userSubject = new BehaviorSubject<any>(null);
  user$ = this.userSubject.asObservable();

  constructor(
    private auth: Auth,
    private firestore: Firestore
  ) {
    this.listenAuthState();
  }

  // Detecta usuario logueado en tiempo real
  private listenAuthState() {
    this.auth.onAuthStateChanged(async (user) => {
      if (user) {
        const ref = doc(this.firestore, 'users', user.uid);

        onSnapshot(ref, snap => {
          this.userSubject.next(snap.data());
        });
      } else {
        this.userSubject.next(null);
      }
    });
  }

  // Login con Google
  async loginWithGoogle() {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(this.auth, provider);

    const user = result.user;

    const userRef = doc(this.firestore, 'users', user.uid);

    await setDoc(userRef, {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      role: 'user' 
    }, { merge: true });
  }

  // Logout
  logout() {
    return signOut(this.auth);
  }
}
