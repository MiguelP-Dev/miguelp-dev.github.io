---
layout: default
title: "JSON Web Token con Go"
description: "Aprende los conceptos básicos de JWT y su implementación práctica en Golang."
permalink: /lessons/jwtgo/
category: lessons
subcategory: go
icon: 🔗
article: true
---

## 1. ¿Qué es JSON Web Token (JWT)?

Un JSON Web Token (JWT) es un estándar abierto (RFC 7519) que define una forma compacta y autónoma para transmitir información de forma segura entre partes como un objeto JSON. Esta información puede ser verificada y confiable porque está firmada digitalmente.

Los JWT son útiles especialmente para:

- **Autenticación**: El caso de uso más común es para manejar la autenticación de usuarios.
- **Intercambio de información**: Transmitir datos de manera segura entre partes.

## 2. Estructura de un JWT

Un JWT consta de tres partes separadas por puntos:

```plaintext
xxxxx.yyyyy.zzzzz
```

Estas partes son:

1. **Header (Cabecera)**: Contiene el tipo de token y el algoritmo de firma utilizado.
2. **Payload (Carga útil)**: Contiene las afirmaciones o claims. Estos son datos sobre una entidad (como el usuario) y datos adicionales.
3. **Signature (Firma)**: Es usado para verificar que el mensaje no ha sido alterado durante la transmisión.

## 3. ¿Cómo funciona JWT?

El proceso general funciona así:

1. El usuario se autentica con sus credenciales (usuario/contraseña).
2. El servidor verifica las credenciales y genera un JWT.
3. El servidor envía el JWT al cliente.
4. En solicitudes posteriores, el cliente incluye el JWT (generalmente en el encabezado Authorization).
5. El servidor verifica la firma del JWT y procesa la solicitud si es válido.

## 4. Ventajas de JWT

- **Independencia**: Son completamente autónomos, toda la información necesaria está contenida en el token.
- **Facilidad de transmisión**: Pueden ser enviados a través de URL, POST, o en encabezados HTTP.
- **Seguridad**: Están firmados digitalmente, lo que garantiza que no han sido alterados.
- **Escalabilidad**: Reducen la necesidad de consultar la base de datos para verificar la autenticidad del usuario.

## 5. Implementación de JWT en Golang

Vamos a implementar JWT en Golang paso a paso. Primero, necesitamos instalar las dependencias necesarias.

```bash
# Crear un nuevo módulo
mkdir jwt-tutorial
cd jwt-tutorial
go mod init github.com/yourusername/jwt-tutorial

# Instalar las dependencias necesarias
go get -u github.com/golang-jwt/jwt/v5
go get -u github.com/gorilla/mux
```

Ahora vamos a crear una aplicación básica con JWT en Golang. Empezaremos con una estructura sencilla.

```plaintext
jwt-tutorial/
├── main.go          # Punto de entrada principal
├── auth/
│   └── jwt.go       # Funciones para manejar JWT
├── handlers/
│   ├── auth.go      # Manejadores para autenticación
│   └── protected.go # Manejadores para rutas protegidas
└── models/
    └── user.go      # Modelo de usuario
```

### 6. Implementación detallada

Ahora, vamos a crear nuestros archivos con el código necesario. Comenzaré con los modelos, luego las funciones de JWT, y finalmente los controladores y el archivo principal.

#### Archivo models/user.go

```go
package models

// User representa la estructura de datos de un usuario en el sistema
type User struct {
    ID       uint   `json:"id"`
    Username string `json:"username"`
    Password string `json:"password,omitempty"` // omitempty evita enviar la contraseña en respuestas JSON
    Role     string `json:"role"`
}

// Para un ejemplo simple, usaremos una lista estática de usuarios
// En una aplicación real, estos datos vendrían de una base de datos
var Users = []User{
    {
        ID:       1,
        Username: "admin",
        Password: "admin123", // En una aplicación real, esto estaría encriptado
        Role:     "admin",
    },
    {
        ID:       2,
        Username: "user",
        Password: "user123", // En una aplicación real, esto estaría encriptado
        Role:     "user",
    },
}

// FindUserByUsername busca un usuario por su nombre de usuario
func FindUserByUsername(username string) *User {
    for _, user := range Users {
        if user.Username == username {
            return &user
        }
    }
    return nil
}
```

