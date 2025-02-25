import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { DeleteSuccessDialogComponent } from '../eliminar-programa/delete-success-dialog.component'; // Ajusta la ruta según tu estructura
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ProgramasService } from '../../../services/programas.service';

@Component({
  selector: 'app-lista-programas',
  standalone: true,
  imports: [CommonModule, RouterModule, MatTableModule, MatButtonModule, MatDialogModule],
  templateUrl: './lista-programas.component.html',
  styleUrls: ['./lista-programas.component.css']
})
export class ListaProgramasComponent {
  displayedColumns: string[] = ['nombre_programa', 'nombre_archivo', 'propósito', 'acciones'];
  dataSource: any[] = [];

  constructor(private programasService: ProgramasService, private dialog: MatDialog) {
    this.cargarProgramas();
  }

  cargarProgramas(): void {
    this.programasService.refresh().subscribe(() => {
      this.programasService.listarProgramas().subscribe(data => {
        this.dataSource = data;
      });
    });
  }

  eliminarPrograma(element: any): void {
    // Suponemos que el nombre del archivo es el identificador a eliminar
    const filename = Array.isArray(element.nombre_archivo) ? element.nombre_archivo[0] : element.nombre_archivo;
    this.programasService.eliminarPrograma(filename).subscribe(
      response => {
        // Puedes verificar response.status si fuera necesario.
        // Mostrar diálogo de éxito
        const dialogRef = this.dialog.open(DeleteSuccessDialogComponent, { width: '400px' });
        dialogRef.afterClosed().subscribe(() => {
          // Recargar lista de programas tras la eliminación
          this.cargarProgramas();
        });
      },
      error => {
        console.error('Error al eliminar el programa', error);
        alert('Error al eliminar el programa. Revise la consola para más detalles.');
      }
    );
  }
// Se mantiene la referencia a Array para evaluar los valores en routerLink
Array = Array;
}


  
