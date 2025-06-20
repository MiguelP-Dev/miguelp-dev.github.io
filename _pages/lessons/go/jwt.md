---
layout: default
title: "JSON Web Token con Go"
description: "Aprende los conceptos básicos de JWT y su implementación práctica en Golang."
permalink: /lessons/go/jwt/
category: lessons
subcategory: "authentication and authorization"
icon: 🔗
article: true
---

## JSON Web Token (JWT) con Go

¿Estás construyendo una API en Go y necesitas proteger tus rutas? JWT es la solución perfecta para autenticación. Vamos a explorar cómo implementarlo paso a paso, explicando cada concepto para que entiendas perfectamente lo que estás haciendo.

## ¿Qué es JWT y por qué usarlo?

Imagina que JWT es como un **pase de acceso temporal** para un evento. Cuando un usuario inicia sesión correctamente, tu servidor le entrega este "pase" (token). En cada solicitud posterior, el usuario muestra este pase para acceder a rutas protegidas.

**Ventajas clave:**
- ✅ Sin estado: El servidor no necesita almacenar sesiones
- ✅ Seguro: Firmado digitalmente para prevenir alteraciones
- ✅ Portable: Contiene toda la información necesaria en el token
- ✅ Flexible: Puede almacenar datos personalizados (roles, permisos)

## Anatomía de un JWT (Explicación Visual)

Un token JWT típico se ve así:
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxMjMsImV4cCI6MTYxNTY3ODkyMH0.2Q3h4xCrC5Y5t6W7Q9yVbBcDdEeFfGgHhIiJjKk
```

Está compuesto por tres partes separadas por puntos:

### 1. Header (Encabezado)
```json
{
  "alg": "HS256",  // Algoritmo de firma (HMAC-SHA256)
  "typ": "JWT"     // Tipo de token
}
```

### 2. Payload (Datos)
```json
{
  "user_id": 123,         // Datos personalizados
  "exp": 1615678920,      // Tiempo de expiración (timestamp)
  "role": "admin"         // Rol del usuario (personalizable)
}
```

### 3. Signature (Firma)
```
HMACSHA256(
  base64UrlEncode(header) + "." + base64UrlEncode(payload),
  clave_secreta
)
```

**Importante:** Aunque los datos parecen legibles, están codificados en Base64URL. ¡Nunca almacenes información sensible como contraseñas!

## Flujo completo de autenticación

```mermaid
sequenceDiagram
    participant Cliente
    participant Servidor

    Cliente->>Servidor: POST /login (credenciales)
    Servidor->>Servidor: Verifica usuario/contraseña
    Servidor->>Servidor: Genera JWT con datos de usuario
    Servidor-->>Cliente: Devuelve JWT
    
    loop Solicitudes protegidas
        Cliente->>Servidor: GET /protegido (con JWT en Authorization header)
        Servidor->>Servidor: Verifica firma y expiración
        Servidor-->>Cliente: Devuelve datos solicitados
    end
```

## Implementación completa en Go

### 1. Configuración inicial (paquetes necesarios)
```bash
go get github.com/golang-jwt/jwt/v5
```

### 2. Estructura de archivos recomendada
```
mi-proyecto/
├── main.go
├── auth/
│   └── jwt.go       # Lógica de tokens
├── handlers/
│   ├── auth.go      # Login y rutas protegidas
│   └── middleware.go # Middleware de autenticación
└── models/
    └── user.go      # Modelo de usuario
```

### 3. Modelo de usuario (models/user.go)
```go
package models

type User struct {
    ID       uint   `json:"id"`
    Username string `json:"username"`
    Password string `json:"-"`  // El "-" omite la contraseña en JSON
    Role     string `json:"role"`
}

// Simulamos una base de datos en memoria
var Users = []User{
    {ID: 1, Username: "admin", Password: "admin123", Role: "admin"},
    {ID: 2, Username: "user", Password: "user123", Role: "user"},
}

