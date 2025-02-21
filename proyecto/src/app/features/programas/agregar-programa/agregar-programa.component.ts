import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ProgramasService } from '../../../services/programas.service';
import { HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-agregar-programa',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './agregar-programa.component.html',
  styleUrls: ['./agregar-programa.component.css']
})
export class AgregarProgramaComponent {
  selectedFile: File | null = null;
  uploadProgress: number = 0;
  mensaje: string = '';

  constructor(private router: Router, private programasService: ProgramasService) {}

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  subirArchivo(): void {
    if (!this.selectedFile) {
      this.mensaje = 'Por favor, seleccione un archivo';
      return;
    }

    this.programasService.uploadPrograma(this.selectedFile).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress && event.total) {
        this.uploadProgress = Math.round((event.loaded / event.total) * 100);
      } else if (event.type === HttpEventType.Response) {
        this.mensaje = 'Archivo subido exitosamente';
        this.router.navigate(['/programas']);
      }
    }, error => {
      console.error('Error al subir el archivo', error);
      this.mensaje = 'Error al subir el archivo';
    });
  }
}
