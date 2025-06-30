import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Usuario {
  id: number;
  username: string;
  rol: string;
  estado: string;
  conectado: boolean;
  ultimaConexion: string;
  puedeRegistrar: boolean;
  puedeActualizar: boolean;
  puedeEliminar: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  private apiUrl = '/api/usuarios'; 

  constructor(private http: HttpClient) {}

  obtenerUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.apiUrl);
  }
}
