---
layout: default
title: "GoMock"
description: "Framework de mocking para pruebas unitarias avanzadas en Go"
permalink: /libraries/go/gomock/
category: library
article: true
subcategory: go
icon: 🧩
---

## Introducción a GoMock

GoMock es un framework de mocking para el lenguaje Go, desarrollado y mantenido por Google. Permite crear objetos mock de interfaces para pruebas unitarias, lo que facilita probar el código de manera aislada sin depender de implementaciones reales de componentes externos como bases de datos, APIs o servicios.

### ¿Por qué usar GoMock?

- Proporciona una forma de crear mocks de interfaces de Go
- Permite probar código que depende de interfaces externas
- Verifica que las funciones mock sean llamadas con los parámetros esperados
- Permite programar respuestas específicas para diferentes casos de prueba
- Ayuda a controlar el comportamiento de dependencias durante las pruebas

## Instalación y configuración

### Instalación de GoMock

Para instalar GoMock, necesitas:

1. Instalar la biblioteca GoMock:
```bash
go get github.com/golang/mock/gomock
```

2. Instalar la herramienta mockgen para generar código mock:
```bash
go install github.com/golang/mock/mockgen@latest
```

### Verificación de la instalación

Para verificar que mockgen está instalado correctamente:

```bash
mockgen --version
```

## Conceptos básicos de mocking

Antes de empezar, es importante entender algunos conceptos:

- **Mocking**: Técnica para reemplazar dependencias reales con objetos simulados que imitan su comportamiento.
- **Interfaz**: Define un conjunto de métodos que una clase debe implementar.
- **Mock**: Implementación falsa de una interfaz que registra llamadas y puede programarse para devolver resultados específicos.
- **Stub**: Similar a un mock, pero más simple, solo devuelve valores predefinidos.

## Creando tu primera interfaz y mock

Vamos a crear una interfaz simple para un servicio de base de datos y luego generar un mock para ella.

### 1. Definir la interfaz

Crea un archivo llamado `database.go`:

```go
package database

// UserDatabase representa una interfaz para operaciones de base de datos de usuarios
type UserDatabase interface {
    GetUserByID(id int) (string, error)
    SaveUser(id int, name string) error
    DeleteUser(id int) error
    GetAllUsers() ([]string, error)
}
```

### 2. Generar el mock

Hay dos formas de generar mocks con mockgen:

#### Opción 1: Usando comentarios de origen

Añade un comentario especial al archivo `database.go`:

```go
//go:generate mockgen -source=database.go -destination=mock_database.go -package=database
package database

// UserDatabase representa una interfaz para operaciones de base de datos de usuarios
type UserDatabase interface {
    GetUserByID(id int) (string, error)
    SaveUser(id int, name string) error
    DeleteUser(id int) error
    GetAllUsers() ([]string, error)
}
```

Luego ejecuta:

```bash
go generate ./...
```

#### Opción 2: Usando la línea de comandos directamente

```bash
mockgen -source=database.go -destination=mock_database.go -package=database
```

### 3. Resultado

Esto generará un archivo `mock_database.go` con una implementación mock de la interfaz `UserDatabase`. El archivo contiene código generado automáticamente que incluye una estructura `MockUserDatabase` que implementa la interfaz.

## Usando GoMock en pruebas

Ahora, vamos a crear un servicio de usuario que use la interfaz de base de datos y probaremos ese servicio usando el mock generado.

### 1. Crear el servicio de usuario

Crea un archivo `user_service.go`:

```go
package database

import (
    "errors"
)

// UserService proporciona operaciones relacionadas con usuarios
type UserService struct {
    db UserDatabase
}

// NewUserService crea un nuevo servicio de usuario
func NewUserService(db UserDatabase) *UserService {
    return &UserService{db: db}
}

// GetUserNameByID obtiene el nombre de un usuario por su ID
func (s *UserService) GetUserNameByID(id int) (string, error) {
    if id <= 0 {
        return "", errors.New("ID de usuario inválido")
    }
    
    return s.db.GetUserByID(id)
}

// CreateUser crea un nuevo usuario
func (s *UserService) CreateUser(id int, name string) error {
    if name == "" {
        return errors.New("el nombre no puede estar vacío")
    }
    
    return s.db.SaveUser(id, name)
}
```

