package com.example.sistemaback.service;

import com.example.sistemaback.model.Usuarios;
import com.example.sistemaback.repository.UsuariosRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class UsuariosService {

    @Autowired
    private UsuariosRepository usuariosRepository;

    public Optional<Usuarios> autenticar(String username, String password) {
        return usuariosRepository.findByUsernameAndPassword(username, password);
    }

    public void actualizarConexion(Usuarios usuario) {
        usuario.setConectado(true);
        usuario.setUltimaConexion(LocalDateTime.now());
        usuariosRepository.save(usuario);
    }

    public void cerrarConexion(Long usuarioId) {
        usuariosRepository.findById(usuarioId).ifPresent(usuario -> {
            usuario.setConectado(false);
            usuariosRepository.save(usuario);
        });
    }

    public long contarUsuariosConectados() {
        return usuariosRepository.countByConectadoTrue();
    }

    public List<Usuarios> obtenerTodos() {
    return usuariosRepository.findAll();
}

public Usuarios guardar(Usuarios usuario) {
    return usuariosRepository.save(usuario);
}

public Optional<Usuarios> buscarPorUsername(String username) {
    return usuariosRepository.findByUsername(username);
}
public Optional<Usuarios> actualizarPermisos(Long id, Usuarios nuevosPermisos) {
    Optional<Usuarios> optionalUsuario = usuariosRepository.findById(id);
    if (optionalUsuario.isPresent()) {
        Usuarios usuario = optionalUsuario.get();
        usuario.setPuedeRegistrar(nuevosPermisos.getPuedeRegistrar());
        usuario.setPuedeActualizar(nuevosPermisos.getPuedeActualizar());
        usuario.setPuedeEliminar(nuevosPermisos.getPuedeEliminar());
        usuariosRepository.save(usuario);
    }
    return optionalUsuario;
}

}
