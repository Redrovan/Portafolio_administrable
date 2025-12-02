import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProgrammersService {

  constructor(private db: Firestore) {}

  getProgrammers(): Observable<any[]> {
    const ref = collection(this.db, 'programmers');
    return collectionData(ref, { idField: 'id' }) as Observable<any[]>;
  }
}
