package com.example.sistemaback.controller;

import com.example.sistemaback.model.Credenciales;
import com.example.sistemaback.model.Usuarios;
import com.example.sistemaback.service.UsuariosService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.sistemaback.repository.UsuariosRepository;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.Map;

@RestController
@RequestMapping("/usuarios")
@CrossOrigin(origins = "http://localhost:4200")
public class UsuariosController {

     private final UsuariosService usuariosService;
    private final UsuariosRepository usuariosRepository;

    public UsuariosController(UsuariosService usuariosService, UsuariosRepository usuariosRepository) {
        this.usuariosService = usuariosService;
        this.usuariosRepository = usuariosRepository;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Credenciales credenciales) {
        try {
            Optional<Usuarios> usuarioOptional = usuariosService.autenticar(
                credenciales.getUsername(),
                credenciales.getPassword()
            );

            if (usuarioOptional.isPresent()) {
                Usuarios usuario = usuarioOptional.get();
                usuariosService.actualizarConexion(usuario);
                return ResponseEntity.ok(usuario);
            } else {
                return ResponseEntity.status(401).body("Credenciales incorrectas");
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Error interno: " + e.getMessage());
        }
    }
    @PostMapping("/logout/{usuarioId}")
public ResponseEntity<?> logout(@PathVariable Long usuarioId) {
    usuariosService.cerrarConexion(usuarioId);
    return ResponseEntity.ok("Sesión cerrada correctamente");
}

    @GetMapping("/conectados")
public ResponseEntity<Long> contarUsuariosConectados() {
    long count = usuariosService.contarUsuariosConectados();
    return ResponseEntity.ok(count);
}
@GetMapping
public ResponseEntity<List<Usuarios>> obtenerTodos() {
    List<Usuarios> usuarios = usuariosService.obtenerTodos();
    return ResponseEntity.ok(usuarios);
}
@PostMapping("/register")
public ResponseEntity<?> registrar(@RequestBody Usuarios nuevoUsuario) {
    try {
        Optional<Usuarios> existente = usuariosService.buscarPorUsername(nuevoUsuario.getUsername());
        if (existente.isPresent()) {
            return ResponseEntity.badRequest().body("El usuario ya existe");
        }

        nuevoUsuario.setRol("USER");
        nuevoUsuario.setEstado("1");
        nuevoUsuario.setConectado(false);
        nuevoUsuario.setUltimaConexion(LocalDateTime.now());

        Usuarios guardado = usuariosService.guardar(nuevoUsuario);
        return ResponseEntity.ok(guardado);
    } catch (Exception e) {
        e.printStackTrace();
        return ResponseEntity.status(500).body("Error al registrar el usuario: " + e.getMessage());
    }
}
@PutMapping("/permisos/{id}")
public ResponseEntity<?> actualizarPermisos(@PathVariable Long id, @RequestBody Usuarios nuevosPermisos) {
    Optional<Usuarios> optionalUsuario = usuariosRepository.findById(id);
    if (optionalUsuario.isEmpty()) {
        return ResponseEntity.notFound().build();
    }

    Usuarios usuario = optionalUsuario.get();
    usuario.setPuedeRegistrar(nuevosPermisos.getPuedeRegistrar());
    usuario.setPuedeActualizar(nuevosPermisos.getPuedeActualizar());
    usuario.setPuedeEliminar(nuevosPermisos.getPuedeEliminar());

    usuariosRepository.save(usuario);
    return ResponseEntity.ok().build();
}

@PutMapping("/rol/{id}")
public ResponseEntity<?> actualizarRol(@PathVariable Long id, @RequestBody Map<String, String> body) {
    Optional<Usuarios> optionalUsuario = usuariosRepository.findById(id);
    if (optionalUsuario.isEmpty()) {
        return ResponseEntity.notFound().build();
    }

    Usuarios usuario = optionalUsuario.get();
    String nuevoRol = body.get("rol");
    usuario.setRol(nuevoRol);
    usuariosRepository.save(usuario);

    // ✔️ Retorna un mensaje como texto o un objeto con éxito
    return ResponseEntity.ok(Map.of("mensaje", "Rol actualizado correctamente"));
}


}

