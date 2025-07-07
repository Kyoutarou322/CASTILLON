import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../src/environment/environment'; 

interface Credenciales {
  username: string;
  password: string;
}

@Injectable()
export class LoginService {
  private apiUrl = `${environment.apiUrl}/api/usuarios/login`;

  constructor(private http: HttpClient) {}

  login(credenciales: Credenciales): Observable<any> {
    return this.http.post<any>(this.apiUrl, credenciales);
  }
}