#### Archivo auth/jwt.go

```go
package auth

import (
    "errors"
    "time"

    "github.com/golang-jwt/jwt/v5"
    "github.com/yourusername/jwt-tutorial/models"
)

// Clave secreta para firmar los tokens
// En una aplicación real, esta clave debería estar en variables de entorno
// y ser mucho más segura (larga y aleatoria)
var jwtKey = []byte("mi_clave_super_secreta_y_segura")

// Claims define la estructura de los datos que se almacenarán en el token
type Claims struct {
    UserID   uint   `json:"user_id"`
    Username string `json:"username"`
    Role     string `json:"role"`
    jwt.RegisteredClaims
}

// GenerateToken crea un nuevo token JWT para un usuario
func GenerateToken(user *models.User) (string, error) {
    // Definir el tiempo de expiración del token (15 minutos en este ejemplo)
    expirationTime := time.Now().Add(15 * time.Minute)
        
    // Crear los claims (reclamaciones/datos) que irán en el token
    claims := &Claims{
        UserID:   user.ID,
        Username: user.Username,
        Role:     user.Role,
        RegisteredClaims: jwt.RegisteredClaims{
            // En JWT, el tiempo de expiración se guarda en el claim "exp"
            ExpiresAt: jwt.NewNumericDate(expirationTime),
            // El tiempo en que fue emitido el token
            IssuedAt:  jwt.NewNumericDate(time.Now()),
            // Quien emitió el token
            Issuer:    "jwt-tutorial",
        },
    }
        
    // Crear un nuevo token con el algoritmo de firma HS256 y los claims
    token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
        
    // Firmar el token con nuestra clave secreta
    tokenString, err := token.SignedString(jwtKey)
    if err != nil {
        return "", err
    }
        
    return tokenString, nil
}

// ValidateToken verifica si un token es válido y devuelve los claims si lo es
func ValidateToken(tokenString string) (*Claims, error) {
    // Inicializar un puntero para almacenar los claims
    claims := &Claims{}
        
    // Parsear el token JWT
    token, err := jwt.ParseWithClaims(
        tokenString, 
        claims, 
        func(token *jwt.Token) (interface{}, error) {
            // Verificar que el método de firma sea el esperado
            if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
                return nil, errors.New("método de firma inesperado")
            }
            return jwtKey, nil
        },
    )
        
    // Manejar errores de parseo
    if err != nil {
        return nil, err
    }
        
    // Verificar si el token es válido
    if !token.Valid {
        return nil, errors.New("token inválido")
    }
        
    return claims, nil
}
```

#### Archivo handlers/auth.go

```go
package handlers

import (
    "encoding/json"
    "net/http"

    "github.com/yourusername/jwt-tutorial/auth"
    "github.com/yourusername/jwt-tutorial/models"
)

// Estructura para recibir las credenciales del usuario
type Credentials struct {
    Username string `json:"username"`
    Password string `json:"password"`
}

// LoginHandler maneja la autenticación de usuarios y genera un token JWT
func LoginHandler(w http.ResponseWriter, r *http.Request) {
    // Configurar cabeceras para JSON
    w.Header().Set("Content-Type", "application/json")
        
    // Decodificar las credenciales enviadas en el cuerpo de la petición
    var creds Credentials
    err := json.NewDecoder(r.Body).Decode(&creds)
    if err != nil {
        // Si hay un error al decodificar las credenciales
        w.WriteHeader(http.StatusBadRequest)
        json.NewEncoder(w).Encode(map[string]string{
            "error": "Credenciales inválidas",
        })
        return
    }
        
    // Buscar el usuario por nombre de usuario
    user := models.FindUserByUsername(creds.Username)
        
    // Verificar si el usuario existe y la contraseña es correcta
    // En una aplicación real, la contraseña estaría hasheada
    if user == nil || user.Password != creds.Password {
        w.WriteHeader(http.StatusUnauthorized)
        json.NewEncoder(w).Encode(map[string]string{
            "error": "Usuario o contraseña incorrectos",
        })
        return
    }
        
    // Generar el token JWT
    tokenString, err := auth.GenerateToken(user)
    if err != nil {
        w.WriteHeader(http.StatusInternalServerError)
        json.NewEncoder(w).Encode(map[string]string{
            "error": "Error al generar el token",
        })
        return
    }
        
    // Devolver el token JWT generado
    json.NewEncoder(w).Encode(map[string]string{
        "token": tokenString,
    })
}
```

