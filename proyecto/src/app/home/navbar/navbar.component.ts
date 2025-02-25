import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, MatToolbarModule, MatButtonModule, MatIconModule, MatMenuModule],
  template: `
    <mat-toolbar class="dark-toolbar">
      <!-- Izquierda: Logo TFG -->
      <div class="logo">
        <img src="favicon.ico" alt="Logo TFG" height="40">
      </div>

      <!-- Botones de navegación -->
      <div class="nav-buttons">
        <button mat-button routerLink="/" routerLinkActive="active-link" [routerLinkActiveOptions]="{ exact: true }">
          Home
        </button>
        <button mat-button routerLink="/programas" routerLinkActive="active-link">
          Programas
        </button>
      </div>

      <!-- Espaciador para empujar el menú a la derecha -->
      <span class="spacer"></span>

      <!-- Menú desplegable de usuario -->
      <div>
        <button mat-icon-button [matMenuTriggerFor]="userMenu">
          <mat-icon>account_circle</mat-icon>
        </button>
        <mat-menu #userMenu="matMenu">
          <button mat-menu-item disabled>Perfil</button>
          <button mat-menu-item disabled>Configuración</button>
          <button mat-menu-item disabled>Cerrar sesión</button>
        </mat-menu>
      </div>
    </mat-toolbar>
  `,
  styles: [`
    .dark-toolbar {
      background-color: #1a1a1a;
      color: #fff;
    }
    .logo {
      display: flex;
      align-items: center;
      margin-right: 1rem;
    }
    .nav-buttons button {
      margin-right: 1rem;
      color: #fff;
    }
    .active-link {
      border: 2px solid #ffeb3b;
      font-weight: bold;
    }
    .spacer {
      flex: 1 1 auto;
    }
  `]
})
export class NavbarComponent {}
