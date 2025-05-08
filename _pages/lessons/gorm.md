---
layout: default
title: "GORM desde cero"
description: "Aprende Gorm para manejar bases de datos de forma eficiente"
permalink: /lessons/gorm/
category: lessons
subcategory: go
icon: 🛠️
article: true
---

# Nivel Básico de Gorm

## **1. Instalación y Configuración Inicial de GORM**  

### **Instalar Gorm**

Primero, necesitas instalar Gorm y el driver de la base de datos que uses (en este caso, usaremos **PostgreSQL**):  

```bash
go get -u gorm.io/gorm
go get -u gorm.io/driver/postgres
```

### **Conexión a la Base de Datos**

Creamos una conexión básica:  

```go
package main

import (
    "log"

    "gorm.io/driver/postgres"
    "gorm.io/gorm"
)

func main() {
    dsn := "host=localhost user=postgres password=postgres dbname=test port=5432 sslmode=disable"
    db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
    if err != nil {
        log.Fatal("Error al conectar a la base de datos:", err)
    }
    log.Println("Conexión exitosa")

    // Migraciones y operaciones aquí...
}
```

## **2. Modelos y CRUD Básico**

### **Definición de un Modelo**

Supongamos que queremos manejar **usuarios**:  

```go
type User struct {
    gorm.Model        // Incluye campos básicos: ID, CreatedAt, UpdatedAt, DeletedAt
    Name      string `gorm:"size:100;not null"`
    Email     string `gorm:"size:100;unique;not null"`
    Age       int    `gorm:"default:18"`
}
```

### **Migración Automática**

Gorm puede crear las tablas automáticamente:  

```go
err = db.AutoMigrate(&User{})
if err != nil {
    log.Fatal("Error en migración:", err)
}
```

### **Operaciones CRUD**  

#### **Create (Insertar)**

```go
user := User{Name: "Juan", Email: "juan@example.com", Age: 25}
result := db.Create(&user) // INSERT INTO users...
if result.Error != nil {
    log.Fatal("Error al crear usuario:", result.Error)
}
log.Println("Usuario creado con ID:", user.ID)
```

#### **Read (Consultar)**

```go
var foundUser User
db.First(&foundUser, 1) // SELECT * FROM users WHERE id = 1
db.First(&foundUser, "email = ?", "juan@example.com") // SELECT ... WHERE email = 'juan@example.com'

var users []User
db.Find(&users) // SELECT * FROM users
```

#### **Update (Actualizar)**

```go
db.Model(&foundUser).Update("Age", 30) // UPDATE users SET age = 30 WHERE id = ...;
```

#### **Delete (Eliminar)**

```go
db.Delete(&foundUser) // DELETE FROM users WHERE id = ...;
```

## **3. Relaciones entre Modelos**

### **Ejemplo: Usuario tiene muchos Artículos**

```go
type Article struct {
    gorm.Model
    Title   string
    Content string
    UserID  uint // Clave foránea
}

// Definir la relación en User
type User struct {
    gorm.Model
    Name     string
    Email    string
    Articles []Article // HasMany
}

// Migrar ambos modelos
db.AutoMigrate(&User{}, &Article{})
```

### **Crear un artículo asociado a un usuario**

```go
user := User{Name: "Ana", Email: "ana@example.com"}
db.Create(&user)

article := Article{Title: "Mi primer post", Content: "Hola mundo", UserID: user.ID}
db.Create(&article)
```

### **Consultar con Preloading (cargar relaciones)**

```go
var userWithArticles User
db.Preload("Articles").First(&userWithArticles, 1)
// Esto carga el usuario y sus artículos en una sola consulta (JOIN implícito)
```

## **4. Consultas Avanzadas**

### **Scopes (reutilizar lógica de consultas)**

```go
func AdultUsers(db *gorm.DB) *gorm.DB {
    return db.Where("age >= ?", 18)
}

var adults []User
db.Scopes(AdultUsers).Find(&adults) // SELECT * FROM users WHERE age >= 18;
```

### **Transacciones**

```go
tx := db.Begin()
if err := tx.Create(&user).Error; err != nil {
    tx.Rollback()
    log.Fatal("Error, se hizo rollback:", err)
}
tx.Commit()
```

## **5. Integración con Fiber**

### **Ejemplo de API REST con Fiber + Gorm**

