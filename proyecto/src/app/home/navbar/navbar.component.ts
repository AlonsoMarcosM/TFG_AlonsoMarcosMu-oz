import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, MatToolbarModule, MatButtonModule, MatIconModule, MatMenuModule],
  template: `
    <mat-toolbar class="dark-toolbar">
      <!-- Logo -->
      <div class="logo">
        <img src="favicon.ico" alt="Logo TFG" height="40">
      </div>

      <!-- Botones de navegación -->
      <div class="nav-buttons">
        <button mat-button routerLink="/programas" routerLinkActive="active-link">
          Gestión de Programas
        </button>
      </div>

      <span class="spacer"></span>

      <!-- Menú de usuario -->
      <div *ngIf="isLoggedIn(); else noUser">
        <button mat-icon-button [matMenuTriggerFor]="userMenu">
          <mat-icon>account_circle</mat-icon>
        </button>
        <mat-menu #userMenu="matMenu">
          <button mat-menu-item disabled>Perfil ({{ currentUser }})</button>
          <button mat-menu-item disabled>Configuración</button>
          <button mat-menu-item (click)="logout()">Cerrar sesión</button>
        </mat-menu>
      </div>
      <ng-template #noUser>
        <button mat-button routerLink="/">Iniciar sesión</button>
      </ng-template>
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
export class NavbarComponent {
  currentUser: string = '';

  constructor(private router: Router, private authService: AuthService) {
    this.currentUser = this.authService.getCurrentUser();
  }

  isLoggedIn(): boolean {
    return !!this.authService.getToken();
  }

  logout(): void {
    this.authService.logout().subscribe(() => {
      this.router.navigate(['/']);
    });
  }
}
