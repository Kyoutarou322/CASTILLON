import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class HistorialService {
private apiUrl = '/api/registro_acciones_inventario'; 

  constructor(private http: HttpClient) {}

  obtenerHistorial(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
