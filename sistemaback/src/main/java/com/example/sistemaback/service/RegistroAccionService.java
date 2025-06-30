package com.example.sistemaback.service;

import com.example.sistemaback.model.RegistroAccion;
import com.example.sistemaback.repository.RegistroAccionRepository;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class RegistroAccionService {

    private final RegistroAccionRepository registroRepo;

    @PersistenceContext
    private EntityManager entityManager;

    public RegistroAccionService(RegistroAccionRepository registroRepo) {
        this.registroRepo = registroRepo;
    }

    public RegistroAccion guardar(RegistroAccion accion) {
        RegistroAccion saved = registroRepo.save(accion);
        entityManager.flush(); 
        return saved;
    }

    public List<RegistroAccion> listarTodas() {
        return registroRepo.findAll();
    }

    public Map<String, Long> contarAccionesPorTipo() {
        List<RegistroAccion> acciones = registroRepo.findAll();

        return acciones.stream()
            .collect(Collectors.groupingBy(
                RegistroAccion::getTipoSolicitud,
                Collectors.counting()
            ));
    }
}

