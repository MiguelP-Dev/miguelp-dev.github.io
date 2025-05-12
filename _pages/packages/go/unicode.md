---
layout: default
title: "Unicode en Go"
description: "Guía completa del paquete unicode de Go para manejo de caracteres internacionales"
permalink: /packages/go/unicode/
category: packages
article: true
subcategory: "Text Processing"
icon: 🔤
---

## Guía Completa del Paquete `unicode` en Go

El paquete `unicode` en Go proporciona funcionalidades robustas para manejar caracteres Unicode, facilitando operaciones como clasificación, conversión y manipulación de texto en diferentes idiomas. Esta guía explora en profundidad las funciones disponibles con ejemplos prácticos.

### Clasificación de Caracteres

#### Letras y Caracteres Alfanuméricos

```go
package main

import (
    "fmt"
    "unicode"
)

func main() {
    // IsLetter - Verifica si un rune es una letra
    fmt.Printf("¿Es 'A' una letra? %t\n", unicode.IsLetter('A'))
    fmt.Printf("¿Es 'ñ' una letra? %t\n", unicode.IsLetter('ñ'))
    fmt.Printf("¿Es '漢' una letra? %t\n", unicode.IsLetter('漢'))
    fmt.Printf("¿Es '5' una letra? %t\n", unicode.IsLetter('5'))
    
    // IsDigit - Verifica específicamente si es un dígito decimal (0-9)
    fmt.Printf("¿Es '7' un dígito? %t\n", unicode.IsDigit('7'))
    fmt.Printf("¿Es '٧' (dígito árabe) un dígito? %t\n", unicode.IsDigit('٧'))
    
    // IsNumber - Más amplio que IsDigit, incluye otros tipos de números Unicode
    fmt.Printf("¿Es '½' un número? %t\n", unicode.IsNumber('½'))
    fmt.Printf("¿Es 'Ⅷ' (numeral romano) un número? %t\n", unicode.IsNumber('Ⅷ'))
    
    // Combinando verificaciones para caracteres alfanuméricos
    esAlfanumerico := func(r rune) bool {
        return unicode.IsLetter(r) || unicode.IsDigit(r)
    }
    
    fmt.Printf("¿Es 'A9' alfanumérico? %t y %t\n", esAlfanumerico('A'), esAlfanumerico('9'))
}
```

#### Mayúsculas, Minúsculas y Título

```go
package main

import (
    "fmt"
    "unicode"
)

func main() {
    // IsUpper - Verifica si es mayúscula
    fmt.Printf("¿'A' es mayúscula? %t\n", unicode.IsUpper('A'))
    fmt.Printf("¿'É' es mayúscula? %t\n", unicode.IsUpper('É'))
    
    // IsLower - Verifica si es minúscula
    fmt.Printf("¿'a' es minúscula? %t\n", unicode.IsLower('a'))
    fmt.Printf("¿'ñ' es minúscula? %t\n", unicode.IsLower('ñ'))
    
    // IsTitle - Detecta caracteres específicos que son mayúsculas de título
    // Algunos caracteres especiales tienen forma de título propia
    fmt.Printf("¿'ǅ' (DZ con acento) es un carácter de título? %t\n", unicode.IsTitle('ǅ'))
    
    // Ejemplo práctico: verificar si una palabra comienza con mayúscula
    palabra := "España"
    primerRuna := []rune(palabra)[0]
    fmt.Printf("¿'%s' comienza con mayúscula? %t\n", palabra, unicode.IsUpper(primerRuna))
}
```

#### Espacios y Control

```go
package main

import (
    "fmt"
    "strings"
    "unicode"
)

func main() {
    // IsSpace - Detecta diferentes tipos de espacios en Unicode
    fmt.Printf("Espacio normal: %t\n", unicode.IsSpace(' '))
    fmt.Printf("Tabulación: %t\n", unicode.IsSpace('\t'))
    fmt.Printf("Salto de línea: %t\n", unicode.IsSpace('\n'))
    fmt.Printf("Espacio no rompible: %t\n", unicode.IsSpace('\u00A0'))
    
    // IsControl - Detecta caracteres de control
    fmt.Printf("Nulo '\\0': %t\n", unicode.IsControl('\u0000'))
    fmt.Printf("Escape '\\e': %t\n", unicode.IsControl('\u001B'))
    fmt.Printf("Delete: %t\n", unicode.IsControl('\u007F'))
    
    // Ejemplo práctico: Eliminar espacios y contar palabras
    texto := "  Hola  mundo!  ¿Cómo  estás?  "
    palabras := strings.FieldsFunc(texto, unicode.IsSpace)
    fmt.Printf("Texto: %q\n", texto)
    fmt.Printf("Palabras: %q\n", palabras)
    fmt.Printf("Número de palabras: %d\n", len(palabras))
}
```

