---
layout: default
title: "Gorilla Toolkit desde cero"
description: "Domina el toolkit web más poderoso para construir APIs y aplicaciones en Go"
permalink: /lessons/go/gorilla-toolkit/
category: lessons
subcategory: "Toolkits and frameworks"
icon: 🦍
article: true
---

## Gorilla Toolkit: El Framework Web Esencial para Go

### ¿Qué es Gorilla Toolkit?

**Gorilla** es un conjunto de librerías modulares para construir aplicaciones web en Go. A diferencia de frameworks monolíticos, Gorilla te da **componentes especializados** que puedes combinar libremente. Es como tener una caja de herramientas de alta precisión para desarrollo web.

```go
// Analogía en código
type GorillaToolkit struct {
    Mux      *mux.Router   // Enrutamiento avanzado
    Sessions *sessions.CookieStore // Gestión de sesiones
    Websocket *websocket.Upgrader  // Comunicación en tiempo real
    Handlers handlers.Chain // Middlewares
}
```

---

## Nivel Básico: Fundamentos

### 1. Instalación e Inicio Rápido

#### **Instalación:**

```bash
go get -u github.com/gorilla/mux
go get -u github.com/gorilla/sessions
```

#### **Hola Mundo con Gorilla Mux:**

```go
package main

import (
    "net/http"
    "github.com/gorilla/mux"
)

func main() {
    // Paso 1: Crear router
    r := mux.NewRouter()
    
    // Paso 2: Definir ruta
    r.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
        w.Write([]byte("🦍 ¡Hola desde Gorilla Mux!"))
    })
    
    // Paso 3: Iniciar servidor
    http.ListenAndServe(":8080", r)
}
```

### 2. Enrutamiento Avanzado con Mux

#### **Rutas con parámetros:**

```go
r := mux.NewRouter()

// Ruta con parámetro dinámico
r.HandleFunc("/usuarios/{id}", func(w http.ResponseWriter, r *http.Request) {
    vars := mux.Vars(r)
    id := vars["id"] // Extraer parámetro
    w.Write([]byte("Usuario ID: " + id))
}).Methods("GET")

// Rutas con expresiones regulares
r.HandleFunc("/articulos/{category:[a-z]+}/{id:[0-9]+}", ArticleHandler)
```

#### **Métodos HTTP específicos:**

```go
// Solo acepta POST
r.HandleFunc("/productos", CreateProduct).Methods("POST")

// Múltiples métodos
r.HandleFunc("/productos/{id}", ProductHandler).Methods("GET", "PUT", "DELETE")
```

#### **Subruters (para versionado de API):**

```go
// API v1
v1 := r.PathPrefix("/api/v1").Subrouter()
v1.HandleFunc("/productos", GetProductsV1)

// API v2
v2 := r.PathPrefix("/api/v2").Subrouter()
v2.Use(JsonMiddleware) // Middleware exclusivo para v2
v2.HandleFunc("/productos", GetProductsV2)
```

---

## Nivel Intermedio: Funcionalidades Clave

### 1. Middlewares - La Esencia de Gorilla

#### **Middleware básico (logging):**

```go
func LoggingMiddleware(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        // Paso 1: Lógica PRE-ejecución
        start := time.Now()
        
        // Paso 2: Llamar al siguiente handler
        next.ServeHTTP(w, r)
        
        // Paso 3: Lógica POST-ejecución
        log.Printf(
            "%s %s %s",
            r.Method,
            r.RequestURI,
            time.Since(start),
        )
    })
}

// Registro
r := mux.NewRouter()
r.Use(LoggingMiddleware)
```

#### **Middleware de autenticación:**

```go
func AuthMiddleware(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        // Verificar token
        token := r.Header.Get("Authorization")
        if !isValidToken(token) {
            http.Error(w, "No autorizado", http.StatusUnauthorized)
            return // Cortar ejecución
        }
        next.ServeHTTP(w, r)
    })
}

// Uso selectivo
adminRouter := r.PathPrefix("/admin").Subrouter()
adminRouter.Use(AuthMiddleware)
```

### 2. Manejo de Sesiones

#### **Configuración básica:**

