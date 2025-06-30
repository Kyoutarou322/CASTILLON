package com.example.sistemaback.service;

import com.example.sistemaback.model.Producto;
import com.example.sistemaback.model.ProductoDTO;
import com.example.sistemaback.model.Proveedor;
import com.example.sistemaback.model.Almacen;
import com.example.sistemaback.model.Inventario;
import com.example.sistemaback.repository.ProductoRepository;
import com.example.sistemaback.repository.ProveedorRepository;
import com.example.sistemaback.repository.AlmacenRepository;
import com.example.sistemaback.repository.InventarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import java.util.Map;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.io.File;
@Service
public class ProductoService {

    @Autowired
    private ProductoRepository productoRepository;

    @Autowired
    private ProveedorRepository proveedorRepository;

    @Autowired
    private AlmacenRepository almacenRepository;

    @Autowired
    private InventarioRepository inventarioRepository;

    public List<ProductoDTO> obtenerTodosLosProductos() {
        return productoRepository.findAll()
                .stream()
                .map(ProductoDTO::new)
                .collect(Collectors.toList());
    }

   public ResponseEntity<?> registrarProducto(Producto producto) {
        try {
            if (producto.getProveedor() != null && producto.getProveedor().getId() != null) {
                Proveedor proveedor = proveedorRepository.findById(producto.getProveedor().getId())
                        .orElseThrow(() -> new RuntimeException("Proveedor no encontrado"));
                producto.setProveedor(proveedor);
            }

            if (producto.getAlmacen() != null && producto.getAlmacen().getId() != null) {
                Almacen almacen = almacenRepository.findById(producto.getAlmacen().getId())
                        .orElseThrow(() -> new RuntimeException("Almacén no encontrado"));
                producto.setAlmacen(almacen);
            }

            if (producto.getInventario() != null && producto.getInventario().getId() != null) {
                Inventario inventario = inventarioRepository.findById(producto.getInventario().getId())
                        .orElseThrow(() -> new RuntimeException("Inventario no encontrado"));
                producto.setInventario(inventario);
            }

            productoRepository.save(producto);

            ejecutarGeneradorExcel(); 

            return ResponseEntity.ok(Map.of("mensaje", "Producto registrado"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error al registrar el producto: " + e.getMessage());
        }
    }

    public ResponseEntity<?> actualizarProducto(Long id, Producto producto) {
        Optional<Producto> existente = productoRepository.findById(id);
        if (existente.isPresent()) {
            try {
                producto.setId(id);

                if (producto.getProveedor() != null && producto.getProveedor().getId() != null) {
                    Proveedor proveedor = proveedorRepository.findById(producto.getProveedor().getId())
                            .orElseThrow(() -> new RuntimeException("Proveedor no encontrado"));
                    producto.setProveedor(proveedor);
                }

                if (producto.getAlmacen() != null && producto.getAlmacen().getId() != null) {
                    Almacen almacen = almacenRepository.findById(producto.getAlmacen().getId())
                            .orElseThrow(() -> new RuntimeException("Almacén no encontrado"));
                    producto.setAlmacen(almacen);
                }

                if (producto.getInventario() != null && producto.getInventario().getId() != null) {
                    Inventario inventario = inventarioRepository.findById(producto.getInventario().getId())
                            .orElseThrow(() -> new RuntimeException("Inventario no encontrado"));
                    producto.setInventario(inventario);
                }

                productoRepository.save(producto);

                ejecutarGeneradorExcel(); 
                return ResponseEntity.ok(Map.of("mensaje", "Producto actualizado"));

            } catch (Exception e) {
                return ResponseEntity.badRequest().body("Error al actualizar producto: " + e.getMessage());
            }
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    public ResponseEntity<?> eliminarProducto(Long id) {
        if (productoRepository.existsById(id)) {
            productoRepository.deleteById(id);

            ejecutarGeneradorExcel(); 

            return ResponseEntity.ok(Map.of("mensaje", "Producto eliminado"));
        } else {
            return ResponseEntity.status(404).body(Map.of("error", "Producto no encontrado"));
        }
    }

   public void ejecutarGeneradorExcel() {
    try {
        ProcessBuilder pb = new ProcessBuilder(
            "C:\\Users\\Johan\\AppData\\Local\\Programs\\Python\\Python312\\python.exe",
            "generar_excel.py"
        );
        pb.directory(new File("sistemaback/dashboard"));
        pb.redirectErrorStream(true);

        Process p = pb.start();
        BufferedReader reader = new BufferedReader(new InputStreamReader(p.getInputStream()));
        String line;
        while ((line = reader.readLine()) != null) {
            System.out.println(line); 
        }

        p.waitFor();
        System.out.println("✅ Archivo Excel actualizado por Python.");
    } catch (Exception e) {
        System.err.println("❌ Error al ejecutar el script Python: " + e.getMessage());
    }
}

}