// src/app/models/user.model.ts

export type UserRole = 'admin' | 'programmer' | 'user';

export interface AppUser {
  uid: string;                    // ID del usuario (Firebase Auth)
  displayName: string;            // Nombre visible
  email: string;                  // Correo del usuario
  photoURL?: string;              // Foto de perfil
  role: UserRole;                 // admin | programmer | user

  // Solo para programadores
  speciality?: string;            // Especialidad o rol principal
  bio?: string;                   // Descripción profesional
  socialLinks?: {
    github?: string;
    linkedin?: string;
    portfolio?: string;
  };
}
