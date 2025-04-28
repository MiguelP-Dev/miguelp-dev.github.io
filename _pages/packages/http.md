---
layout: default
title: http
description: Guía completa del paquete http de Go para aplicaciones web
permalink: /packages/http/
category: packages
article: true
subcategory: go
icon: 🌐
---

## Paquete `http` en Go: Guía Completa

El paquete `net/http` proporciona una implementación HTTP para clientes y servidores web en Go. Este documento ofrece una visión detallada de sus características más importantes.

### 1. Servidor HTTP Básico

#### 1.1 Iniciar un Servidor

```go
package main

import (
    "fmt"
    "log"
    "net/http"
)

func holaHandler(w http.ResponseWriter, r *http.Request) {
    fmt.Fprintf(w, "¡Hola, mundo!")
}

func main() {
    http.HandleFunc("/hola", holaHandler)
    log.Fatal(http.ListenAndServe(":8080", nil))
}
```

#### 1.2 Servidor con Configuración Personalizada

```go
func main() {
    mux := http.NewServeMux()
    mux.HandleFunc("/api/usuarios", usuariosHandler)
    
    server := &http.Server{
        Addr:         ":8080",
        Handler:      mux,
        ReadTimeout:  5 * time.Second,
        WriteTimeout: 10 * time.Second,
        IdleTimeout:  120 * time.Second,
    }
    
    log.Fatal(server.ListenAndServe())
}
```

### 2. Enrutamiento

#### 2.1 Mux Básico

```go
func main() {
    mux := http.NewServeMux()
    
    mux.HandleFunc("/", homeHandler)
    mux.HandleFunc("/api/", apiHandler)
    mux.HandleFunc("/api/productos/", productosHandler)
    
    log.Fatal(http.ListenAndServe(":8080", mux))
}
```

#### 2.2 Manejador Personalizado

```go
type usuarioHandler struct {
    db *sql.DB
}

func (h *usuarioHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
    switch r.Method {
    case "GET":
        h.listar(w, r)
    case "POST":
        h.crear(w, r)
    default:
        http.Error(w, "Método no permitido", http.StatusMethodNotAllowed)
    }
}

func main() {
    db, _ := sql.Open("postgres", "...")
    mux := http.NewServeMux()
    mux.Handle("/usuarios/", &usuarioHandler{db: db})
    
    http.ListenAndServe(":8080", mux)
}
```

### 3. Manejo de Solicitudes

#### 3.1 Análisis de Parámetros

```go
func buscarHandler(w http.ResponseWriter, r *http.Request) {
    // Parámetros de consulta URL
    query := r.URL.Query()
    termino := query.Get("q")
    limite, _ := strconv.Atoi(query.Get("limite"))
    
    // Parámetros de ruta
    id := strings.TrimPrefix(r.URL.Path, "/productos/")
    
    fmt.Fprintf(w, "Búsqueda: %s, límite: %d, ID: %s", termino, limite, id)
}
```

#### 3.2 Lectura del Cuerpo

```go
func crearUsuarioHandler(w http.ResponseWriter, r *http.Request) {
    if r.Method != "POST" {
        http.Error(w, "Método no permitido", http.StatusMethodNotAllowed)
        return
    }
    
    // Limitar tamaño del body
    r.Body = http.MaxBytesReader(w, r.Body, 1<<20) // 1MB
    
    var usuario struct {
        Nombre string `json:"nombre"`
        Email  string `json:"email"`
    }
    
    decoder := json.NewDecoder(r.Body)
    decoder.DisallowUnknownFields()
    
    if err := decoder.Decode(&usuario); err != nil {
        http.Error(w, "JSON inválido: "+err.Error(), http.StatusBadRequest)
        return
    }
    
    // Validar campos
    if usuario.Nombre == "" || usuario.Email == "" {
        http.Error(w, "Campos requeridos", http.StatusBadRequest)
        return
    }
    
    // Procesar...
    w.WriteHeader(http.StatusCreated)
    json.NewEncoder(w).Encode(map[string]string{"status": "creado"})
}
```

### 4. Middleware

#### 4.1 Logging Middleware

