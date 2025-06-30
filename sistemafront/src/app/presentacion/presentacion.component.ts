import { Component, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-presentacion',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './presentacion.component.html'
})
export class PresentacionComponent implements OnInit {
  imagenes = [
    'assets/slider1.jpg',
    'assets/slider2.jpg',
    'assets/slider3.jpg'
  ];
  imagenActual = 0;

  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit() {
    setInterval(() => {
      this.imagenActual = (this.imagenActual + 1) % this.imagenes.length;
    }, 4000);
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
    if (path === '/presentacion') {
      return rutaActual === '/presentacion' || rutaActual === '/';
    }
    return rutaActual.startsWith(path);
  }
}
