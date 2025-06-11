---
layout: default
title: "Zap"
description: "Guía de uso de la librería Zap para logging en Go"
permalink: /library/go/zap/
category: library
article: true
subcategory: logging
icon: 🐛
---


**¿Qué es Zap?**

Zap es una librería de *logging* (registro de eventos) para Go creada por Uber. Destaca por:  
- ⚡ **Altísimo rendimiento** (el más rápido del ecosistema Go).  
- 📊 **Logs estructurados** (especialmente en JSON).  
- 🔍 **Soporte para niveles de log** (Debug, Info, Error, etc.).  
- 🛠 **Flexibilidad** para personalizar salidas, formatos y más.  

---

#### **1. Instalación**  
```bash
go get -u go.uber.org/zap
```

---

#### **2. Configuración Básica**  
**Opción A: Logger para Producción**  
*(Logs en JSON, ideal para sistemas en producción)*  
```go
package main

import "go.uber.org/zap"

func main() {
    // Inicializa el logger
    logger, _ := zap.NewProduction()
    defer logger.Sync()  // ¡IMPORTANTE! Libera recursos al terminar

    // Ejemplo de uso
    logger.Info("Usuario creado",
        zap.String("username", "Ana"),
        zap.Int("id", 789),
    )
}
```

**Opción B: Logger para Desarrollo**  
*(Logs legibles para humanos durante el desarrollo)*  
```go
logger, _ := zap.NewDevelopment()
defer logger.Sync()

logger.Debug("Depurando conexión a BD...")
logger.Warn("Conexión lenta detectada")
```

---

#### **3. Partes Clave Explicadas**  
| Función/Método             | Explicación                                                                 |
|----------------------------|-----------------------------------------------------------------------------|
| `zap.NewProduction()`      | Crea un logger configurado para producción (formato JSON).                  |
| `zap.NewDevelopment()`     | Logger con salida legible (colores, texto plano).                          |
| `defer logger.Sync()`      | **Obligatorio:** Vacía los buffers de escritura al finalizar el programa.   |
| `logger.Info()`, `.Debug()`| Métodos por nivel de log. Aceptan un mensaje y campos estructurados.        |
| `zap.String()`, `zap.Int()`| Funciones para añadir **campos estructurados** (clave-valor) al log.       |

---

#### **4. Configuración Avanzada (Personalizada)**  
```go
config := zap.Config{
    Level: zap.NewAtomicLevelAt(zap.DebugLevel), // Nivel mínimo: Debug
    Encoding: "json",  // Formato: "json" o "console"
    OutputPaths: []string{"stdout", "logs/app.log"}, // Salidas: consola + archivo
    EncoderConfig: zapcore.EncoderConfig{
        TimeKey:    "timestamp",
        MessageKey: "mensaje",
        LevelKey:   "severidad",
        EncodeTime: zapcore.ISO8601TimeEncoder, // Formato de tiempo
    },
}

logger, _ := config.Build()
defer logger.Sync()
```

**Campos clave de la configuración:**  
- `Level`: Nivel mínimo de logs a registrar (ej: `zap.InfoLevel` ignora Debug).  
- `OutputPaths`: Destinos de salida (`stdout`, archivos, etc.).  
- `EncoderConfig`: Personaliza nombres de campos en el JSON.  

---

#### **5. Logger vs. SugaredLogger**  
- **Logger (rápido):**  
  ```go
  logger.Warn("Espacio insuficiente", zap.Int("disponible_MB", 120))
  ```  
  - Ideal cuando el rendimiento es crítico (microservicios).  

- **SugaredLogger (flexible):**  
  ```go
  sugar := logger.Sugar()
  sugar.Infof("Usuario %s actualizado (ID: %d)", "Carlos", 456)
  sugar.Warnw("Error en BD", 
      "error", err.Error(), 
      "query", "SELECT * FROM users",
  )
  ```  
  - Permite formato estilo `printf` y campos sin especificar tipo (`warnw`).  

---

#### **6. Ejemplo: Middleware en API Web**  
```go
package main

import (
    "net/http"
    "time"
    "go.uber.org/zap"
)

func main() {
    logger, _ := zap.NewProduction()
    sugar := logger.Sugar()

    // Middleware de logging
    loggingMiddleware := func(next http.Handler) http.Handler {
        return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
            start := time.Now()
            next.ServeHTTP(w, r)
            duration := time.Since(start)
            sugar.Info("Petición HTTP",
                zap.String("ruta", r.URL.Path),
                zap.String("método", r.Method),
                zap.Duration("duración", duration),
            )
        })
    }

    // Configuración del servidor
    mux := http.NewServeMux()
    mux.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
        w.Write([]byte("Hola Mundo"))
    })

    sugar.Info("Iniciando servidor en :8080")
    http.ListenAndServe(":8080", loggingMiddleware(mux))
}
```

---

#### **7. Mejores Prácticas**  
- **Niveles de log:**  
  - `Debug`: Detalles técnicos (solo desarrollo).  
  - `Info`: Eventos normales (usuario creado, petición recibida).  
  - `Warn`: Problemas recuperables (conexión lenta, disco al 90%).  
  - `Error`: Fallos graves (BD inaccesible, archivo no encontrado).  
  - `Fatal`: Errores irrecuperables (detiene la aplicación).  

- **Regla de oro:**  
  ```go
  // ❌ Evitar
  logger.Info(fmt.Sprintf("Error: %v", err))

  // ✅ Correcto
  logger.Error("Fallo en operación", zap.Error(err))
  ```

---

#### **8. Ejercicios de Práctica**  
1. Crea un logger que escriba en un archivo `app.log` y muestre errores por consola.  
2. Registra eventos de una función simulando una transferencia bancaria:  
   - Info: "Transferencia iniciada"  
   - Error: "Fondos insuficientes" (con campo `cuenta_origen`)  
3. Compara el rendimiento entre `Logger` y `SugaredLogger` usando `benchmark`:  
   ```go
   func BenchmarkLogger(b *testing.B) {
       logger, _ := zap.NewProduction()
       defer logger.Sync()
       b.ResetTimer()
       for i := 0; i < b.N; i++ {
           logger.Info("Test", zap.Int("iteración", i))
       }
   }
   ```

---

### Conclusión  
Zap es la herramienta ideal para logging en Go: **veloz como un rayo ⚡ y flexible como un junco 🌿**. Comienza con `zap.NewProduction()` y `SugaredLogger`, luego explora configuraciones avanzadas según tus necesidades.  