### 2. Escribir pruebas usando el mock

Crea un archivo `user_service_test.go`:

```go
package database

import (
    "errors"
    "testing"

    "github.com/golang/mock/gomock"
)

func TestGetUserNameByID(t *testing.T) {
    // Crear un controlador de mock
    ctrl := gomock.NewController(t)
    defer ctrl.Finish() // Asegura que se cumplan las expectativas al final
    
    // Crear el mock de UserDatabase
    mockDB := NewMockUserDatabase(ctrl)
    
    // Establecer expectativas
    mockDB.EXPECT().
        GetUserByID(1).
        Return("Alice", nil)
    
    // Crear el servicio con el mock
    userService := NewUserService(mockDB)
    
    // Llamar al método y verificar el resultado
    name, err := userService.GetUserNameByID(1)
    
    if err != nil {
        t.Fatalf("Error inesperado: %v", err)
    }
    
    if name != "Alice" {
        t.Errorf("Nombre esperado 'Alice', obtenido '%s'", name)
    }
}

func TestGetUserNameByID_InvalidID(t *testing.T) {
    // Crear un controlador de mock
    ctrl := gomock.NewController(t)
    defer ctrl.Finish()
    
    // Crear el mock sin expectativas (no debería llamarse a GetUserByID)
    mockDB := NewMockUserDatabase(ctrl)
    
    // Crear el servicio con el mock
    userService := NewUserService(mockDB)
    
    // Llamar al método con ID inválido
    _, err := userService.GetUserNameByID(0)
    
    if err == nil {
        t.Fatal("Se esperaba un error pero no se obtuvo ninguno")
    }
}
```

## Expectativas y comportamientos

GoMock permite definir expectativas sobre cómo se llamarán a los métodos del mock.

### Configuración básica de expectativas

```go
// Espera que GetUserByID sea llamado exactamente una vez con el argumento 1
mockDB.EXPECT().GetUserByID(1).Return("Alice", nil)

// Espera que SaveUser sea llamado exactamente una vez con los argumentos 1 y "Alice"
mockDB.EXPECT().SaveUser(1, "Alice").Return(nil)
```

### Control del número de llamadas

Puedes especificar cuántas veces se espera que se llame a un método:

```go
// Exactamente una vez (por defecto)
mockDB.EXPECT().GetUserByID(1).Return("Alice", nil).Times(1)

// Al menos una vez
mockDB.EXPECT().GetUserByID(1).Return("Alice", nil).MinTimes(1)

// Como máximo una vez
mockDB.EXPECT().GetUserByID(1).Return("Alice", nil).MaxTimes(1)

// Cualquier número de veces (incluido cero)
mockDB.EXPECT().GetUserByID(1).Return("Alice", nil).AnyTimes()
```

## Argumentos matchers

GoMock ofrece "matchers" para proporcionar mayor flexibilidad al definir expectativas para los argumentos.

### Matchers básicos

```go
import (
    "github.com/golang/mock/gomock"
)

// Coincide con cualquier argumento entero
mockDB.EXPECT().GetUserByID(gomock.Any()).Return("Usuario", nil)

// Coincide con un argumento específico
mockDB.EXPECT().GetUserByID(gomock.Eq(1)).Return("Alice", nil)

// Coincide si el argumento es distinto de un valor
mockDB.EXPECT().GetUserByID(gomock.Not(0)).Return("Usuario", nil)

// Coincide si el argumento es nil
mockDB.EXPECT().SomeMethod(gomock.Nil()).Return(true)
```

### Matchers personalizados

```go
// Coincide con números positivos
positiveID := gomock.NewMatcher(func(x interface{}) bool {
    id, ok := x.(int)
    return ok && id > 0
})

mockDB.EXPECT().GetUserByID(positiveID).Return("Usuario", nil)
```

## Retornando valores

GoMock permite especificar los valores que debe devolver un método mock.

### Valores de retorno estáticos

```go
// Devolver un nombre y ningún error
mockDB.EXPECT().GetUserByID(1).Return("Alice", nil)

// Devolver un error
mockDB.EXPECT().GetUserByID(404).Return("", errors.New("usuario no encontrado"))
```

### Valores de retorno dinámicos

