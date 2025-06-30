import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { RegisterService } from './register.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './register.component.html',
})
export class RegisterComponent implements OnInit {
  usuario = '';
  contrasena = '';
  confirmarContrasena = '';
  mostrarContrasena = false;
  cargando = false;
  error = '';
  exito = '';
  loaded = false;

  constructor(private registerService: RegisterService, private router: Router) {}

  ngOnInit() {
    setTimeout(() => (this.loaded = true), 100);
  }

  registrar() {
    this.cargando = true;
    this.error = '';
    this.exito = '';

    if (this.contrasena !== this.confirmarContrasena) {
      this.error = 'Las contraseñas no coinciden';
      this.cargando = false;
      return;
    }

    const nuevoUsuario = {
      username: this.usuario,
      password: this.contrasena
    };

    this.registerService.registrar(nuevoUsuario).subscribe({
      next: () => {
        this.exito = 'Registro exitoso. Ahora puedes iniciar sesión.';
        this.cargando = false;
        setTimeout(() => this.router.navigate(['/login']), 2000); 
      },
      error: (err) => {
        this.error = err.error || 'Error al registrar usuario';
        this.cargando = false;
      }
    });
  }

  toggleContrasena() {
    this.mostrarContrasena = !this.mostrarContrasena;
  }
}
