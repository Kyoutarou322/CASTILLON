import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../src/environment/environment';  

@Injectable({ providedIn: 'root' })
export class HistorialService {
  private apiUrl = `${environment.apiUrl}/api/registro_acciones_inventario`;

  constructor(private http: HttpClient) {}

  obtenerHistorial(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