```go
func loggingMiddleware(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        inicio := time.Now()
        
        // Envolver ResponseWriter para capturar código de estado
        ww := newWrappedResponseWriter(w)
        
        // Llamar al siguiente handler
        next.ServeHTTP(ww, r)
        
        // Loggear después
        log.Printf(
            "%s %s %d %s %s",
            r.Method,
            r.URL.Path,
            ww.status,
            time.Since(inicio),
            r.RemoteAddr,
        )
    })
}

// Uso:
mux := http.NewServeMux()
mux.HandleFunc("/api", apiHandler)
loggedMux := loggingMiddleware(mux)
http.ListenAndServe(":8080", loggedMux)
```

#### 4.2 Encadenamiento de Middleware

```go
func chain(h http.Handler, middlewares ...func(http.Handler) http.Handler) http.Handler {
    for _, m := range middlewares {
        h = m(h)
    }
    return h
}

// Uso
handler := chain(
    mux,
    loggingMiddleware,
    authMiddleware,
    corsMiddleware,
)
```

### 5. Cliente HTTP

#### 5.1 Cliente Simple

```go
func obtenerDatos() ([]byte, error) {
    resp, err := http.Get("https://api.ejemplo.com/datos")
    if err != nil {
        return nil, err
    }
    defer resp.Body.Close()
    
    if resp.StatusCode != http.StatusOK {
        return nil, fmt.Errorf("API error: %s", resp.Status)
    }
    
    return io.ReadAll(resp.Body)
}
```

#### 5.2 Cliente Personalizado

```go
func clientePersonalizado() {
    cliente := &http.Client{
        Timeout: 10 * time.Second,
        Transport: &http.Transport{
            MaxIdleConns:        100,
            MaxIdleConnsPerHost: 20,
            IdleConnTimeout:     90 * time.Second,
        },
    }
    
    req, err := http.NewRequest("GET", "https://api.ejemplo.com", nil)
    if err != nil {
        log.Fatal(err)
    }
    
    req.Header.Add("Authorization", "Bearer token123")
    req.Header.Add("Content-Type", "application/json")
    
    resp, err := cliente.Do(req)
    if err != nil {
        log.Fatal(err)
    }
    defer resp.Body.Close()
    
    // Procesar respuesta...
}
```

### 6. Mejores Prácticas

#### 6.1 Manejo Seguro de Errores

```go
func apiHandler(w http.ResponseWriter, r *http.Request) {
    usuario, err := obtenerUsuario(r.Context(), 123)
    if err != nil {
        switch {
        case errors.Is(err, sql.ErrNoRows):
            http.Error(w, "Usuario no encontrado", http.StatusNotFound)
        case errors.Is(err, context.DeadlineExceeded):
            http.Error(w, "Timeout de base de datos", http.StatusGatewayTimeout)
        default:
            // No exponer detalles del error interno
            log.Printf("Error interno: %v", err)
            http.Error(w, "Error del servidor", http.StatusInternalServerError)
        }
        return
    }
    
    json.NewEncoder(w).Encode(usuario)
}
```

#### 6.2 Separación de Responsabilidades

```go
// handlers/usuarios.go
package handlers

import (
    "net/http"
    "miapp/models"
    "miapp/services"
)

type UsuarioHandler struct {
    service *services.UsuarioService
}

func NewUsuarioHandler(service *services.UsuarioService) *UsuarioHandler {
    return &UsuarioHandler{service: service}
}

func (h *UsuarioHandler) Listar(w http.ResponseWriter, r *http.Request) {
    usuarios, err := h.service.ListarTodos(r.Context())
    if err != nil {
        http.Error(w, err.Error(), http.StatusInternalServerError)
        return
    }
    
    writeJSON(w, usuarios)
}

// Función helper para respuestas JSON
func writeJSON(w http.ResponseWriter, data interface{}) {
    w.Header().Set("Content-Type", "application/json")
    json.NewEncoder(w).Encode(data)
}
```

Esta guía cubre los aspectos más importantes del paquete `net/http` de Go, desde la configuración básica de servidores hasta técnicas avanzadas de manejo de solicitudes y respuestas. 