```go
// Paso 1: Crear store de sesiones
var store = sessions.NewCookieStore([]byte("secreto-muy-seguro"))

// Paso 2: Handler de login
func LoginHandler(w http.ResponseWriter, r *http.Request) {
    session, _ := store.Get(r, "sesion-usuario")
    
    // Autenticar usuario (ejemplo simplificado)
    if r.FormValue("user") == "admin" && r.FormValue("pass") == "secret" {
        // Paso 3: Establecer valores de sesión
        session.Values["autenticado"] = true
        session.Values["usuario"] = "admin"
        session.Save(r, w)
    }
}

// Paso 4: Validar sesión en handlers
func DashboardHandler(w http.ResponseWriter, r *http.Request) {
    session, _ := store.Get(r, "sesion-usuario")
    
    if auth, ok := session.Values["autenticado"].(bool); !ok || !auth {
        http.Error(w, "Acceso denegado", http.StatusForbidden)
        return
    }
    
    fmt.Fprintf(w, "Bienvenido %s!", session.Values["usuario"])
}
```

### 3. WebSockets en Tiempo Real

#### **Echo Server con Gorilla:**

```go
var upgrader = websocket.Upgrader{
    CheckOrigin: func(r *http.Request) bool { return true },
}

func EchoHandler(w http.ResponseWriter, r *http.Request) {
    // Paso 1: Upgrade HTTP a WebSocket
    conn, err := upgrader.Upgrade(w, r, nil)
    if err != nil {
        log.Print("Upgrade error:", err)
        return
    }
    defer conn.Close()

    // Paso 2: Loop de mensajes
    for {
        // Leer mensaje
        mt, message, err := conn.ReadMessage()
        if err != nil {
            break // Salir al cerrar conexión
        }
        
        // Paso 3: Procesar (echo)
        log.Printf("Recibido: %s", message)
        
        // Paso 4: Responder
        err = conn.WriteMessage(mt, message)
        if err != nil {
            break
        }
    }
}

// Registrar handler
r.HandleFunc("/ws", EchoHandler)
```

---

## Nivel Avanzado: Patrones Profesionales

### 1. Arquitectura para APIs RESTful

#### **Estructura de proyecto profesional:**

```plaintext
mi-api/
├── cmd/
│   └── server/
│       └── main.go         # Punto de entrada
├── internal/
│   ├── handlers/           # HTTP Handlers
│   │   └── product.go      
│   ├── middleware/         # Middlewares
│   ├── models/             # Estructuras de datos
│   └── storage/            # Persistencia (DB, cache)
├── pkg/
│   └── utils/              # Utilidades compartidas
└── go.mod
```

#### **Handler REST con Mux:**

```go
// internal/handlers/product.go
func GetProducts(w http.ResponseWriter, r *http.Request) {
    products, err := storage.GetAllProducts()
    if err != nil {
        RespondWithError(w, http.StatusInternalServerError, err.Error())
        return
    }
    RespondWithJSON(w, http.StatusOK, products)
}

// internal/handlers/utils.go
func RespondWithJSON(w http.ResponseWriter, code int, payload interface{}) {
    w.Header().Set("Content-Type", "application/json")
    w.WriteHeader(code)
    json.NewEncoder(w).Encode(payload)
}
```

### 2. Autenticación JWT con Middlewares

#### **Middleware JWT:**

```go
func JWTMiddleware(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        // Paso 1: Extraer token
        authHeader := r.Header.Get("Authorization")
        if authHeader == "" {
            RespondWithError(w, http.StatusUnauthorized, "Falta token")
            return
        }
        
        // Paso 2: Validar formato "Bearer <token>"
        parts := strings.Split(authHeader, " ")
        if len(parts) != 2 || parts[0] != "Bearer" {
            RespondWithError(w, http.StatusBadRequest, "Formato inválido")
            return
        }
        
        // Paso 3: Verificar token
        token, err := jwt.Parse(parts[1], func(t *jwt.Token) (interface{}, error) {
            return []byte("mi-secreto"), nil
        })
        
        if err != nil || !token.Valid {
            RespondWithError(w, http.StatusUnauthorized, "Token inválido")
            return
        }
        
        // Paso 4: Añadir claims al contexto
        ctx := context.WithValue(r.Context(), "user", token.Claims)
        next.ServeHTTP(w, r.WithContext(ctx))
    })
}
```

