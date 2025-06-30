package com.example.sistemaback.repository;

import com.example.sistemaback.model.Usuarios;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UsuariosRepository extends JpaRepository<Usuarios, Long> {
    Optional<Usuarios> findByUsernameAndPassword(String username, String password);
    long countByConectadoTrue();
    Optional<Usuarios> findByUsername(String username);
}
