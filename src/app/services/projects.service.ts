import { Injectable } from '@angular/core';
import { 
  Firestore, 
  collection, 
  addDoc, 
  collectionData, 
  query, 
  where, 
  doc, 
  docData, 
  setDoc 
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Project } from '../models/project.model';


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

getProjectById(id: string) {
  const ref = doc(this.firestore, 'projects', id);
  return docData(ref, { idField: 'id' }) as Observable<Project>;
}


  updateProject(id: string, data: any) {
    const ref = doc(this.firestore, 'projects', id);
    return setDoc(ref, data, { merge: true });
  }
}
