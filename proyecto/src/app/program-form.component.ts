import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RstudioService } from './rstudio.service';

@Component({
  selector: 'app-program-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <h2>Enviar solicitud a RStudio Server</h2>
    <form [formGroup]="programForm" (ngSubmit)="onSubmit()">
      <label for="programName">Nombre del programa:</label>
      <input id="programName" formControlName="programName" placeholder="Ej: miPrograma">
      <button type="submit">Enviar</button>
    </form>

    <div *ngIf="response">
      <h3>Respuesta del RStudio Server:</h3>
      <pre>{{ response | json }}</pre>
    </div>
  `
})
export class ProgramFormComponent {
  programForm: FormGroup;
  response: any;

  constructor(private fb: FormBuilder, private rstudioService: RstudioService) {
    this.programForm = this.fb.group({
      programName: ['']
    });
  }

  onSubmit(): void {
    const programName = this.programForm.get('programName')?.value;
    if (programName) {
      this.rstudioService.getProgramData(programName).subscribe(
        data => {
          this.response = data;
        },
        error => {
          console.error('Error al obtener datos del programa:', error);
        }
      );
    }
  }
}
