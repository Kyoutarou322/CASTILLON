package com.example.sistemaback.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.*;
import java.util.Map;

@RestController
@RequestMapping("/dashboard")
@CrossOrigin(origins = "http://localhost:4200")
public class DashboardController {

    @PostMapping("/actualizar")
    public ResponseEntity<?> ejecutarActualizacionDashboard() {
        try {
            ejecutarGeneradorExcel(); 
            return ResponseEntity.ok(Map.of("mensaje", "✅ Excel actualizado correctamente"));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("error", "❌ Error al ejecutar el script: " + e.getMessage()));
        }
    }

    private void ejecutarGeneradorExcel() {
        try {
            ProcessBuilder pb = new ProcessBuilder(
                "C:\\Users\\Johan\\AppData\\Local\\Programs\\Python\\Python312\\python.exe",
                "generar_excel.py"
            );
            pb.directory(new File("sistemaback/dashboard")); 
            pb.redirectErrorStream(true);

            Process proceso = pb.start();
            BufferedReader reader = new BufferedReader(new InputStreamReader(proceso.getInputStream()));
            String linea;
            while ((linea = reader.readLine()) != null) {
                System.out.println(linea);
            }

            int exitCode = proceso.waitFor();
            if (exitCode != 0) {
                throw new RuntimeException("El script Python terminó con errores (exit code " + exitCode + ")");
            }

            System.out.println("✅ Archivo Excel actualizado por Python.");
        } catch (Exception e) {
            throw new RuntimeException("Error al ejecutar el script Python: " + e.getMessage());
        }
    }
}
