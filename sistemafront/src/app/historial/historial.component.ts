import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { HistorialService } from './historial.service'; 

@Component({
  selector: 'app-historial',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './historial.component.html'
})
export class HistorialComponent implements OnInit {
  historial: any[] = [];

  constructor(public router: Router, private historialService: HistorialService) {}

  ngOnInit(): void {
    this.historialService.obtenerHistorial().subscribe({
      next: (data) => {
      
        this.historial = data.map(item => ({
          ...item,
          tipo: this.formatTipo(item.tipoSolicitud)
        }));
      },
      error: (err) => console.error('Error al obtener historial:', err)
    });
  }

  formatTipo(tipoSolicitud: string): string {
    const map: any = {
      REGISTRAR: 'Registro',
      ACTUALIZAR: 'Actualización',
      ELIMINAR: 'Eliminación'
    };
    return map[tipoSolicitud] || tipoSolicitud;
  }

  esRutaActiva(path: string): boolean {
    const rutaActual = this.router.url;
    return path === '/historial'
      ? rutaActual === '/historial' || rutaActual === '/'
      : rutaActual.startsWith(path);
  }
}
