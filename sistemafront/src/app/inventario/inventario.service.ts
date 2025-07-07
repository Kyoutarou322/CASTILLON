import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../src/environment/environment';  

@Injectable({
  providedIn: 'root'
})
export class InventarioService {
  private apiUrl = `${environment.apiUrl}/api/productos`;
  private accionUrl = `${environment.apiUrl}/api/registro_acciones_inventario`; 

  constructor(private http: HttpClient) {}

  // CRUD de productos
  obtenerProductos(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl); 
  }

  registrarProducto(producto: any): Observable<any> {
    return this.http.post(this.apiUrl, producto);
  }

  actualizarProducto(id: number, producto: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, producto);
  }

  eliminarProducto(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  registrarAccion(accion: any): Observable<any> {
    return this.http.post(this.accionUrl, accion);
  }

  obtenerAcciones(): Observable<any[]> {
    return this.http.get<any[]>(this.accionUrl);
  }
}
