import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private apiUrl = '/api/dashboard';

  constructor(private http: HttpClient) {}

  actualizarDashboard(): Observable<any> {
    return this.http.post(`${this.apiUrl}/actualizar`, {});
  }
}
