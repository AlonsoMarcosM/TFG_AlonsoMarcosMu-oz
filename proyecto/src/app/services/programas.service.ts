import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Programa } from '../models/programa.model';

@Injectable({
  providedIn: 'root'
})
export class ProgramasService {
  private apiUrl = '/api';  // URL base de la API

  constructor(private http: HttpClient) {}

  // Obtener la lista completa de programas
  listarProgramas(): Observable<Programa[]> {
    const url = `${this.apiUrl}/programasinfo`;
    return this.http.get<Programa[]>(url);
  }
  

  // Agregar un nuevo programa
  agregarPrograma(programa: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, programa);
  }

  // Editar un programa existente
  editarPrograma(id: string, programa: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, programa);
  }

  // Eliminar un programa
  eliminarPrograma(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
