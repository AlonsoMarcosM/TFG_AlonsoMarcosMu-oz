import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProgramasService {
  private apiUrl = '/api';  // URL base de tu backend

  constructor(private http: HttpClient) {}

  listarProgramas(): Observable<any[]> { 
    const url = `${this.apiUrl}/programasinfo`;
    return this.http.get<any[]>(url);
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
    return this.http.get<any>(url, { params });
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
