import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <h2>Registrar Nuevo Usuario</h2>
    <form (ngSubmit)="register()">
      <label>Usuario:
        <input type="text" [(ngModel)]="usuario" name="usuario" required>
      </label>
      <br>
      <label>Contraseña:
        <input type="password" [(ngModel)]="contrasena" name="contrasena" required>
      </label>
      <br>
      <label>
        <input type="checkbox" [(ngModel)]="esAdmin" name="esAdmin">
        Registrar como Administrador
      </label>
      <br>
      <button type="submit">Registrar</button>
    </form>
    <p *ngIf="mensaje">{{ mensaje }}</p>
    <button (click)="volver()">Volver a Log In</button>
  `,
  styles: [`
    h2 { color: #333; }
    form { margin-bottom: 1rem; }
    label { display: block; margin: 0.5rem 0; }
  `]
})
export class RegisterComponent {
  usuario: string = '';
  contrasena: string = '';
  esAdmin: boolean = false;
  mensaje: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  register(): void {
    this.authService.register(this.usuario, this.contrasena, this.esAdmin).subscribe(response => {
      if (response.status && response.status[0] === 'success') {
        this.mensaje = response.message ? response.message[0] : 'Usuario creado exitosamente.';
        setTimeout(() => {
          this.router.navigate(['/']);
        }, 2000);
      } else {
        this.mensaje = 'Error al registrar el usuario.';
      }
    }, error => {
      console.error('Error en registro:', error);
      this.mensaje = 'Error al registrar el usuario.';
    });
  }

  volver(): void {
    this.router.navigate(['/']);
  }
}
