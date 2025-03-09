import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProgramasService {

  constructor(private http: HttpClient, private authService: AuthService) {}

  // Método auxiliar para construir la URL completa con el puerto dinámico
  private getDynamicUrl(path: string): string {
    return `http://localhost:${this.authService.getDynamicPort()}${path}`;
  }
  
  listarProgramas(): Observable<any[]> { 
    return this.http.get<any[]>(this.getDynamicUrl('/programasinfo'));
  }
  
  refresh(): Observable<any> {
    return this.http.post<any>(this.getDynamicUrl('/refresh'), {});
  }
  
  ejecutarProgramaTable(id: string, parametros: any): Observable<any> {
    let params = new HttpParams().set('programa', id);
    Object.keys(parametros).forEach(key => {
      params = params.set(key, parametros[key]);
    });
    return this.http.get<any>(this.getDynamicUrl('/ejecutar'), { params });
  }
  
  ejecutarPrograma(id: string, parametros: any): Observable<any> {
    let params = new HttpParams().set('programa', id);
    Object.keys(parametros).forEach(key => {
      params = params.set(key, parametros[key]);
    });
    return this.http.get(this.getDynamicUrl('/ejecutar'), { params, responseType: 'blob' });
  }
  
  uploadPrograma(file: File): Observable<HttpEvent<any>> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<HttpEvent<any>>(this.getDynamicUrl('/upload'), formData, {
      reportProgress: true,
      observe: 'events'
    });
  }
  
  eliminarPrograma(filename: string): Observable<any> {
    return this.http.delete<any>(`${this.getDynamicUrl('/delete')}?filename=${encodeURIComponent(filename)}`);
  }
  
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
