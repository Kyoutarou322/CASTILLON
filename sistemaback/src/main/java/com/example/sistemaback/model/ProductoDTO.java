package com.example.sistemaback.model;

import java.util.Date;

public class ProductoDTO {
    private Long id;
    private String nombre;
    private String categoria;
    private int cantidad;
    private double precioUnitario;
    private double total;
    private String estado;
    private Date fechaRegistro;

    private String proveedor;
    private String almacen;
    private String inventario;

   public ProductoDTO(Producto p) {
    this.id = p.getId();
    this.nombre = p.getNombre();
    this.categoria = p.getCategoria();
    this.cantidad = p.getCantidad();
    this.precioUnitario = p.getPrecioUnitario();
    this.total = p.getCantidad() * p.getPrecioUnitario();
    this.estado = p.getEstado();
    this.fechaRegistro = p.getFechaRegistro();

    this.proveedor = (p.getProveedor() != null) ? p.getProveedor().getNombre() : null;
    this.almacen = (p.getAlmacen() != null) ? p.getAlmacen().getNombre() : null;
    this.inventario = (p.getInventario() != null) ? p.getInventario().getNombre() : null;
}

    // Getters y Setters
    public Long getId() { return id; }
    public String getNombre() { return nombre; }
    public String getCategoria() { return categoria; }
    public int getCantidad() { return cantidad; }
    public double getPrecioUnitario() { return precioUnitario; }
    public double getTotal() { return total; }
    public String getEstado() { return estado; }
    public Date getFechaRegistro() { return fechaRegistro; }
    public String getProveedor() { return proveedor; }
    public String getAlmacen() { return almacen; }
    public String getInventario() { return inventario; }
}
