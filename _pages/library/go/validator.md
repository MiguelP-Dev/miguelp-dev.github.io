---
layout: default
title: "Validator"
description: "Validación de datos estructurados en Go de forma simple y eficiente"
permalink: /library/go/validator/
category: library
article: true
subcategory: validation
icon: ✅
---

## ¿Qué es Validator?

Validator es una potente librería de validación de datos para Go que permite validar estructuras y campos individuales usando tags. Está inspirada en librerías como [validator.js](https://github.com/validatorjs/validator.js) y proporciona una forma declarativa de definir reglas de validación.

Al utilizar Validator, los desarrolladores pueden:

- Validar estructuras complejas con reglas personalizadas
- Reducir código boilerplate para validación de datos
- Mantener las reglas de validación cerca de la definición de datos
- Validar tipos comunes como emails, URLs, números de teléfono, etc.

## Instalación

Para instalar Validator, ejecuta el siguiente comando en tu terminal:

```bash
go get github.com/go-playground/validator/v10
```

## Validación básica

### Estructura con tags de validación

Primero, define una estructura con tags de validación:

```go
package main

import (
   "fmt"
   
   "github.com/go-playground/validator/v10"
)

type User struct {
   FirstName      string     `validate:"required"`
   LastName       string     `validate:"required"`
   Age            uint8      `validate:"gte=0,lte=130"`
   Email          string     `validate:"required,email"`
   FavouriteColor string     `validate:"iscolor"` // alias for 'hexcolor|rgb|rgba|hsl|hsla'
   Addresses      []*Address `validate:"required,dive,required"`
}

type Address struct {
   Street string `validate:"required"`
   City   string `validate:"required"`
   Planet string `validate:"required"`
   Phone  string `validate:"required,e164"`
}

var validate *validator.Validate

func main() {
   validate = validator.New()

   // Validar un usuario
   validateStruct()
}

func validateStruct() {
   address := &Address{
      Street: "Eavesdown Docks",
      City:   "Persphone",
      Planet: "Pandora",
      Phone:  "+8612345678901",
   }

   user := &User{
      FirstName:      "Badger",
      LastName:       "Smith",
      Age:            135, // esto fallará la validación
      Email:          "Badger.Smith@gmail.com",
      FavouriteColor: "#000",
      Addresses:      []*Address{address},
   }

   // Validar la estructura
   err := validate.Struct(user)
   if err != nil {
      // Manejar errores de validación
      if _, ok := err.(*validator.InvalidValidationError); ok {
         fmt.Println(err)
         return
      }

      for _, err := range err.(validator.ValidationErrors) {
         fmt.Printf("Campo %s falló la validación con tag '%s'\n", err.Field(), err.Tag())
      }
      
      return
   }
   
   fmt.Println("Validación exitosa!")
}
```

## Validadores incorporados

Validator incluye muchos validadores incorporados. Aquí algunos de los más comunes:

### Validación de strings

- `required` - Campo requerido
- `email` - Validar email
- `url` - Validar URL
- `alpha` - Solo letras
- `alphanum` - Letras y números
- `numeric` - Solo números
- `hexadecimal` - Formato hexadecimal
- `lowercase` - Solo minúsculas
- `uppercase` - Solo mayúsculas
- `uuid` - Validar UUID

### Validación de números

- `gt` - Mayor que
- `gte` - Mayor o igual que
- `lt` - Menor que
- `lte` - Menor o igual que
- `eq` - Igual a
- `ne` - No igual a

### Validación de fechas

- `datetime` - Validar formato de fecha

### Validación miscelánea

- `unique` - Valores únicos en un slice
- `oneof` - El valor debe ser uno de los especificados
- `contains` - El string debe contener el substring
- `excludes` - El string no debe contener el substring

## Validación personalizada

Puedes crear validadores personalizados para casos específicos:

```go
package main

import (
   "fmt"
   "strings"
   
   "github.com/go-playground/validator/v10"
)

var validate *validator.Validate

func main() {
   validate = validator.New()
   
   // Registrar validación personalizada
   _ = validate.RegisterValidation("notcontainsspace", func(fl validator.FieldLevel) bool {
      return !strings.Contains(fl.Field().String(), " ")
   })

   // Validar con el validador personalizado
   validateCustom()
}

type User struct {
   Username string `validate:"required,notcontainsspace"`
   Password string `validate:"required"`
}

func validateCustom() {
   user := User{
      Username: "john doe", // contiene espacio, fallará
      Password: "secret",
   }

   err := validate.Struct(user)
   if err != nil {
      for _, err := range err.(validator.ValidationErrors) {
         fmt.Printf("Campo %s falló la validación con tag '%s'\n", err.Field(), err.Tag())
      }
   }
}
```

## Validación de campos anidados

Validator puede validar estructuras anidadas automáticamente:

```go
package main

import (
   "fmt"
   
   "github.com/go-playground/validator/v10"
)

type Address struct {
   Street string `validate:"required"`
   City   string `validate:"required"`
}

type User struct {
   Name    string  `validate:"required"`
   Age     int     `validate:"gte=18"`
   Address Address `validate:"required"`
}

func main() {
   validate := validator.New()

   user := User{
      Name: "John Doe",
      Age:  17, // fallará por ser menor de 18
      Address: Address{
         Street: "123 Main St",
         // City omitido, fallará por required
      },
   }

   err := validate.Struct(user)
   if err != nil {
      for _, err := range err.(validator.ValidationErrors) {
         fmt.Printf("Error en campo %s: %s\n", err.Field(), err.Tag())
      }
   }
}
```

## Traducción de errores

Puedes personalizar los mensajes de error:

```go
package main

import (
   "fmt"
   
   "github.com/go-playground/validator/v10"
   en "github.com/go-playground/validator/v10/translations/en"
)

type User struct {
   Username string `validate:"required"`
   Email    string `validate:"required,email"`
   Age      int    `validate:"gte=18"`
}

func main() {
   validate := validator.New()
   
   // Registrar traducción al inglés
   translator := en.New()
   _ = en.RegisterDefaultTranslations(validate, translator)

   user := User{
      Username: "",
      Email:    "invalid-email",
      Age:      15,
   }

   err := validate.Struct(user)
   if err != nil {
      errs := err.(validator.ValidationErrors)
      
      for _, e := range errs {
         // Traducir error
         fmt.Println(e.Translate(translator))
      }
   }
}
```

## Validación condicional

Puedes implementar validación condicional usando el tag `required_if` u otros tags condicionales:

```go
package main

import (
   "fmt"
   
   "github.com/go-playground/validator/v10"
)

type Registration struct {
   Email       string `validate:"required,email"`
   Password    string `validate:"required"`
   AccountType string `validate:"required,oneof=free premium enterprise"`
   
   // Solo requerido si AccountType es premium o enterprise
   CreditCard string `validate:"required_if=AccountType premium|enterprise"`
}

func main() {
   validate := validator.New()

   reg := Registration{
      Email:       "user@example.com",
      Password:    "securepassword",
      AccountType: "premium",
      // CreditCard omitido - esto causará un error
   }

   err := validate.Struct(reg)
   if err != nil {
      for _, err := range err.(validator.ValidationErrors) {
         fmt.Printf("Campo %s falló la validación con tag '%s'\n", err.Field(), err.Tag())
      }
   }
}
```

## Mejores prácticas

1. **Reutiliza la instancia de Validator**:  
   Crea una instancia global de Validator en lugar de crear una nueva cada vez.

2. **Tags simples**:  
   Mantén las reglas de validación lo más simples posible para mejorar la legibilidad.

3. **Validación por capas**:  
   Usa Validator para validación básica de datos y añade lógica de negocio en otra capa.

4. **Mensajes personalizados**:  
   Traduce los mensajes de error para una mejor experiencia de usuario.

5. **Validación temprana**:  
   Valida los datos tan pronto como los recibas (en handlers HTTP, por ejemplo).

6. **Pruebas unitarias**:  
   Escribe pruebas para tus estructuras validadas para asegurar que las reglas funcionan como esperas.

## Ejemplo completo

Aquí tienes un ejemplo completo que integra varios conceptos:

```go
package main

import (
   "fmt"
   "net/http"
   
   "github.com/go-playground/validator/v10"
)

var validate *validator.Validate

// User representa un usuario del sistema
type User struct {
   ID        string `validate:"omitempty,uuid"`
   Name      string `validate:"required,min=2,max=50"`
   Email     string `validate:"required,email"`
   Age       int    `validate:"min=18,max=99"`
   Password  string `validate:"required,min=8"`
   IsActive  bool   `validate:"required"`
   Interests []string `validate:"required,min=1,dive,required,min=3"`
}

func init() {
   validate = validator.New()
}

func createUserHandler(w http.ResponseWriter, r *http.Request) {
   // Simular datos recibidos
   user := User{
      Name:      "JD",
      Email:     "john.doe@example",
      Age:       17,
      Password:  "short",
      IsActive:  true,
      Interests: []string{"", "coding"},
   }

   // Validar el usuario
   if err := validate.Struct(user); err != nil {
      validationErrors := err.(validator.ValidationErrors)
      for _, fieldError := range validationErrors {
         fmt.Printf("Error en campo %s: %s\n", fieldError.Field(), fieldError.Tag())
      }
      return
   }
   
   // Continuar con la creación del usuario...
   fmt.Println("Usuario creado exitosamente!")
}

func main() {
   http.HandleFunc("/users", createUserHandler)
   fmt.Println("Servidor iniciado en :8080")
   http.ListenAndServe(":8080", nil)
}
```

## Resolución de problemas comunes

### Tags no funcionan

- Verifica que los tags estén escritos correctamente (son sensibles a mayúsculas/minúsculas).
- Asegúrate de que el nombre del campo sea exportado (comienza con mayúscula).

### Validación de slices o arrays

- Usa el tag `dive` para validar elementos internos de slices, arrays o maps.

### Validación condicional compleja

- Para lógica de validación compleja, considera implementar un validador personalizado.

### Campos omitidos

- Usa `omitempty` si el campo es opcional y no debe validarse cuando está vacío.

### Validación cruzada

- Para validación que depende de múltiples campos, implementa un método de validación en la estructura.

---

Con esta guía, ahora deberías tener un buen entendimiento de cómo usar la librería Validator en tus proyectos Go. Esta herramienta te ayudará a mantener tus datos limpios y consistentes con un mínimo de código `boilerplate`.
