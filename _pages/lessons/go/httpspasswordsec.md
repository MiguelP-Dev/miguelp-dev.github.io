---
layout: default
title: "HTTPS con Go y JavaScript"
description: "Lección paso a paso sobre HTTPS y protección de contraseñas para principiantes usando Go(Backend) y JavaScript(Frontend)"
permalink: /lessons/go/httpspasswordsec/
category: lessons
article: true
subcategory: "servers & clients HTTP"
icon: 🛡️
---

## Introducción a la Seguridad Web

Imagina que tu aplicación web es una casa. La seguridad web son las cerraduras, alarmas y sistemas de protección que evitan que extraños entren o roben tus cosas. Hoy aprenderemos dos protecciones esenciales:

1. **HTTPS**: El túnel blindado para tus datos
2. **Protección de contraseñas**: Cómo guardar y transportar llaves secretas

---

## 🌐 Parte 1: HTTPS en Go (Fiber) - Explicación Detallada

### ¿Qué es HTTPS?

Es la versión segura de HTTP. Cuando ves 🔒 en tu navegador, significa que la comunicación está encriptada.

**Analogía:**  

- HTTP = Postal abierta (cualquiera puede leerla)
- HTTPS = Carta en cofre con candado (solo destinatario puede abrir)

### Paso 1: Generar Certificados (Práctica)

**Para desarrollo local:**

```bash
# Estos comandos crean llaves digitales (como copias de seguridad de tus llaves de casa)
openssl req -x509 -newkey rsa:4096 -nodes -out cert.pem -keyout key.pem -days 365
```

Explicación línea por línea:

- `openssl`: Herramienta para crear certificados
- `req -x509`: Crea certificado autofirmado
- `-newkey rsa:4096`: Genera llave RSA de 4096 bits (muy segura)
- `-nodes`: Sin contraseña (solo para desarrollo)
- `-out cert.pem`: Archivo de certificado
- `-keyout key.pem`: Archivo de llave privada
- `-days 365`: Válido por 1 año

### Paso 2: Configurar Servidor Básico HTTPS

```go
package main

import (
    "log"
    "github.com/gofiber/fiber/v2"
)

func main() {
    app := fiber.New()

    app.Get("/", func(c *fiber.Ctx) error {
        return c.SendString("¡Mi primera página segura!")
    })

    log.Fatal(app.ListenTLS(":443", "./cert.pem", "./key.pem"))
}
```

**Desglose del código:**

1. `fiber.New()`: Crea nueva aplicación Fiber
2. `app.Get()`: Define ruta principal
3. `app.ListenTLS()`: Inicia servidor HTTPS con:
   - `:443`: Puerto estándar HTTPS
   - `cert.pem` y `key.pem`: Tus archivos de seguridad

### Paso 3: Redirección HTTP → HTTPS (Para Producción)

Cuando alguien intente entrar con `http://`, lo redirigiremos a `https://` automáticamente:

```go
func main() {
    app := fiber.New()

    // Middleware mágico que redirige
    app.Use(func(c *fiber.Ctx) error {
        if !c.Secure() { // Si no es HTTPS
            return c.Redirect("https://"+c.Hostname()+c.OriginalURL(), 301)
        }
        return c.Next()
    })

    // Servidor HTTP separado (puerto 80)
    go func() {
        fiber.New().Listen(":80")
    }()

    // Servidor HTTPS principal (puerto 443)
    log.Fatal(app.ListenTLS(":443", "cert.pem", "key.pem"))
}
```

**¿Por qué dos servidores?**

- El de puerto 80 solo redirige
- El de puerto 443 maneja todo el tráfico seguro

### Paso 4: Configurar HSTS (Protección Extra)

HSTS le dice al navegador: "Siempre usa HTTPS con este sitio"

```go
app.Use(func(c *fiber.Ctx) error {
    c.Set("Strict-Transport-Security", "max-age=31536000; includeSubDomains; preload")
    return c.Next()
})
```

**Partes del header:**

- `max-age=31536000`: Dura 1 año (en segundos)
- `includeSubDomains`: Aplica a todos los subdominios
- `preload`: Para inclusión en listas de navegadores

---

## 🔑 Parte 2: Protección de Contraseñas - Explicación Visual

### Flujo Inseguro (NUNCA hacer esto)

```plaintext
Usuario: "miContraseña123" → HTTP → Base de Datos: "miContraseña123"
```

### Flujo Seguro (Lo que implementaremos)

```plaintext
Usuario: "miContraseña123" 
→ SHA-256 + "pepper" 
→ HTTPS 
→ Argon2 + "sal única" 
→ Base de Datos: "a1b2c3...z9"
```

### Paso 1: Hashing en Cliente (JavaScript)

```javascript
// frontend/src/auth.js
async function hashPassword(password, pepper) {
    // Paso 1: Combinar contraseña con "pepper" (secreto del frontend)
    const combo = password + "PEPPER_FRONTEND_123";
    
    // Paso 2: Convertir a bytes
    const encoder = new TextEncoder();
    const data = encoder.encode(combo);
    
    // Paso 3: Aplicar SHA-256 (función hash criptográfica)
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    
    // Paso 4: Convertir a string hexadecimal
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// Uso:
const hashedPassword = await hashPassword("miContraseña123");
```

**¿Por qué hacer esto?**

- Si alguien intercepta el tráfico, no verá la contraseña real
- El "pepper" añade un secreto adicional conocido solo por tu frontend

