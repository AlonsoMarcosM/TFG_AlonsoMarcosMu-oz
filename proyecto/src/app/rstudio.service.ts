import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RstudioService {
  // Usamos '/api' para que se redirija a http://localhost:7617 por medio del proxy
  private apiUrl = '/api';

  constructor(private http: HttpClient) { }

  /**
   * Obtiene datos de un programa en función de su nombre.
   */
  getProgramData(programName: string): Observable<any> {
    // Por ejemplo, la solicitud a /api/{programName} se redirigirá a http://localhost:7617/{programName}
    const url = `${this.apiUrl}/${programName}`;
    return this.http.get<any>(url);
  }

}
