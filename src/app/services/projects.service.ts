import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, query, where } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProjectsService {

  constructor(private firestore: Firestore) {}

  addProject(project: any) {
    const ref = collection(this.firestore, 'projects');
    return addDoc(ref, project);
  }

  getProjectsByProgrammer(programmerId: string): Observable<any[]> {
    const ref = collection(this.firestore, 'projects');
    const q = query(ref, where('programmerId', '==', programmerId));
    return collectionData(q, { idField: 'id' }) as Observable<any[]>;
  }
}
