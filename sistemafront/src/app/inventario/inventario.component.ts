import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { InventarioService } from './inventario.service';
import { UsuariosService, Usuario } from '../usuarios/usuarios.service'; 

@Component({
  selector: 'app-inventario',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './inventario.component.html',
})
export class InventarioComponent implements OnInit {
  productos: any[] = [];
  filtros: any = {
    fecha: '',
    nombre: '',
    categoria: '',
    cantidad: null,
    precioUnitario: null,
    estado: '',
    almacen: '',
    inventario: '',
    proveedor: ''
  };

  proveedores = [
    { id: 1, nombre: 'Electrodomésticos del Perú' },
    { id: 2, nombre: 'Casa Blanca Perú' },
    { id: 3, nombre: 'Soluciones Electromecánicas' },
    { id: 4, nombre: 'Comercial Andina' },
    { id: 5, nombre: 'Redelcom S.A.C.' },
    { id: 6, nombre: 'TechHouse Perú' },
    { id: 7, nombre: 'Mundo Eletrodoméstico' },
    { id: 8, nombre: 'Distribuciones Arce' },
    { id: 9, nombre: 'Perú Electro' },
    { id: 10, nombre: 'ServiHogar' }
  ];

  almacenes = [
    { id: 1, nombre: 'Almacén 1' },
    { id: 2, nombre: 'Almacén 2' },
    { id: 3, nombre: 'Almacén 3' },
    { id: 4, nombre: 'Almacén 4' },
    { id: 5, nombre: 'Almacén 5' }
  ];

  inventarios = [
    { id: 1, nombre: 'Inventario 1' },
    { id: 2, nombre: 'Inventario 2' },
    { id: 3, nombre: 'Inventario 3' },
    { id: 4, nombre: 'Inventario 4' },
    { id: 5, nombre: 'Inventario 5' }
  ];

   mensajeExito: string = '';
  mostrarFormularioRegistro = false;
  nuevoProducto: any = this.getProductoVacio();
  editandoIndex: number | null = null;
  usuarioLogueado: Usuario | null = null;
  usuarios: Usuario[] = [];
  constructor(public router: Router, private inventarioService: InventarioService, private usuariosService: UsuariosService) {}

