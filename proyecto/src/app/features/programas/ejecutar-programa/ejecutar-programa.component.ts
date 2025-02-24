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
  imageUrl: string | null = null;
  tableResult: any[] | null = null;
  mensajeResultado: string | null = null;  // Nueva propiedad para el mensaje formateado
  mostrarMetadatos: boolean = false;

  constructor(
    private programasService: ProgramasService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.programa = this.programasService.getProgramaById(id);
      if (!this.programa) {
        this.programasService.listarProgramas().subscribe(data => {
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
    // Asegúrate de usar la notación de corchetes para propiedades con acentos
    this.parametros = this.programa['parámetros'] || [];
    this.parametros.forEach(param => {
      this.valores[param] = "";
    });
  }

  verMetadatos(): void {
    this.mostrarMetadatos = !this.mostrarMetadatos;
  }

  ejecutar(): void {
    // Detecta el flag tipo del programa, si existe
    const tipo = this.programa['tipo'] ? this.programa['tipo'][0] : undefined;
    if (tipo === 'table') {
      this.programasService.ejecutarProgramaTable(this.programa.id, this.valores)
        .subscribe(data => {
          this.tableResult = data;
          this.imageUrl = null;
          this.resultado = null;
          this.mensajeResultado = null;
        }, error => {
          console.error("Error al ejecutar el programa tipo table", error);
        });
    } else {
      // Por defecto se asume que se debe obtener una imagen o un JSON con mensaje
      this.programasService.ejecutarPrograma(this.programa.id, this.valores)
        .subscribe(blob => {
          console.log('Respuesta blob:', blob);
          if (blob.type.startsWith('image/')) {
            this.imageUrl = URL.createObjectURL(blob);
            this.resultado = null;
            this.tableResult = null;
            this.mensajeResultado = null;
          } else {
            // Procesar como JSON
            const reader = new FileReader();
            reader.onload = () => {
              try {
                const jsonResult = JSON.parse(reader.result as string);
                // Si existe la propiedad "mensaje", extraerla
                if (jsonResult.mensaje && jsonResult.mensaje.length > 0) {
                  this.mensajeResultado = jsonResult.mensaje[0];
                } else {
                  this.mensajeResultado = reader.result as string;
                }
                this.resultado = null;
              } catch (e) {
                this.resultado = reader.result;
                this.mensajeResultado = null;
              }
            };
            reader.readAsText(blob);
            this.imageUrl = null;
            this.tableResult = null;
          }
        }, error => {
          console.error("Error al ejecutar el programa", error);
        });
    }
  }

  cerrar(): void {
    this.router.navigate(['/programas']);
  }

  cerrarResultado(): void {
    this.resultado = null;
    this.imageUrl = null;
    this.tableResult = null;
    this.mensajeResultado = null;
  }

  // Método auxiliar para obtener cabeceras de una tabla, si es necesario
  getTableHeaders(data: any[]): string[] {
    return data && data.length ? Object.keys(data[0]) : [];
  }
}
