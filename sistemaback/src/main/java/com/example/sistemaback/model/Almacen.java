package com.example.sistemaback.model;

import jakarta.persistence.*;

@Entity
@Table(name = "almacenes")
public class Almacen {
    @Id
    private Long id;
    private String nombre;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }
}