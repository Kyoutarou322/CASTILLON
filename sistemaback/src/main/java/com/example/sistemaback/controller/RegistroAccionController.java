package com.example.sistemaback.controller;

import com.example.sistemaback.model.RegistroAccion;
import com.example.sistemaback.service.RegistroAccionService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.List;

@RestController
@RequestMapping("/registro_acciones_inventario")
@CrossOrigin(origins = "http://localhost:4200")
public class RegistroAccionController {

    private final RegistroAccionService servicio;

    public RegistroAccionController(RegistroAccionService servicio) {
        this.servicio = servicio;
    }

    // Crear nueva acción
    @PostMapping
    public RegistroAccion crear(@RequestBody RegistroAccion accion) {
        return servicio.guardar(accion);
    }

    // Listar todas las acciones
    @GetMapping
    public List<RegistroAccion> listar() {
        return servicio.listarTodas();
    }

    // Contar acciones por tipo
    @GetMapping("/contar")
    public ResponseEntity<Map<String, Long>> contarPorTipo() {
        return ResponseEntity.ok(servicio.contarAccionesPorTipo());
    }
}