```go
// Usar una función para calcular valores de retorno dinámicamente
mockDB.EXPECT().GetUserByID(gomock.Any()).DoAndReturn(
    func(id int) (string, error) {
        if id == 1 {
            return "Alice", nil
        } else if id == 2 {
            return "Bob", nil
        }
        return "", errors.New("usuario no encontrado")
    })
```

## Manejando llamadas en secuencia

GoMock permite definir el orden de las llamadas a los métodos.

### Orden simple con After

```go
getUserCall := mockDB.EXPECT().GetUserByID(1).Return("Alice", nil)
mockDB.EXPECT().SaveUser(1, "Alice Smith").Return(nil).After(getUserCall)
```

### Secuencia inOrderHandler

```go
// Crea un objeto de orden
order := gomock.InOrder(
    mockDB.EXPECT().GetUserByID(1).Return("Alice", nil),
    mockDB.EXPECT().SaveUser(1, "Alice Smith").Return(nil),
    mockDB.EXPECT().GetAllUsers().Return([]string{"Alice Smith", "Bob"}, nil)
)
```

## Técnicas avanzadas

### Acciones con Do y DoAndReturn

```go
// Ejecutar código cuando se llama al método
mockDB.EXPECT().SaveUser(1, "Alice").Do(func(id int, name string) {
    fmt.Printf("Guardando usuario: %d, %s\n", id, name)
}).Return(nil)

// Ejecutar código y devolver valores calculados dinámicamente
mockDB.EXPECT().GetUserByID(gomock.Any()).DoAndReturn(func(id int) (string, error) {
    names := map[int]string{1: "Alice", 2: "Bob"}
    if name, ok := names[id]; ok {
        return name, nil
    }
    return "", errors.New("usuario no encontrado")
})
```

### Verificación de fallos

```go
// Fallo inmediato si no se cumplen las expectativas
ctrl := gomock.NewController(t)
defer ctrl.Finish() // Verificará todas las expectativas
```

## Ejemplo completo

Ahora, vamos a crear un ejemplo completo con una aplicación más realista.

### Estructura del proyecto

```
└── userapp/
    ├── user/
    │   ├── database.go         # Interfaces
    │   ├── mock_database.go    # Generado por mockgen
    │   ├── user_service.go     # Implementación del servicio
    │   └── user_service_test.go # Pruebas
    └── main.go                 # Punto de entrada
```

### database.go

```go
//go:generate mockgen -source=database.go -destination=mock_database.go -package=user
package user

import "time"

// User representa la estructura de datos de un usuario
type User struct {
    ID       int
    Name     string
    Email    string
    Created  time.Time
    Modified time.Time
}

// UserRepository define las operaciones de acceso a datos para usuarios
type UserRepository interface {
    GetByID(id int) (*User, error)
    GetByEmail(email string) (*User, error)
    Save(user *User) error
    Update(user *User) error
    Delete(id int) error
    List() ([]*User, error)
}
```

### user_service.go

```go
package user

import (
    "errors"
    "time"
)

// Service gestiona la lógica de negocio relacionada con usuarios
type Service struct {
    repo UserRepository
}

// NewService crea un nuevo servicio de usuario
func NewService(repo UserRepository) *Service {
    return &Service{repo: repo}
}

// GetUser obtiene un usuario por ID
func (s *Service) GetUser(id int) (*User, error) {
    if id <= 0 {
        return nil, errors.New("ID inválido")
    }
    return s.repo.GetByID(id)
}

// CreateUser crea un nuevo usuario
func (s *Service) CreateUser(name, email string) (*User, error) {
    if name == "" || email == "" {
        return nil, errors.New("nombre y email son obligatorios")
    }
    
    // Verificar si el email ya existe
    existing, _ := s.repo.GetByEmail(email)
    if existing != nil {
        return nil, errors.New("el email ya está registrado")
    }
    
    now := time.Now()
    user := &User{
        Name:     name,
        Email:    email,
        Created:  now,
        Modified: now,
    }
    
    err := s.repo.Save(user)
    if err != nil {
        return nil, err
    }
    
    return user, nil
}

// UpdateUser actualiza un usuario existente
func (s *Service) UpdateUser(id int, name, email string) (*User, error) {
    user, err := s.repo.GetByID(id)
    if err != nil {
        return nil, err
    }
    
    if user == nil {
        return nil, errors.New("usuario no encontrado")
    }
    
    if name != "" {
        user.Name = name
    }
    
    if email != "" && email != user.Email {
        // Verificar si el nuevo email ya existe para otro usuario
        existing, _ := s.repo.GetByEmail(email)
        if existing != nil && existing.ID != id {
            return nil, errors.New("el email ya está registrado para otro usuario")
        }
        user.Email = email
    }
    
    user.Modified = time.Now()
    
    err = s.repo.Update(user)
    if err != nil {
        return nil, err
    }
    
    return user, nil
}

// DeleteUser elimina un usuario
func (s *Service) DeleteUser(id int) error {
    if id <= 0 {
        return errors.New("ID inválido")
    }
    
    user, err := s.repo.GetByID(id)
    if err != nil {
        return err
    }
    
    if user == nil {
        return errors.New("usuario no encontrado")
    }
    
    return s.repo.Delete(id)
}

// ListUsers obtiene todos los usuarios
func (s *Service) ListUsers() ([]*User, error) {
    return s.repo.List()
}
```

