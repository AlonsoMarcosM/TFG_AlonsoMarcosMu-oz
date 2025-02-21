import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule],
  template: `
    <nav class="navbar">
      <a routerLink="/">Home</a>
      <a routerLink="/programas">Programas</a>
      
    </nav>
  `,
  styles: [`
    .navbar {
      background: #333;
      padding: 1rem;
    }
    .navbar a {
      color: #fff;
      margin-right: 1rem;
      text-decoration: none;
    }
  `]
})
export class NavbarComponent {}
