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

## ¿Qué es Zap?

Zap es un sistema de logging rápido y estructurado para Go desarrollado por Uber. Es una de las librerías de logging más populares en el ecosistema Go debido a su alto rendimiento y facilidad de uso.

## Ventajas de Zap

- **Muy rápido**: Más rápido que la mayoría de alternativas
- **Estructurado**: Los logs se generan en formato estructurado (como JSON)
- **Niveles de log**: Soporta diferentes niveles (Debug, Info, Warn, Error, etc.)
- **Configurable**: Puedes personalizar muchos aspectos del logging

## Instalación

Primero, necesitas instalar el paquete zap:

```bash
go get -u go.uber.org/zap
```

## Configuración Básica

### Logger Sencillo

```go
package main

import (
    "go.uber.org/zap"
)

func main() {
    // Configuración básica del logger
    logger, _ := zap.NewProduction()
    defer logger.Sync() // Importante para liberar buffers

    // Ejemplos de logging
    logger.Info("Este es un mensaje de información",
        zap.String("clave", "valor"),
        zap.Int("número", 42),
    )

    logger.Error("Este es un mensaje de error",
        zap.String("clave", "valor"),
        zap.Error(errors.New("error de ejemplo")),
    )
}
```

### Logger de Desarrollo (más legible)

```go
func main() {
    // Logger en modo desarrollo (más legible para humanos)
    logger, _ := zap.NewDevelopment()
    defer logger.Sync()

    logger.Debug("Este es un mensaje de depuración")
    logger.Warn("Este es un mensaje de advertencia")
}
```

## Configuración Personalizada

```go
func main() {
    // Configuración personalizada
    config := zap.Config{
        Level:       zap.NewAtomicLevelAt(zap.DebugLevel),
        Development: false,
        Encoding:    "json",
        EncoderConfig: zapcore.EncoderConfig{
            TimeKey:        "ts",
            LevelKey:      "level",
            NameKey:       "logger",
            CallerKey:     "caller",
            FunctionKey:   zapcore.OmitKey,
            MessageKey:    "msg",
            StacktraceKey: "stacktrace",
            LineEnding:    zapcore.DefaultLineEnding,
            EncodeLevel:   zapcore.LowercaseLevelEncoder,
            EncodeTime:    zapcore.ISO8601TimeEncoder,
            EncodeDuration: zapcore.StringDurationEncoder,
            EncodeCaller:  zapcore.ShortCallerEncoder,
        },
        OutputPaths:      []string{"stdout", "/tmp/logs.log"},
        ErrorOutputPaths: []string{"stderr"},
    }

    logger, _ := config.Build()
    defer logger.Sync()

    logger.Info("Logger configurado personalizadamente",
        zap.String("aplicación", "mi app"),
    )
}
```

## SugaredLogger vs. Logger

Zap ofrece dos tipos de logger:

1. **Logger**: Más rápido pero menos flexible
2. **SugaredLogger**: Más flexible pero un poco más lento

```go
func main() {
    logger, _ := zap.NewProduction()
    defer logger.Sync()

    // Logger básico (más rápido)
    logger.Info("Mensaje estructurado",
        zap.String("clave", "valor"),
    )

    // SugaredLogger (más flexible)
    sugar := logger.Sugar()
    sugar.Infow("Mensaje con estructura flexible",
        "clave", "valor",
        "número", 42,
    )
    sugar.Infof("Mensaje formateado: %s", "hola mundo")
}
```

## Ejemplo Completo: API Web con Zap

```go
package main

import (
    "net/http"
    "time"

    "go.uber.org/zap"
)

func main() {
    // Configurar logger
    logger, _ := zap.NewProduction()
    defer logger.Sync()
    sugar := logger.Sugar()

    // Configurar servidor HTTP
    http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
        start := time.Now()
        
        // Procesar petición
        w.Write([]byte("Hola Mundo!"))
        
        // Registrar petición
        duration := time.Since(start)
        sugar.Infow("Petición recibida",
            "path", r.URL.Path,
            "method", r.Method,
            "duration", duration,
        )
    })

    // Registrar inicio del servidor
    sugar.Info("Iniciando servidor en :8080")
    if err := http.ListenAndServe(":8080", nil); err != nil {
        sugar.Fatalw("Error al iniciar servidor",
            "error", err,
        )
    }
}
```

## Mejores Prácticas

1. **Usa defer logger.Sync()**: Asegúrate de liberar los buffers al salir
2. **Elige el nivel adecuado**:
    - Debug: Información detallada para desarrollo
    - Info: Eventos importantes de la aplicación
    - Warn: Situaciones anormales pero no críticas
    - Error: Errores que deben ser revisados
    - Fatal: Errores críticos que hacen que la aplicación termine
3. **Proporciona contexto**: Usa campos estructurados para dar contexto a los logs
4. **No abuses del SugaredLogger**: Usa el Logger básico cuando la performance sea crítica

## Conclusión

Zap es una excelente opción para logging en aplicaciones Go. Combina alto rendimiento con flexibilidad y facilidad de uso. Con esta introducción ya puedes comenzar a integrar Zap en tus proyectos y aprovechar sus ventajas sobre el sistema de logging estándar de Go.

## Ejercicios Prácticos

1. Crea un programa que registre diferentes niveles de log con contexto estructurado
2. Configura Zap para escribir logs tanto en consola como en un archivo
3. Integra Zap en una aplicación web simple como middleware de logging
4. Compara el rendimiento entre Logger y SugaredLogger con benchmarks
