import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {
  private apiUrl = '/api/usuarios';

  constructor(private http: HttpClient) {}

  obtenerUsuariosConectados(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/conectados`);
  }
  obtenerConteoAcciones(): Observable<{ [key: string]: number }> {
  return this.http.get<{ [key: string]: number }>('/api/registro_acciones_inventario/contar');
}


}
