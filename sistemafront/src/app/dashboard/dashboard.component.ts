import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DashboardService } from './dashboard.service'; 

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  constructor(
    public router: Router,
    private http: HttpClient,
    private dashboardService: DashboardService 
  ) {}

  ngOnInit(): void {}

  actualizarDashboard() {
  this.dashboardService.actualizarDashboard().subscribe({
    next: (res: any) => {
      alert(res?.mensaje || '✅ Excel actualizado correctamente');
    },
    error: (err) => {
      console.error('❌ Error al actualizar el dashboard:', err);
      alert(err?.error?.error || '❌ Falló la ejecución del script.');
    }
  });
}

  logout() {
    const usuarioId = localStorage.getItem('usuarioId');
    if (usuarioId) {
      this.http.post(`/api/usuarios/logout/${usuarioId}`, {}).subscribe({
        next: () => {
          localStorage.clear();
          this.router.navigate(['/login']);
        },
        error: () => {
          console.error('Error al cerrar sesión');
          this.router.navigate(['/login']);
        }
      });
    } else {
      this.router.navigate(['/login']);
    }
  }

  esRutaActiva(path: string): boolean {
    const rutaActual = this.router.url;
    if (path === '/dashboard') {
      return rutaActual === '/dashboard' || rutaActual === '/';
    }
    return rutaActual.startsWith(path);
  }
}