  ngOnInit(): void {
    this.obtenerProductos();
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

  obtenerProductos() {
    this.inventarioService.obtenerProductos().subscribe({
      next: (data) => {
        this.productos = data;
      },
      error: (err) => {
        console.error('Error al obtener productos:', err);
      }
    });
  }

  esRutaActiva(path: string): boolean {
    const rutaActual = this.router.url;
    return path === '/inventario'
      ? rutaActual === '/inventario' || rutaActual === '/'
      : rutaActual.startsWith(path);
  }

  get productosFiltrados() {
    return this.productos.filter(p => {
      const f = this.filtros;
      return (
        (!f.fecha || p.fechaRegistro?.startsWith(f.fecha)) &&
        (!f.nombre || p.nombre.toLowerCase().includes(f.nombre.toLowerCase())) &&
        (!f.categoria || p.categoria === f.categoria) &&
        (f.cantidad == null || p.cantidad === f.cantidad) &&
        (f.precioUnitario == null || p.precioUnitario === f.precioUnitario) &&
        (!f.estado || p.estado === f.estado) &&
        (!f.almacen || p.almacen === f.almacen) &&
        (!f.inventario || p.inventario === f.inventario) &&
        (!f.proveedor || p.proveedor === f.proveedor)
      );
    });
  }

  obtenerFechaHoy(): string {
    return new Date().toISOString().split('T')[0];
  }

  limpiarFiltros() {
    this.filtros = {
      fecha: '',
      nombre: '',
      categoria: '',
      cantidad: null,
      precioUnitario: null,
      estado: '',
      almacen: '',
      inventario: '',
      proveedor: ''
    };
  }

  toggleFormularioRegistro() {
    this.mostrarFormularioRegistro = !this.mostrarFormularioRegistro;
    if (!this.mostrarFormularioRegistro) {
      this.nuevoProducto = this.getProductoVacio();
      this.editandoIndex = null;
    }
  }

  registrarProducto() {
    const n = this.nuevoProducto;
    const camposInvalidos = [
      { campo: 'nombre', valor: n.nombre },
      { campo: 'categoría', valor: n.categoria },
      { campo: 'cantidad', valor: n.cantidad },
      { campo: 'precio unitario', valor: n.precioUnitario },
      { campo: 'estado', valor: n.estado },
      { campo: 'almacén', valor: n.almacenId },
      { campo: 'inventario', valor: n.inventarioId },
      { campo: 'proveedor', valor: n.proveedorId }
    ].filter(c => c.valor === null || c.valor === undefined || c.valor === '');

    if (camposInvalidos.length > 0) {
      const nombres = camposInvalidos.map(c => c.campo).join(', ');
      alert(`Por favor, completa los siguientes campos: ${nombres}`);
      return;
    }

   const proveedorSeleccionado = this.proveedores.find(p => p.id == n.proveedorId);
  const almacenSeleccionado = this.almacenes.find(a => a.id == n.almacenId);
  const inventarioSeleccionado = this.inventarios.find(i => i.id == n.inventarioId);

const productoRegistrado = {
  nombre: n.nombre,
  categoria: n.categoria,
  cantidad: n.cantidad,
  precioUnitario: n.precioUnitario,
  estado: n.estado,
  fechaRegistro: this.obtenerFechaHoy(),
  total: n.cantidad * n.precioUnitario,
  proveedor: { id: n.proveedorId, nombre: proveedorSeleccionado?.nombre },
  almacen: { id: n.almacenId, nombre: almacenSeleccionado?.nombre },
  inventario: { id: n.inventarioId, nombre: inventarioSeleccionado?.nombre }
};


  this.inventarioService.registrarProducto(productoRegistrado).subscribe({
  next: (respuesta) => {
    this.obtenerProductos();({
      ...productoRegistrado,
      id: respuesta?.id || Math.floor(Math.random() * 10000), 
      proveedor: proveedorSeleccionado?.nombre || 'Desconocido',
      almacen: almacenSeleccionado?.nombre || 'Desconocido',
      inventario: inventarioSeleccionado?.nombre || 'Desconocido'
    });

    const accion = {
      fecha: this.obtenerFechaHoy(),
      nombre: n.nombre,
      categoria: n.categoria,
      cantidad: n.cantidad,
      precioUnitario: n.precioUnitario,
      total: n.cantidad * n.precioUnitario,
      estado: n.estado,
      proveedor: proveedorSeleccionado?.nombre || 'Desconocido',
      almacen: almacenSeleccionado?.nombre || 'Desconocido',
      inventario: inventarioSeleccionado?.nombre || 'Desconocido',
      tipoSolicitud: 'REGISTRAR',
      usuario: localStorage.getItem('username') || 'anónimo'
    };

    this.inventarioService.registrarAccion(accion).subscribe();
    this.toggleFormularioRegistro();
  },
  error: (err) => {
    console.error('Error al registrar producto:', err);
  }
});

  }

  editarProducto(index: number) {
    this.editandoIndex = index;
  }

 guardarEdicion(index: number) {
  this.editandoIndex = null;
  const p = this.productos[index];

  if (!p.nombre || !p.categoria || p.cantidad == null ||
      p.precioUnitario == null || !p.estado ||
      !p.almacen || !p.inventario || !p.proveedor) {
    alert('Por favor, completa todos los campos antes de guardar.');
    return;
  }

  const productoActualizado = {
    ...p,
    total: p.cantidad * p.precioUnitario,
    proveedor: { id: this.proveedores.find(pr => pr.nombre === p.proveedor)?.id },
    almacen: { id: this.almacenes.find(a => a.nombre === p.almacen)?.id },
    inventario: { id: this.inventarios.find(i => i.nombre === p.inventario)?.id }
  };

this.inventarioService.actualizarProducto(p.id, productoActualizado).subscribe({
  next: () => {
    this.productos[index] = {
      ...p,
      total: p.cantidad * p.precioUnitario,
      proveedor: p.proveedor,
      almacen: p.almacen,
      inventario: p.inventario
    };

    const accion = {
      fecha: this.obtenerFechaHoy(),
      nombre: p.nombre,
      categoria: p.categoria,
      cantidad: p.cantidad,
      precioUnitario: p.precioUnitario,
      total: p.cantidad * p.precioUnitario,
      estado: p.estado,
      proveedor: p.proveedor,
      almacen: p.almacen,
      inventario: p.inventario,
      tipoSolicitud: 'ACTUALIZAR',
      usuario: localStorage.getItem('username') || 'anónimo'

    };

    this.inventarioService.registrarAccion(accion).subscribe();
  },
  error: (err) => {
    console.error('Error al actualizar producto', err);
  }
});
}

  cancelarRegistro() {
    this.toggleFormularioRegistro();
  }

  cancelarEdicion() {
    this.editandoIndex = null;
  }

confirmarEliminar(index: number) {
  if (confirm('¿Estás seguro de eliminar este producto?')) {
    const producto = this.productos[index];
    const id = producto.id; 

    this.inventarioService.eliminarProducto(id).subscribe({
      next: () => {
        this.productos.splice(index, 1);

        const accion = {
          fecha: this.obtenerFechaHoy(),
          nombre: producto.nombre,
          categoria: producto.categoria,
          cantidad: producto.cantidad,
          precioUnitario: producto.precioUnitario,
          total: producto.total,
          estado: producto.estado,
          proveedor: producto.proveedor,
          almacen: producto.almacen,
          inventario: producto.inventario,
          tipoSolicitud: 'ELIMINAR',
         usuario: localStorage.getItem('username') || 'anónimo'
        };

        this.inventarioService.registrarAccion(accion).subscribe();
      },
      error: (err) => {
        console.error('Error al eliminar producto', err);
        alert('Error al eliminar producto.');
      }
    });
  }
}

  private getProductoVacio() {
    return {
      nombre: '',
      categoria: '',
      cantidad: null,
      precioUnitario: null,
      estado: 'Activo',
      almacenId: null,
      inventarioId: null,
      proveedorId: null
    };
  }

  tienePermisoRegistrar(): boolean {
  return this.usuarioLogueado?.puedeRegistrar === true;
}

tienePermisoActualizar(): boolean {
  return this.usuarioLogueado?.puedeActualizar === true;
}

tienePermisoEliminar(): boolean {
  return this.usuarioLogueado?.puedeEliminar === true;
}
mostrarMensajeSinPermiso() {
  alert('No tienes permisos para realizar esta acción');
}

}
