package com.example.sistemaback.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "usuarios")
public class Usuarios {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "rol")
    private String rol;

    @Column(name = "estado")
    private String estado;

    @Column(name = "username", nullable = false, unique = true)
    private String username;

    @Column(name = "password", nullable = false)
    private String password;

    @Column(name = "conectado")
    private Boolean conectado;

    @Column(name = "ultima_conexion")
    private LocalDateTime ultimaConexion;

    @Column(name = "puede_registrar")
    private Boolean puedeRegistrar;

    @Column(name = "puede_actualizar")
    private Boolean puedeActualizar;

    @Column(name = "puede_eliminar")
    private Boolean puedeEliminar;

    // Getters y setters para todos los campos

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getRol() { return rol; }
    public void setRol(String rol) { this.rol = rol; }

    public String getEstado() { return estado; }
    public void setEstado(String estado) { this.estado = estado; }

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public Boolean getConectado() { return conectado; }
    public void setConectado(Boolean conectado) { this.conectado = conectado; }

    public LocalDateTime getUltimaConexion() { return ultimaConexion; }
    public void setUltimaConexion(LocalDateTime ultimaConexion) { this.ultimaConexion = ultimaConexion; }

    public Boolean getPuedeRegistrar() { return puedeRegistrar; }
    public void setPuedeRegistrar(Boolean puedeRegistrar) { this.puedeRegistrar = puedeRegistrar; }

    public Boolean getPuedeActualizar() { return puedeActualizar; }
    public void setPuedeActualizar(Boolean puedeActualizar) { this.puedeActualizar = puedeActualizar; }

    public Boolean getPuedeEliminar() { return puedeEliminar; }
    public void setPuedeEliminar(Boolean puedeEliminar) { this.puedeEliminar = puedeEliminar; }
}