#### Archivo handlers/protected.go

```go
package handlers

import (
    "encoding/json"
    "net/http"
    "strings"

    "github.com/yourusername/jwt-tutorial/auth"
)

// Middleware para verificar la autenticación mediante JWT
func JWTMiddleware(next http.HandlerFunc) http.HandlerFunc {
    return func(w http.ResponseWriter, r *http.Request) {
        // Configurar cabeceras para JSON
        w.Header().Set("Content-Type", "application/json")
        
        // Obtener el token del encabezado Authorization
        authHeader := r.Header.Get("Authorization")
        if authHeader == "" {
            w.WriteHeader(http.StatusUnauthorized)
            json.NewEncoder(w).Encode(map[string]string{
                "error": "Token no proporcionado",
            })
            return
        }
        
        // El token suele venir en formato "Bearer {token}"
        // así que dividimos la cadena para obtener solo el token
        tokenParts := strings.Split(authHeader, " ")
        if len(tokenParts) != 2 || tokenParts[0] != "Bearer" {
            w.WriteHeader(http.StatusUnauthorized)
            json.NewEncoder(w).Encode(map[string]string{
                "error": "Formato de token inválido",
            })
            return
        }
        
        // Validar el token
        claims, err := auth.ValidateToken(tokenParts[1])
        if err != nil {
            w.WriteHeader(http.StatusUnauthorized)
            json.NewEncoder(w).Encode(map[string]string{
                "error": "Token inválido: " + err.Error(),
            })
            return
        }
        
        // Almacenar los claims en el contexto de la petición para uso posterior
        // En una aplicación real, usaríamos el contexto de Go para esto
        // Por simplificidad, aquí solo añadimos un header personalizado
        r.Header.Set("X-User-ID", string(claims.UserID))
        r.Header.Set("X-Username", claims.Username)
        r.Header.Set("X-User-Role", claims.Role)
        
        // Continuar con el siguiente handler
        next(w, r)
    }
}

// ProtectedHandler es un ejemplo de endpoint protegido que requiere autenticación
func ProtectedHandler(w http.ResponseWriter, r *http.Request) {
    // Obtener información del usuario del header (en una app real usaríamos el contexto)
    username := r.Header.Get("X-Username")
    role := r.Header.Get("X-User-Role")
        
    // Crear una respuesta personalizada
    response := map[string]string{
        "message": "¡Has accedido a una ruta protegida!",
        "username": username,
        "role": role,
    }
        
    // Devolver la respuesta
    json.NewEncoder(w).Encode(response)
}

// AdminOnlyHandler es un ejemplo de endpoint que requiere rol de administrador
func AdminOnlyHandler(w http.ResponseWriter, r *http.Request) {
    // Obtener el rol del usuario
    role := r.Header.Get("X-User-Role")
        
    // Verificar si el usuario tiene rol de administrador
    if role != "admin" {
        w.WriteHeader(http.StatusForbidden)
        json.NewEncoder(w).Encode(map[string]string{
            "error": "Acceso denegado: se requiere rol de administrador",
        })
        return
    }
        
    // Si tiene rol de administrador, devolver una respuesta
    response := map[string]string{
        "message": "¡Bienvenido, administrador! Tienes acceso a esta ruta restringida.",
    }
        
    json.NewEncoder(w).Encode(response)
}
```

#### Archivo main.go