### 3. Testing Profesional

#### **Testing de handlers con httptest:**

```go
func TestGetProduct(t *testing.T) {
    // Paso 1: Crear router
    r := mux.NewRouter()
    r.HandleFunc("/products/{id}", GetProductHandler)
    
    // Paso 2: Crear request simulada
    req, _ := http.NewRequest("GET", "/products/123", nil)
    
    // Paso 3: Grabar respuesta
    rr := httptest.NewRecorder()
    
    // Paso 4: Ejecutar
    r.ServeHTTP(rr, req)
    
    // Paso 5: Validaciones
    if status := rr.Code; status != http.StatusOK {
        t.Errorf("Status esperado 200, obtenido %d", status)
    }
    
    expected := `{"id":"123","name":"Producto Ejemplo"}`
    if rr.Body.String() != expected {
        t.Errorf("Respuesta inesperada: %s", rr.Body.String())
    }
}
```

#### **Testing con suite:**

```go
type HandlersTestSuite struct {
    suite.Suite
    router *mux.Router
}

func (s *HandlersTestSuite) SetupTest() {
    s.router = mux.NewRouter()
    s.router.HandleFunc("/products", GetProductsHandler)
}

func (s *HandlersTestSuite) TestGetProducts() {
    req, _ := http.NewRequest("GET", "/products", nil)
    rr := httptest.NewRecorder()
    
    s.router.ServeHTTP(rr, req)
    
    s.Equal(http.StatusOK, rr.Code)
    s.Contains(rr.Body.String(), "productos")
}

func TestHandlersSuite(t *testing.T) {
    suite.Run(t, new(HandlersTestSuite))
}
```

### 4. Optimización para Producción

#### **Configuración esencial:**

```go
func main() {
    r := mux.NewRouter()
    
    // Middleware de compresión
    r.Use(handlers.CompressHandler)
    
    // Middleware de CORS
    r.Use(handlers.CORS(
        handlers.AllowedOrigins([]string{"*"}),
        handlers.AllowedMethods([]string{"GET", "POST", "PUT", "DELETE"}),
    ))
    
    // Middleware de timeout
    r.Use(func(next http.Handler) http.Handler {
        return http.TimeoutHandler(next, 15*time.Second, "Timeout!")
    })
    
    // Servir archivos estáticos
    r.PathPrefix("/static/").Handler(
        http.StripPrefix("/static/", 
            http.FileServer(http.Dir("./static")),
        )
    
    srv := &http.Server{
        Handler:      r,
        Addr:         ":8080",
        ReadTimeout:  10 * time.Second,
        WriteTimeout: 15 * time.Second,
    }
    
    log.Fatal(srv.ListenAndServe())
}
```

#### **Patrón de shutdown elegante:**

```go
func main() {
    srv := &http.Server{ /* ... */ }
    
    go func() {
        if err := srv.ListenAndServe(); err != nil && err != http.ErrServerClosed {
            log.Fatalf("Error en servidor: %v", err)
        }
    }()
    
    // Capturar señales de terminación
    quit := make(chan os.Signal, 1)
    signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)
    <-quit
    
    // Shutdown controlado
    ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
    defer cancel()
    
    if err := srv.Shutdown(ctx); err != nil {
        log.Fatal("Shutdown forzado:", err)
    }
    log.Println("Servidor detenido correctamente")
}
```

---

## Recursos Esenciales

1. [Documentación Oficial Gorilla](https://www.gorillatoolkit.org/)
2. [Repo GitHub](https://github.com/gorilla)
3. [Ejemplos Avanzados](https://github.com/gorilla/mux#examples)
4. [Gorilla WebSocket Chat Demo](https://github.com/gorilla/websocket/tree/master/examples/chat)

"Gorilla no es un framework, es un **estilo de arquitectura web** para Go. Te da las herramientas esenciales sin forzarte en un molde rígido, permitiendo construir sistemas desde microservicios hasta aplicaciones empresariales complejas manteniendo la esencia idiomática de Go." - Peter Bourgon
