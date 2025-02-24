import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Programa } from '../models/programa.model';


@Injectable({
  providedIn: 'root'
})
export class ProgramasService {
  private apiUrl = '/api';  // URL base de tu backend

  constructor(private http: HttpClient) {}

  
  listarProgramas(): Observable<any[]> { 
    return this.http.get<any[]>(`${this.apiUrl}/programasinfo`);
  }
  refresh(): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/refresh`, {});
  }
  ejecutarProgramaTable(id: string, parametros: any): Observable<any> {
    let params = new HttpParams().set('programa', id);
    Object.keys(parametros).forEach(key => {
      params = params.set(key, parametros[key]);
    });
    const url = `${this.apiUrl}/ejecutar`;
    // Se asume que para tipo "table" la respuesta es JSON (por defecto)
    return this.http.get<any>(url, { params });
  }
  
  ejecutarPrograma(id: string, parametros: any): Observable<any> {
    // Empezamos configurando el parámetro 'programa'
    let params = new HttpParams().set('programa', id);
    // Agregamos dinámicamente cada parámetro
    Object.keys(parametros).forEach(key => {
      params = params.set(key, parametros[key]);
    });
    // Realizamos una petición GET con esos parámetros
    const url = `${this.apiUrl}/ejecutar`;
    return this.http.get(url, { params, responseType: 'blob' });
  }
   // Método para subir archivo, usando POST y FormData.
   uploadPrograma(file: File): Observable<HttpEvent<any>> {
    const formData = new FormData();
    formData.append('file', file);
    const url = `${this.apiUrl}/upload`;
    // Se configura para reportar el progreso y observar los eventos
    return this.http.post<HttpEvent<any>>(url, formData, {
      reportProgress: true,
      observe: 'events'
    });
  }
  // Método para eliminar un programa. Se usará DEL para llamar a /delete?filename=...
  eliminarPrograma(filename: string): Observable<any> {
    const url = `${this.apiUrl}/delete?filename=${encodeURIComponent(filename)}`;
    return this.http.delete<any>(url);
  }

  // Método para obtener un programa de la caché (puedes adaptar según tu lógica)
  private programasCache: any[] = [];
  getProgramaById(id: string): any {
    return this.programasCache && this.programasCache.find(p => {
      if (Array.isArray(p.id)) {
        return p.id[0] === id;
      }
      return p.id === id;
    });
  }
}
