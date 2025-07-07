import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../src/environment/environment';  

@Injectable({
  providedIn: 'root'
})
export class LayoutService {
  private apiUrl = `${environment.apiUrl}/api/usuarios`;
  private accionesUrl = `${environment.apiUrl}/api/registro_acciones_inventario`;

  constructor(private http: HttpClient) {}

  obtenerUsuariosConectados(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/conectados`);
  }

  obtenerConteoAcciones(): Observable<{ [key: string]: number }> {
    return this.http.get<{ [key: string]: number }>(`${this.accionesUrl}/contar`);
  }
}
