---
layout: default
title: "Gorilla Toolkit - Módulos Avanzados"
description: "Domina todos los componentes del ecosistema Gorilla para desarrollo web en Go"
permalink: /lessons/go/gorilla-toolkit-advanced/
category: lessons
subcategory: "Toolkits and frameworks"
icon: 🛠️
article: true
---

## Explorando los Módulos Menos Conocidos de Gorilla

Si ya dominas `mux`, `sessions` y `websocket`, es hora de descubrir las joyas ocultas del toolkit Gorilla. Estos módulos resuelven problemas específicos con elegancia y eficiencia.

### Módulo: gorilla/handlers

**Propósito**: Middlewares profesionales para producción  
**Caso de uso**: Logging, compresión, CORS, y más

#### **Logging en formato CLF**

```go
import (
    "github.com/gorilla/handlers"
    "os"
)

func main() {
    r := mux.NewRouter()
    
    // Middleware de logging profesional
    loggedRouter := handlers.LoggingHandler(os.Stdout, r)
    
    http.ListenAndServe(":8080", loggedRouter)
}
```

**Explicación paso a paso**:  

1. `LoggingHandler` captura cada solicitud  
2. Escribe en formato CLF (Common Log Format)  
3. `os.Stdout` permite redirigir logs a sistemas como Docker

#### **Compresión GZIP**

```go
compressedRouter := handlers.CompressHandler(r)
```

**Beneficios**:  

- Reduce tamaño de respuestas en un 70%  
- Soporta niveles de compresión configurable  
- Detecta automáticamente contenido comprimible

#### **CORS Completo**

```go
cors := handlers.CORS(
    handlers.AllowedOrigins([]string{"*"}),
    handlers.AllowedMethods([]string{"GET", "POST", "PUT", "DELETE"}),
    handlers.AllowedHeaders([]string{"Content-Type", "Authorization"}),
    handlers.MaxAge(3600),
)
r.Use(cors)
```

### Módulo: gorilla/csrf

**Propósito**: Protección contra Cross-Site Request Forgery  
**Por qué es único**: Integración perfecta con formularios y APIs

#### **Configuración básica**

```go
import "github.com/gorilla/csrf"

func main() {
    CSRF := csrf.Protect(
        []byte("clave-secreta-de-32-bytes"),
        csrf.Secure(false), // Solo para desarrollo!
        csrf.Path("/"),
    )
    
    http.ListenAndServe(":8080", CSRF(r))
}
```

{% raw %}

#### **Uso con templates HTML**

```html
<!-- En tu formulario -->
<input type="hidden" name="{{.csrfField}}" value="{{.csrfToken}}">

<!-- En tu handler Go -->
func FormHandler(w http.ResponseWriter, r *http.Request) {
    t.Execute(w, map[string]interface{}{
        csrf.TemplateTag: csrf.TemplateField(r),
    })
}
```

{% endraw %}

#### **Uso con APIs REST**

```go
func APICreate(w http.ResponseWriter, r *http.Request) {
    // Verificar token manualmente
    token := r.Header.Get("X-CSRF-Token")
    if !csrf.VerifyToken(csrfKey, token, "") {
        http.Error(w, "Token CSRF inválido", 403)
        return
    }
    // Lógica del endpoint
}
```

### Módulo: gorilla/rpc

**Propósito**: Implementar servicios RPC (JSON-RPC y XML-RPC)  
**Caso ideal**: Comunicación entre microservicios

#### **Servidor JSON-RPC**

```go
import (
    "github.com/gorilla/rpc"
    "github.com/gorilla/rpc/json"
)

type MathService struct{}

func (m *MathService) Multiply(r *http.Request, args *struct{A, B int}, reply *int) error {
    *reply = args.A * args.B
    return nil
}

func main() {
    s := rpc.NewServer()
    s.RegisterCodec(json.NewCodec(), "application/json")
    s.RegisterService(new(MathService), "")
    
    r := mux.NewRouter()
    r.Handle("/rpc", s)
    http.ListenAndServe(":8080", r)
}
```

#### **Cliente JSON-RPC**

{% raw %}

```go
func callRPC() {
    message := map[string]interface{}{
        "method": "MathService.Multiply",
        "params": []map[string]int{{"A": 5, "B": 3}},
        "id":     1,
    }
    
    bytesMessage, _ := json.Marshal(message)
    resp, _ := http.Post("http://localhost:8080/rpc", "application/json", bytes.NewBuffer(bytesMessage))
    
    var result struct{ Result int }
    json.NewDecoder(resp.Body).Decode(&result)
    fmt.Println("Resultado:", result.Result) // 15
}
```