func FindUser(username, password string) *User {
    for _, user := range Users {
        if user.Username == username && user.Password == password {
            return &user
        }
    }
    return nil
}
```

### 4. Gestión de JWT (auth/jwt.go) - Explicación detallada
```go
package auth

import (
    "time"
    "github.com/golang-jwt/jwt/v5"
)

// Clave secreta (¡usa una variable de entorno en producción!)
var secretKey = []byte("clave_super_secreta")

// CustomClaims almacena nuestros datos personalizados
type CustomClaims struct {
    UserID uint   `json:"user_id"`
    Role   string `json:"role"`
    jwt.RegisteredClaims  // Claims estándar (exp, iat, etc)
}

// GenerarToken crea un nuevo JWT para un usuario
func GenerateToken(userID uint, role string) (string, error) {
    // 1. Definir tiempo de expiración (1 hora)
    expiration := time.Now().Add(1 * time.Hour)
    
    // 2. Crear claims (datos del token)
    claims := CustomClaims{
        UserID: userID,
        Role:   role,
        RegisteredClaims: jwt.RegisteredClaims{
            ExpiresAt: jwt.NewNumericDate(expiration),
            IssuedAt:  jwt.NewNumericDate(time.Now()),
            Issuer:    "my-go-app",
        },
    }
    
    // 3. Crear token con algoritmo HS256
    token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
    
    // 4. Firmar token con clave secreta
    return token.SignedString(secretKey)
}

// VerificarToken valida un token y devuelve sus claims
func VerifyToken(tokenString string) (*CustomClaims, error) {
    // 1. Parsear el token
    token, err := jwt.ParseWithClaims(
        tokenString,
        &CustomClaims{},
        func(token *jwt.Token) (interface{}, error) {
            // Verificar algoritmo
            if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
                return nil, jwt.ErrSignatureInvalid
            }
            return secretKey, nil
        },
    )
    
    // 2. Verificar errores
    if err != nil {
        return nil, err
    }
    
    // 3. Extraer y devolver claims
    if claims, ok := token.Claims.(*CustomClaims); ok && token.Valid {
        return claims, nil
    }
    
    return nil, jwt.ErrTokenInvalidClaims
}
```

### 5. Handlers y Middleware (handlers/auth.go)
```go
package handlers

import (
    "encoding/json"
    "net/http"
    
    "tu-proyecto/auth"
    "tu-proyecto/models"
)

// LoginHandler maneja la autenticación
func LoginHandler(w http.ResponseWriter, r *http.Request) {
    // 1. Decodificar credenciales
    var creds struct {
        Username string `json:"username"`
        Password string `json:"password"`
    }
    if err := json.NewDecoder(r.Body).Decode(&creds); err != nil {
        http.Error(w, "Formato inválido", http.StatusBadRequest)
        return
    }
    
    // 2. Buscar usuario
    user := models.FindUser(creds.Username, creds.Password)
    if user == nil {
        http.Error(w, "Credenciales incorrectas", http.StatusUnauthorized)
        return
    }
    
    // 3. Generar token
    token, err := auth.GenerateToken(user.ID, user.Role)
    if err != nil {
        http.Error(w, "Error generando token", http.StatusInternalServerError)
        return
    }
    
    // 4. Devolver token
    w.Header().Set("Content-Type", "application/json")
    json.NewEncoder(w).Encode(map[string]string{"token": token})
}

// AuthMiddleware protege rutas
func AuthMiddleware(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        // 1. Extraer token del header
        authHeader := r.Header.Get("Authorization")
        if len(authHeader) < 8 || authHeader[:7] != "Bearer " {
            http.Error(w, "Token no proporcionado", http.StatusUnauthorized)
            return
        }
        token := authHeader[7:]
        
        // 2. Verificar token
        claims, err := auth.VerifyToken(token)
        if err != nil {
            http.Error(w, "Token inválido: "+err.Error(), http.StatusUnauthorized)
            return
        }
        
        // 3. Añadir datos de usuario al contexto (disponible en handlers)
        ctx := context.WithValue(r.Context(), "user_claims", claims)
        next.ServeHTTP(w, r.WithContext(ctx))
    })
}

