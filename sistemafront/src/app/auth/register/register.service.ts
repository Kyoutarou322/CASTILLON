import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../src/environment/environment'; 

@Injectable({ providedIn: 'root' })
export class RegisterService {
  private apiUrl = environment.apiUrl + '/api/usuarios';

  constructor(private http: HttpClient) {}

  registrar(usuario: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, usuario);
  }
}