```go
package main

import (
    "fmt"
    "log"
    "net/http"

    "github.com/gorilla/mux"
    "github.com/yourusername/jwt-tutorial/handlers"
)

func main() {
    // Crear un nuevo router
    r := mux.NewRouter()

    // Rutas de autenticación (públicas)
    r.HandleFunc("/api/login", handlers.LoginHandler).Methods("POST")

    // Rutas protegidas (requieren autenticación)
    r.HandleFunc("/api/protected", handlers.JWTMiddleware(handlers.ProtectedHandler)).Methods("GET")
    r.HandleFunc("/api/admin", handlers.JWTMiddleware(handlers.AdminOnlyHandler)).Methods("GET")

    // Iniciar el servidor
    port := ":8080"
    fmt.Printf("Servidor iniciado en http://localhost%s\n", port)
    log.Fatal(http.ListenAndServe(port, r))
}
```

## 7. Comprendiendo nuestra implementación

Hasta aquí se ha creado una API completa con autenticación JWT en Go, pero vamos a analizar los componentes clave para entender cómo funciona todo.

### La estructura de un token JWT en detalle

Primero, veamos más de cerca la estructura del token JWT que estamos generando:

1. **Header (Cabecera)**:

   ```json
   {
     "alg": "HS256",
     "typ": "JWT"
   }
   ```

   Este encabezado especifica que estamos utilizando el algoritmo HMAC-SHA256 para firmar nuestro token.

2. **Payload (Carga útil)**:

   ```json
   {
     "user_id": 1,
     "username": "admin",
     "role": "admin",
     "exp": 1715288400,
     "iat": 1715287500,
     "iss": "jwt-tutorial"
   }
   ```

   Este payload contiene tanto nuestros datos personalizados (`user_id`, `username`, `role`) como los claims estándar:
   - `exp`: tiempo de expiración
   - `iat`: tiempo de emisión
   - `iss`: emisor del token

3. **Firma**:
   La firma se genera tomando el header codificado, el payload codificado, un secreto y el algoritmo especificado:

   ```plaintext
   HMACSHA256(
     base64UrlEncode(header) + "." + base64UrlEncode(payload),
     secret
   )
   ```

### Flujo de autenticación

El proceso completo que implementamos funciona así:

1. **Login**: El usuario envía sus credenciales a `/api/login`
2. **Verificación**: El servidor verifica las credenciales contra la "base de datos"
3. **Generación del token**: Si las credenciales son correctas, el servidor genera un JWT
4. **Envío del token**: El servidor envía el JWT al cliente
5. **Almacenamiento**: El cliente almacena el JWT (típicamente en localStorage o sessionStorage)
6. **Acceso a rutas protegidas**: Para acceder a rutas protegidas, el cliente incluye el JWT en el encabezado Authorization
7. **Validación**: El middleware JWTMiddleware valida el token antes de permitir el acceso

## 8. Probando nuestra aplicación

```bash
# 1. Iniciar el servidor
go run main.go

# En otra terminal, ejecutar los siguientes comandos:

# 2. Login como usuario normal
curl -X POST http://localhost:8080/api/login \
  -H "Content-Type: application/json" \
  -d '{"username":"user","password":"user123"}'
# Deberías recibir un token JWT

# 3. Acceder a una ruta protegida usando el token
# Reemplaza <TOKEN> con el token recibido en el paso anterior
curl -X GET http://localhost:8080/api/protected \
  -H "Authorization: Bearer <TOKEN>"
# Deberías recibir un mensaje de bienvenida con tu nombre de usuario

# 4. Intentar acceder a una ruta de administrador (debería fallar con un 403)
curl -X GET http://localhost:8080/api/admin \
  -H "Authorization: Bearer <TOKEN>"

# 5. Login como administrador
curl -X POST http://localhost:8080/api/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}'
# Deberías recibir un nuevo token JWT

# 6. Acceder a la ruta de administrador con el token de administrador
# Reemplaza <ADMIN_TOKEN> con el token recibido en el paso anterior
curl -X GET http://localhost:8080/api/admin \
  -H "Authorization: Bearer <ADMIN_TOKEN>"
# Ahora deberías poder acceder sin problemas
```

