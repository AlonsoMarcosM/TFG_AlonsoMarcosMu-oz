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
  programa: any = null;
  parametros: string[] = [];
  valores: { [key: string]: any } = {};
  resultado: any = null;

  constructor(
    private programasService: ProgramasService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      // Primero, intenta obtener el programa desde la caché
      this.programa = this.programasService.getProgramaById(id);
      if (!this.programa) {
        // Si no se encontró, llama a listarProgramas() para cargar la lista y actualizar la caché
        this.programasService.listarProgramas().subscribe(data => {
          // Actualiza la caché internamente (si no lo haces en el servicio)
          // Aquí asumimos que getProgramaById() buscará en la lista que acaba de cargar
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
    // Asumimos que los parámetros están en la propiedad "parámetros"
    this.parametros = this.programa["parámetros"] || [];
    // Inicializamos los valores, puedes establecer valores por defecto si lo deseas
    this.parametros.forEach(param => {
      this.valores[param] = "";
    });
  }

  verMetadatos(): void {
    alert(JSON.stringify(this.programa, null, 2));
  }

  ejecutar(): void {
    this.programasService.ejecutarPrograma(this.programa.id, this.valores)
      .subscribe(data => {
        this.resultado = data;
      }, error => {
        console.error("Error al ejecutar el programa", error);
      });
  }

  cerrar(): void {
    this.router.navigate(['/programas']);
  }

  cerrarResultado(): void {
    this.resultado = null;
  }
}