#### Símbolos y Puntuación

```go
package main

import (
    "fmt"
    "unicode"
)

func main() {
    // IsPunct - Identifica signos de puntuación
    fmt.Printf("Punto '.': %t\n", unicode.IsPunct('.'))
    fmt.Printf("Coma ',': %t\n", unicode.IsPunct(','))
    fmt.Printf("Interrogación '?': %t\n", unicode.IsPunct('?'))
    fmt.Printf("¿Interrogación de apertura '¿'? %t\n", unicode.IsPunct('¿'))
    
    // IsSymbol - Identifica símbolos
    fmt.Printf("Dólar '$': %t\n", unicode.IsSymbol('$'))
    fmt.Printf("Porcentaje '%%': %t\n", unicode.IsSymbol('%'))
    fmt.Printf("Copyright '©': %t\n", unicode.IsSymbol('©'))
    fmt.Printf("Emoji '😊': %t\n", unicode.IsSymbol('😊'))
    
    // Diferencia entre símbolos y puntuación
    caracteresVarios := []rune{'@', '#', '+', '=', ':', ';', '(', '[', '"'}
    fmt.Println("\nClasificación de caracteres:")
    for _, c := range caracteresVarios {
        fmt.Printf("%q es: Puntuación=%t, Símbolo=%t\n", 
                  c, unicode.IsPunct(c), unicode.IsSymbol(c))
    }
    
    // IsGraphic y IsPrint - Caracteres con representación visual
    fmt.Printf("\nTabulación '\\t' es: Gráfico=%t, Imprimible=%t\n", 
               unicode.IsGraphic('\t'), unicode.IsPrint('\t'))
    fmt.Printf("Espacio ' ' es: Gráfico=%t, Imprimible=%t\n", 
               unicode.IsGraphic(' '), unicode.IsPrint(' '))
    fmt.Printf("Letra 'A' es: Gráfico=%t, Imprimible=%t\n", 
               unicode.IsGraphic('A'), unicode.IsPrint('A'))
}
```

### Transformación de Caracteres

#### Conversión de Mayúsculas/Minúsculas

```go
package main

import (
    "fmt"
    "strings"
    "unicode"
)

func main() {
    // ToUpper - Convertir a mayúsculas
    fmt.Printf("'a' → %q\n", unicode.ToUpper('a'))
    fmt.Printf("'ñ' → %q\n", unicode.ToUpper('ñ'))
    fmt.Printf("'é' → %q\n", unicode.ToUpper('é'))
    
    // ToLower - Convertir a minúsculas
    fmt.Printf("'A' → %q\n", unicode.ToLower('A'))
    fmt.Printf("'Ñ' → %q\n", unicode.ToLower('Ñ'))
    fmt.Printf("'É' → %q\n", unicode.ToLower('É'))
    
    // ToTitle - Convertir a título (similar a mayúscula pero específico para título)
    fmt.Printf("'a' a título → %q\n", unicode.ToTitle('a'))
    fmt.Printf("'ñ' a título → %q\n", unicode.ToTitle('ñ'))
    
    // SimpleFold - Iterar por el conjunto de equivalencias de plegado
    c := 'A'
    fmt.Printf("Iterando por plegado de %q: ", c)
    for i := 0; i < 3; i++ {
        c = unicode.SimpleFold(c)
        fmt.Printf("%q ", c)
    }
    fmt.Println()
    
    // Ejemplo práctico: Convertir strings completos
    frase := "¡Hola Mundo!"
    mayusculas := strings.Map(unicode.ToUpper, frase)
    minusculas := strings.Map(unicode.ToLower, frase)
    fmt.Printf("Original: %s\n", frase)
    fmt.Printf("Mayúsculas: %s\n", mayusculas)
    fmt.Printf("Minúsculas: %s\n", minusculas)
}
```

### Tablas Unicode y Rangos

El paquete `unicode` define múltiples rangos y tablas que agrupan caracteres por categorías o propiedades.

```go
package main

import (
    "fmt"
    "unicode"
)

func main() {
    // Rangos predefinidos en el paquete unicode
    fmt.Println("Rangos Unicode:")
    
    // Letras latinas
    fmt.Printf("'A' es letra latina: %t\n", unicode.In('A', unicode.Latin))
    fmt.Printf("'α' (alfa griego) es letra latina: %t\n", unicode.In('α', unicode.Latin))
    
    // Letras griegas
    fmt.Printf("'α' es letra griega: %t\n", unicode.In('α', unicode.Greek))
    fmt.Printf("'Ω' es letra griega: %t\n", unicode.In('Ω', unicode.Greek))
    
    // Caracteres cirílicos
    fmt.Printf("'Я' es letra cirílica: %t\n", unicode.In('Я', unicode.Cyrillic))
    
    // Caracteres asiáticos
    fmt.Printf("'漢' es un carácter Han: %t\n", unicode.In('漢', unicode.Han))
    
    // Combinar rangos con funciones de clasificación
    esLetraLatina := func(r rune) bool {
        return unicode.IsLetter(r) && unicode.In(r, unicode.Latin)
    }
    
    fmt.Printf("'A' es letra latina: %t\n", esLetraLatina('A'))
    fmt.Printf("'α' es letra latina: %t\n", esLetraLatina('α'))
}
```