// ProtectedHandler ejemplo de ruta protegida
func ProtectedHandler(w http.ResponseWriter, r *http.Request) {
    // Obtener claims del contexto
    claims, ok := r.Context().Value("user_claims").(*auth.CustomClaims)
    if !ok {
        http.Error(w, "Error obteniendo datos de usuario", http.StatusInternalServerError)
        return
    }
    
    w.Header().Set("Content-Type", "application/json")
    json.NewEncoder(w).Encode(map[string]interface{}{
        "message": "¡Acceso concedido!",
        "user_id": claims.UserID,
        "role":    claims.Role,
    })
}
```

### 6. Archivo principal (main.go) con rutas
```go
package main

import (
    "log"
    "net/http"
    
    "tu-proyecto/handlers"
    "github.com/gorilla/mux"
)

func main() {
    r := mux.NewRouter()
    
    // Rutas públicas
    r.HandleFunc("/login", handlers.LoginHandler).Methods("POST")
    
    // Rutas protegidas
    protected := r.PathPrefix("/api").Subrouter()
    protected.Use(handlers.AuthMiddleware)
    protected.HandleFunc("/protegido", handlers.ProtectedHandler)
    
    log.Println("Servidor iniciado en :8080")
    log.Fatal(http.ListenAndServe(":8080", r))
}
```

## Probando nuestra implementación

### 1. Iniciar el servidor
```bash
go run main.go
```

### 2. Obtener token (Login)
```bash
curl -X POST http://localhost:8080/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}'
```

**Respuesta esperada:**
```json
{"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."}
```

### 3. Acceder a ruta protegida
```bash
curl -X GET http://localhost:8080/api/protegido \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

**Respuesta esperada:**
```json
{
  "message": "¡Acceso concedido!",
  "user_id": 1,
  "role": "admin"
}
```

## Mejores prácticas de seguridad

### 1. Manejo de secretos
```go
// En producción usa variables de entorno
secretKey = []byte(os.Getenv("JWT_SECRET_KEY"))
```

### 2. Configuración segura
```go
// Al crear el token
claims := CustomClaims{
    // ...
    RegisteredClaims: jwt.RegisteredClaims{
        ExpiresAt: jwt.NewNumericDate(time.Now().Add(15 * time.Minute)), // Token de acceso corto
        // ...
    },
}
```

### 3. Protección contra ataques
- Usa siempre HTTPS
- Implementa protección contra CSRF
- Considera almacenar tokens en cookies HttpOnly
- Usa refresh tokens para renovación automática

## Errores comunes y solución

### "signature is invalid"
- Verifica que usas la misma clave para firmar y verificar
- Asegúrate que no haya espacios en el token

### "token is expired"
- Verifica la hora del servidor
- Implementa un sistema de refresh tokens

### "claims invalid"
- Revisa la estructura de tus CustomClaims
- Verifica los tipos de datos (ej: UserID debe ser uint)

## ¿Qué sigue? Mejoras recomendadas

1. **Refresh Tokens**: Implementa tokens de larga duración para renovación automática
2. **Revocación**: Añade sistema para invalidar tokens antes de expiración
3. **Blacklist**: Almacena tokens inválidos después de logout
4. **Encriptación**: Usa JWE para datos sensibles
5. **OAuth 2.0**: Implementa flujos de autorización avanzados

## Recursos adicionales

- [JWT Debugger](https://jwt.io/) - Herramienta para inspeccionar tokens
- [RFC 7519](https://tools.ietf.org/html/rfc7519) - Estándar oficial JWT
- [OWASP JWT Cheatsheet](https://cheatsheetseries.owasp.org/cheatsheets/JSON_Web_Token_Cheat_Sheet.html) - Guía de seguridad

Con esta implementación tienes una base sólida para sistemas de autenticación en Go. Recuerda siempre adaptar las medidas de seguridad según los requerimientos de tu aplicación.
