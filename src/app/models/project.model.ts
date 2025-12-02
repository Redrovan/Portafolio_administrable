// src/app/models/project.model.ts

export type ProjectType = 'academico' | 'laboral';

export interface Project {
  id?: string;                  // ID generado por Firestore
  programmerId: string;         // uid del programador dueño del proyecto

  type: ProjectType;            // académico | laboral
  name: string;                 // Nombre del proyecto
  description: string;          // Descripción
  participation:                // Tipo de participación
    'frontend' | 'backend' | 'fullstack' | 'database';

  technologies: string[];       // Lista de tecnologías usadas
  repoUrl?: string;             // Link a GitHub
  demoUrl?: string;             // Demo o despliegue
}