### Scripts y Propiedades Unicode

```go
package main

import (
    "fmt"
    "unicode"
)

func main() {
    // Usando tablas de propiedades
    fmt.Printf("'A' es parte del script latino: %t\n", 
               unicode.Is(unicode.Latin, 'A'))
    fmt.Printf("'漢' es parte del script Han: %t\n", 
               unicode.Is(unicode.Han, '漢'))
    fmt.Printf("'α' es parte del script griego: %t\n", 
               unicode.Is(unicode.Greek, 'α'))
    
    // Combinando múltiples scripts
    caracteresVarios := []rune{'A', 'α', '漢', 'Я', '9', '©'}
    for _, c := range caracteresVarios {
        fmt.Printf("%q pertenece a: ", c)
        
        if unicode.Is(unicode.Latin, c) {
            fmt.Printf("Latino ")
        }
        if unicode.Is(unicode.Greek, c) {
            fmt.Printf("Griego ")
        }
        if unicode.Is(unicode.Han, c) {
            fmt.Printf("Han ")
        }
        if unicode.Is(unicode.Cyrillic, c) {
            fmt.Printf("Cirílico ")
        }
        
        fmt.Println()
    }
}
```

### Casos Prácticos

#### Validación de Entrada

```go
package main

import (
    "fmt"
    "strings"
    "unicode"
)

// Validar un nombre de usuario que solo permite letras, números y guiones bajos
func esNombreUsuarioValido(nombre string) bool {
    if len(nombre) < 3 || len(nombre) > 20 {
        return false
    }
    
    for _, r := range nombre {
        if !unicode.IsLetter(r) && !unicode.IsDigit(r) && r != '_' {
            return false
        }
    }
    
    // El nombre debe comenzar con una letra
    return unicode.IsLetter([]rune(nombre)[0])
}

// Validar una contraseña con requisitos de seguridad
func esContraseñaSegura(pass string) (bool, string) {
    if len(pass) < 8 {
        return false, "La contraseña debe tener al menos 8 caracteres"
    }
    
    var tieneMayuscula, tieneMinuscula, tieneDigito, tieneSimbolo bool
    
    for _, r := range pass {
        if unicode.IsUpper(r) {
            tieneMayuscula = true
        } else if unicode.IsLower(r) {
            tieneMinuscula = true
        } else if unicode.IsDigit(r) {
            tieneDigito = true
        } else if unicode.IsPunct(r) || unicode.IsSymbol(r) {
            tieneSimbolo = true
        }
    }
    
    if !tieneMayuscula {
        return false, "Debe incluir al menos una letra mayúscula"
    }
    if !tieneMinuscula {
        return false, "Debe incluir al menos una letra minúscula"
    }
    if !tieneDigito {
        return false, "Debe incluir al menos un dígito"
    }
    if !tieneSimbolo {
        return false, "Debe incluir al menos un símbolo"
    }
    
    return true, "Contraseña válida"
}

func main() {
    // Probar validación de nombre de usuario
    nombresUsuario := []string{"usuario123", "Usuario_1", "123user", "us@er", "a"}
    fmt.Println("Validación de nombres de usuario:")
    for _, nombre := range nombresUsuario {
        fmt.Printf("%q es válido: %t\n", nombre, esNombreUsuarioValido(nombre))
    }
    
    // Probar validación de contraseña
    contraseñas := []string{"abc123", "Password1", "Passw0rd!", "CONTRASEÑA123", "contraseña!"}
    fmt.Println("\nValidación de contraseñas:")
    for _, pass := range contraseñas {
        valida, mensaje := esContraseñaSegura(pass)
        fmt.Printf("%q: %s\n", pass, mensaje)
    }
}
```

##### Procesamiento de Texto

