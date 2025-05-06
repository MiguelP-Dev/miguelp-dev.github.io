---
layout: default
title: "GoDotEnv"
description: "Gestión de variables de entorno en Go de forma simple y eficiente"
permalink: /libraries/go/godotenv/
category: library
article: true
subcategory: go
icon: 🔐
---

## ¿Qué es GoDotEnv?

GoDotEnv es una implementación Go de la librería original [dotenv](https://github.com/bkeepers/dotenv) de Ruby. Permite separar la configuración del código, siguiendo los principios de las [aplicaciones de doce factores](https://12factor.net/), que recomiendan almacenar la configuración en el entorno.

Al utilizar archivos `.env`, los desarrolladores pueden:
- Mantener información sensible fuera del control de versiones
- Gestionar diferentes configuraciones para entornos distintos (desarrollo, pruebas, producción)
- Compartir configuraciones de forma segura entre miembros del equipo

## Instalación

Para instalar GoDotEnv, ejecuta el siguiente comando en tu terminal:

```bash
go get github.com/joho/godotenv
```

## Creando un archivo .env

Primero, crea un archivo llamado `.env` en la raíz de tu proyecto. Este archivo contendrá pares clave-valor con tus variables de entorno.

Ejemplo de archivo `.env`:

```
# Configuración de la base de datos
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=secretpassword
DB_NAME=myapp

# Configuración de la API
API_KEY=tu_clave_secreta_api
API_TIMEOUT=30

# Puerto de la aplicación
APP_PORT=8080
```

## Cargando variables de entorno

Ahora, vamos a crear un programa Go simple que cargue estas variables de entorno:

```go
package main

import (
    "fmt"
    "log"
    
    "github.com/joho/godotenv"
)

func main() {
    // Cargar el archivo .env
    err := godotenv.Load()
    if err != nil {
        log.Fatalf("Error cargando el archivo .env: %v", err)
    }
    
    fmt.Println("El archivo .env se ha cargado correctamente!")
}
```

En este código, `godotenv.Load()` busca un archivo `.env` en el directorio actual y carga sus variables en el entorno.

## Accediendo a las variables

Una vez cargadas las variables, puedes acceder a ellas utilizando la función `os.Getenv()`:

```go
package main

import (
    "fmt"
    "log"
    "os"
    
    "github.com/joho/godotenv"
)

func main() {
    // Cargar el archivo .env
    err := godotenv.Load()
    if err != nil {
        log.Fatalf("Error cargando el archivo .env: %v", err)
    }
    
    // Acceder a las variables de entorno
    dbHost := os.Getenv("DB_HOST")
    dbPort := os.Getenv("DB_PORT")
    appPort := os.Getenv("APP_PORT")
    
    fmt.Printf("Host de la base de datos: %s\n", dbHost)
    fmt.Printf("Puerto de la base de datos: %s\n", dbPort)
    fmt.Printf("Puerto de la aplicación: %s\n", appPort)
}
```

## Configuración avanzada

### Cargar archivos específicos

Puedes cargar archivos `.env` específicos pasándolos como argumentos a la función `Load()`:

```go
err := godotenv.Load(".env.development")
```

### Cargar múltiples archivos

También puedes cargar múltiples archivos en orden. Las variables del último archivo tienen prioridad:

```go
err := godotenv.Load(".env.shared", ".env.local")
```

### Cargar desde string

Si necesitas cargar variables desde un string en lugar de un archivo:

```go
envString := `
DB_HOST=localhost
DB_PORT=5432
`
err := godotenv.Unmarshal(envString)
```

### Obtener todas las variables como un mapa

Si necesitas todas las variables como un mapa:

```go
envMap, err := godotenv.Read(".env")
if err != nil {
    log.Fatalf("Error leyendo el archivo .env: %v", err)
}

for key, value := range envMap {
    fmt.Printf("%s: %s\n", key, value)
}
```

## Mejores prácticas

1. **No incluyas archivos .env en el control de versiones**:
   ```
   # Añade a tu .gitignore
   .env
   .env.local
   ```

2. **Proporciona un archivo .env.example**:
   Crea un archivo `.env.example` con la estructura pero sin valores sensibles para compartir con otros desarrolladores.

3. **Establece variables por defecto**:
   Proporciona valores por defecto cuando sea apropiado.
   ```go
   port := os.Getenv("APP_PORT")
   if port == "" {
       port = "8080" // valor por defecto
   }
   ```

4. **Validación de variables requeridas**:
   Verifica que todas las variables requeridas estén presentes.
   ```go
   requiredEnvs := []string{"DB_HOST", "API_KEY"}
   for _, env := range requiredEnvs {
       if os.Getenv(env) == "" {
           log.Fatalf("Variable de entorno requerida no encontrada: %s", env)
       }
   }
   ```

5. **Carga temprana**:
   Carga las variables de entorno al inicio de tu aplicación.

## Ejemplo completo

Vamos a crear una aplicación completa que demuestre el uso de GoDotEnv:

```go
package main

import (
    "fmt"
    "log"
    "os"
    "strconv"
    
    "github.com/joho/godotenv"
)

// Configuración de la aplicación
type Config struct {
    DBHost     string
    DBPort     int
    DBUser     string
    DBPassword string
    DBName     string
    APIKey     string
    APITimeout int
    AppPort    int
}

// Cargar la configuración desde variables de entorno
func LoadConfig() (*Config, error) {
    // Cargar archivo .env
    err := godotenv.Load()
    if err != nil {
        return nil, fmt.Errorf("error cargando archivo .env: %w", err)
    }
    
    // Convertir puerto DB a entero
    dbPort, err := strconv.Atoi(os.Getenv("DB_PORT"))
    if err != nil {
        dbPort = 5432 // valor por defecto
    }
    
    // Convertir timeout API a entero
    apiTimeout, err := strconv.Atoi(os.Getenv("API_TIMEOUT"))
    if err != nil {
        apiTimeout = 30 // valor por defecto
    }
    
    // Convertir puerto App a entero
    appPort, err := strconv.Atoi(os.Getenv("APP_PORT"))
    if err != nil {
        appPort = 8080 // valor por defecto
    }
    
    return &Config{
        DBHost:     os.Getenv("DB_HOST"),
        DBPort:     dbPort,
        DBUser:     os.Getenv("DB_USER"),
        DBPassword: os.Getenv("DB_PASSWORD"),
        DBName:     os.Getenv("DB_NAME"),
        APIKey:     os.Getenv("API_KEY"),
        APITimeout: apiTimeout,
        AppPort:    appPort,
    }, nil
}

// Verificar variables requeridas
func (c *Config) Validate() error {
    if c.DBHost == "" {
        return fmt.Errorf("variable DB_HOST no definida")
    }
    if c.DBUser == "" {
        return fmt.Errorf("variable DB_USER no definida")
    }
    if c.APIKey == "" {
        return fmt.Errorf("variable API_KEY no definida")
    }
    return nil
}

func main() {
    config, err := LoadConfig()
    if err != nil {
        log.Fatal(err)
    }
    
    // Validar configuración
    if err := config.Validate(); err != nil {
        log.Fatal(err)
    }
    
    // Mostrar configuración cargada
    fmt.Println("Configuración cargada correctamente:")
    fmt.Printf("DB Host: %s\n", config.DBHost)
    fmt.Printf("DB Port: %d\n", config.DBPort)
    fmt.Printf("DB User: %s\n", config.DBUser)
    fmt.Printf("DB Name: %s\n", config.DBName)
    fmt.Printf("API Timeout: %d segundos\n", config.APITimeout)
    fmt.Printf("App Port: %d\n", config.AppPort)
    
    // Iniciar aplicación...
    fmt.Printf("Iniciando aplicación en el puerto %d...\n", config.AppPort)
}
```

Para ejecutar este ejemplo, asegúrate de tener un archivo `.env` en el mismo directorio con las variables mencionadas.

## Resolución de problemas comunes

### El archivo .env no se carga

* Verifica que el archivo `.env` esté en el directorio correcto. Por defecto, godotenv busca en el directorio de trabajo actual.
* Asegúrate de que el archivo tenga los permisos adecuados.

### Variable no encontrada

* Revisa que la variable esté correctamente definida en el archivo `.env` (sin espacios alrededor del `=`).
* Verifica que la carga del archivo haya sido exitosa (comprueba el error devuelto por `godotenv.Load()`).
* Asegúrate de que estés usando el mismo nombre de variable (las variables de entorno son sensibles a mayúsculas y minúsculas).

### Valor incorrecto cargado

* Las variables de entorno son siempre strings. Asegúrate de convertirlas al tipo adecuado antes de usarlas.
* Verifica que no haya comillas innecesarias en el archivo `.env`.

### Variables duplicadas

* Recuerda que si cargas múltiples archivos, las variables del último archivo sobrescribirán las anteriores.
* Las variables de entorno ya definidas en el sistema no serán sobrescritas por godotenv a menos que uses `godotenv.Overload()`.

---

Con este tutorial, ahora deberías tener una buena comprensión de cómo usar GoDotEnv en tus proyectos Go. Esta biblioteca te ayudará a gestionar de forma más eficiente la configuración de tus aplicaciones y a mantener tus credenciales seguras.
