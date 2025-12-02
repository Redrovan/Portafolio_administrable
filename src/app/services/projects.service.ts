// src/app/services/projects.service.ts

import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, updateDoc, deleteDoc, doc, query, where } from '@angular/fire/firestore';
import { Project } from '../models/project.model';
import { collectionData } from 'rxfire/firestore';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProjectsService {
  private ref;

  constructor(private db: Firestore) {
    this.ref = collection(this.db, 'projects');
  }

  getProjectsByProgrammer(programmerId: string): Observable<Project[]> {
    const q = query(this.ref, where('programmerId', '==', programmerId));
    return collectionData(q, { idField: 'id' }) as Observable<Project[]>;
  }

  addProject(data: Project) {
    return addDoc(this.ref, data);
  }

  updateProject(id: string, data: Partial<Project>) {
    return updateDoc(doc(this.db, 'projects', id), data);
  }

  deleteProject(id: string) {
    return deleteDoc(doc(this.db, 'projects', id));
  }
}