```go
package main

import (
    "github.com/gofiber/fiber/v2"
    "gorm.io/driver/postgres"
    "gorm.io/gorm"
)

type User struct {
    gorm.Model
    Name  string
    Email string
}

var db *gorm.DB

func main() {
    // Configurar Gorm
    dsn := "host=localhost user=postgres password=postgres dbname=test port=5432 sslmode=disable"
    var err error
    db, err = gorm.Open(postgres.Open(dsn), &gorm.Config{})
    if err != nil {
        panic("Error al conectar a la base de datos")
    }
    db.AutoMigrate(&User{})

    // Configurar Fiber
    app := fiber.New()

    app.Get("/users", GetUsers)
    app.Post("/users", CreateUser)

    app.Listen(":3000")
}

func GetUsers(c *fiber.Ctx) error {
    var users []User
    db.Find(&users)
    return c.JSON(users)
}

func CreateUser(c *fiber.Ctx) error {
    user := new(User)
    if err := c.BodyParser(user); err != nil {
        return c.Status(400).SendString(err.Error())
    }
    
    db.Create(&user)
    return c.JSON(user)
}
```

---

# Nivel Intermedio de Gorm

## **1. Manejo Avanzado de Errores**

Gorm devuelve errores que debemos manejar adecuadamente para evitar problemas en producción.  

### **Ejemplo: Validar errores comunes**

```go
// Crear usuario con manejo de errores
if err := db.Create(&user).Error; err != nil {
    if errors.Is(err, gorm.ErrDuplicatedKey) {
        return fmt.Errorf("el correo ya está registrado")
    }
    return fmt.Errorf("error al crear usuario: %v", err)
}
```

### **Errores comunes en Gorm:**

- `gorm.ErrRecordNotFound`: Cuando un `First()` o `Find()` no encuentra registros.  
- `gorm.ErrDuplicatedKey`: Violación de clave única.  
- `gorm.ErrInvalidData`: Datos inválidos al insertar.  

## **2. Validación de Datos**

Podemos combinar **Gorm** con librerías como `validator` para validar campos.  

### **Instalar validator:**

```bash
go get github.com/go-playground/validator/v10
```

### **Ejemplo:**

```go
type User struct {
    gorm.Model
    Name  string `gorm:"size:100;not null" validate:"required,min=3"`
    Email string `gorm:"size:100;unique" validate:"required,email"`
}

func CreateUser(c *fiber.Ctx) error {
    user := new(User)
    if err := c.BodyParser(user); err != nil {
        return c.Status(400).JSON(fiber.Map{"error": "Datos inválidos"})
    }

    validate := validator.New()
    if err := validate.Struct(user); err != nil {
        return c.Status(400).JSON(fiber.Map{"error": err.Error()})
    }

    if err := db.Create(&user).Error; err != nil {
        return c.Status(500).JSON(fiber.Map{"error": "No se pudo crear el usuario"})
    }

    return c.JSON(user)
}
```

## **3. Paginación de Resultados**

Para evitar devolver miles de registros, implementamos paginación.  

### **Ejemplo con Fiber y Gorm:**

```go
func GetUsers(c *fiber.Ctx) error {
    page, _ := strconv.Atoi(c.Query("page", "1"))
    limit, _ := strconv.Atoi(c.Query("limit", "10"))
    offset := (page - 1) * limit

    var users []User
    result := db.Offset(offset).Limit(limit).Find(&users)
    if result.Error != nil {
        return c.Status(500).JSON(fiber.Map{"error": "Error al obtener usuarios"})
    }

    return c.JSON(fiber.Map{
        "data":  users,
        "page":  page,
        "limit": limit,
    })
}
```

### **Consulta con `Scopes` (reutilizable):**

```go
func Paginate(page, limit int) func(db *gorm.DB) *gorm.DB {
    return func(db *gorm.DB) *gorm.DB {
        offset := (page - 1) * limit
        return db.Offset(offset).Limit(limit)
    }
}

// Uso:
db.Scopes(Paginate(1, 10)).Find(&users)
```

## **4. Optimización de Consultas (Select, Indexes)**  

### **Evitar `SELECT *`**

```go
db.Select("name", "email").Find(&users) // Solo trae name y email
```

### **Índices para mejorar búsquedas:**

```go
type User struct {
    gorm.Model
    Name  string `gorm:"size:100;index"`  // Índice normal
    Email string `gorm:"size:100;uniqueIndex"` // Índice único
}
```

## **5. Transacciones y Operaciones Atómicas**

Útil para operaciones críticas (ej: transferencias bancarias).  

### **Ejemplo:**