### user_service_test.go

```go
package user

import (
    "errors"
    "testing"
    "time"

    "github.com/golang/mock/gomock"
)

func TestGetUser(t *testing.T) {
    // Configurar el controlador
    ctrl := gomock.NewController(t)
    defer ctrl.Finish()
    
    // Crear el mock
    mockRepo := NewMockUserRepository(ctrl)
    
    // Escenario: Obtener usuario exitosamente
    t.Run("Success", func(t *testing.T) {
        // Preparar datos de prueba
        mockUser := &User{
            ID:       1,
            Name:     "Alice",
            Email:    "alice@example.com",
            Created:  time.Now(),
            Modified: time.Now(),
        }
        
        // Configurar expectativas
        mockRepo.EXPECT().GetByID(1).Return(mockUser, nil)
        
        // Crear el servicio e invocar el método
        service := NewService(mockRepo)
        user, err := service.GetUser(1)
        
        // Verificar resultados
        if err != nil {
            t.Fatalf("Error inesperado: %v", err)
        }
        if user == nil {
            t.Fatal("Se esperaba un usuario, se obtuvo nil")
        }
        if user.ID != 1 || user.Name != "Alice" {
            t.Errorf("Usuario incorrecto retornado: %+v", user)
        }
    })
    
    // Escenario: ID inválido
    t.Run("InvalidID", func(t *testing.T) {
        // No configuramos expectativas porque no debería llamarse al repositorio
        
        service := NewService(mockRepo)
        user, err := service.GetUser(0)
        
        if err == nil {
            t.Fatal("Se esperaba un error pero no se obtuvo ninguno")
        }
        if user != nil {
            t.Errorf("No se esperaba un usuario, se obtuvo: %+v", user)
        }
    })
    
    // Escenario: Usuario no encontrado
    t.Run("UserNotFound", func(t *testing.T) {
        mockRepo.EXPECT().GetByID(999).Return(nil, nil)
        
        service := NewService(mockRepo)
        user, err := service.GetUser(999)
        
        if err != nil {
            t.Fatalf("Error inesperado: %v", err)
        }
        if user != nil {
            t.Errorf("No se esperaba un usuario, se obtuvo: %+v", user)
        }
    })
    
    // Escenario: Error de base de datos
    t.Run("DatabaseError", func(t *testing.T) {
        dbError := errors.New("error de conexión")
        mockRepo.EXPECT().GetByID(1).Return(nil, dbError)
        
        service := NewService(mockRepo)
        user, err := service.GetUser(1)
        
        if err != dbError {
            t.Fatalf("Se esperaba error específico de DB, se obtuvo: %v", err)
        }
        if user != nil {
            t.Errorf("No se esperaba un usuario, se obtuvo: %+v", user)
        }
    })
}

func TestCreateUser(t *testing.T) {
    ctrl := gomock.NewController(t)
    defer ctrl.Finish()
    
    mockRepo := NewMockUserRepository(ctrl)
    
    // Escenario: Creación exitosa
    t.Run("Success", func(t *testing.T) {
        mockRepo.EXPECT().GetByEmail("new@example.com").Return(nil, nil)
        mockRepo.EXPECT().
            Save(gomock.Any()).
            DoAndReturn(func(user *User) error {
                // Simular asignación de ID en la base de datos
                user.ID = 42
                return nil
            })
        
        service := NewService(mockRepo)
        user, err := service.CreateUser("New User", "new@example.com")
        
        if err != nil {
            t.Fatalf("Error inesperado: %v", err)
        }
        if user == nil {
            t.Fatal("Se esperaba un usuario, se obtuvo nil")
        }
        if user.ID != 42 || user.Name != "New User" || user.Email != "new@example.com" {
            t.Errorf("Usuario incorrecto: %+v", user)
        }
    })
    
    // Escenario: Email ya existe
    t.Run("EmailExists", func(t *testing.T) {
        existingUser := &User{ID: 5, Email: "existing@example.com"}
        mockRepo.EXPECT().GetByEmail("existing@example.com").Return(existingUser, nil)
        
        service := NewService(mockRepo)
        user, err := service.CreateUser("New User", "existing@example.com")
        
        if err == nil {
            t.Fatal("Se esperaba un error pero no se obtuvo ninguno")
        }
        if user != nil {
            t.Errorf("No se esperaba un usuario, se obtuvo: %+v", user)
        }
    })
}

// Añadir pruebas para UpdateUser, DeleteUser y ListUsers...
```

