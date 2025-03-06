import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <h2>Iniciar Sesión</h2>
    <form (ngSubmit)="login()">
      <label>Usuario:
        <input type="text" [(ngModel)]="usuario" name="usuario">
      </label>
      <br>
      <label>Contraseña:
        <input type="password" [(ngModel)]="contrasena" name="contrasena">
      </label>
      <br>
      <button type="submit">Log In</button>
    </form>
    <p *ngIf="errorMessage">{{ errorMessage }}</p>
    <p>¿No tienes cuenta? <a routerLink="/register">Registrar nuevo usuario</a></p>
  `,
  styles: [`
    /* estilos simples */
  `]
})
export class LoginComponent {
  usuario: string = '';
  contrasena: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login(): void {
    this.authService.login(this.usuario, this.contrasena).subscribe({
      next: () => {
        // Si login y lanzamiento de API son exitosos, redirige a programas
        this.router.navigate(['/programas']);
      },
      error: (err) => {
        this.errorMessage = 'Credenciales inválidas o error en la autenticación';
      }
    });
  }
}