```go
err := db.Transaction(func(tx *gorm.DB) error {
    // Operación 1: Descontar saldo
    if err := tx.Model(&user1).Update("balance", gorm.Expr("balance - ?", amount)).Error; err != nil {
        return err
    }

    // Operación 2: Aumentar saldo
    if err := tx.Model(&user2).Update("balance", gorm.Expr("balance + ?", amount)).Error; err != nil {
        return err
    }

    return nil
})

if err != nil {
    log.Fatal("Error en transacción:", err)
}
```

## **6. Hooks (Eventos de Modelos)**

Gorm permite ejecutar código antes/después de operaciones.  

### **Ejemplo: Hash de contraseña antes de guardar**

```go
type User struct {
    gorm.Model
    Username string
    Password string
}

func (u *User) BeforeSave(tx *gorm.DB) error {
    if u.Password != "" {
        hashedPassword, _ := bcrypt.GenerateFromPassword([]byte(u.Password), 14)
        u.Password = string(hashedPassword)
    }
    return nil
}
```

### **Hooks comunes:**

- `BeforeSave`, `AfterSave`
- `BeforeCreate`, `AfterCreate`
- `BeforeUpdate`, `AfterUpdate`
- `BeforeDelete`, `AfterDelete`

## **7. Uso de Raw SQL (Cuando Gorm no es suficiente)**

Para consultas complejas, podemos usar SQL nativo.  

### **Ejemplo:**

```go
type Result struct {
    Name  string
    Total int
}

var results []Result
db.Raw("SELECT name, COUNT(*) as total FROM users GROUP BY name").Scan(&results)
```

## **8. Testing con Gorm (Mock y Suite de Pruebas)**

Pruebas unitarias para repositorios.  

### **Ejemplo con `testify`:**

```go
func TestCreateUser(t *testing.T) {
    // Configurar DB en memoria (SQLite)
    db, err := gorm.Open(sqlite.Open("file::memory:?cache=shared"), &gorm.Config{})
    assert.NoError(t, err)
    db.AutoMigrate(&User{})

    // Test
    user := User{Name: "Test", Email: "test@example.com"}
    err = db.Create(&user).Error
    assert.NoError(t, err)
    assert.NotZero(t, user.ID)
}
```

---

# Nivel Avanzado de Gorm

## **1. Despliegue en Docker con PostgreSQL + Gorm**  

### **Objetivo**: Crear un contenedor Docker con PostgreSQL y conectarlo desde una app Go usando Gorm.

### **Pasos**:

#### **1.1. Crear un `Dockerfile` para la app Go**

```dockerfile
FROM golang:1.21 as builder
WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download
COPY . .
RUN CGO_ENABLED=0 GOOS=linux go build -o /gorm-app

FROM alpine:latest
WORKDIR /app
COPY --from=builder /gorm-app .
COPY .env .
EXPOSE 3000
CMD ["./gorm-app"]
```

#### **1.2. Crear un `docker-compose.yml`** (PostgreSQL + App)

```yaml
version: '3.8'
services:
  postgres:
    image: postgres:15
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: gorm_db
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

  app:
    build: .
    ports:
      - "3000:3000"
    depends_on:
      - postgres
    environment:
      DB_HOST: postgres
      DB_USER: postgres
      DB_PASSWORD: postgres
      DB_NAME: gorm_db
      DB_PORT: 5432

volumes:
  postgres_data:
```

#### **1.3. Configurar Gorm para usar variables de entorno**

```go
import (
  "gorm.io/driver/postgres"
  "gorm.io/gorm"
  "os"
)

func ConnectDB() (*gorm.DB, error) {
  dsn := fmt.Sprintf(
    "host=%s user=%s password=%s dbname=%s port=%s sslmode=disable",
    os.Getenv("DB_HOST"),
    os.Getenv("DB_USER"),
    os.Getenv("DB_PASSWORD"),
    os.Getenv("DB_NAME"),
    os.Getenv("DB_PORT"),
  )
  return gorm.Open(postgres.Open(dsn), &gorm.Config{})
}
```

#### **1.4. Ejecutar el stack**

```bash
docker-compose up --build
```

## **2. API Avanzada con Autenticación JWT**  

### **Objetivo**: Implementar login/registro usando JWT con Fiber y Gorm.

### **Pasos**

#### **2.1. Estructura de User + Password Hash**