### Paso 2: Procesamiento en Backend (Go)

Cuando recibimos el hash del frontend:

```go
// middleware/auth.go
import "golang.org/x/crypto/argon2"

func VerifyPassword(db *gorm.DB) fiber.Handler {
    return func(c *fiber.Ctx) error {
        // 1. Parsear datos
        type LoginRequest struct {
            Email    string `json:"email"`
            Password string `json:"password"` // Este es el hash del frontend
        }
        var req LoginRequest
        c.BodyParser(&req)

        // 2. Buscar usuario
        var user User
        db.Where("email = ?", req.Email).First(&user)

        // 3. Añadir "sal" única del usuario
        saltedInput := req.Password + user.Salt + "PEPPER_BACKEND_456"

        // 4. Comparar con Argon2 (algoritmo profesional)
        if argon2.CompareHashAndPassword(
            []byte(user.Password), 
            []byte(saltedInput),
        ) != nil {
            return c.Status(401).SendString("Credenciales incorrectas")
        }

        // 5. Crear sesión segura (JWT)
        token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
            "userId": user.ID,
            "exp":    time.Now().Add(24 * time.Hour).Unix(),
        })
        tokenString, _ := token.SignedString([]byte(os.Getenv("JWT_SECRET")))

        // 6. Enviar cookie segura
        c.Cookie(&fiber.Cookie{
            Name:     "session",
            Value:    tokenString,
            HTTPOnly: true, // No accesible desde JavaScript
            Secure:   true, // Solo HTTPS
            SameSite: "Lax",
        })

        return c.Next()
    }
}
```

**Explicación de seguridad:**

1. **Sal única**: Cada usuario tiene su propia "sal" (como un condimento único)
2. **Pepper backend**: Secreto adicional conocido solo por el servidor
3. **Argon2**: Algoritmo lento diseñado para resistir ataques de fuerza bruta
4. **JWT**: Token firmado que no se puede modificar
5. **Cookie segura**: Configurada con múltiples protecciones

---

## 🧩 Ejemplo Completo Integrado

### Estructura de Archivos

```plaintext
/proyecto
  /backend
    main.go      # Servidor Fiber
    auth.go      # Lógica de autenticación
  /frontend
    /src
      auth.js    # Funciones de hash
      login.js   # Lógica de login
```

### backend/main.go

```go
package main

import (
    "log"
    "os"
    "github.com/gofiber/fiber/v2"
    "github.com/gofiber/fiber/v2/middleware/logger"
)

func main() {
    app := fiber.New()
    app.Use(logger.New())

    // Middleware de seguridad
    app.Use(func(c *fiber.Ctx) error {
        c.Set("X-Content-Type-Options", "nosniff")
        c.Set("X-Frame-Options", "DENY")
        return c.Next()
    })

    // Rutas
    app.Post("/login", loginHandler) // Ver auth.go
    app.Get("/", func(c *fiber.Ctx) error {
        return c.SendString("Bienvenido al sistema seguro!")
    })

    // HTTPS
    log.Fatal(app.ListenTLS(":443", "cert.pem", "key.pem"))
}
```

### frontend/src/login.js

```javascript
document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    // Paso 1: Hash en cliente
    const hashedPassword = await hashPassword(password);
    
    // Paso 2: Enviar al servidor via HTTPS
    const response = await fetch('https://tusitio.com/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password: hashedPassword })
    });
    
    if (response.ok) {
        // Redirigir a área segura
        window.location.href = '/dashboard';
    } else {
        alert('Error de autenticación');
    }
});
```

---

## 🚨 Errores Comunes de Principiantes

1. **Guardar contraseñas en texto plano**  
   ❌ `INSERT INTO users VALUES ('user1', 'contraseña123')`  
   ✅ Usa siempre hashing: `INSERT INTO users VALUES ('user1', 'a1b2...z9')`

2. **Olvidar el Secure flag en cookies**  
   ❌ `Set-Cookie: session=abc123`  
   ✅ `Set-Cookie: session=abc123; Secure; HttpOnly`

3. **Certificados autofirmados en producción**  
   ❌ Usar `cert.pem` auto-generado en producción  
   ✅ Usar Let's Encrypt o certificado de entidad válida

4. **No validar entradas del usuario**  
   ❌ Aceptar cualquier dato sin verificar  
   ✅ Validar estructura, tipo, longitud, etc.

---

## 📚 Recursos para Aprender Más

1. [Guía OWASP para contraseñas](https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html)
2. [Web Crypto API (MDN)](https://developer.mozilla.org/en-US/docs/Web/API/Web_Crypto_API)
3. [Fiber Middlewares de Seguridad](https://docs.gofiber.io/api/middleware)
4. [Cómo Funciona HTTPS (Video)](https://www.youtube.com/watch?v=33VYnE7Bzpk)

---

## Conclusión

Hoy aprendiste:

1. Cómo crear un túnel seguro (HTTPS) con Go
2. Cómo transformar contraseñas para protegerlas
3. Buenas prácticas esenciales de seguridad web

Nota: La seguridad es un proceso continuo. Seguir aprendiendo y manteniendo nuestros sistemas actualizados es muy importante.

```plaintext
Este documento está diseñado especialmente para principiantes:
- **Analogías claras** (túneles, llaves, cartas)
- **Explicaciones línea por línea** en cada código
- **Errores comunes** para evitar
- **Flujos visuales** de cómo viajan los datos
- **Ejemplos completos** integrados
```
