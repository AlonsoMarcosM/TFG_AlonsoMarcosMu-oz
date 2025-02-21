import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProgramasService } from '../../../services/programas.service';

@Component({
  selector: 'app-ejecutar-programa',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ejecutar-programa.component.html',
  styleUrls: ['./ejecutar-programa.component.css']
})
export class EjecutarProgramaComponent implements OnInit {
  programa: any = null;  // Datos del programa a ejecutar
  parametros: string[] = [];  // Nombres de los parámetros (dinámico)
  valores: { [key: string]: any } = {};  // Valores ingresados por el usuario
  resultado: any = null;

  constructor(
    private programasService: ProgramasService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      // Intentamos obtener el programa de la caché
      this.programa = this.programasService.getProgramaById(id);
      if (!this.programa) {
        // Si no está en la caché, cargamos la lista completa y buscamos el programa
        this.programasService.listarProgramas().subscribe(data => {
          // Aquí puedes actualizar la caché en el servicio si lo deseas
          this.programa = data.find(p => {
            if (Array.isArray(p.id)) {
              return p.id[0] === id;
            }
            return p.id === id;
          });
          if (this.programa) {
            this.inicializarParametros();
          } else {
            console.error("No se encontró el programa con id", id);
          }
        });
      } else {
        this.inicializarParametros();
      }
    }
  }

  private inicializarParametros(): void {
    // Asumimos que la propiedad "parámetros" contiene el array de nombres de parámetros
    this.parametros = this.programa["parámetros"] || [];
    this.parametros.forEach(param => {
      // Puedes asignar valores por defecto si existen, o dejarlo vacío
      this.valores[param] = "";
    });
  }

   // Variable para mostrar/ocultar los metadatos
  mostrarMetadatos: boolean = false;
  // En lugar de alert, alterna la visibilidad de los metadatos
  verMetadatos(): void {
    this.mostrarMetadatos = !this.mostrarMetadatos;
  }

  ejecutar(): void {
    // Llamamos al método del servicio para ejecutar el programa
    this.programasService.ejecutarPrograma(this.programa.id, this.valores)
      .subscribe(data => {
        this.resultado = data;
      }, error => {
        console.error("Error al ejecutar el programa", error);
      });
  }

  cerrar(): void {
    // Navegar de regreso a la lista de programas
    this.router.navigate(['/programas']);
  }

  cerrarResultado(): void {
    this.resultado = null;
  }
}