```go
package main

import (
    "fmt"
    "strings"
    "unicode"
)

// Normalizar texto eliminando espacios extras y convirtiendo a minúsculas
func normalizarTexto(texto string) string {
    // Convertir a minúsculas
    texto = strings.Map(unicode.ToLower, texto)
    
    // Eliminar espacios duplicados
    var resultado strings.Builder
    espacioAnterior := true // Para manejar espacios al inicio
    
    for _, r := range texto {
        if unicode.IsSpace(r) {
            if !espacioAnterior {
                resultado.WriteRune(' ')
                espacioAnterior = true
            }
        } else {
            resultado.WriteRune(r)
            espacioAnterior = false
        }
    }
    
    return strings.TrimSpace(resultado.String())
}

// Contar palabras, separando correctamente por Unicode
func contarPalabras(texto string) int {
    palabras := strings.FieldsFunc(texto, unicode.IsSpace)
    return len(palabras)
}

// Convertir a formato título (primera letra de cada palabra en mayúscula)
func formatoTitulo(texto string) string {
    palabras := strings.FieldsFunc(texto, unicode.IsSpace)
    for i, palabra := range palabras {
        if len(palabra) > 0 {
            runas := []rune(palabra)
            runas[0] = unicode.ToTitle(runas[0])
            palabras[i] = string(runas)
        }
    }
    return strings.Join(palabras, " ")
}

// Sanitizar texto para URLs (eliminar acentos, espacios, etc.)
func sanitizarParaURL(texto string) string {
    texto = strings.Map(func(r rune) rune {
        if unicode.IsLetter(r) || unicode.IsDigit(r) {
            // Convertir letras a minúsculas
            return unicode.ToLower(r)
        } else if unicode.IsSpace(r) {
            return '-'
        }
        // Eliminar cualquier otro carácter
        return -1
    }, texto)
    
    // Eliminar guiones duplicados
    for strings.Contains(texto, "--") {
        texto = strings.ReplaceAll(texto, "--", "-")
    }
    
    return strings.Trim(texto, "-")
}

func main() {
    texto := "  ¡Hola   MUNDO!  ¿Cómo    estás? 😊  "
    
    fmt.Printf("Original: %q\n", texto)
    fmt.Printf("Normalizado: %q\n", normalizarTexto(texto))
    fmt.Printf("Palabras: %d\n", contarPalabras(texto))
    fmt.Printf("Formato título: %q\n", formatoTitulo(normalizarTexto(texto)))
    
    tituloArticulo := "Cómo Aprender Go: Una Guía Práctica (2023)"
    fmt.Printf("\nTítulo original: %q\n", tituloArticulo)
    fmt.Printf("URL amigable: %q\n", sanitizarParaURL(tituloArticulo))
}
```

### Rendimiento y Optimizaciones

```go
package main

import (
    "fmt"
    "strings"
    "time"
    "unicode"
)

func main() {
    // Texto de prueba grande
    textoGrande := strings.Repeat("¡Hola Mundo! ¿Cómo estás? 123 αβγ 漢字 ", 10000)
    
    // Método 1: Usar unicode.Is* en cada carácter
    inicio := time.Now()
    contarCaracteresPorTipo1 := func(texto string) (letras, digitos, espacios, otros int) {
        for _, r := range texto {
            if unicode.IsLetter(r) {
                letras++
            } else if unicode.IsDigit(r) {
                digitos++
            } else if unicode.IsSpace(r) {
                espacios++
            } else {
                otros++
            }
        }
        return
    }
    l1, d1, e1, o1 := contarCaracteresPorTipo1(textoGrande)
    duracion1 := time.Since(inicio)
    
    // Método 2: Combinar búsquedas usando tablas
    inicio = time.Now()
    contarCaracteresPorTipo2 := func(texto string) (letras, digitos, espacios, otros int) {
        for _, r := range texto {
            switch {
            case unicode.IsLetter(r):
                letras++
            case unicode.IsDigit(r):
                digitos++
            case unicode.IsSpace(r):
                espacios++
            default:
                otros++
            }
        }
        return
    }
    l2, d2, e2, o2 := contarCaracteresPorTipo2(textoGrande)
    duracion2 := time.Since(inicio)
    
    fmt.Println("Comparación de rendimiento:")
    fmt.Printf("Método 1: %v (Letras: %d, Dígitos: %d, Espacios: %d, Otros: %d)\n", 
               duracion1, l1, d1, e1, o1)
    fmt.Printf("Método 2: %v (Letras: %d, Dígitos: %d, Espacios: %d, Otros: %d)\n", 
               duracion2, l2, d2, e2, o2)
    
    fmt.Printf("Rendimiento relativo: %.2f%%\n", 
               float64(duracion1.Nanoseconds())/float64(duracion2.Nanoseconds())*100)
}
```

### Conclusión

El paquete `unicode` de Go proporciona herramientas robustas para manejar texto internacional y caracteres Unicode de forma eficiente. Es especialmente útil para:

1. Validación de entrada de usuario
2. Procesamiento y normalización de texto
3. Manipulación de cadenas multilingües
4. Identificación y clasificación de caracteres
5. Operaciones de conversión entre mayúsculas y minúsculas

Al explotar el poder de este paquete, puedes crear aplicaciones Go que manejen texto de manera precisa y eficiente, independientemente del idioma o script utilizado.
