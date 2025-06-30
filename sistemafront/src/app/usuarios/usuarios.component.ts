import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UsuariosService, Usuario } from './usuarios.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './usuarios.component.html',
  providers: [UsuariosService]
})
export class UsuariosComponent implements OnInit {
  usuarioLogueado: Usuario | null = null;
  usuarios: Usuario[] = [];

  constructor(public router: Router, private usuariosService: UsuariosService, private http: HttpClient) {}

  ngOnInit(): void {
    this.cargarUsuarios();
    this.usuarioLogueado = JSON.parse(localStorage.getItem('username') || 'null');
  this.cargarUsuarios();
  }

  cargarUsuarios(): void {
    this.usuariosService.obtenerUsuarios().subscribe({
  next: (data) => {
    this.usuarios = data;

    const username = localStorage.getItem('username');
    this.usuarioLogueado = this.usuarios.find(u => u.username === username) || null;
  },
  error: (e) => console.error('Error al cargar usuarios', e)
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

  obtenerRutaImagen(username: string): string {
    const nombresConImagenPropia = ['nestor', 'piero', 'luis', 'christian', 'johnny'];
    const nombre = username.toLowerCase();
    return nombresConImagenPropia.includes(nombre)
      ? `assets/${nombre}.jpg`
      : 'assets/default.jpg';
  }

  imagenError(event: Event): void {
    const img = event.target as HTMLImageElement;
    img.src = 'assets/perfiles/default.jpg';
  }

  esRutaActiva(path: string): boolean {
    const rutaActual = this.router.url;
    if (path === '/usuarios') {
      return rutaActual === '/usuarios' || rutaActual === '/';
    }
    return rutaActual.startsWith(path);
  }

  guardarPermiso(usuario: Usuario): void {
  const permisosActualizados = {
    puedeRegistrar: usuario.puedeRegistrar,
    puedeActualizar: usuario.puedeActualizar,
    puedeEliminar: usuario.puedeEliminar
  };

  this.http.put(`/api/usuarios/permisos/${usuario.id}`, permisosActualizados).subscribe({
    next: () => console.log('Permisos actualizados'),
    error: (e) => console.error('Error al guardar permisos', e)
  });
}
cambiarRol(usuario: Usuario, nuevoRol: 'ADMIN' | 'USER'): void {
  const mensajeConfirmacion = nuevoRol === 'ADMIN'
    ? `¿Seguro que deseas convertir a ${usuario.username} en ADMIN?`
    : `¿Seguro que deseas quitar privilegios de ADMIN a ${usuario.username}?`;

  if (!confirm(mensajeConfirmacion)) return;

  this.http.put(`/api/usuarios/rol/${usuario.id}`, { rol: nuevoRol }).subscribe({
    next: (res: any) => {
      const mensajeRespuesta = res?.mensaje || 'Rol actualizado correctamente';
      alert(mensajeRespuesta); // ✅ Mensaje del sistema mostrado al usuario
      this.cargarUsuarios();
    },
    error: (e) => {
      console.error('Error al actualizar el rol:', e.message || e);
      alert('❌ Ocurrió un error al actualizar el rol.');
    }
  });
}


}