```go
type User struct {
  gorm.Model
  Email    string `gorm:"unique"`
  Password string
}

// Antes de guardar, hashear la contraseña
func (u *User) BeforeSave(tx *gorm.DB) error {
  hashedPassword, err := bcrypt.GenerateFromPassword([]byte(u.Password), 14)
  if err != nil {
    return err
  }
  u.Password = string(hashedPassword)
  return nil
}
```

#### **2.2. Endpoints con Fiber**

```go
app.Post("/register", func(c *fiber.Ctx) error {
  user := new(User)
  if err := c.BodyParser(user); err != nil {
    return c.Status(400).JSON(fiber.Map{"error": "Invalid data"})
  }
  db.Create(&user)
  return c.JSON(user)
})

app.Post("/login", func(c *fiber.Ctx) error {
  var input struct {
    Email    string `json:"email"`
    Password string `json:"password"`
  }
  if err := c.BodyParser(&input); err != nil {
    return err
  }

  var user User
  if err := db.Where("email = ?", input.Email).First(&user).Error; err != nil {
    return c.Status(401).JSON(fiber.Map{"error": "User not found"})
  }

  if err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(input.Password)); err != nil {
    return c.Status(401).JSON(fiber.Map{"error": "Invalid password"})
  }

  token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
    "user_id": user.ID,
    "exp":     time.Now().Add(time.Hour * 24).Unix(),
  })

  t, err := token.SignedString([]byte("secret"))
  if err != nil {
    return c.SendStatus(fiber.StatusInternalServerError)
  }

  return c.JSON(fiber.Map{"token": t})
})
```

#### **2.3. Middleware de Autenticación**

```go
func AuthMiddleware(c *fiber.Ctx) error {
  tokenString := c.Get("Authorization")
  if tokenString == "" {
    return c.Status(401).JSON(fiber.Map{"error": "Unauthorized"})
  }

  token, err := jwt.Parse(tokenString, func(token *jwt.Token) (any, error) {
    return []byte("secret"), nil
  })

  if err != nil || !token.Valid {
    return c.Status(401).JSON(fiber.Map{"error": "Invalid token"})
  }

  claims := token.Claims.(jwt.MapClaims)
  c.Locals("userID", claims["user_id"])
  return c.Next()
}
```

## **3. GraphQL con Gorm**  

### **Objetivo**: Usar `gqlgen` para crear un servidor GraphQL que consuma datos con Gorm.

### **Pasos**

#### **3.1. Instalar gqlgen**

```bash
go get github.com/99designs/gqlgen
go run github.com/99designs/gqlgen init
```

#### **3.2. Definir el Schema (`schema.graphql`)**

```graphql
type User {
  id: ID!
  email: String!
}

type Query {
  users: [User!]!
}
```

#### **3.3. Generar resolvers**

```bash
go run github.com/99designs/gqlgen generate
```

#### **3.4. Implementar el Resolver con Gorm**

```go
func (r *queryResolver) Users(ctx context.Context) ([]*model.User, error) {
  var users []*User
  if err := db.Find(&users).Error; err != nil {
    return nil, err
  }

  var result []*model.User
  for _, u := range users {
    result = append(result, &model.User{
      ID:    strconv.FormatUint(uint64(u.ID), 10),
      Email: u.Email,
    })
  }
  return result, nil
}
```

## **4. Microservicios con Gorm y gRPC**

### **Objetivo**: Crear un servicio gRPC que use Gorm para manejar datos.

### **Pasos**

#### **4.1. Definir el Proto (`user.proto`)**

```proto
syntax = "proto3";

service UserService {
  rpc GetUser (UserRequest) returns (UserResponse);
}

message UserRequest {
  uint32 id = 1;
}

message UserResponse {
  uint32 id = 1;
  string email = 2;
}
```

#### **4.2. Generar código Go**

```bash
protoc --go_out=. --go-grpc_out=. user.proto
```

#### **4.3. Implementar el Servidor gRPC**

```go
type server struct {
  db *gorm.DB
}

func (s *server) GetUser(ctx context.Context, req *pb.UserRequest) (*pb.UserResponse, error) {
  var user User
  if err := s.db.First(&user, req.Id).Error; err != nil {
    return nil, status.Errorf(codes.NotFound, "User not found")
  }
  return &pb.UserResponse{
    Id:    uint32(user.ID),
    Email: user.Email,
  }, nil
}
```

#### **4.4. Iniciar el servidor**

```go
lis, err := net.Listen("tcp", ":50051")
s := grpc.NewServer()
pb.RegisterUserServiceServer(s, &server{db: db})
s.Serve(lis)
```
