---
layout: default
title: "Introducción a http en Go"
description: ""
permalink: /lessons/go/httpGo/
category: lessons
subcategory: go
icon: 🔌
article: true
---

## **1. ¿Qué es net/http?**
El paquete `net/http` de Go proporciona herramientas para crear servidores web y clientes HTTP. Es ideal para construir APIs, aplicaciones web, y manejar peticiones/rutas.

---

## **2. Creando un Servidor Web Básico**

**Ejemplo 1: Hola Mundo en HTTP**

```go
package main

import (
    "fmt"
    "net/http"
)

func main() {
    // Define una ruta y su manejador (handler)
    http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
        fmt.Fprintf(w, "¡Hola Mundo!") // Respuesta al cliente
    })

    // Inicia el servidor en el puerto 8080
    fmt.Println("Servidor escuchando en http://localhost:8080")
    http.ListenAndServe(":8080", nil)
}
```

**Explicación:**

- `http.HandleFunc`: Registra una función para manejar una ruta ("/" en este caso).
- `http.ListenAndServe`: Inicia el servidor en el puerto especificado.

---

## **3. Manejo de Métodos HTTP (GET, POST)**

**Ejemplo 2: Manejar GET y POST**

```go
// Manejador para GET
http.HandleFunc("/saludo", func(w http.ResponseWriter, r *http.Request) {
    if r.Method != "GET" {
        http.Error(w, "Método no permitido", http.StatusMethodNotAllowed)
        return
    }
    nombre := r.URL.Query().Get("nombre")
    fmt.Fprintf(w, "Hola %s", nombre)
})

// Manejador para POST (ej: formulario)
http.HandleFunc("/enviar", func(w http.ResponseWriter, r *http.Request) {
    if r.Method != "POST" {
        http.Error(w, "Método no permitido", http.StatusMethodNotAllowed)
        return
    }
    err := r.ParseForm() // Procesar datos del formulario
    if err != nil {
        http.Error(w, "Error al procesar el formulario", http.StatusBadRequest)
        return
    }
    email := r.Form.Get("email")
    fmt.Fprintf(w, "Correo recibido: %s", email)
})
```

**Explicación:**

- `r.Method`: Verifica el método HTTP usado.
- `r.URL.Query()`: Accede a parámetros de la URL (ej: `/saludo?nombre=Ana`).
- `r.ParseForm()`: Procesa datos de formularios POST.

---

## **4. Trabajando con Rutas y Parámetros**

**Ejemplo 3: Rutas con Parámetros Dinámicos**

Go no tiene rutas dinámicas incorporadas, pero puedes lograrlo con bibliotecas como `gorilla/mux` o manualmente:

```go
http.HandleFunc("/usuario/", func(w http.ResponseWriter, r *http.Request) {
    // Extrae el segmento después de /usuario/
    id := strings.TrimPrefix(r.URL.Path, "/usuario/")
    fmt.Fprintf(w, "ID de usuario: %s", id)
})
```

**Uso:**

- Accede a `http://localhost:8080/usuario/123` → Respuesta: `ID de usuario: 123`.

---

## **5. Enviar Respuestas en JSON**

**Ejemplo 4: API JSON**

```go
type User struct {
    ID    int    `json:"id"`
    Name  string `json:"name"`
}

http.HandleFunc("/api/user", func(w http.ResponseWriter, r *http.Request) {
    user := User{ID: 1, Name: "Ana"}
    w.Header().Set("Content-Type", "application/json") // Define el tipo de contenido
    json.NewEncoder(w).Encode(user) // Codifica y envía el JSON
})
```

**Respuesta:**

```json
{"id":1,"name":"Ana"}
```

---

## **6. Middlewares Básicos**

**Ejemplo 5: Middleware de Registro (Logging)**

```go
// Middleware que registra cada petición
func loggingMiddleware(next http.HandlerFunc) http.HandlerFunc {
    return func(w http.ResponseWriter, r *http.Request) {
        fmt.Printf("Nueva petición: %s - %s\n", r.Method, r.URL.Path)
        next(w, r) // Llama al siguiente manejador
    }
}

// Uso:
http.HandleFunc("/ruta-protegida", loggingMiddleware(func(w http.ResponseWriter, r *http.Request) {
    fmt.Fprint(w, "Contenido protegido")
}))
```

---

## **7. Sirviendo Archivos Estáticos**

**Ejemplo 6: Servir una carpeta "static"**

```go
// Sirve todos los archivos de la carpeta ./static
http.Handle("/static/", http.StripPrefix("/static/", http.FileServer(http.Dir("static"))))
```

- Crea una carpeta `static` con archivos (ej: `style.css`).
- Accede a `http://localhost:8080/static/style.css`.

---

## **8. Manejo de Errores**

**Ejemplo 7: Página 404 Personalizada**

```go
http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
    if r.URL.Path != "/" {
        http.NotFound(w, r)
        return
    }
    fmt.Fprint(w, "Página de inicio")
})
```

---

## **Conclusión**

- `net/http` es potente y flexible para construir servidores web en Go.
- Puedes extenderlo con middlewares, routers avanzados (como `gorilla/mux`), o integrar templates HTML.

**Próximos Pasos:**

1. Explorar el paquete [html/template](/packages/html) para renderizar HTML.
2. Aprender sobre conexiones a bases de datos.
3. Profundizar en autenticación JWT.
4. Aprender sobre GraphQL.
