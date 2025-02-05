import { Component } from '@angular/core';
import { ProgramFormComponent } from './program-form.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ProgramFormComponent],
  template: `
    <h1>{{ title }}</h1>
    <p>Gestionar programas</p>
    <app-program-form></app-program-form>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'APPWEB';
}
