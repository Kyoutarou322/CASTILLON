import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Subscription, interval } from 'rxjs';
import { LayoutService } from './layout.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './layout.component.html',
  providers: [LayoutService]
})
export class LayoutComponent implements OnInit, OnDestroy {
  usuariosConectados: number = 0;
  nombreUsuario: string = '';
  productosRegistrados: number = 0;
  productosActualizados: number = 0;
  productosEliminados: number = 0;

  private subscripcion?: Subscription;

  constructor(
    public router: Router,
    private layoutService: LayoutService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.cargarUsuariosConectados();
    this.cargarConteoAcciones();

    const username = localStorage.getItem('username');
    if (username) {
      this.nombreUsuario = username;
    }

    this.subscripcion = interval(10000).subscribe(() => {
      this.cargarUsuariosConectados();
      this.cargarConteoAcciones();
    });
  }

  ngOnDestroy() {
    this.subscripcion?.unsubscribe();
  }

  cargarUsuariosConectados() {
    this.layoutService.obtenerUsuariosConectados().subscribe({
      next: (count) => this.usuariosConectados = count,
      error: (err) => console.error('Error cargando usuarios conectados', err)
    });
  }

  cargarConteoAcciones() {
    this.layoutService.obtenerConteoAcciones().subscribe({
      next: (data) => {
        this.productosRegistrados = data['REGISTRAR'] || 0;
        this.productosActualizados = data['ACTUALIZAR'] || 0;
        this.productosEliminados = data['ELIMINAR'] || 0;
      },
      error: (err) => console.error('Error cargando conteo de acciones', err)
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
        error: (err) => {
          console.error('Error al cerrar sesión', err);
          this.router.navigate(['/login']);
        }
      });
    } else {
      this.router.navigate(['/login']);
    }
  }

  esRutaActiva(path: string): boolean {
    const rutaActual = this.router.url;
    if (path === '/layout') {
      return rutaActual === '/layout' || rutaActual === '/';
    }
    return rutaActual.startsWith(path);
  }
}