Para probar nuestra aplicación, necesitamos ejecutarla y hacer algunas solicitudes HTTP. Vamos a utilizar `curl` para esto, pero podrías usar cualquier cliente HTTP como Postman o Insomnia.

## 9. Mejores prácticas de seguridad con JWT

Al implementar JWT en aplicaciones reales, hay algunas mejores prácticas que debes seguir:

### Secretos seguros

En nuestro ejemplo, usamos una clave secreta codificada directamente en el código. Esto no es seguro para un entorno de producción. En su lugar, deberías:

- Utilizar una clave secreta larga y aleatoria (al menos 256 bits)
- Almacenar la clave en variables de entorno o en un sistema de gestión de secretos
- Rotar las claves periódicamente

### Tiempo de expiración adecuado

Los tokens JWT deben tener un tiempo de expiración adecuado:

- Tokens de acceso: Vida corta (15-60 minutos)
- Tokens de refresco: Vida más larga (días o semanas)

Nuestro ejemplo usa un tiempo de expiración de 15 minutos, lo cual es razonable para un token de acceso.

### Manejo de tokens expirados y refresh tokens

En una aplicación real, necesitarás implementar un sistema de refresh tokens para renovar tokens expirados sin obligar al usuario a iniciar sesión nuevamente. Esto implica:

1. Emitir un token de acceso (corta duración) y un token de refresco (larga duración) durante el login
2. Cuando el token de acceso expira, el cliente puede usar el token de refresco para obtener un nuevo token de acceso

### Almacenamiento seguro en el cliente

Es importante almacenar los tokens de manera segura en el cliente:

- **NO** almacenar tokens en localStorage o sessionStorage si contienen información sensible (son vulnerables a ataques XSS)
- Preferiblemente usar cookies HttpOnly para los tokens de acceso
- Si usas cookies, asegúrate de establecer los atributos Secure y SameSite

## 10. Ejercicios prácticos para mejorar la implementación

Para consolidar tu aprendizaje, aquí hay algunos ejercicios que puedes intentar:

1. **Implementar refresh tokens**: Añade un endpoint para renovar tokens expirados usando refresh tokens.
2. **Añadir revocación de tokens**: Implementa una "lista negra" para tokens que han sido revocados.
3. **Mejorar la seguridad de contraseñas**: Utiliza bcrypt o argon2 para hashear las contraseñas.
4. **Implementar diferentes niveles de permisos**: Añade un sistema más granular de permisos en lugar de solo roles.
5. **Configurar CORS**: Configura correctamente CORS para permitir solicitudes desde orígenes específicos.

## 11. Depuración común y solución de problemas

Cuando trabajas con JWT, podrías encontrarte con estos problemas comunes:

### El token es rechazado aunque parece válido

- Verifica que el reloj del servidor esté sincronizado (los tokens JWT son sensibles al tiempo)
- Asegúrate de que estás utilizando la misma clave secreta para firmar y verificar
- Comprueba si el token ha expirado

### El payload contiene caracteres extraños

- Asegúrate de que estás codificando y decodificando correctamente el token
- Recuerda que JWT utiliza Base64Url, no Base64 estándar

### Problemas de CORS al enviar el token

- Configura correctamente los headers CORS en tu servidor para permitir el header Authorization
- Asegúrate de enviar el token en el formato correcto: `Bearer <token>`

## 12. Conclusión

En esta lección has aprendido:

1. Qué es JWT y por qué es útil para autenticación y autorización
2. La estructura detallada de un token JWT
3. Cómo implementar un sistema completo de autenticación con JWT en Golang
4. Mejores prácticas de seguridad para implementaciones en producción
5. Cómo probar y depurar problemas comunes con JWT

JWT es una herramienta poderosa para la autenticación moderna en aplicaciones web y APIs. La implementación que hemos creado, aunque simple, incluye los conceptos fundamentales que necesitarás para crear sistemas de autenticación robustos y seguros en tus propias aplicaciones Golang.

Recuerda siempre priorizar la seguridad al implementar sistemas de autenticación en entornos de producción. La estructura y claridad de nuestra implementación te dan una base sólida para seguir construyendo y mejorando según las necesidades específicas de tus proyectos.