{% endraw %}

### Módulo: gorilla/schema

**Propósito**: Decodificación de formularios a estructuras  
**Ventaja**: Manejo avanzado de tipos y anidamiento

#### **Uso básico**

```go
import "github.com/gorilla/schema"

type User struct {
    Name    string
    Email   string
    Age     int
    Address struct {
        Street  string
        City    string
    }
}

func FormHandler(w http.ResponseWriter, r *http.Request) {
    if err := r.ParseForm(); err != nil {
        http.Error(w, "Error parsing form", 400)
        return
    }
    
    user := new(User)
    decoder := schema.NewDecoder()
    decoder.IgnoreUnknownKeys(true)
    
    if err := decoder.Decode(user, r.PostForm); err != nil {
        http.Error(w, "Invalid data", 400)
        return
    }
    
    fmt.Printf("Usuario registrado: %+v", user)
}
```

#### **Características avanzadas**

```go
// Custom type decoding
func (a *Address) UnmarshalText(text []byte) error {
    parts := strings.Split(string(text), "|")
    a.Street = parts[0]
    a.City = parts[1]
    return nil
}

// Configuración global
var decoder = schema.NewDecoder()
decoder.RegisterConverter(time.Time{}, func(s string) reflect.Value {
    t, _ := time.Parse("2006-01-02", s)
    return reflect.ValueOf(t)
})
```

### Módulo: gorilla/feeds

**Propósito**: Generación de feeds RSS y Atom  
**Perfecto para**: Blogs, podcasts, contenido dinámico

#### **Crear feed RSS**

```go
import "github.com/gorilla/feeds"

func GenerateFeed() *feeds.Feed {
    now := time.Now()
    return &feeds.Feed{
        Title:       "Mi Blog",
        Link:        &feeds.Link{Href: "https://ejemplo.com"},
        Description: "Últimos artículos sobre Go",
        Author:      &feeds.Author{Name: "Autor", Email: "autor@ejemplo.com"},
        Created:     now,
        Items: []*feeds.Item{
            {
                Title:       "Aprendiendo Gorilla Toolkit",
                Link:        &feeds.Link{Href: "https://ejemplo.com/gorilla"},
                Description: "Guía completa de Gorilla",
                Author:      &feeds.Author{Name: "Experto Go"},
                Created:     now.Add(-24 * time.Hour),
            },
        },
    }
}

func RSSHandler(w http.ResponseWriter, r *http.Request) {
    feed := GenerateFeed()
    rss, _ := feed.ToRss()
    w.Header().Set("Content-Type", "application/rss+xml")
    w.Write([]byte(rss))
}
```

### Módulo: gorilla/securecookie

**Propósito**: Cookies firmadas y encriptadas  
**Por qué usarlo**: Más seguro que las cookies estándar

#### **Implementación avanzada**

```go
import "github.com/gorilla/securecookie"

var s = securecookie.New(
    securecookie.GenerateRandomKey(64),
    securecookie.GenerateRandomKey(32),
)

func SetSecureCookie(w http.ResponseWriter, name string, value map[string]string) {
    if encoded, err := s.Encode(name, value); err == nil {
        cookie := &http.Cookie{
            Name:     name,
            Value:    encoded,
            Path:     "/",
            Secure:   true,
            HttpOnly: true,
            SameSite: http.SameSiteStrictMode,
        }
        http.SetCookie(w, cookie)
    }
}

func ReadSecureCookie(r *http.Request, name string) (map[string]string, error) {
    if cookie, err := r.Cookie(name); err == nil {
        value := make(map[string]string)
        if err = s.Decode(name, cookie.Value, &value); err == nil {
            return value, nil
        }
    }
    return nil, errors.New("cookie inválida")
}
```

### Módulo: gorilla/mux/extra

**Propósito**: Funcionalidades experimentales  
**Advertencia**: ¡Pueden cambiar en futuras versiones!

#### **QueryMatchers para APIs complejas**

```go
r := mux.NewRouter()
r.Use(extra.QueryMatcher(
    "version", // Nombre del parámetro
    "v1",      // Valor por defecto
    []string{"v1", "v2", "beta"}, // Valores permitidos
))

r.HandleFunc("/api", func(w http.ResponseWriter, r *http.Request) {
    version := r.URL.Query().Get("version")
    fmt.Fprintf(w, "Usando API versión: %s", version)
})
```

