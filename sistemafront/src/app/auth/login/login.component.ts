import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router'; 
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule], 
  templateUrl: './login.component.html',
  providers: [LoginService]
})
export class LoginComponent implements OnInit {
  usuario: string = '';
  contrasena: string = '';
  cargando: boolean = false;
  error: boolean = false;
  loaded: boolean = false;
  mostrarContrasena: boolean = false;

  constructor(private router: Router, private loginService: LoginService) {}

  ngOnInit() {
    setTimeout(() => this.loaded = true, 100);
  }

  login() {
    this.cargando = true;
    this.error = false;

    const credenciales = {
      username: this.usuario,
      password: this.contrasena
    };

    this.loginService.login(credenciales).subscribe({
      next: (usuario) => {
        localStorage.setItem('usuarioId', usuario.id);
        localStorage.setItem('rol', usuario.rol || '');
        localStorage.setItem('username', usuario.username);

        this.router.navigate(['/presentacion']);
        this.cargando = false;
      },
      error: () => {
        this.error = true;
        this.cargando = false;
      }
    });
  }

  toggleContrasena() {
    this.mostrarContrasena = !this.mostrarContrasena;
  }
}
