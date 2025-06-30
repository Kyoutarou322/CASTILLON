package com.example.sistemaback.controller;

import com.example.sistemaback.model.Producto;
import com.example.sistemaback.model.ProductoDTO;
import com.example.sistemaback.service.ProductoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/productos")
@CrossOrigin(origins = "http://localhost:4200")
public class ProductoController {

    @Autowired
    private ProductoService productoService;

    @GetMapping
    public List<ProductoDTO> listar() {
        return productoService.obtenerTodosLosProductos();
    }

    @PostMapping
    public ResponseEntity<?> registrar(@RequestBody Producto producto) {
        ResponseEntity<?> respuesta = productoService.registrarProducto(producto);
        productoService.ejecutarGeneradorExcel(); 
        return respuesta;
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> actualizar(@PathVariable Long id, @RequestBody Producto producto) {
        ResponseEntity<?> respuesta = productoService.actualizarProducto(id, producto);
        productoService.ejecutarGeneradorExcel(); 
        return respuesta;
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminar(@PathVariable Long id) {
        ResponseEntity<?> respuesta = productoService.eliminarProducto(id);
        productoService.ejecutarGeneradorExcel(); 
        return respuesta;
    }
}
