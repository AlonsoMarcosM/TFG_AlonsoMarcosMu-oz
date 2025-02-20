import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Programa } from '../models/programa.model';
import { tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ProgramasService {
  private apiUrl = '/api';  // URL base del backend

  constructor(private http: HttpClient) {}

  
  
  // (Opcional) Método para obtener un programa por id de la lista ya cargada
  private programasCache: any[] = []; // Esto se llena al listar programas
  
  
  listarProgramas(): Observable<Programa[]> { 
    const url = `${this.apiUrl}/programasinfo`;
    return this.http.get<Programa[]>(url).pipe(
      tap((data: Programa[]) => {
        this.programasCache = data;
      })
    );
  }
  getProgramaById(id: string): any {
    return this.programasCache && this.programasCache.find(p => {
      if (Array.isArray(p.id)) {
        return p.id[0] === id;
      }
      return p.id === id;
    });
  }

  ejecutarPrograma(id: string, parametros: any): Observable<any> {
    const url = `${this.apiUrl}/ejecutar/${id}`;
    return this.http.post<any>(url, parametros);
  }
}
