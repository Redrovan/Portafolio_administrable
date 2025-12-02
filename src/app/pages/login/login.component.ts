// src/app/pages/login/login.component.ts

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loading = false;

  constructor(private auth: AuthService, private router: Router) {}

  async login() {
    this.loading = true;

    try {
      await this.auth.loginWithGoogle();
      this.router.navigate(['/']);
    } catch (e) {
      console.error('Error al iniciar sesión:', e);
    }

    this.loading = false;
  }
}
