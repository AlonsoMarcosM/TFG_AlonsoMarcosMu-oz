import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { switchMap, catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Usamos rutas relativas para que las llamadas pasen por el proxy.
  private baseUrl: string = '/api';
  private token: string = '';
  private dynamicPort: number = 7617; // Valor inicial; se actualizará tras el login.
  private currentUser: string = '';

  constructor(private http: HttpClient) {}

  /**
   * Login: envía usuario y contraseña mediante POST a "/api/iniciarsesion".
   * Si es exitoso, guarda el token, el usuario y llama a lanzarApi() para actualizar el puerto.
   */
  login(usuario: string, contrasena: string): Observable<any> {
    let params = new HttpParams()
      .set('usuario', usuario)
      .set('contrasena', contrasena);
    const url = `${this.baseUrl}/iniciarsesion`;
    return this.http.post<any>(url, null, { params }).pipe(
      switchMap(response => {
        if (response.status && response.status[0] === 'success') {
          this.token = response.token ? response.token[0] : '';
          this.currentUser = usuario;
          return this.lanzarApi(usuario);
        } else {
          return throwError('Credenciales inválidas');
        }
      }),
      catchError(err => {
        console.error('Error en login:', err);
        return throwError(err);
      })
    );
  }

  /**
   * Lanza la API para el usuario mediante GET a "/api/lanzarapi" y actualiza dynamicPort.
   */
  lanzarApi(usuario: string): Observable<any> {
    let params = new HttpParams().set('usuarioexterno', usuario);
    const url = `${this.baseUrl}/lanzarapi`;
    return this.http.get<any>(url, { params }).pipe(
      tap(response => {
        if (response.status && response.status[0] === 'success') {
          this.dynamicPort = response.puerto ? response.puerto[0] : 7617;
          console.log('Puerto dinámico actualizado:', this.dynamicPort);
        } else {
          console.error('Error al lanzar API:', response.message);
        }
      }),
      catchError(err => {
        console.error('Error en lanzarApi:', err);
        return throwError(err);
      })
    );
  }

  /**
   * Registra un nuevo usuario usando POST.
   * Si esAdmin es true, usa el endpoint "/crearusuarioadmin", de lo contrario "/crearusuarionoadmin".
   */
  register(usuario: string, contrasena: string, esAdmin: boolean): Observable<any> {
    const endpoint = esAdmin ? '/crearusuarioadmin' : '/crearusuarionoadmin';
    const url = `${this.baseUrl}${endpoint}`;
    const body = { usuario, contrasena };
    return this.http.post<any>(url, body);
  }

  /**
   * Logout: Llama al endpoint fijo de cierre de sesión en el puerto 7617 para finalizar la sesión.
   */
  logout(): Observable<any> {
    const logoutUrl = 'http://localhost:7617/cerrarsesion';
    let params = new HttpParams().set('usuario', this.currentUser);
    return this.http.get<any>(logoutUrl, { params }).pipe(
      tap(response => {
        console.log('Logout response:', response);
        this.token = '';
        this.currentUser = '';
      }),
      catchError(err => {
        console.error('Error en logout:', err);
        return throwError(err);
      })
    );
  }

  getBaseUrl(): string {
    return this.baseUrl;
  }

  getToken(): string {
    return this.token;
  }

  getCurrentUser(): string {
    return this.currentUser;
  }

  getDynamicPort(): number {
    return this.dynamicPort;
  }
}