## Mejores prácticas

1. **Mockear solo las interfaces**, no las implementaciones concretas.

2. **Mantén tus interfaces pequeñas** para facilitar el mocking y las pruebas.

3. **Mockea solo las dependencias externas** como bases de datos, servicios web, etc. No mockees todo.

4. **Prueba casos límite** usando tus mocks para simular condiciones de error.

5. **Usa `ctrl.Finish()`** para verificar que todas las expectativas se cumplieron.

6. **Especifica expectativas precisas** pero no demasiado rígidas que dificulten el mantenimiento.

7. **Usa matchers** para hacer tus pruebas más robustas y menos frágiles.

8. **Organiza tus pruebas** usando subtests (`t.Run`) para diferentes escenarios.

9. **Regenera los mocks** cuando cambien las interfaces.

10. **Evita probar detalles de implementación** y céntrate en probar el comportamiento.

## Resolución de problemas comunes

### "Expectativa no satisfecha" (Expectation not satisfied)

**Problema**: El test falla porque una expectativa no se cumplió.

**Solución**: 
- Verifica que el código bajo prueba realmente llama al método esperado.
- Comprueba que los argumentos coincidan exactamente con tus expectativas.
- Si se espera que el método sea llamado condicionalmente, usa `AnyTimes()` o ajusta la expectativa.

### "Llamada a método inesperada" (Unexpected call)

**Problema**: Se llamó a un método que no estaba configurado en las expectativas.

**Solución**:
- Asegúrate de configurar todas las llamadas que realizará tu código.
- Si no estás seguro de qué métodos se llamarán, configúralos con `AnyTimes()`.

### "Argumentos incorrectos" (Wrong arguments)

**Problema**: El método fue llamado pero con argumentos incorrectos.

**Solución**:
- Revisa los argumentos en tu expectativa y en el código.
- Utiliza matchers (`gomock.Any()`) para argumentos que puedan variar.

### "El mock no hace nada"

**Problema**: El mock está configurado pero no parece funcionar.

**Solución**:
- Asegúrate de que estás usando la instancia del mock en tu código.
- Verifica que `ctrl.Finish()` se llame con `defer`.

### "No puedo mockear esta función"

**Problema**: Intentas mockear una función en lugar de un método de interfaz.

**Solución**:
- GoMock está diseñado para mockear interfaces, no funciones sueltas.
- Considera refactorizar tu código para usar interfaces.

### "Error al generar el mock"

**Problema**: Mockgen falla al generar el código mock.

**Solución**:
- Verifica que la interfaz exista y sea accesible.
- Comprueba que mockgen esté instalado correctamente.
- Revisa los parámetros que estás pasando a mockgen.

---

Con este tutorial, deberías tener una buena comprensión de cómo usar GoMock para escribir pruebas efectivas en Go. La combinación de interfaces claras y mocks bien configurados te permitirá escribir código más mantenible y pruebas más robustas.
