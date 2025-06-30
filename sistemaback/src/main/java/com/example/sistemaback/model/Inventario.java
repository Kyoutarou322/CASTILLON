package com.example.sistemaback.model;

import jakarta.persistence.*;

@Entity
@Table(name = "inventarios")
public class Inventario {
    @Id
    private Long id;
    private String nombre;

    @ManyToOne
    @JoinColumn(name = "almacen_id")
    private Almacen almacen;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }

    public Almacen getAlmacen() { return almacen; }
    public void setAlmacen(Almacen almacen) { this.almacen = almacen; }
}