#### **MethodNotAllowedHandler personalizado**

```go
r := mux.NewRouter()
r.MethodNotAllowedHandler = http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
    w.Header().Set("Allow", "GET, POST")
    w.WriteHeader(http.StatusMethodNotAllowed)
    w.Write([]byte("Método no permitido"))
})
```

---

## Patrones de Integración Avanzada

### Combinando Módulos: Sistema Completo

```go
func main() {
    // 1. Configuración básica
    r := mux.NewRouter()
    
    // 2. Middlewares esenciales
    r.Use(handlers.RecoveryHandler())
    r.Use(handlers.CompressHandler)
    r.Use(csrf.Protect(authKey))
    
    // 3. Sistema de sesiones seguro
    store := sessions.NewCookieStore(securecookie.GenerateRandomKey(64))
    store.Options.HttpOnly = true
    store.Options.Secure = true
    
    // 4. RPC para microservicios
    s := rpc.NewServer()
    s.RegisterCodec(json.NewCodec(), "application/json")
    s.RegisterService(new(APIService), "")
    r.PathPrefix("/rpc").Handler(s)
    
    // 5. RSS Feed
    r.HandleFunc("/feed", RSSHandler).Methods("GET")
    
    // 6. Manejo avanzado de formularios
    r.HandleFunc("/register", RegisterHandler).Methods("POST")
    
    // 7. Servidor web optimizado
    srv := &http.Server{
        Handler:      handlers.CORS()(r),
        ReadTimeout:  10 * time.Second,
        WriteTimeout: 30 * time.Second,
        IdleTimeout:  120 * time.Second,
    }
    
    // 8. Shutdown elegante
    go func() {
        if err := srv.ListenAndServe(); err != nil {
            log.Println("Servidor detenido:", err)
        }
    }()
    
    // Capturar SIGINT para shutdown
    quit := make(chan os.Signal, 1)
    signal.Notify(quit, os.Interrupt)
    <-quit
    ctx, cancel := context.WithTimeout(context.Background(), 15*time.Second)
    defer cancel()
    srv.Shutdown(ctx)
}
```

### Rendimiento en Producción: Consejos Clave

1. **Pool de conexiones para websockets**:

   ```go
   var upgrader = websocket.Upgrader{
       ReadBufferSize:  1024,
       WriteBufferSize: 1024,
   }
   ```

2. **Cache de decoders para schema**:

   ```go
   var decoder = schema.NewDecoder()
   decoder.SetAliasTag("form") // Cambiar tag por defecto
   decoder.Cache = &sync.Map{} // Cache para mejor rendimiento
   ```

3. **Rotación de claves para securecookie**:

   ```go
   var s = securecookie.NewMulti(
       securecookie.New(oldKey, nil),
       securecookie.New(currentKey, nil),
   )
   ```

4. **Compresión selectiva**:

   ```go
   compressRouter := handlers.CompressHandlerLevel(
       r, 
       gzip.DefaultCompression,
       handlers.CompressContentTypeFilter([]string{
           "text/html", 
           "application/json",
           "application/xml",
       }),
   )
   ```

---

## Recursos Especializados

1. **gorilla/handlers**  
   [Documentación oficial](https://pkg.go.dev/github.com/gorilla/handlers)  
   Ejemplos avanzados de middlewares

2. **gorilla/csrf**  
   [Guía de implementación segura](https://www.gorillatoolkit.org/pkg/csrf)  
   Prácticas recomendadas para SPAs

3. **gorilla/rpc**  
   [Especificación JSON-RPC 2.0](https://www.jsonrpc.org/specification)  
   Ejemplos de llamadas batch

4. **gorilla/schema**  
   [Conversores personalizados](https://github.com/gorilla/schema#custom-converters)  
   Manejo de tipos complejos

5. **gorilla/feeds**  
   [Generador de podcasts](https://github.com/gorilla/feeds#podcast-rss-feeds)  
   Soporte para iTunes extensions

"Gorilla no es solo `mux` y `websocket`. Su verdadero poder está en los módulos especializados que resuelven problemas específicos con soluciones elegantemente diseñadas. Dominar todo el ecosistema te convierte en un ingeniero Go completo." - William Kennedy
